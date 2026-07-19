"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arbitrum = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.arbitrum = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://api.arbiscan.io/api",
            name: "Arbiscan",
            url: "https://arbiscan.io",
        },
    ],
    id: 42161,
    name: "Arbitrum One",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
});
//# sourceMappingURL=arbitrum.js.map