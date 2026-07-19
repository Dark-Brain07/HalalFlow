"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenAmountFormatter = void 0;
exports.cleanedChainName = cleanedChainName;
function cleanedChainName(name) {
    return name.replace("Mainnet", "");
}
exports.tokenAmountFormatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 5,
    minimumFractionDigits: 2,
});
//# sourceMappingURL=utils.js.map