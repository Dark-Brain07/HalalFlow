import { decodeAbiParameters } from "viem";
import { readContract } from "../../../../../transaction/read-contract.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
export const FN_SELECTOR = "0x758515e1";
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
];
/**
 * Checks if the `feeConfigs` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `feeConfigs` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isFeeConfigsSupported } from "thirdweb/extensions/tokens";
 * const supported = isFeeConfigsSupported(["0x..."]);
 * ```
 */
export function isFeeConfigsSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "feeConfigs" function.
 * @param options - The options for the feeConfigs function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeFeeConfigsParams } from "thirdweb/extensions/tokens";
 * const result = encodeFeeConfigsParams({
 *  target: ...,
 *  action: ...,
 * });
 * ```
 */
export function encodeFeeConfigsParams(options) {
    return encodeAbiParameters(FN_INPUTS, [options.target, options.action]);
}
/**
 * Encodes the "feeConfigs" function into a Hex string with its parameters.
 * @param options - The options for the feeConfigs function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeFeeConfigs } from "thirdweb/extensions/tokens";
 * const result = encodeFeeConfigs({
 *  target: ...,
 *  action: ...,
 * });
 * ```
 */
export function encodeFeeConfigs(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodeFeeConfigsParams(options).slice(2));
}
/**
 * Decodes the result of the feeConfigs function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeFeeConfigsResult } from "thirdweb/extensions/tokens";
 * const result = decodeFeeConfigsResultResult("...");
 * ```
 */
export function decodeFeeConfigsResult(result) {
    return decodeAbiParameters(FN_OUTPUTS, result);
}
/**
 * Calls the "feeConfigs" function on the contract.
 * @param options - The options for the feeConfigs function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { feeConfigs } from "thirdweb/extensions/tokens";
 *
 * const result = await feeConfigs({
 *  contract,
 *  target: ...,
 *  action: ...,
 * });
 *
 * ```
 */
export async function feeConfigs(options) {
    return readContract({
        contract: options.contract,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.target, options.action],
    });
}
//# sourceMappingURL=feeConfigs.js.map