"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rariTestnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.rariTestnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "rarichain-testnet-explorer",
            url: "https://explorer.rarichain.org",
        },
    ],
    id: 1918988905,
    name: "RARIchain Testnet",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
    },
    testnet: true,
});
//# sourceMappingURL=rari-testnet.js.map