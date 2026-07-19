"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTokenBalance = formatTokenBalance;
exports.formatTokenAmount = formatTokenAmount;
exports.formatCurrencyAmount = formatCurrencyAmount;
const formatNumber_js_1 = require("../../../../../utils/formatNumber.js");
const units_js_1 = require("../../../../../utils/units.js");
/**
 * @internal
 * @param balanceData
 * @returns
 */
function formatTokenBalance(balanceData, showSymbol = true, decimals = 5) {
    return ((0, formatNumber_js_1.formatNumber)(Number(balanceData.displayValue), decimals) +
        (showSymbol ? ` ${balanceData.symbol}` : ""));
}
function formatTokenAmount(amount, decimals, decimalsToShow = 5) {
    return (0, formatNumber_js_1.formatNumber)(Number.parseFloat((0, units_js_1.toTokens)(amount, decimals)), decimalsToShow).toString();
}
function formatCurrencyAmount(currency, amount) {
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