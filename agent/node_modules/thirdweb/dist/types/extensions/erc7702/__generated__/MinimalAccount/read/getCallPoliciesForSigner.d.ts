import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "getCallPoliciesForSigner" function.
 */
export type GetCallPoliciesForSignerParams = {
    signer: AbiParameterToPrimitiveType<{
        type: "address";
        name: "signer";
    }>;
};
export declare const FN_SELECTOR: "0x7103acbb";
/**
 * Checks if the `getCallPoliciesForSigner` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getCallPoliciesForSigner` method is supported.
 * @extension ERC7702
 * @example
 * ```ts
 * import { isGetCallPoliciesForSignerSupported } from "thirdweb/extensions/erc7702";
 * const supported = isGetCallPoliciesForSignerSupported(["0x..."]);
 * ```
 */
export declare function isGetCallPoliciesForSignerSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "getCallPoliciesForSigner" function.
 * @param options - The options for the getCallPoliciesForSigner function.
 * @returns The encoded ABI parameters.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeGetCallPoliciesForSignerParams } from "thirdweb/extensions/erc7702";
 * const result = encodeGetCallPoliciesForSignerParams({
 *  signer: ...,
 * });
 * ```
 */
export declare function encodeGetCallPoliciesForSignerParams(options: GetCallPoliciesForSignerParams): `0x${string}`;
/**
 * Encodes the "getCallPoliciesForSigner" function into a Hex string with its parameters.
 * @param options - The options for the getCallPoliciesForSigner function.
 * @returns The encoded hexadecimal string.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeGetCallPoliciesForSigner } from "thirdweb/extensions/erc7702";
 * const result = encodeGetCallPoliciesForSigner({
 *  signer: ...,
 * });
 * ```
 */
export declare function encodeGetCallPoliciesForSigner(options: GetCallPoliciesForSignerParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the getCallPoliciesForSigner function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension ERC7702
 * @example
 * ```ts
 * import { decodeGetCallPoliciesForSignerResult } from "thirdweb/extensions/erc7702";
 * const result = decodeGetCallPoliciesForSignerResultResult("...");
 * ```
 */
export declare function decodeGetCallPoliciesForSignerResult(result: Hex): readonly {
    target: `0x${string}`;
    selector: `0x${string}`;
    maxValuePerUse: bigint;
    valueLimit: {
        limitType: number;
        limit: bigint;
        period: bigint;
    };
    constraints: readonly {
        condition: number;
        index: bigint;
        refValue: `0x${string}`;
        limit: {
            limitType: number;
            limit: bigint;
            period: bigint;
        };
    }[];
}[];
/**
 * Calls the "getCallPoliciesForSigner" function on the contract.
 * @param options - The options for the getCallPoliciesForSigner function.
 * @returns The parsed result of the function call.
 * @extension ERC7702
 * @example
 * ```ts
 * import { getCallPoliciesForSigner } from "thirdweb/extensions/erc7702";
 *
 * const result = await getCallPoliciesForSigner({
 *  contract,
 *  signer: ...,
 * });
 *
 * ```
 */
export declare function getCallPoliciesForSigner(options: BaseTransactionOptions<GetCallPoliciesForSignerParams>): Promise<readonly {
    target: string;
    selector: `0x${string}`;
    maxValuePerUse: bigint;
    valueLimit: {
        limitType: number;
        limit: bigint;
        period: bigint;
    };
    constraints: readonly {
        condition: number;
        index: bigint;
        refValue: `0x${string}`;
        limit: {
            limitType: number;
            limit: bigint;
            period: bigint;
        };
    }[];
}[]>;
//# sourceMappingURL=getCallPoliciesForSigner.d.ts.map