"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modeTestnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.modeTestnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Modescout",
            url: "https://sepolia.explorer.mode.network/",
        },
    ],
    id: 919,
    name: "Mode Testnet",
    nativeCurrency: { decimals: 18, name: "Sepolia Ether", symbol: "ETH" },
    testnet: true,
});
//# sourceMappingURL=mode-testnet.js.map