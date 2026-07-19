"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zkSync = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.zkSync = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://block-explorer-api.zksync.dev/api",
            name: "zkSync Era Block Explorer",
            url: "https://explorer.zksync.io",
        },
    ],
    id: 324,
    name: "ZkSync Era",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
    },
});
//# sourceMappingURL=zksync.js.map