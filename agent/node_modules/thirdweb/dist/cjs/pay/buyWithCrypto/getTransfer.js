"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuyWithCryptoTransfer = getBuyWithCryptoTransfer;
const ox_1 = require("ox");
const ox__AbiFunction = require("ox/AbiFunction");
const index_js_1 = require("../../bridge/index.js");
const utils_js_1 = require("../../chains/utils.js");
const addresses_js_1 = require("../../constants/addresses.js");
const contract_js_1 = require("../../contract/contract.js");
const decimals_js_1 = require("../../extensions/erc20/read/decimals.js");
/**
 * Get a quote of type [`BuyWithCryptoTransfer`](https://portal.thirdweb.com/references/typescript/v5/BuyWithCryptoTransfer) to facilitate a token transfer transaction.
 * Using this instead of a native transfer allows you to receive status and webhooks about successful or failed payments.
 *
 * Once you have the quote, you can use `prepareTransaction` and prepare the transaction for submission.
 * @param params - object of type [`GetBuyWithCryptoTransferParams`](https://portal.thirdweb.com/references/typescript/v5/GetBuyWithCryptoTransferParams)
 * @returns Object of type [`BuyWithCryptoTransfer`](https://portal.thirdweb.com/references/typescript/v5/BuyWithCryptoTransfer) which contains the information about the transfer
 * @example
 *
 * ```ts
 * import { getBuyWithCryptoTransfer } from "thirdweb/pay";
 *
 * const transfer = await getBuyWithCryptoTransfer({
 *  client,
 *  fromAddress: "0x...", // wallet address
 *  toAddress: "0x...", // recipient address - likely to be your wallet
 *  chainId: 10, // chain id of the token
 *  tokenAddress: "0x...", // address of the token
 *  amount: "10", // amount of token to transfer
 *  purchaseData: {  // any metadata for you to attribute this purchase
 *    "customerId": "yourId"
 *  }
 * });
 * ```
 * @deprecated
 * @buyCrypto
 */
async function getBuyWithCryptoTransfer(params) {
    try {
        const tokenContract = (0, contract_js_1.getContract)({
            address: params.tokenAddress,
            chain: (0, utils_js_1.getCachedChain)(params.chainId),
            client: params.client,
        });
        const tokenDecimals = tokenContract.address.toLowerCase() === addresses_js_1.NATIVE_TOKEN_ADDRESS
            ? 18
            : await (0, decimals_js_1.decimals)({
                contract: tokenContract,
            });
        const amount = ox_1.Value.from(params.amount, tokenDecimals);
        const quote = await index_js_1.Transfer.prepare({
            amount,
            chainId: params.chainId,
            client: params.client,
            feePayer: params.feePayer,
            paymentLinkId: params.paymentLinkId,
            purchaseData: params.purchaseData,
            receiver: params.toAddress,
            sender: params.fromAddress,
            tokenAddress: params.tokenAddress,
        });
        const firstStep = quote.steps[0];
        if (!firstStep) {
            throw new Error("This quote is incompatible with getBuyWithCryptoTransfer. Please use Bridge.Transfer.prepare instead.");
        }
        const approvalTxs = firstStep.transactions.filter((tx) => tx.action === "approval");
        if (approvalTxs.length > 1) {
            throw new Error("This quote is incompatible with getBuyWithCryptoTransfer. Please use Bridge.Transfer.prepare instead.");
        }
        const approvalTx = approvalTxs[0];
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
        const txs = firstStep.transactions.filter((tx) => tx.action !== "approval");
        if (txs.length > 1) {
            throw new Error("This quote is incompatible with getBuyWithCryptoTransfer. Please use Bridge.Transfer.prepare instead.");
        }
        const tx = txs[0];
        if (!tx) {
            throw new Error("This quote is incompatible with getBuyWithCryptoTransfer. Please use Bridge.Transfer.prepare instead.");
        }
        const transfer = {
            approvalData,
            client: params.client,
            estimatedGasCostUSDCents: 0,
            fromAddress: params.fromAddress,
            paymentToken: {
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
            processingFee: {
                amount: params.feePayer === "sender"
                    ? ox_1.Value.format(quote.originAmount - quote.destinationAmount, firstStep.originToken.decimals).toString()
                    : "0",
                amountUSDCents: params.feePayer === "sender"
                    ? Number(ox_1.Value.format(quote.originAmount - quote.destinationAmount, firstStep.originToken.decimals)) *
                        (firstStep.originToken.prices.USD || 0) *
                        100
                    : 0,
                amountWei: params.feePayer === "sender"
                    ? (quote.originAmount - quote.destinationAmount).toString()
                    : "0",
                token: {
                    chainId: firstStep.originToken.chainId,
                    decimals: firstStep.originToken.decimals,
                    name: firstStep.originToken.name,
                    priceUSDCents: (firstStep.originToken.prices.USD || 0) * 100,
                    symbol: firstStep.originToken.symbol,
                    tokenAddress: firstStep.originToken.address,
                },
            },
            toAddress: params.toAddress,
            transactionRequest: {
                ...tx,
                extraGas: 50000n, // extra gas buffer
            },
        };
        return transfer;
    }
    catch (error) {
        console.error("Error getting buy with crypto transfer", error);
        throw error;
    }
}
//# sourceMappingURL=getTransfer.js.map