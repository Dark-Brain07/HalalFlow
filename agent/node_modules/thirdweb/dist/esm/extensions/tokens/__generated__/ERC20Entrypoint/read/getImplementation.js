import { decodeAbiParameters } from "viem";
import { readContract } from "../../../../../transaction/read-contract.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
export const FN_SELECTOR = "0x3c2e0828";
const FN_INPUTS = [
    {
        type: "bytes32",
        name: "contractId",
    },
];
const FN_OUTPUTS = [
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
];
/**
 * Checks if the `getImplementation` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getImplementation` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isGetImplementationSupported } from "thirdweb/extensions/tokens";
 * const supported = isGetImplementationSupported(["0x..."]);
 * ```
 */
export function isGetImplementationSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "getImplementation" function.
 * @param options - The options for the getImplementation function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetImplementationParams } from "thirdweb/extensions/tokens";
 * const result = encodeGetImplementationParams({
 *  contractId: ...,
 * });
 * ```
 */
export function encodeGetImplementationParams(options) {
    return encodeAbiParameters(FN_INPUTS, [options.contractId]);
}
/**
 * Encodes the "getImplementation" function into a Hex string with its parameters.
 * @param options - The options for the getImplementation function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetImplementation } from "thirdweb/extensions/tokens";
 * const result = encodeGetImplementation({
 *  contractId: ...,
 * });
 * ```
 */
export function encodeGetImplementation(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodeGetImplementationParams(options).slice(2));
}
/**
 * Decodes the result of the getImplementation function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeGetImplementationResult } from "thirdweb/extensions/tokens";
 * const result = decodeGetImplementationResultResult("...");
 * ```
 */
export function decodeGetImplementationResult(result) {
    return decodeAbiParameters(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "getImplementation" function on the contract.
 * @param options - The options for the getImplementation function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getImplementation } from "thirdweb/extensions/tokens";
 *
 * const result = await getImplementation({
 *  contract,
 *  contractId: ...,
 * });
 *
 * ```
 */
export async function getImplementation(options) {
    return readContract({
        contract: options.contract,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.contractId],
    });
}
//# sourceMappingURL=getImplementation.js.map