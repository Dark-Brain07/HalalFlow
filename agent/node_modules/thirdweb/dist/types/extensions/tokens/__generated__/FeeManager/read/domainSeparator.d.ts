import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
export declare const FN_SELECTOR: "0xf698da25";
/**
 * Checks if the `domainSeparator` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `domainSeparator` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isDomainSeparatorSupported } from "thirdweb/extensions/tokens";
 * const supported = isDomainSeparatorSupported(["0x..."]);
 * ```
 */
export declare function isDomainSeparatorSupported(availableSelectors: string[]): boolean;
/**
 * Decodes the result of the domainSeparator function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeDomainSeparatorResult } from "thirdweb/extensions/tokens";
 * const result = decodeDomainSeparatorResultResult("...");
 * ```
 */
export declare function decodeDomainSeparatorResult(result: Hex): `0x${string}`;
/**
 * Calls the "domainSeparator" function on the contract.
 * @param options - The options for the domainSeparator function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { domainSeparator } from "thirdweb/extensions/tokens";
 *
 * const result = await domainSeparator({
 *  contract,
 * });
 *
 * ```
 */
export declare function domainSeparator(options: BaseTransactionOptions): Promise<`0x${string}`>;
//# sourceMappingURL=domainSeparator.d.ts.map