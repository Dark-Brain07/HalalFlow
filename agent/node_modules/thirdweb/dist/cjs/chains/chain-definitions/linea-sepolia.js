"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lineaSepolia = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.lineaSepolia = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://api-sepolia.lineascan.build/api",
            name: "LineaScan",
            url: "https://sepolia.lineascan.build",
        },
    ],
    id: 59141,
    name: "Linea Sepolia",
    nativeCurrency: { decimals: 18, name: "Sepolia Ether", symbol: "ETH" },
    testnet: true,
});
//# sourceMappingURL=linea-sepolia.js.map