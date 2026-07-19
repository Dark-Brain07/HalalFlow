export function cleanedChainName(name) {
    return name.replace("Mainnet", "");
}
export const tokenAmountFormatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 5,
    minimumFractionDigits: 2,
});
//# sourceMappingURL=utils.js.map