import { decodeAbiParameters } from "viem";
import { readContract } from "../../../../../transaction/read-contract.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
export const FN_SELECTOR = "0xe9c6b4c1";
const FN_INPUTS = [
    {
        type: "address",
        name: "owner",
    },
    {
        type: "address",
        name: "asset",
    },
];
const FN_OUTPUTS = [
    {
        type: "tuple",
        components: [
            {
                type: "uint256",
                name: "positionId",
            },
            {
                type: "address",
                name: "recipient",
            },
            {
                type: "address",
                name: "developer",
            },
            {
                type: "uint16",
                name: "developerBps",
            },
            {
                type: "bytes",
                name: "data",
            },
        ],
    },
];
/**
 * Checks if the `position` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `position` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isPositionSupported } from "thirdweb/extensions/tokens";
 * const supported = isPositionSupported(["0x..."]);
 * ```
 */
export function isPositionSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "position" function.
 * @param options - The options for the position function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodePositionParams } from "thirdweb/extensions/tokens";
 * const result = encodePositionParams({
 *  owner: ...,
 *  asset: ...,
 * });
 * ```
 */
export function encodePositionParams(options) {
    return encodeAbiParameters(FN_INPUTS, [options.owner, options.asset]);
}
/**
 * Encodes the "position" function into a Hex string with its parameters.
 * @param options - The options for the position function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodePosition } from "thirdweb/extensions/tokens";
 * const result = encodePosition({
 *  owner: ...,
 *  asset: ...,
 * });
 * ```
 */
export function encodePosition(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodePositionParams(options).slice(2));
}
/**
 * Decodes the result of the position function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodePositionResult } from "thirdweb/extensions/tokens";
 * const result = decodePositionResultResult("...");
 * ```
 */
export function decodePositionResult(result) {
    return decodeAbiParameters(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "position" function on the contract.
 * @param options - The options for the position function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { position } from "thirdweb/extensions/tokens";
 *
 * const result = await position({
 *  contract,
 *  owner: ...,
 *  asset: ...,
 * });
 *
 * ```
 */
export async function position(options) {
    return readContract({
        contract: options.contract,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.owner, options.asset],
    });
}
//# sourceMappingURL=position.js.map