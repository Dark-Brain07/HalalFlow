"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mumbai = exports.polygonMumbai = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.polygonMumbai = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://mumbai.polygonscan.com/api",
            name: "PolygonScan",
            url: "https://mumbai.polygonscan.com",
        },
    ],
    id: 80001,
    name: "Polygon Mumbai",
    nativeCurrency: { decimals: 18, name: "MATIC", symbol: "MATIC" },
    testnet: true,
});
/**
 * @alias polygonMumbai
 */
exports.mumbai = exports.polygonMumbai;
//# sourceMappingURL=polygon-mumbai.js.map