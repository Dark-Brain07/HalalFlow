import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "getSessionExpirationForSigner" function.
 */
export type GetSessionExpirationForSignerParams = {
    signer: AbiParameterToPrimitiveType<{
        type: "address";
        name: "signer";
    }>;
};
export declare const FN_SELECTOR: "0xf0a83adf";
/**
 * Checks if the `getSessionExpirationForSigner` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getSessionExpirationForSigner` method is supported.
 * @extension ERC7702
 * @example
 * ```ts
 * import { isGetSessionExpirationForSignerSupported } from "thirdweb/extensions/erc7702";
 * const supported = isGetSessionExpirationForSignerSupported(["0x..."]);
 * ```
 */
export declare function isGetSessionExpirationForSignerSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "getSessionExpirationForSigner" function.
 * @param options - The options for the getSessionExpirationForSigner function.
 * @returns The encoded ABI parameters.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeGetSessionExpirationForSignerParams } from "thirdweb/extensions/erc7702";
 * const result = encodeGetSessionExpirationForSignerParams({
 *  signer: ...,
 * });
 * ```
 */
export declare function encodeGetSessionExpirationForSignerParams(options: GetSessionExpirationForSignerParams): `0x${string}`;
/**
 * Encodes the "getSessionExpirationForSigner" function into a Hex string with its parameters.
 * @param options - The options for the getSessionExpirationForSigner function.
 * @returns The encoded hexadecimal string.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeGetSessionExpirationForSigner } from "thirdweb/extensions/erc7702";
 * const result = encodeGetSessionExpirationForSigner({
 *  signer: ...,
 * });
 * ```
 */
export declare function encodeGetSessionExpirationForSigner(options: GetSessionExpirationForSignerParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the getSessionExpirationForSigner function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension ERC7702
 * @example
 * ```ts
 * import { decodeGetSessionExpirationForSignerResult } from "thirdweb/extensions/erc7702";
 * const result = decodeGetSessionExpirationForSignerResultResult("...");
 * ```
 */
export declare function decodeGetSessionExpirationForSignerResult(result: Hex): bigint;
/**
 * Calls the "getSessionExpirationForSigner" function on the contract.
 * @param options - The options for the getSessionExpirationForSigner function.
 * @returns The parsed result of the function call.
 * @extension ERC7702
 * @example
 * ```ts
 * import { getSessionExpirationForSigner } from "thirdweb/extensions/erc7702";
 *
 * const result = await getSessionExpirationForSigner({
 *  contract,
 *  signer: ...,
 * });
 *
 * ```
 */
export declare function getSessionExpirationForSigner(options: BaseTransactionOptions<GetSessionExpirationForSignerParams>): Promise<bigint>;
//# sourceMappingURL=getSessionExpirationForSigner.d.ts.map