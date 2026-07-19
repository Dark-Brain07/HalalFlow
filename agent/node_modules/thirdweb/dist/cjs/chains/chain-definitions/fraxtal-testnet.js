"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fraxtalTestnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.fraxtalTestnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Fraxscan",
            url: "https://holesky.fraxscan.com/",
        },
    ],
    id: 2522,
    name: "Fraxtal Testnet",
    nativeCurrency: { decimals: 18, name: "Frax Ether", symbol: "frxETH" },
    testnet: true,
});
//# sourceMappingURL=fraxtal-testnet.js.map