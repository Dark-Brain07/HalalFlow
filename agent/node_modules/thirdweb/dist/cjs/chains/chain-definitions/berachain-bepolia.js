"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.berachainBepolia = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.berachainBepolia = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "beratrail",
            url: "https://bepolia.beratrail.io/",
        },
    ],
    id: 80069,
    name: "Berachain Bepolia",
    nativeCurrency: { decimals: 18, name: "BERA", symbol: "BERA" },
    testnet: true,
});
//# sourceMappingURL=berachain-bepolia.js.map