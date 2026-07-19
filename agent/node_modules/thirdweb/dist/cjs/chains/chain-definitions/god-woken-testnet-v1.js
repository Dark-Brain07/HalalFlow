"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.godWokenTestnetV1 = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.godWokenTestnetV1 = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "GWScan Block Explorer",
            url: "https://v1.testnet.gwscan.com",
        },
    ],
    id: 71401,
    name: "Godwoken Testnet v1",
    nativeCurrency: {
        decimals: 18,
        name: "pCKB",
        symbol: "pCKB",
    },
    testnet: true,
});
//# sourceMappingURL=god-woken-testnet-v1.js.map