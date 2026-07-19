import { formatNumber } from "../../../../../utils/formatNumber.js";
import { toTokens } from "../../../../../utils/units.js";
/**
 * @internal
 * @param balanceData
 * @returns
 */
export function formatTokenBalance(balanceData, showSymbol = true, decimals = 5) {
    return (formatNumber(Number(balanceData.displayValue), decimals) +
        (showSymbol ? ` ${balanceData.symbol}` : ""));
}
export function formatTokenAmount(amount, decimals, decimalsToShow = 5) {
    return formatNumber(Number.parseFloat(toTokens(amount, decimals)), decimalsToShow).toString();
}
export function formatCurrencyAmount(currency, amount) {
    return formatMoney(amount, "en-US", currency);
}
function formatMoney(value, locale, currencyCode) {
    if (value < 0) {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currencyCode,
            maximumFractionDigits: 6,
            minimumFractionDigits: 0,
        }).format(value);
    }
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode,
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
        notation: "compact",
    }).format(value);
}
//# sourceMappingURL=formatTokenBalance.js.map