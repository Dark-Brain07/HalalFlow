"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimismSepolia = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.optimismSepolia = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://optimism-sepolia.blockscout.com/api",
            name: "Blockscout",
            url: "https://optimism-sepolia.blockscout.com",
        },
    ],
    id: 11155420,
    name: "OP Sepolia",
    nativeCurrency: { decimals: 18, name: "Sepolia Ether", symbol: "ETH" },
    testnet: true,
});
//# sourceMappingURL=optimism-sepolia.js.map