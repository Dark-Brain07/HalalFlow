"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isPredictAddressSupported = isPredictAddressSupported;
exports.encodePredictAddressParams = encodePredictAddressParams;
exports.encodePredictAddress = encodePredictAddress;
exports.decodePredictAddressResult = decodePredictAddressResult;
exports.predictAddress = predictAddress;
const viem_1 = require("viem");
const read_contract_js_1 = require("../../../../../transaction/read-contract.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0x6b6963c6";
const FN_INPUTS = [
    {
        type: "bytes32",
        name: "contractId",
    },
    {
        type: "address",
        name: "creator",
    },
    {
        type: "tuple",
        name: "params",
        components: [
            {
                type: "address",
                name: "developer",
            },
            {
                type: "bytes32",
                name: "salt",
            },
            {
                type: "bytes",
                name: "data",
            },
            {
                type: "bytes",
                name: "hookData",
            },
        ],
    },
];
const FN_OUTPUTS = [
    {
        type: "address",
        name: "predicted",
    },
];
/**
 * Checks if the `predictAddress` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `predictAddress` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isPredictAddressSupported } from "thirdweb/extensions/tokens";
 * const supported = isPredictAddressSupported(["0x..."]);
 * ```
 */
function isPredictAddressSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "predictAddress" function.
 * @param options - The options for the predictAddress function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodePredictAddressParams } from "thirdweb/extensions/tokens";
 * const result = encodePredictAddressParams({
 *  contractId: ...,
 *  creator: ...,
 *  params: ...,
 * });
 * ```
 */
function encodePredictAddressParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.contractId,
        options.creator,
        options.params,
    ]);
}
/**
 * Encodes the "predictAddress" function into a Hex string with its parameters.
 * @param options - The options for the predictAddress function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodePredictAddress } from "thirdweb/extensions/tokens";
 * const result = encodePredictAddress({
 *  contractId: ...,
 *  creator: ...,
 *  params: ...,
 * });
 * ```
 */
function encodePredictAddress(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodePredictAddressParams(options).slice(2));
}
/**
 * Decodes the result of the predictAddress function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodePredictAddressResult } from "thirdweb/extensions/tokens";
 * const result = decodePredictAddressResultResult("...");
 * ```
 */
function decodePredictAddressResult(result) {
    return (0, viem_1.decodeAbiParameters)(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "predictAddress" function on the contract.
 * @param options - The options for the predictAddress function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { predictAddress } from "thirdweb/extensions/tokens";
 *
 * const result = await predictAddress({
 *  contract,
 *  contractId: ...,
 *  creator: ...,
 *  params: ...,
 * });
 *
 * ```
 */
async function predictAddress(options) {
    return (0, read_contract_js_1.readContract)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.contractId, options.creator, options.params],
    });
}
//# sourceMappingURL=predictAddress.js.map