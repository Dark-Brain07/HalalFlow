"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isIsWildcardSignerSupported = isIsWildcardSignerSupported;
exports.encodeIsWildcardSignerParams = encodeIsWildcardSignerParams;
exports.encodeIsWildcardSigner = encodeIsWildcardSigner;
exports.decodeIsWildcardSignerResult = decodeIsWildcardSignerResult;
exports.isWildcardSigner = isWildcardSigner;
const viem_1 = require("viem");
const read_contract_js_1 = require("../../../../../transaction/read-contract.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0x16c258a7";
const FN_INPUTS = [
    {
        type: "address",
        name: "signer",
    },
];
const FN_OUTPUTS = [
    {
        type: "bool",
    },
];
/**
 * Checks if the `isWildcardSigner` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `isWildcardSigner` method is supported.
 * @extension ERC7702
 * @example
 * ```ts
 * import { isIsWildcardSignerSupported } from "thirdweb/extensions/erc7702";
 * const supported = isIsWildcardSignerSupported(["0x..."]);
 * ```
 */
function isIsWildcardSignerSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "isWildcardSigner" function.
 * @param options - The options for the isWildcardSigner function.
 * @returns The encoded ABI parameters.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeIsWildcardSignerParams } from "thirdweb/extensions/erc7702";
 * const result = encodeIsWildcardSignerParams({
 *  signer: ...,
 * });
 * ```
 */
function encodeIsWildcardSignerParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.signer]);
}
/**
 * Encodes the "isWildcardSigner" function into a Hex string with its parameters.
 * @param options - The options for the isWildcardSigner function.
 * @returns The encoded hexadecimal string.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeIsWildcardSigner } from "thirdweb/extensions/erc7702";
 * const result = encodeIsWildcardSigner({
 *  signer: ...,
 * });
 * ```
 */
function encodeIsWildcardSigner(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeIsWildcardSignerParams(options).slice(2));
}
/**
 * Decodes the result of the isWildcardSigner function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension ERC7702
 * @example
 * ```ts
 * import { decodeIsWildcardSignerResult } from "thirdweb/extensions/erc7702";
 * const result = decodeIsWildcardSignerResultResult("...");
 * ```
 */
function decodeIsWildcardSignerResult(result) {
    return (0, viem_1.decodeAbiParameters)(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "isWildcardSigner" function on the contract.
 * @param options - The options for the isWildcardSigner function.
 * @returns The parsed result of the function call.
 * @extension ERC7702
 * @example
 * ```ts
 * import { isWildcardSigner } from "thirdweb/extensions/erc7702";
 *
 * const result = await isWildcardSigner({
 *  contract,
 *  signer: ...,
 * });
 *
 * ```
 */
async function isWildcardSigner(options) {
    return (0, read_contract_js_1.readContract)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.signer],
    });
}
//# sourceMappingURL=isWildcardSigner.js.map