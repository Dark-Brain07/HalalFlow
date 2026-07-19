import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
export const FN_SELECTOR = "0x3f4a1bb6";
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
                name: "maxMintPerWallet",
                type: "uint256",
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
 * Encodes the parameters for the "encodeBytesBeforeMintWithSignatureERC20" function.
 * @param options - The options for the encodeBytesBeforeMintWithSignatureERC20 function.
 * @returns The encoded ABI parameters.
 * @extension MODULES
 * @example
 * ```ts
 * import { encodeEncodeBytesBeforeMintWithSignatureERC20Params } "thirdweb/extensions/modules";
 * const result = encodeEncodeBytesBeforeMintWithSignatureERC20Params({
 *  params: ...,
 * });
 * ```
 */
export function encodeBytesBeforeMintWithSignatureERC20Params(options) {
    return encodeAbiParameters(FN_INPUTS, [options.params]);
}
//# sourceMappingURL=encodeBytesBeforeMintWithSignatureERC20.js.map