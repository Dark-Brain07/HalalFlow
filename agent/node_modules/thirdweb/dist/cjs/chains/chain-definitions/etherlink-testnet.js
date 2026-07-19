"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.etherlinkTestnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.etherlinkTestnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Etherlink Testnet Explorer",
            url: "https://testnet.explorer.etherlink.com/",
        },
    ],
    id: 128123,
    name: "Etherlink Testnet",
    nativeCurrency: {
        decimals: 18,
        name: "Etherlink",
        symbol: "XTZ",
    },
    testnet: true,
});
//# sourceMappingURL=etherlink-testnet.js.map