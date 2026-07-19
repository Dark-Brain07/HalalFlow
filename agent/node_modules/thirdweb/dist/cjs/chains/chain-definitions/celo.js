"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.celo = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.celo = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "blockscout",
            url: "https://explorer.celo.org",
        },
    ],
    id: 42220,
    name: "Celo Mainnet",
    nativeCurrency: {
        decimals: 18,
        name: "CELO",
        symbol: "CELO",
    },
});
//# sourceMappingURL=celo.js.map