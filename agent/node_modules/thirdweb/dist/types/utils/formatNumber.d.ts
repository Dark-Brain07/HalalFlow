/**
 * Round up a number to a certain decimal place
 * @example
 * ```ts
 * import { formatNumber } from "thirdweb/utils";
 * const value = formatNumber(12.1214141, 1); // 12.1
 * ```
 * @utils
 */
export declare function formatNumber(value: number, decimalPlaces: number): number;
/**
 * Convert a number to a plain string, removing exponential notation
 * @internal
 */
export declare function numberToPlainString(num: number): string;
//# sourceMappingURL=formatNumber.d.ts.map