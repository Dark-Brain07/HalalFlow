"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackPayEvent = trackPayEvent;
const index_js_1 = require("./index.js");
/**
 * @internal
 */
async function trackPayEvent(args) {
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
    return (0, index_js_1.track)({
        client: args.client,
        data,
        ecosystem: args.ecosystem,
    });
}
//# sourceMappingURL=pay.js.map