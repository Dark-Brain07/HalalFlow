import { decodeAbiParameters } from "viem";
import { readContract } from "../../../../../transaction/read-contract.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
export const FN_SELECTOR = "0xd5ebb1df";
const FN_INPUTS = [
    {
        type: "bytes32",
        name: "salt",
    },
    {
        type: "address",
        name: "creator",
    },
    {
        type: "bytes",
        name: "contractInitData",
    },
    {
        type: "bytes",
        name: "hookInitData",
    },
];
const FN_OUTPUTS = [
    {
        type: "bytes32",
    },
];
/**
 * Checks if the `guardSalt` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `guardSalt` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isGuardSaltSupported } from "thirdweb/extensions/tokens";
 * const supported = isGuardSaltSupported(["0x..."]);
 * ```
 */
export function isGuardSaltSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "guardSalt" function.
 * @param options - The options for the guardSalt function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGuardSaltParams } from "thirdweb/extensions/tokens";
 * const result = encodeGuardSaltParams({
 *  salt: ...,
 *  creator: ...,
 *  contractInitData: ...,
 *  hookInitData: ...,
 * });
 * ```
 */
export function encodeGuardSaltParams(options) {
    return encodeAbiParameters(FN_INPUTS, [
        options.salt,
        options.creator,
        options.contractInitData,
        options.hookInitData,
    ]);
}
/**
 * Encodes the "guardSalt" function into a Hex string with its parameters.
 * @param options - The options for the guardSalt function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGuardSalt } from "thirdweb/extensions/tokens";
 * const result = encodeGuardSalt({
 *  salt: ...,
 *  creator: ...,
 *  contractInitData: ...,
 *  hookInitData: ...,
 * });
 * ```
 */
export function encodeGuardSalt(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodeGuardSaltParams(options).slice(2));
}
/**
 * Decodes the result of the guardSalt function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeGuardSaltResult } from "thirdweb/extensions/tokens";
 * const result = decodeGuardSaltResultResult("...");
 * ```
 */
export function decodeGuardSaltResult(result) {
    return decodeAbiParameters(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "guardSalt" function on the contract.
 * @param options - The options for the guardSalt function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { guardSalt } from "thirdweb/extensions/tokens";
 *
 * const result = await guardSalt({
 *  contract,
 *  salt: ...,
 *  creator: ...,
 *  contractInitData: ...,
 *  hookInitData: ...,
 * });
 *
 * ```
 */
export async function guardSalt(options) {
    return readContract({
        contract: options.contract,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [
            options.salt,
            options.creator,
            options.contractInitData,
            options.hookInitData,
        ],
    });
}
//# sourceMappingURL=guardSalt.js.map