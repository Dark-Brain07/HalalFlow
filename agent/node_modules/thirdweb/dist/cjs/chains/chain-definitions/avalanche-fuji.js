"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avalancheFuji = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.avalancheFuji = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://api-testnet.snowtrace.io/api",
            name: "SnowTrace",
            url: "https://testnet.snowtrace.io",
        },
    ],
    id: 43113,
    name: "Avalanche Fuji",
    nativeCurrency: {
        decimals: 18,
        name: "Avalanche Fuji",
        symbol: "AVAX",
    },
    testnet: true,
});
//# sourceMappingURL=avalanche-fuji.js.map