"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverWallet = serverWallet;
const engine_1 = require("@thirdweb-dev/engine");
const encode_js_1 = require("../transaction/actions/encode.js");
const to_serializable_transaction_js_1 = require("../transaction/actions/to-serializable-transaction.js");
const domains_js_1 = require("../utils/domains.js");
const hex_js_1 = require("../utils/encoding/hex.js");
const fetch_js_1 = require("../utils/fetch.js");
const json_js_1 = require("../utils/json.js");
const resolve_promised_value_js_1 = require("../utils/promise/resolve-promised-value.js");
const wait_for_tx_hash_js_1 = require("./wait-for-tx-hash.js");
/**
 * Use a server wallet for sending transactions and signing messages via engine (v3+).
 * @param options - The server wallet options.
 * @returns An account object that can be used to send transactions and sign messages.
 * @engine
 * @example
 * ### Creating a server wallet
 * ```ts
 * import { Engine } from "thirdweb";
 *
 * const client = createThirdwebClient({
 *   secretKey: "<your-project-secret-key>",
 * });
 *
 * const myServerWallet = Engine.serverWallet({
 *   client,
 *   address: "<your-server-wallet-address>",
 * });
 * ```
 *
 * ### Sending a transaction
 * ```ts
 * // prepare the transaction
 * const transaction = claimTo({
 *   contract,
 *   to: "0x...",
 *   quantity: 1n,
 * });
 *
 * // enqueue the transaction
 * const { transactionId } = await myServerWallet.enqueueTransaction({
 *   transaction,
 * });
 * ```
 *
 * ### Polling for the transaction to be submitted onchain
 * ```ts
 * // optionally poll for the transaction to be submitted onchain
 * const { transactionHash } = await Engine.waitForTransactionHash({
 *   client,
 *   transactionId,
 * });
 * console.log("Transaction sent:", transactionHash);
 * ```
 *
 *  ### Sending a batch of transactions
 * ```ts
 * // prepare the transactions
 * const transaction1 = claimTo({
 *   contract,
 *   to: firstRecipient,
 *   quantity: 1n,
 * });
 * const transaction2 = claimTo({
 *   contract,
 *   to: secondRecipient,
 *   quantity: 1n,
 * });
 *
 *
 * // enqueue the transactions in a batch
 * const { transactionId } = await myServerWallet.enqueueBatchTransaction({
 *   transactions: [transaction1, transaction2],
 * });
 * ```
 *
 * ### Polling for the batch of transactions to be submitted onchain
 * ```ts
 * // optionally poll for the transaction to be submitted onchain
 * const { transactionHash } = await Engine.waitForTransactionHash({
 *   client,
 *   transactionId,
 * });
 * console.log("Transaction sent:", transactionHash);
 * ```
 *
 * ### Getting the execution status of a transaction
 * ```ts
 * const executionResult = await Engine.getTransactionStatus({
 *   client,
 *   transactionId,
 * });
 * console.log("Transaction status:", executionResult.status);
 * ```
 */
