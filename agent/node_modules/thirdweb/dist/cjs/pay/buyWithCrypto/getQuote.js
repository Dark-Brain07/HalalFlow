"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuyWithCryptoQuote = getBuyWithCryptoQuote;
const ox_1 = require("ox");
const ox__AbiFunction = require("ox/AbiFunction");
const Bridge = require("../../bridge/index.js");
const utils_js_1 = require("../../chains/utils.js");
const addresses_js_1 = require("../../constants/addresses.js");
const contract_js_1 = require("../../contract/contract.js");
const decimals_js_1 = require("../../extensions/erc20/read/decimals.js");
/**
 * Get a quote of type [`BuyWithCryptoQuote`](https://portal.thirdweb.com/references/typescript/v5/BuyWithCryptoQuote) to buy any given token with crypto.
 * This quote contains the information about the swap such as token amounts, processing fees, estimated time etc.
 *
 * Once you have the quote, you can use `prepareTransaction` and prepare the transaction for submission.
 * @param params - object of type [`GetBuyWithCryptoQuoteParams`](https://portal.thirdweb.com/references/typescript/v5/GetBuyWithCryptoQuoteParams)
 * @returns Object of type [`BuyWithCryptoQuote`](https://portal.thirdweb.com/references/typescript/v5/BuyWithCryptoQuote) which contains the information about the quote such as processing fees, estimated time, converted token amounts, etc.
 * @example
 *
 * ```ts
 * import { getBuyWithCryptoQuote } from "thirdweb/pay";
 *
 * const quote = await getBuyWithCryptoQuote({
 *  client,
 *  fromAddress: "0x...", // wallet address
 *  fromChainId: 137, // chain id of the source token
 *  fromTokenAddress: "0x...", // token address of the source token
 *  fromAmount: "10", // amount of source token to swap
 *  // optionally, you can use `toAmount` instead if you only want a certain amount of destination token
 *  toChainId: 10, // chain id of the destination token
 *  toTokenAddress: "0x...", // token address of the destination token
 *  toAddress: "0x...", // optional: send the tokens to a different address
 *  maxSlippageBPS: 50, // optional: max 0.5% slippage
 * });
 * ```
 * @deprecated
 * @buyCrypto
 */
