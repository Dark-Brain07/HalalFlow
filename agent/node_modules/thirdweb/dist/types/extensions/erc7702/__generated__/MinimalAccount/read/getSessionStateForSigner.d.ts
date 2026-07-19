import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "getSessionStateForSigner" function.
 */
export type GetSessionStateForSignerParams = {
    signer: AbiParameterToPrimitiveType<{
        type: "address";
        name: "signer";
    }>;
};
export declare const FN_SELECTOR: "0x74e25eb2";
/**
 * Checks if the `getSessionStateForSigner` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getSessionStateForSigner` method is supported.
 * @extension ERC7702
 * @example
 * ```ts
 * import { isGetSessionStateForSignerSupported } from "thirdweb/extensions/erc7702";
 * const supported = isGetSessionStateForSignerSupported(["0x..."]);
 * ```
 */
export declare function isGetSessionStateForSignerSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "getSessionStateForSigner" function.
 * @param options - The options for the getSessionStateForSigner function.
 * @returns The encoded ABI parameters.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeGetSessionStateForSignerParams } from "thirdweb/extensions/erc7702";
 * const result = encodeGetSessionStateForSignerParams({
 *  signer: ...,
 * });
 * ```
 */
export declare function encodeGetSessionStateForSignerParams(options: GetSessionStateForSignerParams): `0x${string}`;
/**
 * Encodes the "getSessionStateForSigner" function into a Hex string with its parameters.
 * @param options - The options for the getSessionStateForSigner function.
 * @returns The encoded hexadecimal string.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeGetSessionStateForSigner } from "thirdweb/extensions/erc7702";
 * const result = encodeGetSessionStateForSigner({
 *  signer: ...,
 * });
 * ```
 */
export declare function encodeGetSessionStateForSigner(options: GetSessionStateForSignerParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the getSessionStateForSigner function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension ERC7702
 * @example
 * ```ts
 * import { decodeGetSessionStateForSignerResult } from "thirdweb/extensions/erc7702";
 * const result = decodeGetSessionStateForSignerResultResult("...");
 * ```
 */
export declare function decodeGetSessionStateForSignerResult(result: Hex): {
    transferValue: readonly {
        remaining: bigint;
        target: `0x${string}`;
        selector: `0x${string}`;
        index: bigint;
    }[];
    callValue: readonly {
        remaining: bigint;
        target: `0x${string}`;
        selector: `0x${string}`;
        index: bigint;
    }[];
    callParams: readonly {
        remaining: bigint;
        target: `0x${string}`;
        selector: `0x${string}`;
        index: bigint;
    }[];
};
/**
 * Calls the "getSessionStateForSigner" function on the contract.
 * @param options - The options for the getSessionStateForSigner function.
 * @returns The parsed result of the function call.
 * @extension ERC7702
 * @example
 * ```ts
 * import { getSessionStateForSigner } from "thirdweb/extensions/erc7702";
 *
 * const result = await getSessionStateForSigner({
 *  contract,
 *  signer: ...,
 * });
 *
 * ```
 */
export declare function getSessionStateForSigner(options: BaseTransactionOptions<GetSessionStateForSignerParams>): Promise<{
    transferValue: readonly {
        remaining: bigint;
        target: string;
        selector: `0x${string}`;
        index: bigint;
    }[];
    callValue: readonly {
        remaining: bigint;
        target: string;
        selector: `0x${string}`;
        index: bigint;
    }[];
    callParams: readonly {
        remaining: bigint;
        target: string;
        selector: `0x${string}`;
        index: bigint;
    }[];
}>;
//# sourceMappingURL=getSessionStateForSigner.d.ts.map