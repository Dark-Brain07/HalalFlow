"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mode = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.mode = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Modescout",
            url: "https://explorer.mode.network/",
        },
    ],
    id: 34443,
    name: "Mode",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
});
//# sourceMappingURL=mode.js.map