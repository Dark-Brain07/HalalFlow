"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treasure = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.treasure = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Treasure Block Explorer",
            url: "https://treasurescan.io",
        },
    ],
    id: 61166,
    name: "Treasure",
    nativeCurrency: { decimals: 18, name: "MAGIC", symbol: "MAGIC" },
});
//# sourceMappingURL=treasure.js.map