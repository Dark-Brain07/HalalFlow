"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.godWoken = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.godWoken = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "GWScan Block Explorer",
            url: "https://v1.gwscan.com",
        },
    ],
    id: 71402,
    name: "Godwoken Mainnet",
    nativeCurrency: {
        decimals: 18,
        name: "pCKB",
        symbol: "pCKB",
    },
});
//# sourceMappingURL=god-woken.js.map