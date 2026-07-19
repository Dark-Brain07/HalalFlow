import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "isWildcardSigner" function.
 */
export type IsWildcardSignerParams = {
    signer: AbiParameterToPrimitiveType<{
        type: "address";
        name: "signer";
    }>;
};
export declare const FN_SELECTOR: "0x16c258a7";
/**
 * Checks if the `isWildcardSigner` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `isWildcardSigner` method is supported.
 * @extension ERC7702
 * @example
 * ```ts
 * import { isIsWildcardSignerSupported } from "thirdweb/extensions/erc7702";
 * const supported = isIsWildcardSignerSupported(["0x..."]);
 * ```
 */
export declare function isIsWildcardSignerSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "isWildcardSigner" function.
 * @param options - The options for the isWildcardSigner function.
 * @returns The encoded ABI parameters.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeIsWildcardSignerParams } from "thirdweb/extensions/erc7702";
 * const result = encodeIsWildcardSignerParams({
 *  signer: ...,
 * });
 * ```
 */
export declare function encodeIsWildcardSignerParams(options: IsWildcardSignerParams): `0x${string}`;
/**
 * Encodes the "isWildcardSigner" function into a Hex string with its parameters.
 * @param options - The options for the isWildcardSigner function.
 * @returns The encoded hexadecimal string.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeIsWildcardSigner } from "thirdweb/extensions/erc7702";
 * const result = encodeIsWildcardSigner({
 *  signer: ...,
 * });
 * ```
 */
export declare function encodeIsWildcardSigner(options: IsWildcardSignerParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the isWildcardSigner function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension ERC7702
 * @example
 * ```ts
 * import { decodeIsWildcardSignerResult } from "thirdweb/extensions/erc7702";
 * const result = decodeIsWildcardSignerResultResult("...");
 * ```
 */
export declare function decodeIsWildcardSignerResult(result: Hex): boolean;
/**
 * Calls the "isWildcardSigner" function on the contract.
 * @param options - The options for the isWildcardSigner function.
 * @returns The parsed result of the function call.
 * @extension ERC7702
 * @example
 * ```ts
 * import { isWildcardSigner } from "thirdweb/extensions/erc7702";
 *
 * const result = await isWildcardSigner({
 *  contract,
 *  signer: ...,
 * });
 *
 * ```
 */
export declare function isWildcardSigner(options: BaseTransactionOptions<IsWildcardSignerParams>): Promise<boolean>;
//# sourceMappingURL=isWildcardSigner.d.ts.map