async function getBuyWithCryptoQuote(params) {
    try {
        const quote = await (async () => {
            if (params.toAmount) {
                const destinationTokenContract = (0, contract_js_1.getContract)({
                    address: params.toTokenAddress,
                    chain: (0, utils_js_1.getCachedChain)(params.toChainId),
                    client: params.client,
                });
                const tokenDecimals = destinationTokenContract.address.toLowerCase() ===
                    addresses_js_1.NATIVE_TOKEN_ADDRESS
                    ? 18
                    : await (0, decimals_js_1.decimals)({
                        contract: destinationTokenContract,
                    });
                const amount = ox_1.Value.from(params.toAmount, tokenDecimals);
                return Bridge.Buy.prepare({
                    amount: amount,
                    client: params.client,
                    destinationChainId: params.toChainId,
                    destinationTokenAddress: params.toTokenAddress,
                    originChainId: params.fromChainId,
                    originTokenAddress: params.fromTokenAddress,
                    paymentLinkId: params.paymentLinkId,
                    purchaseData: params.purchaseData,
                    receiver: params.toAddress,
                    sender: params.fromAddress,
                });
            }
            else if (params.fromAmount) {
                const originTokenContract = (0, contract_js_1.getContract)({
                    address: params.fromTokenAddress,
                    chain: (0, utils_js_1.getCachedChain)(params.fromChainId),
                    client: params.client,
                });
                const tokenDecimals = await (0, decimals_js_1.decimals)({
                    contract: originTokenContract,
                });
                const amount = ox_1.Value.from(params.fromAmount, tokenDecimals);
                return Bridge.Sell.prepare({
                    amount: amount,
                    client: params.client,
                    destinationChainId: params.toChainId,
                    destinationTokenAddress: params.toTokenAddress,
                    originChainId: params.fromChainId,
                    originTokenAddress: params.fromTokenAddress,
                    paymentLinkId: params.paymentLinkId,
                    purchaseData: params.purchaseData,
                    receiver: params.toAddress,
                    sender: params.fromAddress,
                });
            }
            throw new Error("Invalid quote request, must provide either `fromAmount` or `toAmount`");
        })();
        // check if the fromAddress already has approval for the given amount
        const firstStep = quote.steps[0];
        if (!firstStep) {
            throw new Error("This quote is incompatible with getBuyWithCryptoQuote. Please use Bridge.Buy.prepare instead.");
        }
        const approvalTxs = firstStep.transactions.filter((tx) => tx.action === "approval");
        if (approvalTxs.length > 1) {
            throw new Error("This quote is incompatible with getBuyWithCryptoQuote. Please use Bridge.Buy.prepare instead.");
        }
        const approvalTx = approvalTxs[0];
        const txs = firstStep.transactions.filter((tx) => tx.action !== "approval");
        if (txs.length > 1) {
            throw new Error("This quote is incompatible with getBuyWithCryptoQuote. Please use Bridge.Buy.prepare instead.");
        }
        const tx = txs[0];
        if (!tx) {
            throw new Error("This quote is incompatible with getBuyWithCryptoQuote. Please use Bridge.Buy.prepare instead.");
        }
        let approvalData;
        if (approvalTx) {
            const abiFunction = ox__AbiFunction.from([
                "function approve(address spender, uint256 amount)",
            ]);
            const [spender, amount] = ox__AbiFunction.decodeData(abiFunction, approvalTx.data);
            approvalData = {
                amountWei: amount.toString(),
                chainId: firstStep.originToken.chainId,
                spenderAddress: spender,
                tokenAddress: firstStep.originToken.address,
            };
        }
        const swapRoute = {
            approvalData,
            client: params.client,
            paymentTokens: [
                {
                    amount: ox_1.Value.format(quote.originAmount, firstStep.originToken.decimals).toString(),
                    amountUSDCents: Number(ox_1.Value.format(quote.originAmount, firstStep.originToken.decimals)) *
                        (firstStep.originToken.prices.USD || 0) *
                        100,
                    amountWei: quote.originAmount.toString(),
                    token: {
                        chainId: firstStep.originToken.chainId,
                        decimals: firstStep.originToken.decimals,
                        name: firstStep.originToken.name,
                        priceUSDCents: (firstStep.originToken.prices.USD || 0) * 100,
                        symbol: firstStep.originToken.symbol,
                        tokenAddress: firstStep.originToken.address,
                    },
                },
            ],
            // TODO (UB): add develope and platform fees in API
            processingFees: [
                {
                    amount: "0",
                    amountUSDCents: 0,
                    amountWei: "0",
                    token: {
                        chainId: firstStep.originToken.chainId,
                        decimals: firstStep.originToken.decimals,
                        name: firstStep.originToken.name,
                        priceUSDCents: (firstStep.originToken.prices.USD || 0) * 100,
                        symbol: firstStep.originToken.symbol,
                        tokenAddress: firstStep.originToken.address,
                    },
                },
            ],
            swapDetails: {
                estimated: {
                    durationSeconds: firstStep.estimatedExecutionTimeMs / 1000,
                    feesUSDCents: 0,
                    fromAmountUSDCents: Number(ox_1.Value.format(quote.originAmount, firstStep.originToken.decimals)) *
                        (firstStep.originToken.prices.USD || 0) *
                        100,
                    gasCostUSDCents: 0,
                    slippageBPS: 0,
                    toAmountMinUSDCents: Number(ox_1.Value.format(quote.destinationAmount, firstStep.destinationToken.decimals)) *
                        (firstStep.destinationToken.prices.USD || 0) *
                        100,
                    toAmountUSDCents: Number(ox_1.Value.format(quote.destinationAmount, firstStep.destinationToken.decimals)) *
                        (firstStep.destinationToken.prices.USD || 0) *
                        100,
                },
                fromAddress: quote.intent.sender,
                fromAmount: ox_1.Value.format(quote.originAmount, firstStep.originToken.decimals).toString(),
                fromAmountWei: quote.originAmount.toString(),
                fromToken: {
                    chainId: firstStep.originToken.chainId,
                    decimals: firstStep.originToken.decimals,
                    name: firstStep.originToken.name,
                    priceUSDCents: (firstStep.originToken.prices.USD || 0) * 100,
                    symbol: firstStep.originToken.symbol,
                    tokenAddress: firstStep.originToken.address,
                },
                maxSlippageBPS: 0,
                toAddress: quote.intent.receiver,
                toAmount: ox_1.Value.format(quote.destinationAmount, firstStep.destinationToken.decimals).toString(),
                toAmountMin: ox_1.Value.format(quote.destinationAmount, firstStep.destinationToken.decimals).toString(),
                toAmountMinWei: quote.destinationAmount.toString(),
                toAmountWei: quote.destinationAmount.toString(),
                toToken: {
                    chainId: firstStep.destinationToken.chainId,
                    decimals: firstStep.destinationToken.decimals,
                    name: firstStep.destinationToken.name,
                    priceUSDCents: (firstStep.destinationToken.prices.USD || 0) * 100,
                    symbol: firstStep.destinationToken.symbol,
                    tokenAddress: firstStep.destinationToken.address,
                },
            },
            transactionRequest: {
                ...tx,
                extraGas: 50000n, // extra gas buffer
            },
        };
        return swapRoute;
    }
    catch (error) {
        console.error("Error getting buy with crypto quote", error);
        throw error;
    }
}
//# sourceMappingURL=getQuote.js.map