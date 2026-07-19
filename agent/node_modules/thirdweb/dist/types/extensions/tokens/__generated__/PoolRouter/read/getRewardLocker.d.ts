import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "getRewardLocker" function.
 */
export type GetRewardLockerParams = {
    adapterType: AbiParameterToPrimitiveType<{
        type: "uint8";
        name: "adapterType";
    }>;
};
export declare const FN_SELECTOR: "0x16e23696";
/**
 * Checks if the `getRewardLocker` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getRewardLocker` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isGetRewardLockerSupported } from "thirdweb/extensions/tokens";
 * const supported = isGetRewardLockerSupported(["0x..."]);
 * ```
 */
export declare function isGetRewardLockerSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "getRewardLocker" function.
 * @param options - The options for the getRewardLocker function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetRewardLockerParams } from "thirdweb/extensions/tokens";
 * const result = encodeGetRewardLockerParams({
 *  adapterType: ...,
 * });
 * ```
 */
export declare function encodeGetRewardLockerParams(options: GetRewardLockerParams): `0x${string}`;
/**
 * Encodes the "getRewardLocker" function into a Hex string with its parameters.
 * @param options - The options for the getRewardLocker function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetRewardLocker } from "thirdweb/extensions/tokens";
 * const result = encodeGetRewardLocker({
 *  adapterType: ...,
 * });
 * ```
 */
export declare function encodeGetRewardLocker(options: GetRewardLockerParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the getRewardLocker function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeGetRewardLockerResult } from "thirdweb/extensions/tokens";
 * const result = decodeGetRewardLockerResultResult("...");
 * ```
 */
export declare function decodeGetRewardLockerResult(result: Hex): `0x${string}`;
/**
 * Calls the "getRewardLocker" function on the contract.
 * @param options - The options for the getRewardLocker function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getRewardLocker } from "thirdweb/extensions/tokens";
 *
 * const result = await getRewardLocker({
 *  contract,
 *  adapterType: ...,
 * });
 *
 * ```
 */
export declare function getRewardLocker(options: BaseTransactionOptions<GetRewardLockerParams>): Promise<string>;
//# sourceMappingURL=getRewardLocker.d.ts.map