function serverWallet(options) {
    const { client, vaultAccessToken, address, chain, executionOptions } = options;
    const headers = vaultAccessToken
        ? {
            "x-vault-access-token": vaultAccessToken,
        }
        : {};
    const getExecutionOptionsWithChainId = (chainId) => {
        if (!executionOptions) {
            return {
                chainId,
                from: address,
                type: "auto",
            };
        }
        switch (executionOptions.type) {
            case "auto":
                return {
                    chainId,
                    from: address,
                    type: "auto",
                };
            case "ERC4337":
                return {
                    ...executionOptions,
                    chainId,
                    type: "ERC4337",
                };
            case "EOA":
                return {
                    chainId,
                    from: address,
                    type: "EOA",
                };
            case "EIP7702":
                return {
                    ...executionOptions,
                    chainId,
                    type: "EIP7702",
                };
        }
    };
    const getSigningOptions = (chainId) => {
        // if no chainId passed specifically for this signature
        // we HAVE TO fallback to EOA signature
        if (!chainId) {
            return {
                from: address,
                type: "EOA",
            };
        }
        if (!executionOptions) {
            return {
                chainId,
                from: address,
                type: "auto",
            };
        }
        switch (executionOptions.type) {
            case "ERC4337": {
                return {
                    chainId,
                    ...executionOptions,
                    type: "ERC4337",
                };
            }
            case "auto": {
                return {
                    chainId,
                    from: address,
                    type: "auto",
                };
            }
            case "EIP7702":
            case "EOA": {
                return {
                    chainId,
                    from: address,
                    type: "EOA",
                };
            }
        }
    };
    const enqueueTx = async (transaction) => {
        if (transaction.length === 0) {
            throw new Error("No transactions to enqueue");
        }
        const firstTransaction = transaction[0];
        if (!firstTransaction) {
            throw new Error("No transactions to enqueue");
        }
        const chainId = firstTransaction.chainId;
        // Validate all transactions are on the same chain
        for (let i = 1; i < transaction.length; i++) {
            if (transaction[i]?.chainId !== chainId) {
                throw new Error(`All transactions in batch must be on the same chain. Expected ${chainId}, got ${transaction[i]?.chainId} at index ${i}`);
            }
        }
        const body = {
            executionOptions: getExecutionOptionsWithChainId(chainId),
            params: transaction.map((t) => ({
                data: t.data,
                to: t.to,
                gasLimit: t.gas ? Number(t.gas) : undefined,
                value: t.value?.toString(),
            })),
        };
        const result = await (0, engine_1.sendTransaction)({
            baseUrl: (0, domains_js_1.getThirdwebBaseUrl)("engineCloud"),
            body,
            bodySerializer: json_js_1.stringify,
            fetch: (0, fetch_js_1.getClientFetch)(client),
            headers,
        });
        if (result.error) {
            throw new Error(`Error sending transaction: ${(0, json_js_1.stringify)(result.error)}`);
        }
        const data = result.data?.result;
        if (!data) {
            throw new Error("No data returned from engine");
        }
        return data.transactions.map((t) => t.id);
    };
    const getAddress = () => {
        if (executionOptions?.type === "ERC4337" &&
            executionOptions.smartAccountAddress) {
            return executionOptions.smartAccountAddress;
        }
        return address;
    };
    return {
        address: getAddress(),
        enqueueBatchTransaction: async (args) => {
            const serializedTransactions = [];
            for (const transaction of args.transactions) {
                const [to, data, value] = await Promise.all([
                    transaction.to ? (0, resolve_promised_value_js_1.resolvePromisedValue)(transaction.to) : null,
                    (0, encode_js_1.encode)(transaction),
                    transaction.value ? (0, resolve_promised_value_js_1.resolvePromisedValue)(transaction.value) : null,
                ]);
                serializedTransactions.push({
                    chainId: transaction.chain.id,
                    data,
                    to: to ?? undefined,
                    value: value ?? undefined,
                });
            }
            const transactionIds = await enqueueTx(serializedTransactions);
            const transactionId = transactionIds[0];
            if (!transactionId) {
                throw new Error("No transactionId returned from engine");
            }
            return { transactionId };
        },
        enqueueTransaction: async (args) => {
            let serializedTransaction;
            if (args.simulate) {
                serializedTransaction = await (0, to_serializable_transaction_js_1.toSerializableTransaction)({
                    transaction: args.transaction,
                    from: address,
                });
            }
            else {
                const [to, data, value] = await Promise.all([
                    args.transaction.to
                        ? (0, resolve_promised_value_js_1.resolvePromisedValue)(args.transaction.to)
                        : null,
                    (0, encode_js_1.encode)(args.transaction),
                    args.transaction.value
                        ? (0, resolve_promised_value_js_1.resolvePromisedValue)(args.transaction.value)
                        : null,
                ]);
                serializedTransaction = {
                    chainId: args.transaction.chain.id,
                    data,
                    to: to ?? undefined,
                    value: value ?? undefined,
                };
            }
            const transactionIds = await enqueueTx([serializedTransaction]);
            const transactionId = transactionIds[0];
            if (!transactionId) {
                throw new Error("No transactionId returned from engine");
            }
            return { transactionId };
        },
        sendBatchTransaction: async (transactions) => {
            const transactionIds = await enqueueTx(transactions);
            const transactionId = transactionIds[0];
            if (!transactionId) {
                throw new Error("No transactionId returned from engine");
            }
            return (0, wait_for_tx_hash_js_1.waitForTransactionHash)({
                client,
                transactionId,
            });
        },
        sendTransaction: async (transaction) => {
            const transactionIds = await enqueueTx([transaction]);
            const transactionId = transactionIds[0];
            if (!transactionId) {
                throw new Error("No transactionId returned from engine");
            }
            return (0, wait_for_tx_hash_js_1.waitForTransactionHash)({
                client,
                transactionId,
            });
        },
        signMessage: async (data) => {
            const { message, chainId } = data;
            let engineMessage;
            let isBytes = false;
            if (typeof message === "string") {
                engineMessage = message;
            }
            else {
                engineMessage = (0, hex_js_1.toHex)(message.raw);
                isBytes = true;
            }
            const signingChainId = chainId || chain?.id;
            if (!signingChainId) {
                throw new Error("Chain ID is required for signing messages");
            }
            const signResult = await (0, engine_1.signMessage)({
                baseUrl: (0, domains_js_1.getThirdwebBaseUrl)("engineCloud"),
                body: {
                    params: [
                        {
                            format: isBytes ? "hex" : "text",
                            message: engineMessage,
                        },
                    ],
                    signingOptions: getSigningOptions(signingChainId),
                },
                bodySerializer: json_js_1.stringify,
                fetch: (0, fetch_js_1.getClientFetch)(client),
                headers,
            });
            if (signResult.error) {
                throw new Error(`Error signing message: ${(0, json_js_1.stringify)(signResult.error)}`);
            }
            const signatureResult = signResult.data?.result[0];
            if (signatureResult && (0, engine_1.isSuccessResponse)(signatureResult)) {
                return signatureResult.result.signature;
            }
            throw new Error(`Failed to sign message: ${(0, json_js_1.stringify)(signatureResult?.error) || "Unknown error"}`);
        },
        signTypedData: async (typedData) => {
            const signingChainId = chain?.id;
            if (!signingChainId) {
                throw new Error("Chain ID is required for signing messages");
            }
            const signResult = await (0, engine_1.signTypedData)({
                baseUrl: (0, domains_js_1.getThirdwebBaseUrl)("engineCloud"),
                body: {
                    // biome-ignore lint/suspicious/noExplicitAny: TODO: fix ts / hey-api type clash
                    params: [typedData],
                    signingOptions: getSigningOptions(signingChainId),
                },
                bodySerializer: json_js_1.stringify,
                fetch: (0, fetch_js_1.getClientFetch)(client),
                headers,
            });
            if (signResult.error) {
                throw new Error(`Error signing message: ${(0, json_js_1.stringify)(signResult.error)}`);
            }
            const signatureResult = signResult.data?.result[0];
            if (signatureResult && (0, engine_1.isSuccessResponse)(signatureResult)) {
                return signatureResult.result.signature;
            }
            throw new Error(`Failed to sign message: ${(0, json_js_1.stringify)(signatureResult?.error) || "Unknown error"}`);
        },
    };
}
//# sourceMappingURL=server-wallet.js.map