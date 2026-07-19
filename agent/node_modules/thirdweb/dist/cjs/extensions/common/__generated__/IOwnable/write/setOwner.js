"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isSetOwnerSupported = isSetOwnerSupported;
exports.encodeSetOwnerParams = encodeSetOwnerParams;
exports.encodeSetOwner = encodeSetOwner;
exports.setOwner = setOwner;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x13af4035";
const FN_INPUTS = [
    {
        name: "_newOwner",
        type: "address",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `setOwner` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `setOwner` method is supported.
 * @extension COMMON
 * @example
 * ```ts
 * import { isSetOwnerSupported } from "thirdweb/extensions/common";
 *
 * const supported = isSetOwnerSupported(["0x..."]);
 * ```
 */
function isSetOwnerSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "setOwner" function.
 * @param options - The options for the setOwner function.
 * @returns The encoded ABI parameters.
 * @extension COMMON
 * @example
 * ```ts
 * import { encodeSetOwnerParams } from "thirdweb/extensions/common";
 * const result = encodeSetOwnerParams({
 *  newOwner: ...,
 * });
 * ```
 */
function encodeSetOwnerParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.newOwner]);
}
/**
 * Encodes the "setOwner" function into a Hex string with its parameters.
 * @param options - The options for the setOwner function.
 * @returns The encoded hexadecimal string.
 * @extension COMMON
 * @example
 * ```ts
 * import { encodeSetOwner } from "thirdweb/extensions/common";
 * const result = encodeSetOwner({
 *  newOwner: ...,
 * });
 * ```
 */
function encodeSetOwner(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeSetOwnerParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "setOwner" function on the contract.
 * @param options - The options for the "setOwner" function.
 * @returns A prepared transaction object.
 * @extension COMMON
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { setOwner } from "thirdweb/extensions/common";
 *
 * const transaction = setOwner({
 *  contract,
 *  newOwner: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function setOwner(options) {
    const asyncOptions = (0, once_js_1.once)(async () => {
        return "asyncParams" in options ? await options.asyncParams() : options;
    });
    return (0, prepare_contract_call_js_1.prepareContractCall)({
        accessList: async () => (await asyncOptions()).overrides?.accessList,
        authorizationList: async () => (await asyncOptions()).overrides?.authorizationList,
        contract: options.contract,
        erc20Value: async () => (await asyncOptions()).overrides?.erc20Value,
        extraGas: async () => (await asyncOptions()).overrides?.extraGas,
        gas: async () => (await asyncOptions()).overrides?.gas,
        gasPrice: async () => (await asyncOptions()).overrides?.gasPrice,
        maxFeePerGas: async () => (await asyncOptions()).overrides?.maxFeePerGas,
        maxPriorityFeePerGas: async () => (await asyncOptions()).overrides?.maxPriorityFeePerGas,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        nonce: async () => (await asyncOptions()).overrides?.nonce,
        params: async () => {
            const resolvedOptions = await asyncOptions();
            return [resolvedOptions.newOwner];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=setOwner.js.map