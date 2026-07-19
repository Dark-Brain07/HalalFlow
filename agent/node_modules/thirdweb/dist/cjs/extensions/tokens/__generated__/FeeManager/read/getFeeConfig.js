"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isGetFeeConfigSupported = isGetFeeConfigSupported;
exports.encodeGetFeeConfigParams = encodeGetFeeConfigParams;
exports.encodeGetFeeConfig = encodeGetFeeConfig;
exports.decodeGetFeeConfigResult = decodeGetFeeConfigResult;
exports.getFeeConfig = getFeeConfig;
const viem_1 = require("viem");
const read_contract_js_1 = require("../../../../../transaction/read-contract.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0x17305ee1";
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
        type: "tuple",
        name: "config",
        components: [
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
        ],
    },
];
/**
 * Checks if the `getFeeConfig` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getFeeConfig` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isGetFeeConfigSupported } from "thirdweb/extensions/tokens";
 * const supported = isGetFeeConfigSupported(["0x..."]);
 * ```
 */
function isGetFeeConfigSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "getFeeConfig" function.
 * @param options - The options for the getFeeConfig function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetFeeConfigParams } from "thirdweb/extensions/tokens";
 * const result = encodeGetFeeConfigParams({
 *  target: ...,
 *  action: ...,
 * });
 * ```
 */
function encodeGetFeeConfigParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.target, options.action]);
}
/**
 * Encodes the "getFeeConfig" function into a Hex string with its parameters.
 * @param options - The options for the getFeeConfig function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetFeeConfig } from "thirdweb/extensions/tokens";
 * const result = encodeGetFeeConfig({
 *  target: ...,
 *  action: ...,
 * });
 * ```
 */
function encodeGetFeeConfig(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeGetFeeConfigParams(options).slice(2));
}
/**
 * Decodes the result of the getFeeConfig function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeGetFeeConfigResult } from "thirdweb/extensions/tokens";
 * const result = decodeGetFeeConfigResultResult("...");
 * ```
 */
function decodeGetFeeConfigResult(result) {
    return (0, viem_1.decodeAbiParameters)(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "getFeeConfig" function on the contract.
 * @param options - The options for the getFeeConfig function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getFeeConfig } from "thirdweb/extensions/tokens";
 *
 * const result = await getFeeConfig({
 *  contract,
 *  target: ...,
 *  action: ...,
 * });
 *
 * ```
 */
async function getFeeConfig(options) {
    return (0, read_contract_js_1.readContract)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.target, options.action],
    });
}
//# sourceMappingURL=getFeeConfig.js.map