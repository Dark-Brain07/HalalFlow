"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.somniaTestnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.somniaTestnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://shannon-explorer.somnia.network/api",
            name: "Somnia Testnet Explorer",
            url: "https://shannon-explorer.somnia.network/",
        },
    ],
    id: 50312,
    name: "Somnia Testnet",
    nativeCurrency: { decimals: 18, name: "Somnia Testnet Token", symbol: "STT" },
    testnet: true,
});
//# sourceMappingURL=somniaTestnet.js.map