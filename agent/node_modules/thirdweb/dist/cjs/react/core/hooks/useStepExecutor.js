"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStepExecutor = useStepExecutor;
const react_1 = require("react");
const pay_js_1 = require("../../../analytics/track/pay.js");
const Errors_js_1 = require("../../../bridge/types/Errors.js");
const utils_js_1 = require("../../../chains/utils.js");
const wait_for_tx_receipt_js_1 = require("../../../transaction/actions/wait-for-tx-receipt.js");
const json_js_1 = require("../../../utils/json.js");
const wait_for_calls_receipt_js_1 = require("../../../wallets/eip5792/wait-for-calls-receipt.js");
/**
 * Flatten RouteStep[] into a linear list of transactions preserving ordering & indices.
 */
function flattenRouteSteps(steps) {
    const out = [];
    steps.forEach((step, stepIdx) => {
        step.transactions?.forEach((tx, _txIdx) => {
            out.push({
                ...tx,
                _index: out.length,
                _stepIndex: stepIdx,
            });
        });
    });
    return out;
}
/**
 * Hook that sequentially executes prepared steps.
 * NOTE: initial implementation only exposes progress + basic state machine. Actual execution logic will follow in later subtasks.
 */
function useStepExecutor(options) {
    const { wallet, windowAdapter, client, autoStart = false, onComplete, preparedQuote, } = options;
    // Flatten all transactions upfront
    const flatTxs = (0, react_1.useMemo)(() => (preparedQuote?.steps ? flattenRouteSteps(preparedQuote.steps) : []), [preparedQuote?.steps]);
    // State management
    const [currentTxIndex, setCurrentTxIndex] = (0, react_1.useState)(undefined);
    const [executionState, setExecutionState] = (0, react_1.useState)("idle");
    const [error, setError] = (0, react_1.useState)(undefined);
    const [completedTxs, setCompletedTxs] = (0, react_1.useState)(new Set());
    const [onrampStatus, setOnrampStatus] = (0, react_1.useState)(preparedQuote?.type === "onramp" ? "pending" : undefined);
    // Cancellation tracking
    const abortControllerRef = (0, react_1.useRef)(null);
    // Get current step based on current tx index
    const currentStep = (0, react_1.useMemo)(() => {
        if (typeof preparedQuote?.steps === "undefined")
            return undefined;
        if (currentTxIndex === undefined) {
            return undefined;
        }
        const tx = flatTxs[currentTxIndex];
        return tx ? preparedQuote.steps[tx._stepIndex] : undefined;
    }, [currentTxIndex, flatTxs, preparedQuote?.steps]);
    // Calculate progress including onramp step
    const progress = (0, react_1.useMemo)(() => {
        if (typeof preparedQuote?.type === "undefined")
            return 0;
        const totalSteps = flatTxs.length + (preparedQuote.type === "onramp" ? 1 : 0);
        if (totalSteps === 0) {
            return 0;
        }
        const completedSteps = completedTxs.size + (onrampStatus === "completed" ? 1 : 0);
        return Math.round((completedSteps / totalSteps) * 100);
    }, [completedTxs.size, flatTxs.length, preparedQuote?.type, onrampStatus]);
    // Exponential backoff polling utility
    const poller = (0, react_1.useCallback)(async (pollFn, abortSignal) => {
        const delay = 2000; // 2 second poll interval
        while (!abortSignal.aborted) {
            const result = await pollFn();
            if (result.completed) {
                return;
            }
            await new Promise((resolve) => {
                const timeout = setTimeout(resolve, delay);
                abortSignal.addEventListener("abort", () => clearTimeout(timeout), {
                    once: true,
                });
            });
        }
        throw new Error("Polling aborted");
    }, []);
    // Execute a single transaction
    const executeSingleTx = (0, react_1.useCallback)(async (tx, account, completedStatusResults, abortSignal) => {
        if (typeof preparedQuote?.type === "undefined") {
            throw new Error("No quote generated. This is unexpected.");
        }
        const { prepareTransaction } = await Promise.resolve().then(() => require("../../../transaction/prepare-transaction.js"));
        const { sendTransaction } = await Promise.resolve().then(() => require("../../../transaction/actions/send-transaction.js"));
        // Prepare the transaction
        const preparedTx = prepareTransaction({
            chain: tx.chain,
            client: tx.client,
            data: tx.data,
            to: tx.to,
            value: tx.value,
            extraGas: 50000n, // add gas buffer
        });
        // Send the transaction
        const result = await sendTransaction({
            account,
            transaction: preparedTx,
        });
        const hash = result.transactionHash;
        if (tx.action === "approval" || tx.action === "fee") {
            // don't poll status for approval transactions, just wait for confirmation
            await (0, wait_for_tx_receipt_js_1.waitForReceipt)(result);
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Add an extra 2 second delay for RPC to catch up to new state
            return;
        }
        // Poll for completion
        const { status } = await Promise.resolve().then(() => require("../../../bridge/Status.js"));
        await poller(async () => {
            const statusResult = await status({
                chainId: tx.chainId,
                client: tx.client,
                transactionHash: hash,
            });
            if (statusResult.status === "COMPLETED") {
                // Add type field from preparedQuote for discriminated union
                const typedStatusResult = {
                    type: preparedQuote.type,
                    ...statusResult,
                };
                completedStatusResults.push(typedStatusResult);
                return { completed: true };
            }
            if (statusResult.status === "FAILED") {
                throw new Error("Payment failed");
            }
            return { completed: false };
        }, abortSignal);
    }, [poller, preparedQuote?.type]);
    // Execute batch transactions
    const executeBatch = (0, react_1.useCallback)(async (txs, account, completedStatusResults, abortSignal) => {
        if (typeof preparedQuote?.type === "undefined") {
            throw new Error("No quote generated. This is unexpected.");
        }
        if (!account.sendBatchTransaction) {
            throw new Error("Account does not support batch transactions");
        }
        const { prepareTransaction } = await Promise.resolve().then(() => require("../../../transaction/prepare-transaction.js"));
        const { sendBatchTransaction } = await Promise.resolve().then(() => require("../../../transaction/actions/send-batch-transaction.js"));
        // Prepare and convert all transactions
        const serializableTxs = await Promise.all(txs.map(async (tx) => {
            const preparedTx = prepareTransaction({
                chain: tx.chain,
                client: tx.client,
                data: tx.data,
                to: tx.to,
                value: tx.value,
                extraGas: 50000n, // add gas buffer
            });
            return preparedTx;
        }));
        // Send batch
        const result = await sendBatchTransaction({
            account,
            transactions: serializableTxs,
        });
        // Batch transactions return a single receipt, we need to handle this differently
        // For now, we'll assume all transactions in the batch succeed together
        // Poll for the first transaction's completion (representative of the batch)
        if (txs.length === 0) {
            throw new Error("No transactions to batch");
        }
        const firstTx = txs[0];
        if (!firstTx) {
            throw new Error("Invalid batch transaction");
        }
        const { status } = await Promise.resolve().then(() => require("../../../bridge/Status.js"));
        await poller(async () => {
            const statusResult = await status({
                chainId: firstTx.chainId,
                client: firstTx.client,
                transactionHash: result.transactionHash,
            });
            if (statusResult.status === "COMPLETED") {
                // Add type field from preparedQuote for discriminated union
                const typedStatusResult = {
                    type: preparedQuote.type,
                    ...statusResult,
                };
                completedStatusResults.push(typedStatusResult);
                return { completed: true };
            }
            if (statusResult.status === "FAILED") {
                throw new Error("Payment failed");
            }
            return { completed: false };
        }, abortSignal);
    }, [poller, preparedQuote?.type]);
    // Execute batch transactions
    const executeSendCalls = (0, react_1.useCallback)(async (txs, wallet, account, completedStatusResults, abortSignal) => {
        if (typeof preparedQuote?.type === "undefined") {
            throw new Error("No quote generated. This is unexpected.");
        }
        if (!account.sendCalls) {
            throw new Error("Account does not support eip5792 send calls");
        }
        const { prepareTransaction } = await Promise.resolve().then(() => require("../../../transaction/prepare-transaction.js"));
        const { sendCalls } = await Promise.resolve().then(() => require("../../../wallets/eip5792/send-calls.js"));
        if (txs.length === 0) {
            throw new Error("No transactions to batch");
        }
        const firstTx = txs[0];
        if (!firstTx) {
            throw new Error("Invalid batch transaction");
        }
        // Prepare and convert all transactions
        const serializableTxs = await Promise.all(txs.map(async (tx) => {
            const preparedTx = prepareTransaction({
                chain: tx.chain,
                client: tx.client,
                data: tx.data,
                to: tx.to,
                value: tx.value,
                extraGas: 50000n, // add gas buffer
            });
            return preparedTx;
        }));
        // Send batch
        const result = await sendCalls({
            wallet,
            calls: serializableTxs,
        });
        // get tx hash
        const callsStatus = await (0, wait_for_calls_receipt_js_1.waitForCallsReceipt)(result);
        if (callsStatus.status === "failure") {
            throw new Errors_js_1.ApiError({
                code: "UNKNOWN_ERROR",
                message: "Transaction failed. Please try a different payment token or amount.",
                statusCode: 500,
            });
        }
        const lastReceipt = callsStatus.receipts?.[callsStatus.receipts.length - 1];
        if (!lastReceipt) {
            throw new Error("No receipts found");
        }
        const { status } = await Promise.resolve().then(() => require("../../../bridge/Status.js"));
        await poller(async () => {
            const statusResult = await status({
                chainId: firstTx.chainId,
                client: firstTx.client,
                transactionHash: lastReceipt.transactionHash,
            });
            if (statusResult.status === "COMPLETED") {
                // Add type field from preparedQuote for discriminated union
                const typedStatusResult = {
                    type: preparedQuote.type,
                    ...statusResult,
                };
                completedStatusResults.push(typedStatusResult);
                return { completed: true };
            }
            if (statusResult.status === "FAILED") {
                throw new Error("Payment failed");
            }
            return { completed: false };
        }, abortSignal);
    }, [poller, preparedQuote?.type]);
    // Execute onramp step
    const executeOnramp = (0, react_1.useCallback)(async (onrampQuote, completedStatusResults, abortSignal) => {
        setOnrampStatus("executing");
        // Open the payment URL
        windowAdapter.open(onrampQuote.link);
        // Poll for completion using the session ID
        const { Onramp } = await Promise.resolve().then(() => require("../../../bridge/index.js"));
        await poller(async () => {
            const statusResult = await Onramp.status({
                client: client,
                id: onrampQuote.id,
            });
            const status = statusResult.status;
            if (status === "COMPLETED") {
                /*
                 * The occasional race condition can happen where the onramp provider gives us completed status before the token balance has updated in our RPC.
                 * We add this pause so the simulation doesn't fail on the next step.
                 */
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setOnrampStatus("completed");
                // Add type field for discriminated union
                const typedStatusResult = {
                    type: "onramp",
                    ...statusResult,
                };
                completedStatusResults.push(typedStatusResult);
                return { completed: true };
            }
            else if (status === "FAILED") {
                setOnrampStatus("failed");
            }
            return { completed: false };
        }, abortSignal);
    }, [poller, client, windowAdapter]);
    // Main execution function
    const execute = (0, react_1.useCallback)(async () => {
        if (typeof preparedQuote?.type === "undefined") {
            throw new Error("No quote generated. This is unexpected.");
        }
        if (executionState !== "idle") {
            return;
        }
        (0, pay_js_1.trackPayEvent)({
            client,
            event: `ub:ui:execution:start`,
            toChainId: preparedQuote.steps[preparedQuote.steps.length - 1]?.destinationToken
                .chainId,
            toToken: preparedQuote.steps[preparedQuote.steps.length - 1]?.destinationToken
                .address,
            fromToken: preparedQuote.steps[0]?.originToken.address,
            chainId: preparedQuote.steps[0]?.destinationToken.chainId,
            amountWei: preparedQuote.steps[0]?.originAmount?.toString(),
            walletAddress: wallet?.getAccount()?.address,
            walletType: wallet?.id,
        });
        setExecutionState("executing");
        setError(undefined);
        const completedStatusResults = [];
        // Create new abort controller
        const abortController = new AbortController();
        abortControllerRef.current = abortController;
        try {
            if (flatTxs.length > 0 && !wallet) {
                throw new Errors_js_1.ApiError({
                    code: "INVALID_INPUT",
                    message: "No wallet provided to execute transactions",
                    statusCode: 400,
                });
            }
            // Execute onramp first if configured and not already completed
            if (preparedQuote.type === "onramp" && onrampStatus === "pending") {
                await executeOnramp(preparedQuote, completedStatusResults, abortController.signal);
            }
            if (flatTxs.length > 0) {
                // Then execute transactions
                if (!wallet) {
                    throw new Errors_js_1.ApiError({
                        code: "INVALID_INPUT",
                        message: "No wallet provided to execute transactions",
                        statusCode: 400,
                    });
                }
                const account = wallet.getAccount();
                if (!account) {
                    throw new Errors_js_1.ApiError({
                        code: "INVALID_INPUT",
                        message: "Wallet not connected",
                        statusCode: 400,
                    });
                }
                // Start from where we left off, or from the beginning
                const startIndex = currentTxIndex ?? 0;
                for (let i = startIndex; i < flatTxs.length; i++) {
                    if (abortController.signal.aborted) {
                        break;
                    }
                    const currentTx = flatTxs[i];
                    if (!currentTx) {
                        continue; // Skip invalid index
                    }
                    setCurrentTxIndex(i);
                    const currentStepData = preparedQuote.steps[currentTx._stepIndex];
                    if (!currentStepData) {
                        throw new Error(`Invalid step index: ${currentTx._stepIndex}`);
                    }
                    // switch chain if needed
                    if (currentTx.chainId !== wallet.getChain()?.id) {
                        await wallet.switchChain((0, utils_js_1.getCachedChain)(currentTx.chainId));
                    }
                    // Check if we can batch transactions
                    const canSendCalls = (await supportsAtomic(account, currentTx.chainId)) &&
                        i < flatTxs.length - 1; // Not the last transaction;
                    const canBatch = account.sendBatchTransaction !== undefined &&
                        i < flatTxs.length - 1; // Not the last transaction
                    if (canBatch || canSendCalls) {
                        // Find consecutive transactions on the same chain
                        const batchTxs = [currentTx];
                        let j = i + 1;
                        while (j < flatTxs.length) {
                            const nextTx = flatTxs[j];
                            if (!nextTx || nextTx.chainId !== currentTx.chainId) {
                                break;
                            }
                            batchTxs.push(nextTx);
                            j++;
                        }
                        // Execute batch if we have multiple transactions
                        if (batchTxs.length > 1) {
                            // prefer batching if supported
                            if (canBatch) {
                                await executeBatch(batchTxs, account, completedStatusResults, abortController.signal);
                            }
                            else if (canSendCalls) {
                                await executeSendCalls(batchTxs, wallet, account, completedStatusResults, abortController.signal);
                            }
                            else {
                                // should never happen
                                throw new Error("No supported execution mode found");
                            }
                            // Mark all batched transactions as completed
                            for (const tx of batchTxs) {
                                setCompletedTxs((prev) => new Set(prev).add(tx._index));
                            }
                            // Skip ahead
                            i = j - 1;
                            continue;
                        }
                    }
                    // Execute single transaction
                    await executeSingleTx(currentTx, account, completedStatusResults, abortController.signal);
                    // Mark transaction as completed
                    setCompletedTxs((prev) => new Set(prev).add(currentTx._index));
                }
            }
            // All done - check if we actually completed everything
            if (!abortController.signal.aborted) {
                setCurrentTxIndex(undefined);
                // Call completion callback with all completed status results
                if (onComplete) {
                    onComplete(completedStatusResults);
                }
                (0, pay_js_1.trackPayEvent)({
                    client,
                    event: `ub:ui:execution:success`,
                    toChainId: preparedQuote.steps[preparedQuote.steps.length - 1]
                        ?.destinationToken.chainId,
                    toToken: preparedQuote.steps[preparedQuote.steps.length - 1]
                        ?.destinationToken.address,
                    fromToken: preparedQuote.steps[0]?.originToken.address,
                    chainId: preparedQuote.steps[0]?.destinationToken.chainId,
                    amountWei: preparedQuote.steps[0]?.originAmount?.toString(),
                    walletAddress: wallet?.getAccount()?.address,
                    walletType: wallet?.id,
                });
            }
        }
        catch (err) {
            console.error("Error executing payment", err);
            (0, pay_js_1.trackPayEvent)({
                client,
                error: err instanceof Error ? err.message : (0, json_js_1.stringify)(err),
                event: `ub:ui:execution:error`,
                toChainId: preparedQuote.steps[preparedQuote.steps.length - 1]?.destinationToken
                    .chainId,
                toToken: preparedQuote.steps[preparedQuote.steps.length - 1]?.destinationToken
                    .address,
                fromToken: preparedQuote.steps[0]?.originToken.address,
                chainId: preparedQuote.steps[0]?.destinationToken.chainId,
                amountWei: preparedQuote.steps[0]?.originAmount?.toString(),
                walletAddress: wallet?.getAccount()?.address,
                walletType: wallet?.id,
            });
            if (err instanceof Errors_js_1.ApiError) {
                setError(err);
            }
            else {
                setError(new Errors_js_1.ApiError({
                    code: "UNKNOWN_ERROR",
                    message: err?.message || "An unknown error occurred",
                    statusCode: 500,
                }));
            }
        }
        finally {
            setExecutionState("idle");
            abortControllerRef.current = null;
        }
    }, [
        executionState,
        wallet,
        currentTxIndex,
        flatTxs,
        executeSingleTx,
        executeBatch,
        executeSendCalls,
        onrampStatus,
        executeOnramp,
        onComplete,
        preparedQuote,
        client,
    ]);
    // Start execution
    const start = (0, react_1.useCallback)(() => {
        if (executionState === "idle") {
            execute();
        }
    }, [execute, executionState]);
    // Cancel execution
    const cancel = (0, react_1.useCallback)(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        setExecutionState("idle");
        if (onrampStatus === "executing") {
            setOnrampStatus("pending");
        }
    }, [onrampStatus]);
    // Retry from failed transaction
    const retry = (0, react_1.useCallback)(() => {
        if (error) {
            setError(undefined);
            execute();
        }
    }, [error, execute]);
    const hasInitialized = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        if (autoStart &&
            executionState === "idle" &&
            currentTxIndex === undefined &&
            !hasInitialized.current) {
            hasInitialized.current = true;
            setExecutionState("auto-starting");
            // add a delay to ensure the UI is ready
            setTimeout(() => {
                start();
            }, 500);
        }
    }, [autoStart, executionState, currentTxIndex, start]);
    // Cleanup on unmount
    (0, react_1.useEffect)(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);
    return {
        cancel,
        currentStep,
        currentTxIndex,
        error,
        executionState,
        onrampStatus,
        progress,
        retry,
        start,
        steps: preparedQuote?.steps,
    };
}
// Cache for supportsAtomic results, keyed by `${accountAddress}_${chainId}`
const supportsAtomicCache = new Map();
async function supportsAtomic(account, chainId) {
    const cacheKey = `${account.address}_${chainId}`;
    const cached = supportsAtomicCache.get(cacheKey);
    if (cached !== undefined) {
        return cached;
    }
    const capabilitiesFn = account.getCapabilities;
    if (!capabilitiesFn) {
        supportsAtomicCache.set(cacheKey, false);
        return false;
    }
    try {
        // 5s max timeout for capabilities fetch
        const capabilities = await Promise.race([
            capabilitiesFn({ chainId }),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000)),
        ]);
        const atomic = capabilities[chainId]?.atomic;
        const result = atomic?.status === "supported" || atomic?.status === "ready";
        supportsAtomicCache.set(cacheKey, result);
        return result;
    }
    catch (error) {
        // Timeout or error fetching capabilities, assume not supported, but dont cache the result
        return false;
    }
}
//# sourceMappingURL=useStepExecutor.js.map