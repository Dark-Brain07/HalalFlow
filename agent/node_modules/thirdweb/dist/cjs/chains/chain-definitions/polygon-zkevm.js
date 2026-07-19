"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polygonZkEvm = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.polygonZkEvm = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "blockscout",
            url: "https://zkevm.polygonscan.com",
        },
    ],
    id: 1101,
    name: "Polygon zkEVM",
    nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
});
//# sourceMappingURL=polygon-zkevm.js.map