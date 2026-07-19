"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.etherlink = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.etherlink = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Etherlink Explorer",
            url: "https://explorer.etherlink.com/",
        },
    ],
    id: 42793,
    name: "Etherlink",
    nativeCurrency: {
        decimals: 18,
        name: "Etherlink",
        symbol: "XTZ",
    },
});
//# sourceMappingURL=etherlink.js.map