import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
export const FN_SELECTOR = "0xd9584651";
const FN_INPUTS = [
    {
        components: [
            {
                name: "currency",
                type: "address",
            },
            {
                name: "pricePerUnit",
                type: "uint256",
            },
            {
                name: "recipientAllowlistProof",
                type: "bytes32[]",
            },
        ],
        name: "params",
        type: "tuple",
    },
];
/**
 * Encodes the parameters for the "encodeBytesBeforeMintERC721" function.
 * @param options - The options for the encodeBytesBeforeMintERC721 function.
 * @returns The encoded ABI parameters.
 * @extension MODULES
 * @example
 * ```ts
 * import { encodeEncodeBytesBeforeMintERC721Params } "thirdweb/extensions/modules";
 * const result = encodeEncodeBytesBeforeMintERC721Params({
 *  params: ...,
 * });
 * ```
 */
export function encodeBytesBeforeMintERC721Params(options) {
    return encodeAbiParameters(FN_INPUTS, [options.params]);
}
//# sourceMappingURL=encodeBytesBeforeMintERC721.js.map