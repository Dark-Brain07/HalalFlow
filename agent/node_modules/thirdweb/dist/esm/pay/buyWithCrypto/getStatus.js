import { status as bridgeStatus } from "../../bridge/index.js";
import { toTokens } from "../../utils/units.js";
/**
 * Gets the status of a buy with crypto transaction
 * @param buyWithCryptoTransaction - Object of type [`BuyWithCryptoTransaction`](https://portal.thirdweb.com/references/typescript/v5/BuyWithCryptoTransaction)
 * @example
 *
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { getBuyWithCryptoStatus, getBuyWithCryptoQuote } from "thirdweb/pay";
 *
 * // get a quote between two tokens
 * const quote = await getBuyWithCryptoQuote(quoteParams);
 *
 * // if approval is required, send the approval transaction
 * if (quote.approval) {
 *  const txResult = await sendTransaction({
 *    transaction: quote.approval,
 *    account: account, // account from connected wallet
 *  });
 *
 *  await waitForReceipt(txResult);
 * }
 *
 * // send the quoted transaction
 * const swapTxResult = await sendTransaction({
 *    transaction: quote.transactionRequest,
 *    account: account, // account from connected wallet
 *  });
 *
 * await waitForReceipt(swapTxResult);
 *
 * // keep polling the status of the quoted transaction until it returns a success or failure status
 * const status = await getBuyWithCryptoStatus({
 *    client,
 *    transactionHash: swapTxResult.transactionHash,
 * }});
 * ```
 * @returns Object of type [`BuyWithCryptoStatus`](https://portal.thirdweb.com/references/typescript/v5/BuyWithCryptoStatus)
 * @deprecated use Bridge.status instead
 * @buyCrypto
 */
