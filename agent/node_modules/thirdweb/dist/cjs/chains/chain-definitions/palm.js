"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.palm = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.palm = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Chainlens",
            url: "https://palm.chainlens.com",
        },
    ],
    id: 11297108109,
    name: "Palm",
    nativeCurrency: {
        decimals: 18,
        name: "PALM",
        symbol: "PALM",
    },
});
//# sourceMappingURL=palm.js.map