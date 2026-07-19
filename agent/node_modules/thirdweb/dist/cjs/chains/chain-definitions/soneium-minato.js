"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.soneiumMinato = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.soneiumMinato = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Minato Explorer",
            url: "https://explorer-testnet.soneium.org/",
        },
    ],
    id: 1946,
    name: "Soneium Minato",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
    testnet: true,
});
//# sourceMappingURL=soneium-minato.js.map