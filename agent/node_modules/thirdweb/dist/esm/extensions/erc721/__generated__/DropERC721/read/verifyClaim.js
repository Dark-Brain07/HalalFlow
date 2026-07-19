import { decodeAbiParameters } from "viem";
import { readContract } from "../../../../../transaction/read-contract.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
export const FN_SELECTOR = "0x23a2902b";
const FN_INPUTS = [
    {
        name: "_conditionId",
        type: "uint256",
    },
    {
        name: "_claimer",
        type: "address",
    },
    {
        name: "_quantity",
        type: "uint256",
    },
    {
        name: "_currency",
        type: "address",
    },
    {
        name: "_pricePerToken",
        type: "uint256",
    },
    {
        components: [
            {
                name: "proof",
                type: "bytes32[]",
            },
            {
                name: "quantityLimitPerWallet",
                type: "uint256",
            },
            {
                name: "pricePerToken",
                type: "uint256",
            },
            {
                name: "currency",
                type: "address",
            },
        ],
        name: "_allowlistProof",
        type: "tuple",
    },
];
const FN_OUTPUTS = [
    {
        name: "isOverride",
        type: "bool",
    },
];
/**
 * Checks if the `verifyClaim` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `verifyClaim` method is supported.
 * @extension ERC721
 * @example
 * ```ts
 * import { isVerifyClaimSupported } from "thirdweb/extensions/erc721";
 * const supported = isVerifyClaimSupported(["0x..."]);
 * ```
 */
export function isVerifyClaimSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "verifyClaim" function.
 * @param options - The options for the verifyClaim function.
 * @returns The encoded ABI parameters.
 * @extension ERC721
 * @example
 * ```ts
 * import { encodeVerifyClaimParams } from "thirdweb/extensions/erc721";
 * const result = encodeVerifyClaimParams({
 *  conditionId: ...,
 *  claimer: ...,
 *  quantity: ...,
 *  currency: ...,
 *  pricePerToken: ...,
 *  allowlistProof: ...,
 * });
 * ```
 */
export function encodeVerifyClaimParams(options) {
    return encodeAbiParameters(FN_INPUTS, [
        options.conditionId,
        options.claimer,
        options.quantity,
        options.currency,
        options.pricePerToken,
        options.allowlistProof,
    ]);
}
/**
 * Encodes the "verifyClaim" function into a Hex string with its parameters.
 * @param options - The options for the verifyClaim function.
 * @returns The encoded hexadecimal string.
 * @extension ERC721
 * @example
 * ```ts
 * import { encodeVerifyClaim } from "thirdweb/extensions/erc721";
 * const result = encodeVerifyClaim({
 *  conditionId: ...,
 *  claimer: ...,
 *  quantity: ...,
 *  currency: ...,
 *  pricePerToken: ...,
 *  allowlistProof: ...,
 * });
 * ```
 */
export function encodeVerifyClaim(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodeVerifyClaimParams(options).slice(2));
}
/**
 * Decodes the result of the verifyClaim function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension ERC721
 * @example
 * ```ts
 * import { decodeVerifyClaimResult } from "thirdweb/extensions/erc721";
 * const result = decodeVerifyClaimResultResult("...");
 * ```
 */
export function decodeVerifyClaimResult(result) {
    return decodeAbiParameters(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "verifyClaim" function on the contract.
 * @param options - The options for the verifyClaim function.
 * @returns The parsed result of the function call.
 * @extension ERC721
 * @example
 * ```ts
 * import { verifyClaim } from "thirdweb/extensions/erc721";
 *
 * const result = await verifyClaim({
 *  contract,
 *  conditionId: ...,
 *  claimer: ...,
 *  quantity: ...,
 *  currency: ...,
 *  pricePerToken: ...,
 *  allowlistProof: ...,
 * });
 *
 * ```
 */
export async function verifyClaim(options) {
    return readContract({
        contract: options.contract,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [
            options.conditionId,
            options.claimer,
            options.quantity,
            options.currency,
            options.pricePerToken,
            options.allowlistProof,
        ],
    });
}
//# sourceMappingURL=verifyClaim.js.map