"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fantomTestnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.fantomTestnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "ftmscan",
            url: "https://testnet.ftmscan.com",
        },
    ],
    id: 4002,
    name: "Fantom Testnet",
    nativeCurrency: {
        decimals: 18,
        name: "Fantom",
        symbol: "FTM",
    },
    testnet: true,
});
//# sourceMappingURL=fantom-testnet.js.map