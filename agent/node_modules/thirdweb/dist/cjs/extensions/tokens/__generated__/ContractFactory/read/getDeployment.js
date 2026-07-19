"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isGetDeploymentSupported = isGetDeploymentSupported;
exports.encodeGetDeploymentParams = encodeGetDeploymentParams;
exports.encodeGetDeployment = encodeGetDeployment;
exports.decodeGetDeploymentResult = decodeGetDeploymentResult;
exports.getDeployment = getDeployment;
const viem_1 = require("viem");
const read_contract_js_1 = require("../../../../../transaction/read-contract.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0x0a29517f";
const FN_INPUTS = [
    {
        type: "bytes32",
        name: "id",
    },
    {
        type: "uint256",
        name: "version",
    },
];
const FN_OUTPUTS = [
    {
        type: "address",
    },
];
/**
 * Checks if the `getDeployment` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getDeployment` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isGetDeploymentSupported } from "thirdweb/extensions/tokens";
 * const supported = isGetDeploymentSupported(["0x..."]);
 * ```
 */
function isGetDeploymentSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "getDeployment" function.
 * @param options - The options for the getDeployment function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetDeploymentParams } from "thirdweb/extensions/tokens";
 * const result = encodeGetDeploymentParams({
 *  id: ...,
 *  version: ...,
 * });
 * ```
 */
function encodeGetDeploymentParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.id, options.version]);
}
/**
 * Encodes the "getDeployment" function into a Hex string with its parameters.
 * @param options - The options for the getDeployment function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetDeployment } from "thirdweb/extensions/tokens";
 * const result = encodeGetDeployment({
 *  id: ...,
 *  version: ...,
 * });
 * ```
 */
function encodeGetDeployment(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeGetDeploymentParams(options).slice(2));
}
/**
 * Decodes the result of the getDeployment function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeGetDeploymentResult } from "thirdweb/extensions/tokens";
 * const result = decodeGetDeploymentResultResult("...");
 * ```
 */
function decodeGetDeploymentResult(result) {
    return (0, viem_1.decodeAbiParameters)(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "getDeployment" function on the contract.
 * @param options - The options for the getDeployment function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getDeployment } from "thirdweb/extensions/tokens";
 *
 * const result = await getDeployment({
 *  contract,
 *  id: ...,
 *  version: ...,
 * });
 *
 * ```
 */
async function getDeployment(options) {
    return (0, read_contract_js_1.readContract)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.id, options.version],
    });
}
//# sourceMappingURL=getDeployment.js.map