"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zkSyncSepolia = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.zkSyncSepolia = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://block-explorer-api.sepolia.zksync.dev/api",
            name: "zkSync Sepolia Block Explorer",
            url: "https://sepolia.explorer.zksync.io",
        },
    ],
    id: 300,
    name: "ZkSync Sepolia",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
    },
});
//# sourceMappingURL=zksync-sepolia.js.map