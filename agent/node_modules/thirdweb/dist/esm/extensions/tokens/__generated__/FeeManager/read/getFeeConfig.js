import { decodeAbiParameters } from "viem";
import { readContract } from "../../../../../transaction/read-contract.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
export const FN_SELECTOR = "0x17305ee1";
const FN_INPUTS = [
    {
        type: "address",
        name: "target",
    },
    {
        type: "bytes4",
        name: "action",
    },
];
const FN_OUTPUTS = [
    {
        type: "tuple",
        name: "config",
        components: [
            {
                type: "address",
                name: "recipient",
            },
            {
                type: "uint8",
                name: "feeType",
            },
            {
                type: "uint256",
                name: "value",
            },
        ],
    },
];
/**
 * Checks if the `getFeeConfig` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getFeeConfig` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isGetFeeConfigSupported } from "thirdweb/extensions/tokens";
 * const supported = isGetFeeConfigSupported(["0x..."]);
 * ```
 */
export function isGetFeeConfigSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "getFeeConfig" function.
 * @param options - The options for the getFeeConfig function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetFeeConfigParams } from "thirdweb/extensions/tokens";
 * const result = encodeGetFeeConfigParams({
 *  target: ...,
 *  action: ...,
 * });
 * ```
 */
export function encodeGetFeeConfigParams(options) {
    return encodeAbiParameters(FN_INPUTS, [options.target, options.action]);
}
/**
 * Encodes the "getFeeConfig" function into a Hex string with its parameters.
 * @param options - The options for the getFeeConfig function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetFeeConfig } from "thirdweb/extensions/tokens";
 * const result = encodeGetFeeConfig({
 *  target: ...,
 *  action: ...,
 * });
 * ```
 */
export function encodeGetFeeConfig(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodeGetFeeConfigParams(options).slice(2));
}
/**
 * Decodes the result of the getFeeConfig function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeGetFeeConfigResult } from "thirdweb/extensions/tokens";
 * const result = decodeGetFeeConfigResultResult("...");
 * ```
 */
export function decodeGetFeeConfigResult(result) {
    return decodeAbiParameters(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "getFeeConfig" function on the contract.
 * @param options - The options for the getFeeConfig function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getFeeConfig } from "thirdweb/extensions/tokens";
 *
 * const result = await getFeeConfig({
 *  contract,
 *  target: ...,
 *  action: ...,
 * });
 *
 * ```
 */
export async function getFeeConfig(options) {
    return readContract({
        contract: options.contract,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.target, options.action],
    });
}
//# sourceMappingURL=getFeeConfig.js.map