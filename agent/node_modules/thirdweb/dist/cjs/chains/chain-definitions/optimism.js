"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimism = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.optimism = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://api-optimistic.etherscan.io",
            name: "Optimism Explorer",
            url: "https://optimistic.etherscan.io",
        },
    ],
    id: 10,
    name: "OP Mainnet",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
});
//# sourceMappingURL=optimism.js.map