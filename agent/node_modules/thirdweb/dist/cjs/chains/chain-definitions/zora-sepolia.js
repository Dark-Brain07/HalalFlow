"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zoraSepolia = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.zoraSepolia = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://sepolia.explorer.zora.energy/api",
            name: "Zora Sepolia Explorer",
            url: "https://sepolia.explorer.zora.energy/",
        },
    ],
    id: 999999999,
    name: "Zora Sepolia",
    nativeCurrency: {
        decimals: 18,
        name: "Zora Sepolia",
        symbol: "ETH",
    },
    testnet: true,
});
//# sourceMappingURL=zora-sepolia.js.map