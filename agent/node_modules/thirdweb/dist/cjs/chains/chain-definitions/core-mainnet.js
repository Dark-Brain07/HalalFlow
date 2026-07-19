"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreMainnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.coreMainnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Core Scan",
            url: "https://scan.coredao.org/",
        },
    ],
    id: 1116,
    name: "Core",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
    },
});
//# sourceMappingURL=core-mainnet.js.map