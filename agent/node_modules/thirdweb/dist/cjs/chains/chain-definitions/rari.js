"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rari = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.rari = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "rarichain-explorer",
            url: "https://mainnet.explorer.rarichain.org",
        },
    ],
    id: 1380012617,
    name: "Rarichain",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
    },
});
//# sourceMappingURL=rari.js.map