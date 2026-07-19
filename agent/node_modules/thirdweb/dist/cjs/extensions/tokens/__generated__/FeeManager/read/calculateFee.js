"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isCalculateFeeSupported = isCalculateFeeSupported;
exports.encodeCalculateFeeParams = encodeCalculateFeeParams;
exports.encodeCalculateFee = encodeCalculateFee;
exports.decodeCalculateFeeResult = decodeCalculateFeeResult;
exports.calculateFee = calculateFee;
const viem_1 = require("viem");
const read_contract_js_1 = require("../../../../../transaction/read-contract.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0x69588801";
const FN_INPUTS = [
    {
        type: "address",
        name: "payer",
    },
    {
        type: "bytes4",
        name: "action",
    },
    {
        type: "uint256",
        name: "amount",
    },
    {
        type: "uint256",
        name: "maxFeeAmount",
    },
];
const FN_OUTPUTS = [
    {
        type: "address",
        name: "recipient",
    },
    {
        type: "uint256",
        name: "feeAmount",
    },
];
/**
 * Checks if the `calculateFee` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `calculateFee` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isCalculateFeeSupported } from "thirdweb/extensions/tokens";
 * const supported = isCalculateFeeSupported(["0x..."]);
 * ```
 */
function isCalculateFeeSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "calculateFee" function.
 * @param options - The options for the calculateFee function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeCalculateFeeParams } from "thirdweb/extensions/tokens";
 * const result = encodeCalculateFeeParams({
 *  payer: ...,
 *  action: ...,
 *  amount: ...,
 *  maxFeeAmount: ...,
 * });
 * ```
 */
function encodeCalculateFeeParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.payer,
        options.action,
        options.amount,
        options.maxFeeAmount,
    ]);
}
/**
 * Encodes the "calculateFee" function into a Hex string with its parameters.
 * @param options - The options for the calculateFee function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeCalculateFee } from "thirdweb/extensions/tokens";
 * const result = encodeCalculateFee({
 *  payer: ...,
 *  action: ...,
 *  amount: ...,
 *  maxFeeAmount: ...,
 * });
 * ```
 */
function encodeCalculateFee(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeCalculateFeeParams(options).slice(2));
}
/**
 * Decodes the result of the calculateFee function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeCalculateFeeResult } from "thirdweb/extensions/tokens";
 * const result = decodeCalculateFeeResultResult("...");
 * ```
 */
function decodeCalculateFeeResult(result) {
    return (0, viem_1.decodeAbiParameters)(FN_OUTPUTS, result);
}
/**
 * Calls the "calculateFee" function on the contract.
 * @param options - The options for the calculateFee function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { calculateFee } from "thirdweb/extensions/tokens";
 *
 * const result = await calculateFee({
 *  contract,
 *  payer: ...,
 *  action: ...,
 *  amount: ...,
 *  maxFeeAmount: ...,
 * });
 *
 * ```
 */
async function calculateFee(options) {
    return (0, read_contract_js_1.readContract)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [
            options.payer,
            options.action,
            options.amount,
            options.maxFeeAmount,
        ],
    });
}
//# sourceMappingURL=calculateFee.js.map