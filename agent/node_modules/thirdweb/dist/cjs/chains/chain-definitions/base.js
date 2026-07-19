"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.base = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://api.basescan.org/api",
            name: "Basescan",
            url: "https://basescan.org",
        },
    ],
    id: 8453,
    name: "Base",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
});
//# sourceMappingURL=base.js.map