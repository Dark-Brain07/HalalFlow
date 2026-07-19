import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "predictAddressByConfig" function.
 */
export type PredictAddressByConfigParams = {
    config: AbiParameterToPrimitiveType<{
        type: "tuple";
        name: "config";
        components: [
            {
                type: "bytes32";
                name: "contractId";
            },
            {
                type: "address";
                name: "implementation";
            },
            {
                type: "uint8";
                name: "implementationType";
            },
            {
                type: "uint8";
                name: "createHook";
            },
            {
                type: "bytes";
                name: "createHookData";
            }
        ];
    }>;
    creator: AbiParameterToPrimitiveType<{
        type: "address";
        name: "creator";
    }>;
    params: AbiParameterToPrimitiveType<{
        type: "tuple";
        name: "params";
        components: [
            {
                type: "address";
                name: "developer";
            },
            {
                type: "bytes32";
                name: "salt";
            },
            {
                type: "bytes";
                name: "data";
            },
            {
                type: "bytes";
                name: "hookData";
            }
        ];
    }>;
};
export declare const FN_SELECTOR: "0xbccfb6ad";
/**
 * Checks if the `predictAddressByConfig` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `predictAddressByConfig` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isPredictAddressByConfigSupported } from "thirdweb/extensions/tokens";
 * const supported = isPredictAddressByConfigSupported(["0x..."]);
 * ```
 */
export declare function isPredictAddressByConfigSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "predictAddressByConfig" function.
 * @param options - The options for the predictAddressByConfig function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodePredictAddressByConfigParams } from "thirdweb/extensions/tokens";
 * const result = encodePredictAddressByConfigParams({
 *  config: ...,
 *  creator: ...,
 *  params: ...,
 * });
 * ```
 */
export declare function encodePredictAddressByConfigParams(options: PredictAddressByConfigParams): `0x${string}`;
/**
 * Encodes the "predictAddressByConfig" function into a Hex string with its parameters.
 * @param options - The options for the predictAddressByConfig function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodePredictAddressByConfig } from "thirdweb/extensions/tokens";
 * const result = encodePredictAddressByConfig({
 *  config: ...,
 *  creator: ...,
 *  params: ...,
 * });
 * ```
 */
export declare function encodePredictAddressByConfig(options: PredictAddressByConfigParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the predictAddressByConfig function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodePredictAddressByConfigResult } from "thirdweb/extensions/tokens";
 * const result = decodePredictAddressByConfigResultResult("...");
 * ```
 */
export declare function decodePredictAddressByConfigResult(result: Hex): `0x${string}`;
/**
 * Calls the "predictAddressByConfig" function on the contract.
 * @param options - The options for the predictAddressByConfig function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { predictAddressByConfig } from "thirdweb/extensions/tokens";
 *
 * const result = await predictAddressByConfig({
 *  contract,
 *  config: ...,
 *  creator: ...,
 *  params: ...,
 * });
 *
 * ```
 */
export declare function predictAddressByConfig(options: BaseTransactionOptions<PredictAddressByConfigParams>): Promise<string>;
//# sourceMappingURL=predictAddressByConfig.d.ts.map