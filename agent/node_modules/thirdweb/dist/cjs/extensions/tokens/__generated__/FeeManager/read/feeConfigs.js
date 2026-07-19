"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isFeeConfigsSupported = isFeeConfigsSupported;
exports.encodeFeeConfigsParams = encodeFeeConfigsParams;
exports.encodeFeeConfigs = encodeFeeConfigs;
exports.decodeFeeConfigsResult = decodeFeeConfigsResult;
exports.feeConfigs = feeConfigs;
const viem_1 = require("viem");
const read_contract_js_1 = require("../../../../../transaction/read-contract.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0x758515e1";
const FN_INPUTS = [
    {
        type: "address",
        name: "target",
    },
    {
        type: "bytes4",
        name: "action",
    },
];
const FN_OUTPUTS = [
    {
        type: "address",
        name: "recipient",
    },
    {
        type: "uint8",
        name: "feeType",
    },
    {
        type: "uint256",
        name: "value",
    },
];
/**
 * Checks if the `feeConfigs` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `feeConfigs` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isFeeConfigsSupported } from "thirdweb/extensions/tokens";
 * const supported = isFeeConfigsSupported(["0x..."]);
 * ```
 */
function isFeeConfigsSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "feeConfigs" function.
 * @param options - The options for the feeConfigs function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeFeeConfigsParams } from "thirdweb/extensions/tokens";
 * const result = encodeFeeConfigsParams({
 *  target: ...,
 *  action: ...,
 * });
 * ```
 */
function encodeFeeConfigsParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.target, options.action]);
}
/**
 * Encodes the "feeConfigs" function into a Hex string with its parameters.
 * @param options - The options for the feeConfigs function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeFeeConfigs } from "thirdweb/extensions/tokens";
 * const result = encodeFeeConfigs({
 *  target: ...,
 *  action: ...,
 * });
 * ```
 */
function encodeFeeConfigs(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeFeeConfigsParams(options).slice(2));
}
/**
 * Decodes the result of the feeConfigs function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeFeeConfigsResult } from "thirdweb/extensions/tokens";
 * const result = decodeFeeConfigsResultResult("...");
 * ```
 */
function decodeFeeConfigsResult(result) {
    return (0, viem_1.decodeAbiParameters)(FN_OUTPUTS, result);
}
/**
 * Calls the "feeConfigs" function on the contract.
 * @param options - The options for the feeConfigs function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { feeConfigs } from "thirdweb/extensions/tokens";
 *
 * const result = await feeConfigs({
 *  contract,
 *  target: ...,
 *  action: ...,
 * });
 *
 * ```
 */
async function feeConfigs(options) {
    return (0, read_contract_js_1.readContract)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.target, options.action],
    });
}
//# sourceMappingURL=feeConfigs.js.map