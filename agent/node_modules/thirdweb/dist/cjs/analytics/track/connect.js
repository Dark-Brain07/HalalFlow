"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackConnect = trackConnect;
const index_js_1 = require("./index.js");
/**
 * @internal
 */
async function trackConnect(args) {
    const { client, ecosystem, walletType, walletAddress, chainId } = args;
    return (0, index_js_1.track)({
        client,
        data: {
            action: "connect",
            chainId,
            source: "connectWallet",
            walletAddress,
            walletType,
        },
        ecosystem,
    });
}
//# sourceMappingURL=connect.js.map