export async function getBuyWithCryptoStatus(buyWithCryptoTransaction) {
    try {
        if (!buyWithCryptoTransaction.transactionHash) {
            throw new Error("Transaction hash is required");
        }
        const result = await bridgeStatus({
            chainId: buyWithCryptoTransaction.chainId,
            client: buyWithCryptoTransaction.client,
            transactionHash: buyWithCryptoTransaction.transactionHash,
        });
        switch (result.status) {
            case "COMPLETED": {
                const originTransaction = result.transactions?.find((tx) => tx.chainId === buyWithCryptoTransaction.chainId);
                const destinationTransaction = result.transactions?.find((tx) => tx.chainId !== buyWithCryptoTransaction.chainId);
                return toBuyWithCryptoStatus({
                    destinationAmount: result.destinationAmount,
                    destinationChainId: result.destinationChainId,
                    destinationToken: result.destinationToken,
                    destinationTokenAddress: result.destinationTokenAddress,
                    destinationTransaction,
                    originAmount: result.originAmount,
                    originChainId: result.originChainId,
                    originToken: result.originToken,
                    originTokenAddress: result.originTokenAddress,
                    originTransaction,
                    paymentId: result.paymentId,
                    purchaseData: result.purchaseData,
                    receiver: result.receiver,
                    sender: result.sender,
                    status: result.status,
                });
            }
            case "PENDING": {
                return toBuyWithCryptoStatus({
                    destinationChainId: result.destinationChainId,
                    destinationToken: result.destinationToken,
                    destinationTokenAddress: result.destinationTokenAddress,
                    originAmount: result.originAmount,
                    originChainId: result.originChainId,
                    originToken: result.originToken,
                    originTokenAddress: result.originTokenAddress,
                    paymentId: result.paymentId,
                    purchaseData: result.purchaseData,
                    receiver: result.receiver,
                    sender: result.sender,
                    status: result.status,
                });
            }
            case "FAILED": {
                const originTransaction = result.transactions?.find((tx) => tx.chainId === buyWithCryptoTransaction.chainId);
                const destinationTransaction = result.transactions?.find((tx) => tx.chainId !== buyWithCryptoTransaction.chainId);
                return toBuyWithCryptoStatus({
                    destinationChainId: 0,
                    destinationToken: undefined,
                    destinationTokenAddress: "", // TODO: get from API
                    destinationTransaction, // TODO: get from API
                    originAmount: BigInt(0), // TODO: get from API
                    originChainId: 0, // TODO: get from API
                    originToken: undefined, // TODO: get from API
                    originTokenAddress: "",
                    originTransaction,
                    paymentId: "",
                    purchaseData: result.purchaseData,
                    receiver: "",
                    sender: "",
                    status: result.status,
                });
            }
            default: {
                return {
                    status: "NOT_FOUND",
                };
            }
        }
    }
    catch (error) {
        console.error("Fetch error:", error);
        throw new Error(`Fetch failed: ${error}`);
    }
}
function toBuyWithCryptoStatus(args) {
    const { originTransaction, destinationTransaction, status, purchaseData, originAmount, destinationAmount, originTokenAddress, destinationTokenAddress, originChainId, destinationChainId, sender, receiver, originToken, destinationToken, } = args;
    return {
        bridge: "STARPORT",
        destination: {
            amount: destinationToken
                ? toTokens(destinationAmount ?? BigInt(0), destinationToken.decimals).toString()
                : "",
            amountUSDCents: 0,
            amountWei: destinationAmount?.toString() ?? "",
            completedAt: new Date().toISOString(),
            explorerLink: "",
            token: {
                chainId: destinationChainId,
                decimals: destinationToken?.decimals ?? 18,
                name: destinationToken?.name ?? "",
                priceUSDCents: 0,
                symbol: destinationToken?.symbol ?? "",
                tokenAddress: destinationTokenAddress,
            },
            transactionHash: destinationTransaction?.transactionHash ?? "",
        },
        fromAddress: sender,
        purchaseData: purchaseData,
        quote: {
            createdAt: new Date().toISOString(),
            estimated: {
                durationSeconds: 0,
                feesUSDCents: 0,
                fromAmountUSDCents: 0,
                gasCostUSDCents: 0,
                slippageBPS: 0,
                toAmountMinUSDCents: 0,
                toAmountUSDCents: 0,
            },
            fromAmount: originToken
                ? toTokens(originAmount, originToken.decimals).toString()
                : "",
            fromAmountWei: originAmount.toString(),
            fromToken: {
                chainId: originChainId,
                decimals: originToken?.decimals ?? 18,
                name: originToken?.name ?? "",
                priceUSDCents: 0,
                symbol: originToken?.symbol ?? "",
                tokenAddress: originTokenAddress,
            },
            toAmount: destinationToken && destinationAmount
                ? toTokens(destinationAmount, destinationToken.decimals).toString()
                : "",
            toAmountMin: destinationToken
                ? toTokens(destinationAmount ?? BigInt(0), destinationToken.decimals).toString()
                : "",
            toAmountMinWei: destinationAmount ? destinationAmount.toString() : "",
            toAmountWei: destinationAmount ? destinationAmount.toString() : "",
            toToken: {
                chainId: destinationChainId,
                decimals: destinationToken?.decimals ?? 18,
                name: destinationToken?.name ?? "",
                priceUSDCents: 0,
                symbol: destinationToken?.symbol ?? "",
                tokenAddress: destinationTokenAddress,
            },
        },
        source: {
            amount: originToken
                ? toTokens(originAmount, originToken.decimals).toString()
                : "",
            amountUSDCents: 0,
            amountWei: originAmount.toString(),
            completedAt: new Date().toISOString(),
            explorerLink: "",
            token: {
                chainId: originChainId,
                decimals: originToken?.decimals ?? 18,
                name: originToken?.name ?? "",
                priceUSDCents: 0,
                symbol: originToken?.symbol ?? "",
                tokenAddress: originTokenAddress,
            },
            transactionHash: originTransaction?.transactionHash ?? "",
        },
        status: status,
        subStatus: status === "COMPLETED" ? "SUCCESS" : "NONE",
        swapType: originTransaction?.chainId === destinationTransaction?.chainId
            ? "SAME_CHAIN"
            : "CROSS_CHAIN",
        toAddress: receiver,
    };
}
//# sourceMappingURL=getStatus.js.map