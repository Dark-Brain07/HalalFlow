"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isComputeDeployAddressSupported = isComputeDeployAddressSupported;
exports.encodeComputeDeployAddressParams = encodeComputeDeployAddressParams;
exports.encodeComputeDeployAddress = encodeComputeDeployAddress;
exports.decodeComputeDeployAddressResult = decodeComputeDeployAddressResult;
exports.computeDeployAddress = computeDeployAddress;
const viem_1 = require("viem");
const read_contract_js_1 = require("../../../../../transaction/read-contract.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0xd5ec7faa";
const FN_INPUTS = [
    {
        type: "uint8",
        name: "deployType",
    },
    {
        type: "bytes",
        name: "bytecode",
    },
    {
        type: "bytes",
        name: "constructorArgs",
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
 * Checks if the `computeDeployAddress` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `computeDeployAddress` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isComputeDeployAddressSupported } from "thirdweb/extensions/tokens";
 * const supported = isComputeDeployAddressSupported(["0x..."]);
 * ```
 */
function isComputeDeployAddressSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "computeDeployAddress" function.
 * @param options - The options for the computeDeployAddress function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeComputeDeployAddressParams } from "thirdweb/extensions/tokens";
 * const result = encodeComputeDeployAddressParams({
 *  deployType: ...,
 *  bytecode: ...,
 *  constructorArgs: ...,
 *  salt: ...,
 * });
 * ```
 */
function encodeComputeDeployAddressParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.deployType,
        options.bytecode,
        options.constructorArgs,
        options.salt,
    ]);
}
/**
 * Encodes the "computeDeployAddress" function into a Hex string with its parameters.
 * @param options - The options for the computeDeployAddress function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeComputeDeployAddress } from "thirdweb/extensions/tokens";
 * const result = encodeComputeDeployAddress({
 *  deployType: ...,
 *  bytecode: ...,
 *  constructorArgs: ...,
 *  salt: ...,
 * });
 * ```
 */
function encodeComputeDeployAddress(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeComputeDeployAddressParams(options).slice(2));
}
/**
 * Decodes the result of the computeDeployAddress function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeComputeDeployAddressResult } from "thirdweb/extensions/tokens";
 * const result = decodeComputeDeployAddressResultResult("...");
 * ```
 */
function decodeComputeDeployAddressResult(result) {
    return (0, viem_1.decodeAbiParameters)(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "computeDeployAddress" function on the contract.
 * @param options - The options for the computeDeployAddress function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { computeDeployAddress } from "thirdweb/extensions/tokens";
 *
 * const result = await computeDeployAddress({
 *  contract,
 *  deployType: ...,
 *  bytecode: ...,
 *  constructorArgs: ...,
 *  salt: ...,
 * });
 *
 * ```
 */
async function computeDeployAddress(options) {
    return (0, read_contract_js_1.readContract)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [
            options.deployType,
            options.bytecode,
            options.constructorArgs,
            options.salt,
        ],
    });
}
//# sourceMappingURL=computeDeployAddress.js.map