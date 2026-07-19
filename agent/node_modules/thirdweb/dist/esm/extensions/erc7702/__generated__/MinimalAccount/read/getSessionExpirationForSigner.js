import { decodeAbiParameters } from "viem";
import { readContract } from "../../../../../transaction/read-contract.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
export const FN_SELECTOR = "0xf0a83adf";
const FN_INPUTS = [
    {
        type: "address",
        name: "signer",
    },
];
const FN_OUTPUTS = [
    {
        type: "uint256",
    },
];
/**
 * Checks if the `getSessionExpirationForSigner` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getSessionExpirationForSigner` method is supported.
 * @extension ERC7702
 * @example
 * ```ts
 * import { isGetSessionExpirationForSignerSupported } from "thirdweb/extensions/erc7702";
 * const supported = isGetSessionExpirationForSignerSupported(["0x..."]);
 * ```
 */
export function isGetSessionExpirationForSignerSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "getSessionExpirationForSigner" function.
 * @param options - The options for the getSessionExpirationForSigner function.
 * @returns The encoded ABI parameters.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeGetSessionExpirationForSignerParams } from "thirdweb/extensions/erc7702";
 * const result = encodeGetSessionExpirationForSignerParams({
 *  signer: ...,
 * });
 * ```
 */
export function encodeGetSessionExpirationForSignerParams(options) {
    return encodeAbiParameters(FN_INPUTS, [options.signer]);
}
/**
 * Encodes the "getSessionExpirationForSigner" function into a Hex string with its parameters.
 * @param options - The options for the getSessionExpirationForSigner function.
 * @returns The encoded hexadecimal string.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeGetSessionExpirationForSigner } from "thirdweb/extensions/erc7702";
 * const result = encodeGetSessionExpirationForSigner({
 *  signer: ...,
 * });
 * ```
 */
export function encodeGetSessionExpirationForSigner(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodeGetSessionExpirationForSignerParams(options).slice(2));
}
/**
 * Decodes the result of the getSessionExpirationForSigner function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension ERC7702
 * @example
 * ```ts
 * import { decodeGetSessionExpirationForSignerResult } from "thirdweb/extensions/erc7702";
 * const result = decodeGetSessionExpirationForSignerResultResult("...");
 * ```
 */
export function decodeGetSessionExpirationForSignerResult(result) {
    return decodeAbiParameters(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "getSessionExpirationForSigner" function on the contract.
 * @param options - The options for the getSessionExpirationForSigner function.
 * @returns The parsed result of the function call.
 * @extension ERC7702
 * @example
 * ```ts
 * import { getSessionExpirationForSigner } from "thirdweb/extensions/erc7702";
 *
 * const result = await getSessionExpirationForSigner({
 *  contract,
 *  signer: ...,
 * });
 *
 * ```
 */
export async function getSessionExpirationForSigner(options) {
    return readContract({
        contract: options.contract,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.signer],
    });
}
//# sourceMappingURL=getSessionExpirationForSigner.js.map