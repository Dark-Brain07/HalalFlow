"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.berachain = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.berachain = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://api.berascan.com/api",
            name: "berascan",
            url: "https://berascan.com/",
        },
    ],
    id: 80094,
    name: "Berachain",
    nativeCurrency: { decimals: 18, name: "BERA", symbol: "BERA" },
});
//# sourceMappingURL=berachain.js.map