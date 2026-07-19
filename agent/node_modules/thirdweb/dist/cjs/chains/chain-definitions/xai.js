"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xai = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.xai = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Blockscout",
            url: "https://explorer.xai-chain.net",
        },
    ],
    id: 660279,
    name: "Xai Mainnet",
    nativeCurrency: {
        decimals: 18,
        name: "XAI token",
        symbol: "XAI",
    },
});
//# sourceMappingURL=xai.js.map