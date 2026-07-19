"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isComputeProxyAddressSupported = isComputeProxyAddressSupported;
exports.encodeComputeProxyAddressParams = encodeComputeProxyAddressParams;
exports.encodeComputeProxyAddress = encodeComputeProxyAddress;
exports.decodeComputeProxyAddressResult = decodeComputeProxyAddressResult;
exports.computeProxyAddress = computeProxyAddress;
const viem_1 = require("viem");
const read_contract_js_1 = require("../../../../../transaction/read-contract.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0xbef11b31";
const FN_INPUTS = [
    {
        type: "uint8",
        name: "deployType",
    },
    {
        type: "address",
        name: "implementation",
    },
    {
        type: "bytes",
        name: "data",
    },
    {
        type: "bytes32",
        name: "salt",
    },
];
const FN_OUTPUTS = [
    {
        type: "address",
    },
];
/**
 * Checks if the `computeProxyAddress` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `computeProxyAddress` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isComputeProxyAddressSupported } from "thirdweb/extensions/tokens";
 * const supported = isComputeProxyAddressSupported(["0x..."]);
 * ```
 */
function isComputeProxyAddressSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "computeProxyAddress" function.
 * @param options - The options for the computeProxyAddress function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeComputeProxyAddressParams } from "thirdweb/extensions/tokens";
 * const result = encodeComputeProxyAddressParams({
 *  deployType: ...,
 *  implementation: ...,
 *  data: ...,
 *  salt: ...,
 * });
 * ```
 */
function encodeComputeProxyAddressParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.deployType,
        options.implementation,
        options.data,
        options.salt,
    ]);
}
/**
 * Encodes the "computeProxyAddress" function into a Hex string with its parameters.
 * @param options - The options for the computeProxyAddress function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeComputeProxyAddress } from "thirdweb/extensions/tokens";
 * const result = encodeComputeProxyAddress({
 *  deployType: ...,
 *  implementation: ...,
 *  data: ...,
 *  salt: ...,
 * });
 * ```
 */
function encodeComputeProxyAddress(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeComputeProxyAddressParams(options).slice(2));
}
/**
 * Decodes the result of the computeProxyAddress function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeComputeProxyAddressResult } from "thirdweb/extensions/tokens";
 * const result = decodeComputeProxyAddressResultResult("...");
 * ```
 */
function decodeComputeProxyAddressResult(result) {
    return (0, viem_1.decodeAbiParameters)(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "computeProxyAddress" function on the contract.
 * @param options - The options for the computeProxyAddress function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { computeProxyAddress } from "thirdweb/extensions/tokens";
 *
 * const result = await computeProxyAddress({
 *  contract,
 *  deployType: ...,
 *  implementation: ...,
 *  data: ...,
 *  salt: ...,
 * });
 *
 * ```
 */
async function computeProxyAddress(options) {
    return (0, read_contract_js_1.readContract)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [
            options.deployType,
            options.implementation,
            options.data,
            options.salt,
        ],
    });
}
//# sourceMappingURL=computeProxyAddress.js.map