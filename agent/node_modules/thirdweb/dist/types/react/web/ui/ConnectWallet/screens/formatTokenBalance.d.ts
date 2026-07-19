import type { SupportedFiatCurrency } from "../../../../../pay/convert/type.js";
/**
 * @internal
 * @param balanceData
 * @returns
 */
export declare function formatTokenBalance(balanceData: {
    symbol: string;
    name: string;
    decimals: number;
    displayValue: string;
}, showSymbol?: boolean, decimals?: number): string;
export declare function formatTokenAmount(amount: bigint, decimals: number, decimalsToShow?: number): string;
export declare function formatCurrencyAmount(currency: SupportedFiatCurrency, amount: number): string;
//# sourceMappingURL=formatTokenBalance.d.ts.map