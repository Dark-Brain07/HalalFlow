"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isCodehashVersionSupported = isCodehashVersionSupported;
exports.encodeCodehashVersionParams = encodeCodehashVersionParams;
exports.encodeCodehashVersion = encodeCodehashVersion;
exports.decodeCodehashVersionResult = decodeCodehashVersionResult;
exports.codehashVersion = codehashVersion;
const viem_1 = require("viem");
const read_contract_js_1 = require("../../../../../transaction/read-contract.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0xd70c0ca7";
const FN_INPUTS = [
    {
        name: "codehash",
        type: "bytes32",
    },
];
const FN_OUTPUTS = [
    {
        name: "version",
        type: "uint16",
    },
];
/**
 * Checks if the `codehashVersion` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `codehashVersion` method is supported.
 * @extension STYLUS
 * @example
 * ```ts
 * import { isCodehashVersionSupported } from "thirdweb/extensions/stylus";
 * const supported = isCodehashVersionSupported(["0x..."]);
 * ```
 */
function isCodehashVersionSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "codehashVersion" function.
 * @param options - The options for the codehashVersion function.
 * @returns The encoded ABI parameters.
 * @extension STYLUS
 * @example
 * ```ts
 * import { encodeCodehashVersionParams } from "thirdweb/extensions/stylus";
 * const result = encodeCodehashVersionParams({
 *  codehash: ...,
 * });
 * ```
 */
function encodeCodehashVersionParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.codehash]);
}
/**
 * Encodes the "codehashVersion" function into a Hex string with its parameters.
 * @param options - The options for the codehashVersion function.
 * @returns The encoded hexadecimal string.
 * @extension STYLUS
 * @example
 * ```ts
 * import { encodeCodehashVersion } from "thirdweb/extensions/stylus";
 * const result = encodeCodehashVersion({
 *  codehash: ...,
 * });
 * ```
 */
function encodeCodehashVersion(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeCodehashVersionParams(options).slice(2));
}
/**
 * Decodes the result of the codehashVersion function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension STYLUS
 * @example
 * ```ts
 * import { decodeCodehashVersionResult } from "thirdweb/extensions/stylus";
 * const result = decodeCodehashVersionResultResult("...");
 * ```
 */
function decodeCodehashVersionResult(result) {
    return (0, viem_1.decodeAbiParameters)(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "codehashVersion" function on the contract.
 * @param options - The options for the codehashVersion function.
 * @returns The parsed result of the function call.
 * @extension STYLUS
 * @example
 * ```ts
 * import { codehashVersion } from "thirdweb/extensions/stylus";
 *
 * const result = await codehashVersion({
 *  contract,
 *  codehash: ...,
 * });
 *
 * ```
 */
async function codehashVersion(options) {
    return (0, read_contract_js_1.readContract)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.codehash],
    });
}
//# sourceMappingURL=codehashVersion.js.map