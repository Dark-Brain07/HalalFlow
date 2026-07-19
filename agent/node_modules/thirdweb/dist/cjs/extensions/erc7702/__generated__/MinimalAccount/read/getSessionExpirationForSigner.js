"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isGetSessionExpirationForSignerSupported = isGetSessionExpirationForSignerSupported;
exports.encodeGetSessionExpirationForSignerParams = encodeGetSessionExpirationForSignerParams;
exports.encodeGetSessionExpirationForSigner = encodeGetSessionExpirationForSigner;
exports.decodeGetSessionExpirationForSignerResult = decodeGetSessionExpirationForSignerResult;
exports.getSessionExpirationForSigner = getSessionExpirationForSigner;
const viem_1 = require("viem");
const read_contract_js_1 = require("../../../../../transaction/read-contract.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0xf0a83adf";
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
function isGetSessionExpirationForSignerSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
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
function encodeGetSessionExpirationForSignerParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.signer]);
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
function encodeGetSessionExpirationForSigner(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
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
function decodeGetSessionExpirationForSignerResult(result) {
    return (0, viem_1.decodeAbiParameters)(FN_OUTPUTS, result)[0];
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
async function getSessionExpirationForSigner(options) {
    return (0, read_contract_js_1.readContract)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.signer],
    });
}
//# sourceMappingURL=getSessionExpirationForSigner.js.map