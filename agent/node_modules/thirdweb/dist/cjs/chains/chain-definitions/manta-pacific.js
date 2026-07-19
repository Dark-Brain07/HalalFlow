"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mantaPacific = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.mantaPacific = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "manta-pacific Explorer",
            url: "https://pacific-explorer.manta.network",
        },
    ],
    id: 169,
    name: "Manta Pacific Mainnet",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
});
//# sourceMappingURL=manta-pacific.js.map