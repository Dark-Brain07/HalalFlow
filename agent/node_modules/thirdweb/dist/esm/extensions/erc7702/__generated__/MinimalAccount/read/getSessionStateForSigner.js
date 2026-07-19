import { decodeAbiParameters } from "viem";
import { readContract } from "../../../../../transaction/read-contract.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
export const FN_SELECTOR = "0x74e25eb2";
const FN_INPUTS = [
    {
        type: "address",
        name: "signer",
    },
];
const FN_OUTPUTS = [
    {
        type: "tuple",
        components: [
            {
                type: "tuple[]",
                name: "transferValue",
                components: [
                    {
                        type: "uint256",
                        name: "remaining",
                    },
                    {
                        type: "address",
                        name: "target",
                    },
                    {
                        type: "bytes4",
                        name: "selector",
                    },
                    {
                        type: "uint256",
                        name: "index",
                    },
                ],
            },
            {
                type: "tuple[]",
                name: "callValue",
                components: [
                    {
                        type: "uint256",
                        name: "remaining",
                    },
                    {
                        type: "address",
                        name: "target",
                    },
                    {
                        type: "bytes4",
                        name: "selector",
                    },
                    {
                        type: "uint256",
                        name: "index",
                    },
                ],
            },
            {
                type: "tuple[]",
                name: "callParams",
                components: [
                    {
                        type: "uint256",
                        name: "remaining",
                    },
                    {
                        type: "address",
                        name: "target",
                    },
                    {
                        type: "bytes4",
                        name: "selector",
                    },
                    {
                        type: "uint256",
                        name: "index",
                    },
                ],
            },
        ],
    },
];
/**
 * Checks if the `getSessionStateForSigner` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getSessionStateForSigner` method is supported.
 * @extension ERC7702
 * @example
 * ```ts
 * import { isGetSessionStateForSignerSupported } from "thirdweb/extensions/erc7702";
 * const supported = isGetSessionStateForSignerSupported(["0x..."]);
 * ```
 */
export function isGetSessionStateForSignerSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "getSessionStateForSigner" function.
 * @param options - The options for the getSessionStateForSigner function.
 * @returns The encoded ABI parameters.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeGetSessionStateForSignerParams } from "thirdweb/extensions/erc7702";
 * const result = encodeGetSessionStateForSignerParams({
 *  signer: ...,
 * });
 * ```
 */
export function encodeGetSessionStateForSignerParams(options) {
    return encodeAbiParameters(FN_INPUTS, [options.signer]);
}
/**
 * Encodes the "getSessionStateForSigner" function into a Hex string with its parameters.
 * @param options - The options for the getSessionStateForSigner function.
 * @returns The encoded hexadecimal string.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeGetSessionStateForSigner } from "thirdweb/extensions/erc7702";
 * const result = encodeGetSessionStateForSigner({
 *  signer: ...,
 * });
 * ```
 */
export function encodeGetSessionStateForSigner(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodeGetSessionStateForSignerParams(options).slice(2));
}
/**
 * Decodes the result of the getSessionStateForSigner function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension ERC7702
 * @example
 * ```ts
 * import { decodeGetSessionStateForSignerResult } from "thirdweb/extensions/erc7702";
 * const result = decodeGetSessionStateForSignerResultResult("...");
 * ```
 */
export function decodeGetSessionStateForSignerResult(result) {
    return decodeAbiParameters(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "getSessionStateForSigner" function on the contract.
 * @param options - The options for the getSessionStateForSigner function.
 * @returns The parsed result of the function call.
 * @extension ERC7702
 * @example
 * ```ts
 * import { getSessionStateForSigner } from "thirdweb/extensions/erc7702";
 *
 * const result = await getSessionStateForSigner({
 *  contract,
 *  signer: ...,
 * });
 *
 * ```
 */
export async function getSessionStateForSigner(options) {
    return readContract({
        contract: options.contract,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.signer],
    });
}
//# sourceMappingURL=getSessionStateForSigner.js.map