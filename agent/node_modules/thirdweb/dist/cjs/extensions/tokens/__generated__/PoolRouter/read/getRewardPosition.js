"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isGetRewardPositionSupported = isGetRewardPositionSupported;
exports.encodeGetRewardPositionParams = encodeGetRewardPositionParams;
exports.encodeGetRewardPosition = encodeGetRewardPosition;
exports.decodeGetRewardPositionResult = decodeGetRewardPositionResult;
exports.getRewardPosition = getRewardPosition;
const viem_1 = require("viem");
const read_contract_js_1 = require("../../../../../transaction/read-contract.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0x65798bfb";
const FN_INPUTS = [
    {
        type: "address",
        name: "asset",
    },
    {
        type: "uint8",
        name: "adapterType",
    },
];
const FN_OUTPUTS = [
    {
        type: "tuple",
        name: "position",
        components: [
            {
                type: "uint256",
                name: "positionId",
            },
            {
                type: "address",
                name: "recipient",
            },
            {
                type: "address",
                name: "developer",
            },
            {
                type: "uint16",
                name: "developerBps",
            },
            {
                type: "address",
                name: "positionManager",
            },
            {
                type: "address",
                name: "rewardLocker",
            },
        ],
    },
];
/**
 * Checks if the `getRewardPosition` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getRewardPosition` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isGetRewardPositionSupported } from "thirdweb/extensions/tokens";
 * const supported = isGetRewardPositionSupported(["0x..."]);
 * ```
 */
function isGetRewardPositionSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "getRewardPosition" function.
 * @param options - The options for the getRewardPosition function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetRewardPositionParams } from "thirdweb/extensions/tokens";
 * const result = encodeGetRewardPositionParams({
 *  asset: ...,
 *  adapterType: ...,
 * });
 * ```
 */
function encodeGetRewardPositionParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.asset, options.adapterType]);
}
/**
 * Encodes the "getRewardPosition" function into a Hex string with its parameters.
 * @param options - The options for the getRewardPosition function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetRewardPosition } from "thirdweb/extensions/tokens";
 * const result = encodeGetRewardPosition({
 *  asset: ...,
 *  adapterType: ...,
 * });
 * ```
 */
function encodeGetRewardPosition(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeGetRewardPositionParams(options).slice(2));
}
/**
 * Decodes the result of the getRewardPosition function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeGetRewardPositionResult } from "thirdweb/extensions/tokens";
 * const result = decodeGetRewardPositionResultResult("...");
 * ```
 */
function decodeGetRewardPositionResult(result) {
    return (0, viem_1.decodeAbiParameters)(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "getRewardPosition" function on the contract.
 * @param options - The options for the getRewardPosition function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getRewardPosition } from "thirdweb/extensions/tokens";
 *
 * const result = await getRewardPosition({
 *  contract,
 *  asset: ...,
 *  adapterType: ...,
 * });
 *
 * ```
 */
async function getRewardPosition(options) {
    return (0, read_contract_js_1.readContract)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.asset, options.adapterType],
    });
}
//# sourceMappingURL=getRewardPosition.js.map