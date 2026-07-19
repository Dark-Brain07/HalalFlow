"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isFeeManagerSupported = isFeeManagerSupported;
exports.decodeFeeManagerResult = decodeFeeManagerResult;
exports.feeManager = feeManager;
const viem_1 = require("viem");
const read_contract_js_1 = require("../../../../../transaction/read-contract.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0xd0fb0203";
const FN_INPUTS = [];
const FN_OUTPUTS = [
    {
        type: "address",
    },
];
/**
 * Checks if the `feeManager` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `feeManager` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isFeeManagerSupported } from "thirdweb/extensions/tokens";
 * const supported = isFeeManagerSupported(["0x..."]);
 * ```
 */
function isFeeManagerSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Decodes the result of the feeManager function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeFeeManagerResult } from "thirdweb/extensions/tokens";
 * const result = decodeFeeManagerResultResult("...");
 * ```
 */
function decodeFeeManagerResult(result) {
    return (0, viem_1.decodeAbiParameters)(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "feeManager" function on the contract.
 * @param options - The options for the feeManager function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { feeManager } from "thirdweb/extensions/tokens";
 *
 * const result = await feeManager({
 *  contract,
 * });
 *
 * ```
 */
async function feeManager(options) {
    return (0, read_contract_js_1.readContract)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [],
    });
}
//# sourceMappingURL=feeManager.js.map