"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetChainTestnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.assetChainTestnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://scan-testnet.assetchain.org/api",
            name: "Asset Chain Testnet Explorer",
            url: "https://scan-testnet.assetchain.org",
        },
    ],
    id: 42421,
    name: "AssetChain Testnet",
    nativeCurrency: {
        decimals: 18,
        name: "Real World Asset",
        symbol: "RWA",
    },
    testnet: true,
});
//# sourceMappingURL=assetchain-testnet.js.map