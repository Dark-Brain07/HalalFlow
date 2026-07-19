"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blastSepolia = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.blastSepolia = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Blast Sepolia Explorer",
            url: "https://testnet.blastscan.io",
        },
    ],
    id: 168587773,
    name: "Blast Sepolia Testnet",
    nativeCurrency: { decimals: 18, name: "Sepolia Ether", symbol: "ETH" },
    testnet: true,
});
//# sourceMappingURL=blast-sepolia.js.map