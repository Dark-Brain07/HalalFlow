import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "usedNonces" function.
 */
export type UsedNoncesParams = {
    signerNonce: AbiParameterToPrimitiveType<{
        type: "bytes32";
        name: "signerNonce";
    }>;
};
export declare const FN_SELECTOR: "0xfeb61724";
/**
 * Checks if the `usedNonces` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `usedNonces` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isUsedNoncesSupported } from "thirdweb/extensions/tokens";
 * const supported = isUsedNoncesSupported(["0x..."]);
 * ```
 */
export declare function isUsedNoncesSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "usedNonces" function.
 * @param options - The options for the usedNonces function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeUsedNoncesParams } from "thirdweb/extensions/tokens";
 * const result = encodeUsedNoncesParams({
 *  signerNonce: ...,
 * });
 * ```
 */
export declare function encodeUsedNoncesParams(options: UsedNoncesParams): `0x${string}`;
/**
 * Encodes the "usedNonces" function into a Hex string with its parameters.
 * @param options - The options for the usedNonces function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeUsedNonces } from "thirdweb/extensions/tokens";
 * const result = encodeUsedNonces({
 *  signerNonce: ...,
 * });
 * ```
 */
export declare function encodeUsedNonces(options: UsedNoncesParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the usedNonces function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeUsedNoncesResult } from "thirdweb/extensions/tokens";
 * const result = decodeUsedNoncesResultResult("...");
 * ```
 */
export declare function decodeUsedNoncesResult(result: Hex): boolean;
/**
 * Calls the "usedNonces" function on the contract.
 * @param options - The options for the usedNonces function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { usedNonces } from "thirdweb/extensions/tokens";
 *
 * const result = await usedNonces({
 *  contract,
 *  signerNonce: ...,
 * });
 *
 * ```
 */
export declare function usedNonces(options: BaseTransactionOptions<UsedNoncesParams>): Promise<boolean>;
//# sourceMappingURL=usedNonces.d.ts.map