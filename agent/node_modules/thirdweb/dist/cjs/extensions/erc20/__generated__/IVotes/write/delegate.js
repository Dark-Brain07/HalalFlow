"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isDelegateSupported = isDelegateSupported;
exports.encodeDelegateParams = encodeDelegateParams;
exports.encodeDelegate = encodeDelegate;
exports.delegate = delegate;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x5c19a95c";
const FN_INPUTS = [
    {
        name: "delegatee",
        type: "address",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `delegate` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `delegate` method is supported.
 * @extension ERC20
 * @example
 * ```ts
 * import { isDelegateSupported } from "thirdweb/extensions/erc20";
 *
 * const supported = isDelegateSupported(["0x..."]);
 * ```
 */
function isDelegateSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "delegate" function.
 * @param options - The options for the delegate function.
 * @returns The encoded ABI parameters.
 * @extension ERC20
 * @example
 * ```ts
 * import { encodeDelegateParams } from "thirdweb/extensions/erc20";
 * const result = encodeDelegateParams({
 *  delegatee: ...,
 * });
 * ```
 */
function encodeDelegateParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.delegatee]);
}
/**
 * Encodes the "delegate" function into a Hex string with its parameters.
 * @param options - The options for the delegate function.
 * @returns The encoded hexadecimal string.
 * @extension ERC20
 * @example
 * ```ts
 * import { encodeDelegate } from "thirdweb/extensions/erc20";
 * const result = encodeDelegate({
 *  delegatee: ...,
 * });
 * ```
 */
function encodeDelegate(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeDelegateParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "delegate" function on the contract.
 * @param options - The options for the "delegate" function.
 * @returns A prepared transaction object.
 * @extension ERC20
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { delegate } from "thirdweb/extensions/erc20";
 *
 * const transaction = delegate({
 *  contract,
 *  delegatee: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function delegate(options) {
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
            return [resolvedOptions.delegatee];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=delegate.js.map