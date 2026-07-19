"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gnosisChiadoTestnet = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.gnosisChiadoTestnet = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "blockscout",
            url: "https://gnosis-chiado.blockscout.com",
        },
    ],
    id: 10200,
    name: "Gnosis Chiado Testnet",
    nativeCurrency: { decimals: 18, name: "xDAI", symbol: "XDAI" },
    testnet: true,
});
//# sourceMappingURL=gnosis-chiado-testnet.js.map