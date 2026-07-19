"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frameTestnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.frameTestnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Frame Testnet Explorer",
            url: "https://explorer.testnet.frame.xyz",
        },
    ],
    id: 68840142,
    name: "Frame Testnet",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
    },
    testnet: true,
});
//# sourceMappingURL=frame-testnet.js.map