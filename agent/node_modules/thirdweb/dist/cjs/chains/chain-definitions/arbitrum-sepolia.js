"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arbitrumSepolia = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.arbitrumSepolia = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://sepolia.arbiscan.io/api",
            name: "Arbiscan",
            url: "https://sepolia.arbiscan.io",
        },
    ],
    id: 421614,
    name: "Arbitrum Sepolia",
    nativeCurrency: {
        decimals: 18,
        name: "Arbitrum Sepolia Ether",
        symbol: "ETH",
    },
    testnet: true,
});
//# sourceMappingURL=arbitrum-sepolia.js.map