"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.astriaEvmDusknet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.astriaEvmDusknet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Astria EVM Dusknet Explorer",
            url: "https://explorer.evm.dusk-3.devnet.astria.org/",
        },
    ],
    id: 912559,
    name: "Astria EVM Dusknet",
    nativeCurrency: { decimals: 18, name: "RIA", symbol: "RIA" },
});
//# sourceMappingURL=astria-evm-dusknet.js.map