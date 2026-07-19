import { stringify } from "../../utils/json.js";
import { getErrorDetails } from "./helpers.js";
import { track } from "./index.js";
/**
 * @internal
 */
export async function trackTransaction(args) {
    return trackTransactionEvent({
        ...args,
        action: "transaction:sent",
    });
}
/**
 * @internal
 */
function trackTransactionEvent(args) {
    return track({
        client: args.client,
        data: {
            action: args.action,
            chainId: args.chainId,
            clientId: args.client.clientId,
            contractAddress: args.contractAddress,
            errorCode: stringify(args.error),
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
export async function trackInsufficientFundsError(args) {
    const errorDetails = getErrorDetails(args.error);
    return track({
        client: args.client,
        data: {
            action: "transaction:insufficient_funds",
            chainId: args.chainId,
            clientId: args.client.clientId,
            contractAddress: args.contractAddress,
            errorCode: errorDetails.code ? stringify(errorDetails.code) : undefined,
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