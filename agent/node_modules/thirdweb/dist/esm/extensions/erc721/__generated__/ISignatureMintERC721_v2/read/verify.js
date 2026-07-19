import { decodeAbiParameters } from "viem";
import { readContract } from "../../../../../transaction/read-contract.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
export const FN_SELECTOR = "0x252e82e8";
const FN_INPUTS = [
    {
        components: [
            {
                name: "to",
                type: "address",
            },
            {
                name: "royaltyRecipient",
                type: "address",
            },
            {
                name: "royaltyBps",
                type: "uint256",
            },
            {
                name: "primarySaleRecipient",
                type: "address",
            },
            {
                name: "uri",
                type: "string",
            },
            {
                name: "quantity",
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
            {
                name: "validityStartTimestamp",
                type: "uint128",
            },
            {
                name: "validityEndTimestamp",
                type: "uint128",
            },
            {
                name: "uid",
                type: "bytes32",
            },
        ],
        name: "req",
        type: "tuple",
    },
    {
        name: "signature",
        type: "bytes",
    },
];
const FN_OUTPUTS = [
    {
        name: "success",
        type: "bool",
    },
    {
        name: "signer",
        type: "address",
    },
];
/**
 * Checks if the `verify` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `verify` method is supported.
 * @extension ERC721
 * @example
 * ```ts
 * import { isVerifySupported } from "thirdweb/extensions/erc721";
 * const supported = isVerifySupported(["0x..."]);
 * ```
 */
export function isVerifySupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "verify" function.
 * @param options - The options for the verify function.
 * @returns The encoded ABI parameters.
 * @extension ERC721
 * @example
 * ```ts
 * import { encodeVerifyParams } from "thirdweb/extensions/erc721";
 * const result = encodeVerifyParams({
 *  req: ...,
 *  signature: ...,
 * });
 * ```
 */
export function encodeVerifyParams(options) {
    return encodeAbiParameters(FN_INPUTS, [options.req, options.signature]);
}
/**
 * Encodes the "verify" function into a Hex string with its parameters.
 * @param options - The options for the verify function.
 * @returns The encoded hexadecimal string.
 * @extension ERC721
 * @example
 * ```ts
 * import { encodeVerify } from "thirdweb/extensions/erc721";
 * const result = encodeVerify({
 *  req: ...,
 *  signature: ...,
 * });
 * ```
 */
export function encodeVerify(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodeVerifyParams(options).slice(2));
}
/**
 * Decodes the result of the verify function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension ERC721
 * @example
 * ```ts
 * import { decodeVerifyResult } from "thirdweb/extensions/erc721";
 * const result = decodeVerifyResultResult("...");
 * ```
 */
export function decodeVerifyResult(result) {
    return decodeAbiParameters(FN_OUTPUTS, result);
}
/**
 * Calls the "verify" function on the contract.
 * @param options - The options for the verify function.
 * @returns The parsed result of the function call.
 * @extension ERC721
 * @example
 * ```ts
 * import { verify } from "thirdweb/extensions/erc721";
 *
 * const result = await verify({
 *  contract,
 *  req: ...,
 *  signature: ...,
 * });
 *
 * ```
 */
export async function verify(options) {
    return readContract({
        contract: options.contract,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.req, options.signature],
    });
}
//# sourceMappingURL=verify.js.map