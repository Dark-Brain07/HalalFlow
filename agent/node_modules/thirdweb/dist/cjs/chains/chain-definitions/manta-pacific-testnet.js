"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mantaPacificTestnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.mantaPacificTestnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "manta-testnet Explorer",
            url: "https://manta-testnet.calderaexplorer.xyz",
        },
    ],
    id: 3441005,
    name: "Manta Pacific Testnet",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
    testnet: true,
});
//# sourceMappingURL=manta-pacific-testnet.js.map