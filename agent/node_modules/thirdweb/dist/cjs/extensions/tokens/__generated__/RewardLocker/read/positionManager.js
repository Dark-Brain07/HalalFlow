"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isPositionManagerSupported = isPositionManagerSupported;
exports.decodePositionManagerResult = decodePositionManagerResult;
exports.positionManager = positionManager;
const viem_1 = require("viem");
const read_contract_js_1 = require("../../../../../transaction/read-contract.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0x791b98bc";
const FN_INPUTS = [];
const FN_OUTPUTS = [
    {
        type: "address",
    },
];
/**
 * Checks if the `positionManager` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `positionManager` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isPositionManagerSupported } from "thirdweb/extensions/tokens";
 * const supported = isPositionManagerSupported(["0x..."]);
 * ```
 */
function isPositionManagerSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Decodes the result of the positionManager function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodePositionManagerResult } from "thirdweb/extensions/tokens";
 * const result = decodePositionManagerResultResult("...");
 * ```
 */
function decodePositionManagerResult(result) {
    return (0, viem_1.decodeAbiParameters)(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "positionManager" function on the contract.
 * @param options - The options for the positionManager function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { positionManager } from "thirdweb/extensions/tokens";
 *
 * const result = await positionManager({
 *  contract,
 * });
 *
 * ```
 */
async function positionManager(options) {
    return (0, read_contract_js_1.readContract)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [],
    });
}
//# sourceMappingURL=positionManager.js.map