"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainnet = exports.ethereum = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.ethereum = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Etherscan",
            url: "https://etherscan.io",
        },
    ],
    id: 1,
    name: "Ethereum",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
    },
});
/**
 * @alias ethereum
 * @chain
 */
exports.mainnet = exports.ethereum;
//# sourceMappingURL=ethereum.js.map