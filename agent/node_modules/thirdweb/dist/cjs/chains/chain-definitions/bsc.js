"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bsc = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.bsc = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "bscscan",
            url: "https://bscscan.com",
        },
    ],
    id: 56,
    name: "BNB Smart Chain Mainnet",
    nativeCurrency: {
        decimals: 18,
        name: "BNB Chain Native Token",
        symbol: "BNB",
    },
});
//# sourceMappingURL=bsc.js.map