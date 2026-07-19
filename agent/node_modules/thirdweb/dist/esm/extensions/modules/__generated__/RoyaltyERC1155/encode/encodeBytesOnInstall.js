import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
export const FN_SELECTOR = "0x2fbb2623";
const FN_INPUTS = [
    {
        name: "royaltyRecipient",
        type: "address",
    },
    {
        name: "royaltyBps",
        type: "uint16",
    },
    {
        name: "transferValidator",
        type: "address",
    },
];
/**
 * Encodes the parameters for the "encodeBytesOnInstall" function.
 * @param options - The options for the encodeBytesOnInstall function.
 * @returns The encoded ABI parameters.
 * @extension MODULES
 * @example
 * ```ts
 * import { encodeEncodeBytesOnInstallParams } "thirdweb/extensions/modules";
 * const result = encodeEncodeBytesOnInstallParams({
 *  royaltyRecipient: ...,
 *  royaltyBps: ...,
 *  transferValidator: ...,
 * });
 * ```
 */
export function encodeBytesOnInstallParams(options) {
    return encodeAbiParameters(FN_INPUTS, [
        options.royaltyRecipient,
        options.royaltyBps,
        options.transferValidator,
    ]);
}
//# sourceMappingURL=encodeBytesOnInstall.js.map