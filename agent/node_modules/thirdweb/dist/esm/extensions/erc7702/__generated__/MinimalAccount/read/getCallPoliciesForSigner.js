import { decodeAbiParameters } from "viem";
import { readContract } from "../../../../../transaction/read-contract.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
export const FN_SELECTOR = "0x7103acbb";
const FN_INPUTS = [
    {
        type: "address",
        name: "signer",
    },
];
const FN_OUTPUTS = [
    {
        type: "tuple[]",
        components: [
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
                name: "maxValuePerUse",
            },
            {
                type: "tuple",
                name: "valueLimit",
                components: [
                    {
                        type: "uint8",
                        name: "limitType",
                    },
                    {
                        type: "uint256",
                        name: "limit",
                    },
                    {
                        type: "uint256",
                        name: "period",
                    },
                ],
            },
            {
                type: "tuple[]",
                name: "constraints",
                components: [
                    {
                        type: "uint8",
                        name: "condition",
                    },
                    {
                        type: "uint64",
                        name: "index",
                    },
                    {
                        type: "bytes32",
                        name: "refValue",
                    },
                    {
                        type: "tuple",
                        name: "limit",
                        components: [
                            {
                                type: "uint8",
                                name: "limitType",
                            },
                            {
                                type: "uint256",
                                name: "limit",
                            },
                            {
                                type: "uint256",
                                name: "period",
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
/**
 * Checks if the `getCallPoliciesForSigner` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getCallPoliciesForSigner` method is supported.
 * @extension ERC7702
 * @example
 * ```ts
 * import { isGetCallPoliciesForSignerSupported } from "thirdweb/extensions/erc7702";
 * const supported = isGetCallPoliciesForSignerSupported(["0x..."]);
 * ```
 */
export function isGetCallPoliciesForSignerSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "getCallPoliciesForSigner" function.
 * @param options - The options for the getCallPoliciesForSigner function.
 * @returns The encoded ABI parameters.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeGetCallPoliciesForSignerParams } from "thirdweb/extensions/erc7702";
 * const result = encodeGetCallPoliciesForSignerParams({
 *  signer: ...,
 * });
 * ```
 */
export function encodeGetCallPoliciesForSignerParams(options) {
    return encodeAbiParameters(FN_INPUTS, [options.signer]);
}
/**
 * Encodes the "getCallPoliciesForSigner" function into a Hex string with its parameters.
 * @param options - The options for the getCallPoliciesForSigner function.
 * @returns The encoded hexadecimal string.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeGetCallPoliciesForSigner } from "thirdweb/extensions/erc7702";
 * const result = encodeGetCallPoliciesForSigner({
 *  signer: ...,
 * });
 * ```
 */
export function encodeGetCallPoliciesForSigner(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodeGetCallPoliciesForSignerParams(options).slice(2));
}
/**
 * Decodes the result of the getCallPoliciesForSigner function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension ERC7702
 * @example
 * ```ts
 * import { decodeGetCallPoliciesForSignerResult } from "thirdweb/extensions/erc7702";
 * const result = decodeGetCallPoliciesForSignerResultResult("...");
 * ```
 */
export function decodeGetCallPoliciesForSignerResult(result) {
    return decodeAbiParameters(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "getCallPoliciesForSigner" function on the contract.
 * @param options - The options for the getCallPoliciesForSigner function.
 * @returns The parsed result of the function call.
 * @extension ERC7702
 * @example
 * ```ts
 * import { getCallPoliciesForSigner } from "thirdweb/extensions/erc7702";
 *
 * const result = await getCallPoliciesForSigner({
 *  contract,
 *  signer: ...,
 * });
 *
 * ```
 */
export async function getCallPoliciesForSigner(options) {
    return readContract({
        contract: options.contract,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.signer],
    });
}
//# sourceMappingURL=getCallPoliciesForSigner.js.map