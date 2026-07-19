"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreTestnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.coreTestnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Core Testnet Scan",
            url: "https://scan.test2.btcs.network/",
        },
    ],
    id: 1114,
    name: "Core Testnet",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
    },
    testnet: true,
});
//# sourceMappingURL=core-testnet.js.map