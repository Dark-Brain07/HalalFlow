import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "predictAddress" function.
 */
export type PredictAddressParams = {
    contractId: AbiParameterToPrimitiveType<{
        type: "bytes32";
        name: "contractId";
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
export declare const FN_SELECTOR: "0x6b6963c6";
/**
 * Checks if the `predictAddress` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `predictAddress` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isPredictAddressSupported } from "thirdweb/extensions/tokens";
 * const supported = isPredictAddressSupported(["0x..."]);
 * ```
 */
export declare function isPredictAddressSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "predictAddress" function.
 * @param options - The options for the predictAddress function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodePredictAddressParams } from "thirdweb/extensions/tokens";
 * const result = encodePredictAddressParams({
 *  contractId: ...,
 *  creator: ...,
 *  params: ...,
 * });
 * ```
 */
export declare function encodePredictAddressParams(options: PredictAddressParams): `0x${string}`;
/**
 * Encodes the "predictAddress" function into a Hex string with its parameters.
 * @param options - The options for the predictAddress function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodePredictAddress } from "thirdweb/extensions/tokens";
 * const result = encodePredictAddress({
 *  contractId: ...,
 *  creator: ...,
 *  params: ...,
 * });
 * ```
 */
export declare function encodePredictAddress(options: PredictAddressParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the predictAddress function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodePredictAddressResult } from "thirdweb/extensions/tokens";
 * const result = decodePredictAddressResultResult("...");
 * ```
 */
export declare function decodePredictAddressResult(result: Hex): `0x${string}`;
/**
 * Calls the "predictAddress" function on the contract.
 * @param options - The options for the predictAddress function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { predictAddress } from "thirdweb/extensions/tokens";
 *
 * const result = await predictAddress({
 *  contract,
 *  contractId: ...,
 *  creator: ...,
 *  params: ...,
 * });
 *
 * ```
 */
export declare function predictAddress(options: BaseTransactionOptions<PredictAddressParams>): Promise<string>;
//# sourceMappingURL=predictAddress.d.ts.map