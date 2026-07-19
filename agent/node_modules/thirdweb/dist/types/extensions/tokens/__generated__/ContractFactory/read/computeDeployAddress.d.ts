import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "computeDeployAddress" function.
 */
export type ComputeDeployAddressParams = {
    deployType: AbiParameterToPrimitiveType<{
        type: "uint8";
        name: "deployType";
    }>;
    bytecode: AbiParameterToPrimitiveType<{
        type: "bytes";
        name: "bytecode";
    }>;
    constructorArgs: AbiParameterToPrimitiveType<{
        type: "bytes";
        name: "constructorArgs";
    }>;
    salt: AbiParameterToPrimitiveType<{
        type: "bytes32";
        name: "salt";
    }>;
};
export declare const FN_SELECTOR: "0xd5ec7faa";
/**
 * Checks if the `computeDeployAddress` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `computeDeployAddress` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isComputeDeployAddressSupported } from "thirdweb/extensions/tokens";
 * const supported = isComputeDeployAddressSupported(["0x..."]);
 * ```
 */
export declare function isComputeDeployAddressSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "computeDeployAddress" function.
 * @param options - The options for the computeDeployAddress function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeComputeDeployAddressParams } from "thirdweb/extensions/tokens";
 * const result = encodeComputeDeployAddressParams({
 *  deployType: ...,
 *  bytecode: ...,
 *  constructorArgs: ...,
 *  salt: ...,
 * });
 * ```
 */
export declare function encodeComputeDeployAddressParams(options: ComputeDeployAddressParams): `0x${string}`;
/**
 * Encodes the "computeDeployAddress" function into a Hex string with its parameters.
 * @param options - The options for the computeDeployAddress function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeComputeDeployAddress } from "thirdweb/extensions/tokens";
 * const result = encodeComputeDeployAddress({
 *  deployType: ...,
 *  bytecode: ...,
 *  constructorArgs: ...,
 *  salt: ...,
 * });
 * ```
 */
export declare function encodeComputeDeployAddress(options: ComputeDeployAddressParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the computeDeployAddress function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeComputeDeployAddressResult } from "thirdweb/extensions/tokens";
 * const result = decodeComputeDeployAddressResultResult("...");
 * ```
 */
export declare function decodeComputeDeployAddressResult(result: Hex): `0x${string}`;
/**
 * Calls the "computeDeployAddress" function on the contract.
 * @param options - The options for the computeDeployAddress function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { computeDeployAddress } from "thirdweb/extensions/tokens";
 *
 * const result = await computeDeployAddress({
 *  contract,
 *  deployType: ...,
 *  bytecode: ...,
 *  constructorArgs: ...,
 *  salt: ...,
 * });
 *
 * ```
 */
export declare function computeDeployAddress(options: BaseTransactionOptions<ComputeDeployAddressParams>): Promise<string>;
//# sourceMappingURL=computeDeployAddress.d.ts.map