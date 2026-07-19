import { decodeAbiParameters } from "viem";
import { readContract } from "../../../../../transaction/read-contract.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
export const FN_SELECTOR = "0xcb62c6b6";
const FN_INPUTS = [
    {
        type: "address",
        name: "asset",
    },
];
const FN_OUTPUTS = [
    {
        type: "tuple[]",
        name: "positions",
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
                type: "address",
                name: "positionManager",
            },
            {
                type: "address",
                name: "rewardLocker",
            },
        ],
    },
];
/**
 * Checks if the `getRewardPositions` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getRewardPositions` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isGetRewardPositionsSupported } from "thirdweb/extensions/tokens";
 * const supported = isGetRewardPositionsSupported(["0x..."]);
 * ```
 */
export function isGetRewardPositionsSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "getRewardPositions" function.
 * @param options - The options for the getRewardPositions function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetRewardPositionsParams } from "thirdweb/extensions/tokens";
 * const result = encodeGetRewardPositionsParams({
 *  asset: ...,
 * });
 * ```
 */
export function encodeGetRewardPositionsParams(options) {
    return encodeAbiParameters(FN_INPUTS, [options.asset]);
}
/**
 * Encodes the "getRewardPositions" function into a Hex string with its parameters.
 * @param options - The options for the getRewardPositions function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetRewardPositions } from "thirdweb/extensions/tokens";
 * const result = encodeGetRewardPositions({
 *  asset: ...,
 * });
 * ```
 */
export function encodeGetRewardPositions(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodeGetRewardPositionsParams(options).slice(2));
}
/**
 * Decodes the result of the getRewardPositions function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeGetRewardPositionsResult } from "thirdweb/extensions/tokens";
 * const result = decodeGetRewardPositionsResultResult("...");
 * ```
 */
export function decodeGetRewardPositionsResult(result) {
    return decodeAbiParameters(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "getRewardPositions" function on the contract.
 * @param options - The options for the getRewardPositions function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getRewardPositions } from "thirdweb/extensions/tokens";
 *
 * const result = await getRewardPositions({
 *  contract,
 *  asset: ...,
 * });
 *
 * ```
 */
export async function getRewardPositions(options) {
    return readContract({
        contract: options.contract,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.asset],
    });
}
//# sourceMappingURL=getRewardPositions.js.map