import { decodeAbiParameters } from "viem";
import { readContract } from "../../../../../transaction/read-contract.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
export const FN_SELECTOR = "0xbccfb6ad";
const FN_INPUTS = [
    {
        type: "tuple",
        name: "config",
        components: [
            {
                type: "bytes32",
                name: "contractId",
            },
            {
                type: "address",
                name: "implementation",
            },
            {
                type: "uint8",
                name: "implementationType",
            },
            {
                type: "uint8",
                name: "createHook",
            },
            {
                type: "bytes",
                name: "createHookData",
            },
        ],
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
export function isPredictAddressByConfigSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
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
export function encodePredictAddressByConfigParams(options) {
    return encodeAbiParameters(FN_INPUTS, [
        options.config,
        options.creator,
        options.params,
    ]);
}
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
export function encodePredictAddressByConfig(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodePredictAddressByConfigParams(options).slice(2));
}
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
export function decodePredictAddressByConfigResult(result) {
    return decodeAbiParameters(FN_OUTPUTS, result)[0];
}
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
export async function predictAddressByConfig(options) {
    return readContract({
        contract: options.contract,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.config, options.creator, options.params],
    });
}
//# sourceMappingURL=predictAddressByConfig.js.map