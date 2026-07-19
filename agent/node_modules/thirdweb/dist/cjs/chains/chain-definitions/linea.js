"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linea = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.linea = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://api.lineascan.build/api",
            name: "LineaScan",
            url: "https://lineascan.build",
        },
    ],
    id: 59144,
    name: "Linea",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
});
//# sourceMappingURL=linea.js.map