import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "getTransferPoliciesForSigner" function.
 */
export type GetTransferPoliciesForSignerParams = {
    signer: AbiParameterToPrimitiveType<{
        type: "address";
        name: "signer";
    }>;
};
export declare const FN_SELECTOR: "0xed6ed279";
/**
 * Checks if the `getTransferPoliciesForSigner` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getTransferPoliciesForSigner` method is supported.
 * @extension ERC7702
 * @example
 * ```ts
 * import { isGetTransferPoliciesForSignerSupported } from "thirdweb/extensions/erc7702";
 * const supported = isGetTransferPoliciesForSignerSupported(["0x..."]);
 * ```
 */
export declare function isGetTransferPoliciesForSignerSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "getTransferPoliciesForSigner" function.
 * @param options - The options for the getTransferPoliciesForSigner function.
 * @returns The encoded ABI parameters.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeGetTransferPoliciesForSignerParams } from "thirdweb/extensions/erc7702";
 * const result = encodeGetTransferPoliciesForSignerParams({
 *  signer: ...,
 * });
 * ```
 */
export declare function encodeGetTransferPoliciesForSignerParams(options: GetTransferPoliciesForSignerParams): `0x${string}`;
/**
 * Encodes the "getTransferPoliciesForSigner" function into a Hex string with its parameters.
 * @param options - The options for the getTransferPoliciesForSigner function.
 * @returns The encoded hexadecimal string.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeGetTransferPoliciesForSigner } from "thirdweb/extensions/erc7702";
 * const result = encodeGetTransferPoliciesForSigner({
 *  signer: ...,
 * });
 * ```
 */
export declare function encodeGetTransferPoliciesForSigner(options: GetTransferPoliciesForSignerParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the getTransferPoliciesForSigner function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension ERC7702
 * @example
 * ```ts
 * import { decodeGetTransferPoliciesForSignerResult } from "thirdweb/extensions/erc7702";
 * const result = decodeGetTransferPoliciesForSignerResultResult("...");
 * ```
 */
export declare function decodeGetTransferPoliciesForSignerResult(result: Hex): readonly {
    target: `0x${string}`;
    maxValuePerUse: bigint;
    valueLimit: {
        limitType: number;
        limit: bigint;
        period: bigint;
    };
}[];
/**
 * Calls the "getTransferPoliciesForSigner" function on the contract.
 * @param options - The options for the getTransferPoliciesForSigner function.
 * @returns The parsed result of the function call.
 * @extension ERC7702
 * @example
 * ```ts
 * import { getTransferPoliciesForSigner } from "thirdweb/extensions/erc7702";
 *
 * const result = await getTransferPoliciesForSigner({
 *  contract,
 *  signer: ...,
 * });
 *
 * ```
 */
export declare function getTransferPoliciesForSigner(options: BaseTransactionOptions<GetTransferPoliciesForSignerParams>): Promise<readonly {
    target: string;
    maxValuePerUse: bigint;
    valueLimit: {
        limitType: number;
        limit: bigint;
        period: bigint;
    };
}[]>;
//# sourceMappingURL=getTransferPoliciesForSigner.d.ts.map