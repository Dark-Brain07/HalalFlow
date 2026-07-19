import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
export declare const FN_SELECTOR: "0x791b98bc";
/**
 * Checks if the `positionManager` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `positionManager` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isPositionManagerSupported } from "thirdweb/extensions/tokens";
 * const supported = isPositionManagerSupported(["0x..."]);
 * ```
 */
export declare function isPositionManagerSupported(availableSelectors: string[]): boolean;
/**
 * Decodes the result of the positionManager function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodePositionManagerResult } from "thirdweb/extensions/tokens";
 * const result = decodePositionManagerResultResult("...");
 * ```
 */
export declare function decodePositionManagerResult(result: Hex): `0x${string}`;
/**
 * Calls the "positionManager" function on the contract.
 * @param options - The options for the positionManager function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { positionManager } from "thirdweb/extensions/tokens";
 *
 * const result = await positionManager({
 *  contract,
 * });
 *
 * ```
 */
export declare function positionManager(options: BaseTransactionOptions): Promise<string>;
//# sourceMappingURL=positionManager.d.ts.map