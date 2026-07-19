"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bscTestnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.bscTestnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "bscscan-testnet",
            url: "https://testnet.bscscan.com",
        },
    ],
    id: 97,
    name: "BNB Smart Chain Testnet",
    nativeCurrency: {
        decimals: 18,
        name: "BNB Chain Native Token",
        symbol: "tBNB",
    },
});
//# sourceMappingURL=bsc-testnet.js.map