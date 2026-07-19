"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollAlphaTestnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.scrollAlphaTestnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Scroll Alpha Testnet Block Explorer",
            url: "https://alpha-blockscout.scroll.io",
        },
    ],
    id: 534353,
    name: "Scroll Alpha Testnet",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
    },
    testnet: true,
});
//# sourceMappingURL=scroll-alpha-testnet.js.map