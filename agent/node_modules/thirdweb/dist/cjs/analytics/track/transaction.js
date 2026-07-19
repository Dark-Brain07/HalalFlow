"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackTransaction = trackTransaction;
exports.trackInsufficientFundsError = trackInsufficientFundsError;
const json_js_1 = require("../../utils/json.js");
const helpers_js_1 = require("./helpers.js");
const index_js_1 = require("./index.js");
/**
 * @internal
 */
async function trackTransaction(args) {
    return trackTransactionEvent({
        ...args,
        action: "transaction:sent",
    });
}
/**
 * @internal
 */
function trackTransactionEvent(args) {
    return (0, index_js_1.track)({
        client: args.client,
        data: {
            action: args.action,
            chainId: args.chainId,
            clientId: args.client.clientId,
            contractAddress: args.contractAddress,
            errorCode: (0, json_js_1.stringify)(args.error),
            functionName: args.functionName,
            gasPrice: args.gasPrice,
            transactionHash: args.transactionHash,
            walletAddress: args.walletAddress,
            walletType: args.walletType,
        },
        ecosystem: args.ecosystem,
    });
}
/**
 * @internal
 */
async function trackInsufficientFundsError(args) {
    const errorDetails = (0, helpers_js_1.getErrorDetails)(args.error);
    return (0, index_js_1.track)({
        client: args.client,
        data: {
            action: "transaction:insufficient_funds",
            chainId: args.chainId,
            clientId: args.client.clientId,
            contractAddress: args.contractAddress,
            errorCode: errorDetails.code ? (0, json_js_1.stringify)(errorDetails.code) : undefined,
            errorMessage: errorDetails.message,
            functionName: args.functionName,
            requiredAmount: args.requiredAmount?.toString(),
            transactionValue: args.transactionValue?.toString(),
            userBalance: args.userBalance?.toString(),
            walletAddress: args.walletAddress,
        },
        ecosystem: args.ecosystem,
    });
}
//# sourceMappingURL=transaction.js.map