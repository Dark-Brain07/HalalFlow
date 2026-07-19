"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollSepoliaTestnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.scrollSepoliaTestnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Scroll Sepolia Etherscan",
            url: "https://sepolia.scrollscan.com",
        },
    ],
    id: 534353,
    name: "Scroll Sepolia Testnet",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
    },
    testnet: true,
});
//# sourceMappingURL=scroll-sepolia-testnet.js.map