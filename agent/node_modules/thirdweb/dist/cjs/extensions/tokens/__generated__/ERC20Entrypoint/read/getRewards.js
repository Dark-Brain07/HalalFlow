"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isGetRewardsSupported = isGetRewardsSupported;
exports.encodeGetRewardsParams = encodeGetRewardsParams;
exports.encodeGetRewards = encodeGetRewards;
exports.decodeGetRewardsResult = decodeGetRewardsResult;
exports.getRewards = getRewards;
const viem_1 = require("viem");
const read_contract_js_1 = require("../../../../../transaction/read-contract.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0x79ee54f7";
const FN_INPUTS = [
    {
        type: "address",
        name: "asset",
    },
];
const FN_OUTPUTS = [
    {
        type: "tuple[]",
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
 * Checks if the `getRewards` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getRewards` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isGetRewardsSupported } from "thirdweb/extensions/tokens";
 * const supported = isGetRewardsSupported(["0x..."]);
 * ```
 */
function isGetRewardsSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "getRewards" function.
 * @param options - The options for the getRewards function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetRewardsParams } from "thirdweb/extensions/tokens";
 * const result = encodeGetRewardsParams({
 *  asset: ...,
 * });
 * ```
 */
function encodeGetRewardsParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.asset]);
}
/**
 * Encodes the "getRewards" function into a Hex string with its parameters.
 * @param options - The options for the getRewards function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetRewards } from "thirdweb/extensions/tokens";
 * const result = encodeGetRewards({
 *  asset: ...,
 * });
 * ```
 */
function encodeGetRewards(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeGetRewardsParams(options).slice(2));
}
/**
 * Decodes the result of the getRewards function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeGetRewardsResult } from "thirdweb/extensions/tokens";
 * const result = decodeGetRewardsResultResult("...");
 * ```
 */
function decodeGetRewardsResult(result) {
    return (0, viem_1.decodeAbiParameters)(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "getRewards" function on the contract.
 * @param options - The options for the getRewards function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getRewards } from "thirdweb/extensions/tokens";
 *
 * const result = await getRewards({
 *  contract,
 *  asset: ...,
 * });
 *
 * ```
 */
async function getRewards(options) {
    return (0, read_contract_js_1.readContract)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.asset],
    });
}
//# sourceMappingURL=getRewards.js.map