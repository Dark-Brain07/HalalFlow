"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arbitrumNova = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.arbitrumNova = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Arbiscan",
            url: "https://nova.arbiscan.io/",
        },
    ],
    id: 42170,
    name: "Arbitrum Nova",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
});
//# sourceMappingURL=arbitrum-nova.js.map