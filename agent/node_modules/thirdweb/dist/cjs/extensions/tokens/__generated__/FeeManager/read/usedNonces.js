"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isUsedNoncesSupported = isUsedNoncesSupported;
exports.encodeUsedNoncesParams = encodeUsedNoncesParams;
exports.encodeUsedNonces = encodeUsedNonces;
exports.decodeUsedNoncesResult = decodeUsedNoncesResult;
exports.usedNonces = usedNonces;
const viem_1 = require("viem");
const read_contract_js_1 = require("../../../../../transaction/read-contract.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0xfeb61724";
const FN_INPUTS = [
    {
        type: "bytes32",
        name: "signerNonce",
    },
];
const FN_OUTPUTS = [
    {
        type: "bool",
        name: "used",
    },
];
/**
 * Checks if the `usedNonces` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `usedNonces` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isUsedNoncesSupported } from "thirdweb/extensions/tokens";
 * const supported = isUsedNoncesSupported(["0x..."]);
 * ```
 */
function isUsedNoncesSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "usedNonces" function.
 * @param options - The options for the usedNonces function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeUsedNoncesParams } from "thirdweb/extensions/tokens";
 * const result = encodeUsedNoncesParams({
 *  signerNonce: ...,
 * });
 * ```
 */
function encodeUsedNoncesParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.signerNonce]);
}
/**
 * Encodes the "usedNonces" function into a Hex string with its parameters.
 * @param options - The options for the usedNonces function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeUsedNonces } from "thirdweb/extensions/tokens";
 * const result = encodeUsedNonces({
 *  signerNonce: ...,
 * });
 * ```
 */
function encodeUsedNonces(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeUsedNoncesParams(options).slice(2));
}
/**
 * Decodes the result of the usedNonces function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeUsedNoncesResult } from "thirdweb/extensions/tokens";
 * const result = decodeUsedNoncesResultResult("...");
 * ```
 */
function decodeUsedNoncesResult(result) {
    return (0, viem_1.decodeAbiParameters)(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "usedNonces" function on the contract.
 * @param options - The options for the usedNonces function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { usedNonces } from "thirdweb/extensions/tokens";
 *
 * const result = await usedNonces({
 *  contract,
 *  signerNonce: ...,
 * });
 *
 * ```
 */
async function usedNonces(options) {
    return (0, read_contract_js_1.readContract)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.signerNonce],
    });
}
//# sourceMappingURL=usedNonces.js.map