"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fantom = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.fantom = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "ftmscan",
            url: "https://ftmscan.com",
        },
    ],
    id: 250,
    name: "Fantom Opera",
    nativeCurrency: {
        decimals: 18,
        name: "Fantom",
        symbol: "FTM",
    },
});
//# sourceMappingURL=fantom.js.map