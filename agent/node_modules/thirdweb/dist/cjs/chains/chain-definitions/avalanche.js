"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avalanche = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.avalanche = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://api.snowtrace.io/api",
            name: "SnowTrace",
            url: "https://snowtrace.io",
        },
    ],
    id: 43114,
    name: "Avalanche",
    nativeCurrency: {
        decimals: 18,
        name: "Avalanche",
        symbol: "AVAX",
    },
});
//# sourceMappingURL=avalanche.js.map