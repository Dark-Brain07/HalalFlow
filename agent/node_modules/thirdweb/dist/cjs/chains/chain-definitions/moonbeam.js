"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moonbeam = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.moonbeam = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "moonscan",
            url: "https://moonbeam.moonscan.io",
        },
    ],
    id: 1284,
    name: "Moonbeam",
    nativeCurrency: {
        decimals: 18,
        name: "Glimmer",
        symbol: "GLMR",
    },
});
//# sourceMappingURL=moonbeam.js.map