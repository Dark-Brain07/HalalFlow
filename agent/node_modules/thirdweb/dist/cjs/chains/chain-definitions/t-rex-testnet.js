"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tRexTestnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.tRexTestnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "T-Rex Testnet Block Explorer",
            url: "https://testnet.trex.xyz/",
        },
    ],
    id: 1962,
    name: "T-Rex Testnet",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
    testnet: true,
});
//# sourceMappingURL=t-rex-testnet.js.map