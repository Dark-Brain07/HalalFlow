"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localhost = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.localhost = (0, utils_js_1.defineChain)({
    id: 1337,
    name: "Localhost",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
    },
    rpc: "http://127.0.0.1:8545",
    testnet: true,
});
//# sourceMappingURL=localhost.js.map