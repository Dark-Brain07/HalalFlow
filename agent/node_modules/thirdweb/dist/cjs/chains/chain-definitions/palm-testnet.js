"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.palmTestnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.palmTestnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Chainlens",
            url: "https://testnet.palm.chainlens.com",
        },
    ],
    id: 11297108099,
    name: "Palm Testnet",
    nativeCurrency: {
        decimals: 18,
        name: "PALM",
        symbol: "PALM",
    },
    testnet: true,
});
//# sourceMappingURL=palm-testnet.js.map