"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polygonZkEvmTestnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.polygonZkEvmTestnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Polygon zkEVM explorer",
            url: "https://explorer.public.zkevm-test.net",
        },
    ],
    id: 1442,
    name: "Polygon zkEVM Testnet",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
    testnet: true,
});
//# sourceMappingURL=polygon-zkevm-testnet.js.map