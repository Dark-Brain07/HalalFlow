"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monad = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.monad = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Monad Vision",
            url: "https://monadvision.com/",
        },
        {
            name: "Monad Scan",
            url: "https://monadscan.com/",
        },
    ],
    id: 143,
    name: "Monad",
    nativeCurrency: { decimals: 18, name: "Mon", symbol: "MON" },
});
//# sourceMappingURL=monad.js.map