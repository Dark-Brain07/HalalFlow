import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
export declare const FN_SELECTOR: "0x824f512c";
/**
 * Checks if the `getPoolRouter` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getPoolRouter` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isGetPoolRouterSupported } from "thirdweb/extensions/tokens";
 * const supported = isGetPoolRouterSupported(["0x..."]);
 * ```
 */
export declare function isGetPoolRouterSupported(availableSelectors: string[]): boolean;
/**
 * Decodes the result of the getPoolRouter function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeGetPoolRouterResult } from "thirdweb/extensions/tokens";
 * const result = decodeGetPoolRouterResultResult("...");
 * ```
 */
export declare function decodeGetPoolRouterResult(result: Hex): `0x${string}`;
/**
 * Calls the "getPoolRouter" function on the contract.
 * @param options - The options for the getPoolRouter function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getPoolRouter } from "thirdweb/extensions/tokens";
 *
 * const result = await getPoolRouter({
 *  contract,
 * });
 *
 * ```
 */
export declare function getPoolRouter(options: BaseTransactionOptions): Promise<string>;
//# sourceMappingURL=getPoolRouter.d.ts.map