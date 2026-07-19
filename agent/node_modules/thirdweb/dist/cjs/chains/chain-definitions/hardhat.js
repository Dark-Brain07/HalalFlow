"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hardhat = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.hardhat = (0, utils_js_1.defineChain)({
    id: 31337,
    name: "Hardhat",
    nativeCurrency: {
        decimals: 18,
        name: "Hardhat Ether",
        symbol: "ETH",
    },
    rpc: "http://127.0.0.1:8545",
    testnet: true,
});
//# sourceMappingURL=hardhat.js.map