import { track } from "./index.js";
/**
 * @internal
 */
export async function trackPayEvent(args) {
    const data = {
        action: args.event,
        amountWei: args.amountWei,
        chainId: args.chainId,
        clientId: args.client.clientId,
        dstChainId: args.toChainId,
        dstTokenAddress: args.toToken,
        errorCode: args.error,
        source: "pay",
        tokenAddress: args.fromToken,
        walletAddress: args.walletAddress,
        walletType: args.walletType,
    };
    return track({
        client: args.client,
        data,
        ecosystem: args.ecosystem,
    });
}
//# sourceMappingURL=pay.js.map