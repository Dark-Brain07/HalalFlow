"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zora = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.zora = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://explorer.zora.energy/api",
            name: "Explorer",
            url: "https://explorer.zora.energy",
        },
    ],
    id: 7777777,
    name: "Zora",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
    },
});
//# sourceMappingURL=zora.js.map