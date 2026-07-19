"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xaiSepolia = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.xaiSepolia = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Blockscout",
            url: "https://testnet-explorer-v2.xai-chain.net",
        },
    ],
    id: 37714555429,
    name: "Xai Sepolia",
    nativeCurrency: { decimals: 18, name: "sXAI", symbol: "sXAI" },
    testnet: true,
});
//# sourceMappingURL=xai-sepolia.js.map