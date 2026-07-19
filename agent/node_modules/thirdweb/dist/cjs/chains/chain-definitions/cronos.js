"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronos = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.cronos = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Cronos Explorer",
            url: "https://explorer.cronos.org",
        },
    ],
    id: 25,
    name: "Cronos Mainnet",
    nativeCurrency: {
        decimals: 18,
        name: "Cronos",
        symbol: "CRO",
    },
});
//# sourceMappingURL=cronos.js.map