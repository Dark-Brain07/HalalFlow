"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sepolia = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.sepolia = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://api-sepolia.etherscan.io/api",
            name: "Etherscan",
            url: "https://sepolia.etherscan.io",
        },
    ],
    id: 11155111,
    name: "Sepolia",
    nativeCurrency: { decimals: 18, name: "Sepolia Ether", symbol: "ETH" },
    testnet: true,
});
//# sourceMappingURL=sepolia.js.map