"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.encodeBytesBeforeMintWithSignatureERC1155Params = encodeBytesBeforeMintWithSignatureERC1155Params;
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
exports.FN_SELECTOR = "0x2e33c806";
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
 * Encodes the parameters for the "encodeBytesBeforeMintWithSignatureERC1155" function.
 * @param options - The options for the encodeBytesBeforeMintWithSignatureERC1155 function.
 * @returns The encoded ABI parameters.
 * @extension MODULES
 * @example
 * ```ts
 * import { encodeEncodeBytesBeforeMintWithSignatureERC1155Params } "thirdweb/extensions/modules";
 * const result = encodeEncodeBytesBeforeMintWithSignatureERC1155Params({
 *  params: ...,
 * });
 * ```
 */
function encodeBytesBeforeMintWithSignatureERC1155Params(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.params]);
}
//# sourceMappingURL=encodeBytesBeforeMintWithSignatureERC1155.js.map