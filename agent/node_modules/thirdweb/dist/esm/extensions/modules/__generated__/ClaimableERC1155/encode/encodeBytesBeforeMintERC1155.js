import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
export const FN_SELECTOR = "0x819ed5a3";
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
 * Encodes the parameters for the "encodeBytesBeforeMintERC1155" function.
 * @param options - The options for the encodeBytesBeforeMintERC1155 function.
 * @returns The encoded ABI parameters.
 * @extension MODULES
 * @example
 * ```ts
 * import { encodeEncodeBytesBeforeMintERC1155Params } "thirdweb/extensions/modules";
 * const result = encodeEncodeBytesBeforeMintERC1155Params({
 *  params: ...,
 * });
 * ```
 */
export function encodeBytesBeforeMintERC1155Params(options) {
    return encodeAbiParameters(FN_INPUTS, [options.params]);
}
//# sourceMappingURL=encodeBytesBeforeMintERC1155.js.map