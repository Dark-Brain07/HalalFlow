"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isStylus_constructorSupported = isStylus_constructorSupported;
exports.stylus_constructor = stylus_constructor;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0x5585258d";
const FN_INPUTS = [];
const FN_OUTPUTS = [];
/**
 * Checks if the `stylus_constructor` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `stylus_constructor` method is supported.
 * @extension STYLUS
 * @example
 * ```ts
 * import { isStylus_constructorSupported } from "thirdweb/extensions/stylus";
 *
 * const supported = isStylus_constructorSupported(["0x..."]);
 * ```
 */
function isStylus_constructorSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Prepares a transaction to call the "stylus_constructor" function on the contract.
 * @param options - The options for the "stylus_constructor" function.
 * @returns A prepared transaction object.
 * @extension STYLUS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { stylus_constructor } from "thirdweb/extensions/stylus";
 *
 * const transaction = stylus_constructor();
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function stylus_constructor(options) {
    return (0, prepare_contract_call_js_1.prepareContractCall)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
//# sourceMappingURL=stylus_constructor.js.map