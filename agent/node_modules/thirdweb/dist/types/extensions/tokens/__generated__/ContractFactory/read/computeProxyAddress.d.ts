import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "computeProxyAddress" function.
 */
export type ComputeProxyAddressParams = {
    deployType: AbiParameterToPrimitiveType<{
        type: "uint8";
        name: "deployType";
    }>;
    implementation: AbiParameterToPrimitiveType<{
        type: "address";
        name: "implementation";
    }>;
    data: AbiParameterToPrimitiveType<{
        type: "bytes";
        name: "data";
    }>;
    salt: AbiParameterToPrimitiveType<{
        type: "bytes32";
        name: "salt";
    }>;
};
export declare const FN_SELECTOR: "0xbef11b31";
/**
 * Checks if the `computeProxyAddress` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `computeProxyAddress` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isComputeProxyAddressSupported } from "thirdweb/extensions/tokens";
 * const supported = isComputeProxyAddressSupported(["0x..."]);
 * ```
 */
export declare function isComputeProxyAddressSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "computeProxyAddress" function.
 * @param options - The options for the computeProxyAddress function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeComputeProxyAddressParams } from "thirdweb/extensions/tokens";
 * const result = encodeComputeProxyAddressParams({
 *  deployType: ...,
 *  implementation: ...,
 *  data: ...,
 *  salt: ...,
 * });
 * ```
 */
export declare function encodeComputeProxyAddressParams(options: ComputeProxyAddressParams): `0x${string}`;
/**
 * Encodes the "computeProxyAddress" function into a Hex string with its parameters.
 * @param options - The options for the computeProxyAddress function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeComputeProxyAddress } from "thirdweb/extensions/tokens";
 * const result = encodeComputeProxyAddress({
 *  deployType: ...,
 *  implementation: ...,
 *  data: ...,
 *  salt: ...,
 * });
 * ```
 */
export declare function encodeComputeProxyAddress(options: ComputeProxyAddressParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the computeProxyAddress function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeComputeProxyAddressResult } from "thirdweb/extensions/tokens";
 * const result = decodeComputeProxyAddressResultResult("...");
 * ```
 */
export declare function decodeComputeProxyAddressResult(result: Hex): `0x${string}`;
/**
 * Calls the "computeProxyAddress" function on the contract.
 * @param options - The options for the computeProxyAddress function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { computeProxyAddress } from "thirdweb/extensions/tokens";
 *
 * const result = await computeProxyAddress({
 *  contract,
 *  deployType: ...,
 *  implementation: ...,
 *  data: ...,
 *  salt: ...,
 * });
 *
 * ```
 */
export declare function computeProxyAddress(options: BaseTransactionOptions<ComputeProxyAddressParams>): Promise<string>;
//# sourceMappingURL=computeProxyAddress.d.ts.map