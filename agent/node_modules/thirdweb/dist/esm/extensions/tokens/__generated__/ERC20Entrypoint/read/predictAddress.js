import { decodeAbiParameters } from "viem";
import { readContract } from "../../../../../transaction/read-contract.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
export const FN_SELECTOR = "0x6b6963c6";
const FN_INPUTS = [
    {
        type: "bytes32",
        name: "contractId",
    },
    {
        type: "address",
        name: "creator",
    },
    {
        type: "tuple",
        name: "params",
        components: [
            {
                type: "address",
                name: "developer",
            },
            {
                type: "bytes32",
                name: "salt",
            },
            {
                type: "bytes",
                name: "data",
            },
            {
                type: "bytes",
                name: "hookData",
            },
        ],
    },
];
const FN_OUTPUTS = [
    {
        type: "address",
        name: "predicted",
    },
];
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
export function isPredictAddressSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
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
export function encodePredictAddressParams(options) {
    return encodeAbiParameters(FN_INPUTS, [
        options.contractId,
        options.creator,
        options.params,
    ]);
}
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
export function encodePredictAddress(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodePredictAddressParams(options).slice(2));
}
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
export function decodePredictAddressResult(result) {
    return decodeAbiParameters(FN_OUTPUTS, result)[0];
}
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
export async function predictAddress(options) {
    return readContract({
        contract: options.contract,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.contractId, options.creator, options.params],
    });
}
//# sourceMappingURL=predictAddress.js.map