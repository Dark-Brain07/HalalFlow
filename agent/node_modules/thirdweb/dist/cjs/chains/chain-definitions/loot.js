"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loot = void 0;
const utils_js_1 = require("../utils.js");
/**
 * @chain
 */
exports.loot = (0, utils_js_1.defineChain)({
    blockExplorers: [
        {
            name: "Explorer",
            url: "https://explorer.lootchain.com/",
        },
    ],
    id: 5151706,
    name: "Loot Chain Mainnet",
    nativeCurrency: {
        decimals: 18,
        name: "AGLD",
        symbol: "AGLD",
    },
});
//# sourceMappingURL=loot.js.map