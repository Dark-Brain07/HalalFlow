"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treasureTopaz = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.treasureTopaz = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Treasure Topaz Block Explorer",
            url: "https://topaz.treasurescan.io",
        },
    ],
    id: 978658,
    name: "Treasure Topaz",
    nativeCurrency: { decimals: 18, name: "MAGIC", symbol: "MAGIC" },
});
//# sourceMappingURL=treasureTopaz.js.map