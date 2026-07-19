import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "getImplementation" function.
 */
export type GetImplementationParams = {
    contractId: AbiParameterToPrimitiveType<{
        type: "bytes32";
        name: "contractId";
    }>;
};
export declare const FN_SELECTOR: "0x3c2e0828";
/**
 * Checks if the `getImplementation` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getImplementation` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isGetImplementationSupported } from "thirdweb/extensions/tokens";
 * const supported = isGetImplementationSupported(["0x..."]);
 * ```
 */
export declare function isGetImplementationSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "getImplementation" function.
 * @param options - The options for the getImplementation function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetImplementationParams } from "thirdweb/extensions/tokens";
 * const result = encodeGetImplementationParams({
 *  contractId: ...,
 * });
 * ```
 */
export declare function encodeGetImplementationParams(options: GetImplementationParams): `0x${string}`;
/**
 * Encodes the "getImplementation" function into a Hex string with its parameters.
 * @param options - The options for the getImplementation function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetImplementation } from "thirdweb/extensions/tokens";
 * const result = encodeGetImplementation({
 *  contractId: ...,
 * });
 * ```
 */
export declare function encodeGetImplementation(options: GetImplementationParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the getImplementation function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeGetImplementationResult } from "thirdweb/extensions/tokens";
 * const result = decodeGetImplementationResultResult("...");
 * ```
 */
export declare function decodeGetImplementationResult(result: Hex): {
    contractId: `0x${string}`;
    implementation: `0x${string}`;
    implementationType: number;
    createHook: number;
    createHookData: `0x${string}`;
};
/**
 * Calls the "getImplementation" function on the contract.
 * @param options - The options for the getImplementation function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getImplementation } from "thirdweb/extensions/tokens";
 *
 * const result = await getImplementation({
 *  contract,
 *  contractId: ...,
 * });
 *
 * ```
 */
export declare function getImplementation(options: BaseTransactionOptions<GetImplementationParams>): Promise<{
    contractId: `0x${string}`;
    implementation: string;
    implementationType: number;
    createHook: number;
    createHookData: `0x${string}`;
}>;
//# sourceMappingURL=getImplementation.d.ts.map