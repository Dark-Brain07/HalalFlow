"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anvil = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.anvil = (0, utils_js_1.defineChain)({
    id: 31337,
    name: "Anvil",
    nativeCurrency: {
        decimals: 18,
        name: "Anvil Ether",
        symbol: "ETH",
    },
    rpc: "http://127.0.0.1:8545",
    testnet: true,
});
//# sourceMappingURL=anvil.js.map