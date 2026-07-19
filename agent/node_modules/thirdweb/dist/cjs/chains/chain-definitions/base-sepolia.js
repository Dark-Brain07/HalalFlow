"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseSepolia = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.baseSepolia = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://api-sepolia.basescan.org/api",
            name: "Basescan",
            url: "https://sepolia.basescan.org",
        },
    ],
    id: 84532,
    name: "Base Sepolia",
    nativeCurrency: { decimals: 18, name: "Sepolia Ether", symbol: "ETH" },
    testnet: true,
});
//# sourceMappingURL=base-sepolia.js.map