"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blast = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.blast = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://api.blastscan.io/api",
            name: "Blastscan",
            url: "https://blastscan.io",
        },
    ],
    id: 81457,
    name: "Blast",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
});
//# sourceMappingURL=blast.js.map