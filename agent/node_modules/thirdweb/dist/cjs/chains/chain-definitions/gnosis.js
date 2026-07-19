"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gnosis = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.gnosis = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "blockscout",
            url: "https://gnosis.blockscout.com",
        },
    ],
    id: 100,
    name: "Gnosis",
    nativeCurrency: { decimals: 18, name: "xDAI", symbol: "XDAI" },
});
//# sourceMappingURL=gnosis.js.map