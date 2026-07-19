import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
export const FN_SELECTOR = "0xcab11f42";
const FN_INPUTS = [
    {
        components: [
            {
                name: "startTimestamp",
                type: "uint48",
            },
            {
                name: "endTimestamp",
                type: "uint48",
            },
            {
                name: "currency",
                type: "address",
            },
            {
                name: "pricePerUnit",
                type: "uint256",
            },
            {
                name: "uid",
                type: "bytes32",
            },
        ],
        name: "params",
        type: "tuple",
    },
];
/**
 * Encodes the parameters for the "encodeBytesBeforeMintWithSignatureERC721" function.
 * @param options - The options for the encodeBytesBeforeMintWithSignatureERC721 function.
 * @returns The encoded ABI parameters.
 * @extension MODULES
 * @example
 * ```ts
 * import { encodeEncodeBytesBeforeMintWithSignatureERC721Params } "thirdweb/extensions/modules";
 * const result = encodeEncodeBytesBeforeMintWithSignatureERC721Params({
 *  params: ...,
 * });
 * ```
 */
export function encodeBytesBeforeMintWithSignatureERC721Params(options) {
    return encodeAbiParameters(FN_INPUTS, [options.params]);
}
//# sourceMappingURL=encodeBytesBeforeMintWithSignatureERC721.js.map