const currencySymbol = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    KRW: "₩",
    CNY: "¥",
    INR: "₹",
    NOK: "kr",
    SEK: "kr",
    CHF: "CHF",
    AUD: "$",
    CAD: "$",
    NZD: "$",
    MXN: "$",
    BRL: "R$",
    CLP: "$",
    CZK: "Kč",
    DKK: "kr",
    HKD: "$",
    HUF: "Ft",
    IDR: "Rp",
    ILS: "₪",
    ISK: "kr",
};
export function getFiatSymbol(showBalanceInFiat) {
    return currencySymbol[showBalanceInFiat] || "$";
}
//# sourceMappingURL=type.js.map