"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abstractTestnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.abstractTestnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Abstract Testnet Block Explorer",
            url: "https://explorer.testnet.abs.xyz",
        },
    ],
    id: 11124,
    name: "Abstract Testnet",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
    testnet: true,
});
//# sourceMappingURL=abstract-testnet.js.map