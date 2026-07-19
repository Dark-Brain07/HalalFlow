import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "getAdapter" function.
 */
export type GetAdapterParams = {
    adapterType: AbiParameterToPrimitiveType<{
        type: "uint8";
        name: "adapterType";
    }>;
};
export declare const FN_SELECTOR: "0xd6cbae4d";
/**
 * Checks if the `getAdapter` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getAdapter` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isGetAdapterSupported } from "thirdweb/extensions/tokens";
 * const supported = isGetAdapterSupported(["0x..."]);
 * ```
 */
export declare function isGetAdapterSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "getAdapter" function.
 * @param options - The options for the getAdapter function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetAdapterParams } from "thirdweb/extensions/tokens";
 * const result = encodeGetAdapterParams({
 *  adapterType: ...,
 * });
 * ```
 */
export declare function encodeGetAdapterParams(options: GetAdapterParams): `0x${string}`;
/**
 * Encodes the "getAdapter" function into a Hex string with its parameters.
 * @param options - The options for the getAdapter function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetAdapter } from "thirdweb/extensions/tokens";
 * const result = encodeGetAdapter({
 *  adapterType: ...,
 * });
 * ```
 */
export declare function encodeGetAdapter(options: GetAdapterParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the getAdapter function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeGetAdapterResult } from "thirdweb/extensions/tokens";
 * const result = decodeGetAdapterResultResult("...");
 * ```
 */
export declare function decodeGetAdapterResult(result: Hex): {
    config: `0x${string}`;
    rewardLocker: `0x${string}`;
};
/**
 * Calls the "getAdapter" function on the contract.
 * @param options - The options for the getAdapter function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getAdapter } from "thirdweb/extensions/tokens";
 *
 * const result = await getAdapter({
 *  contract,
 *  adapterType: ...,
 * });
 *
 * ```
 */
export declare function getAdapter(options: BaseTransactionOptions<GetAdapterParams>): Promise<{
    config: `0x${string}`;
    rewardLocker: string;
}>;
//# sourceMappingURL=getAdapter.d.ts.map