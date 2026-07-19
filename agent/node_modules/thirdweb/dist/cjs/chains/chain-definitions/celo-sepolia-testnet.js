"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.celoSepoliaTestnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.celoSepoliaTestnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Celo Sepolia Explorer",
            url: "https://celo-sepolia.blockscout.com/",
        },
    ],
    id: 11142220,
    name: "Celo Sepolia Testnet",
    nativeCurrency: { decimals: 18, name: "CELO", symbol: "CELO-S" },
    testnet: true,
});
//# sourceMappingURL=celo-sepolia-testnet.js.map