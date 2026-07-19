"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hokumTestnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.hokumTestnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Hokum Explorer",
            url: "https://testnet-explorer.hokum.gg",
        },
    ],
    id: 20482050,
    name: "Hokum Testnet",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
    },
    testnet: true,
});
//# sourceMappingURL=hokum-testnet.js.map