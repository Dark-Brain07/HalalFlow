"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polygon = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.polygon = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            apiUrl: "https://api.polygonscan.com/api",
            name: "PolygonScan",
            url: "https://polygonscan.com",
        },
    ],
    id: 137,
    name: "Polygon",
    nativeCurrency: { decimals: 18, name: "POL", symbol: "POL" },
});
//# sourceMappingURL=polygon.js.map