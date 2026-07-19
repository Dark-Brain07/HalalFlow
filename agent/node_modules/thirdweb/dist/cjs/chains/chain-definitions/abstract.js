"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abstract = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.abstract = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Abstract Block Explorer",
            url: "https://explorer.abs.xyz",
        },
    ],
    id: 2741,
    name: "Abstract",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
});
//# sourceMappingURL=abstract.js.map