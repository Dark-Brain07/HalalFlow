"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polygonAmoy = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.polygonAmoy = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://api-amoy.polygonscan.com/api",
            name: "PolygonScan",
            url: "https://amoy.polygonscan.com",
        },
    ],
    id: 80002,
    name: "Polygon Amoy",
    nativeCurrency: { decimals: 18, name: "MATIC", symbol: "MATIC" },
    testnet: true,
});
//# sourceMappingURL=polygon-amoy.js.map