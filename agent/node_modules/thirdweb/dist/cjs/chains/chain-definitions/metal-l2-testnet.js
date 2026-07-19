"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metalL2Testnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.metalL2Testnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Blockscout",
            url: "https://testnet.explorer.metall2.com",
        },
    ],
    id: 1740,
    name: "Metal L2 Testnet",
    nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" },
    testnet: true,
});
//# sourceMappingURL=metal-l2-testnet.js.map