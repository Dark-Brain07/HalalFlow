declare const currencySymbol: {
    readonly USD: "$";
    readonly EUR: "€";
    readonly GBP: "£";
    readonly JPY: "¥";
    readonly KRW: "₩";
    readonly CNY: "¥";
    readonly INR: "₹";
    readonly NOK: "kr";
    readonly SEK: "kr";
    readonly CHF: "CHF";
    readonly AUD: "$";
    readonly CAD: "$";
    readonly NZD: "$";
    readonly MXN: "$";
    readonly BRL: "R$";
    readonly CLP: "$";
    readonly CZK: "Kč";
    readonly DKK: "kr";
    readonly HKD: "$";
    readonly HUF: "Ft";
    readonly IDR: "Rp";
    readonly ILS: "₪";
    readonly ISK: "kr";
};
export type SupportedFiatCurrency = keyof typeof currencySymbol;
export declare function getFiatSymbol(showBalanceInFiat: SupportedFiatCurrency): "$" | "€" | "£" | "¥" | "₩" | "₹" | "kr" | "CHF" | "R$" | "Kč" | "Ft" | "Rp" | "₪";
export {};
//# sourceMappingURL=type.d.ts.map