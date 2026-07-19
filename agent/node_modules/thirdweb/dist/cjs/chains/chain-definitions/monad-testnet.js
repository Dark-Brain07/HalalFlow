"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monadTestnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.monadTestnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Monad Explorer",
            url: "https://testnet.monadexplorer.com/",
        },
    ],
    id: 10143,
    name: "Monad Testnet",
    nativeCurrency: { decimals: 18, name: "Mon", symbol: "MON" },
    testnet: true,
});
//# sourceMappingURL=monad-testnet.js.map