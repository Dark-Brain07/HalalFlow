"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.etherlinkShadownet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.etherlinkShadownet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Etherlink Shadownet Explorer",
            url: "https://shadownet.explorer.etherlink.com/",
        },
    ],
    id: 127823,
    name: "Etherlink Shadownet",
    nativeCurrency: {
        decimals: 18,
        name: "Etherlink",
        symbol: "XTZ",
    },
    testnet: true,
});
//# sourceMappingURL=etherlink-shadownet.js.map