import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
export declare const FN_SELECTOR: "0x725c9c49";
/**
 * Checks if the `getSwapRouter` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getSwapRouter` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isGetSwapRouterSupported } from "thirdweb/extensions/tokens";
 * const supported = isGetSwapRouterSupported(["0x..."]);
 * ```
 */
export declare function isGetSwapRouterSupported(availableSelectors: string[]): boolean;
/**
 * Decodes the result of the getSwapRouter function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeGetSwapRouterResult } from "thirdweb/extensions/tokens";
 * const result = decodeGetSwapRouterResultResult("...");
 * ```
 */
export declare function decodeGetSwapRouterResult(result: Hex): `0x${string}`;
/**
 * Calls the "getSwapRouter" function on the contract.
 * @param options - The options for the getSwapRouter function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getSwapRouter } from "thirdweb/extensions/tokens";
 *
 * const result = await getSwapRouter({
 *  contract,
 * });
 *
 * ```
 */
export declare function getSwapRouter(options: BaseTransactionOptions): Promise<string>;
//# sourceMappingURL=getSwapRouter.d.ts.map