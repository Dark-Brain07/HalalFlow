"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isApproveSupported = isApproveSupported;
exports.encodeApproveParams = encodeApproveParams;
exports.encodeApprove = encodeApprove;
exports.approve = approve;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x095ea7b3";
const FN_INPUTS = [
    {
        type: "address",
        name: "spender",
    },
    {
        type: "uint256",
        name: "amount",
    },
];
const FN_OUTPUTS = [
    {
        type: "bool",
    },
];
/**
 * Checks if the `approve` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `approve` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isApproveSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isApproveSupported(["0x..."]);
 * ```
 */
function isApproveSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "approve" function.
 * @param options - The options for the approve function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeApproveParams } from "thirdweb/extensions/tokens";
 * const result = encodeApproveParams({
 *  spender: ...,
 *  amount: ...,
 * });
 * ```
 */
function encodeApproveParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.spender, options.amount]);
}
/**
 * Encodes the "approve" function into a Hex string with its parameters.
 * @param options - The options for the approve function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeApprove } from "thirdweb/extensions/tokens";
 * const result = encodeApprove({
 *  spender: ...,
 *  amount: ...,
 * });
 * ```
 */
function encodeApprove(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeApproveParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "approve" function on the contract.
 * @param options - The options for the "approve" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { approve } from "thirdweb/extensions/tokens";
 *
 * const transaction = approve({
 *  contract,
 *  spender: ...,
 *  amount: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function approve(options) {
    const asyncOptions = (0, once_js_1.once)(async () => {
        return "asyncParams" in options ? await options.asyncParams() : options;
    });
    return (0, prepare_contract_call_js_1.prepareContractCall)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: async () => {
            const resolvedOptions = await asyncOptions();
            return [resolvedOptions.spender, resolvedOptions.amount];
        },
        value: async () => (await asyncOptions()).overrides?.value,
        accessList: async () => (await asyncOptions()).overrides?.accessList,
        gas: async () => (await asyncOptions()).overrides?.gas,
        gasPrice: async () => (await asyncOptions()).overrides?.gasPrice,
        maxFeePerGas: async () => (await asyncOptions()).overrides?.maxFeePerGas,
        maxPriorityFeePerGas: async () => (await asyncOptions()).overrides?.maxPriorityFeePerGas,
        nonce: async () => (await asyncOptions()).overrides?.nonce,
        extraGas: async () => (await asyncOptions()).overrides?.extraGas,
        erc20Value: async () => (await asyncOptions()).overrides?.erc20Value,
        authorizationList: async () => (await asyncOptions()).overrides?.authorizationList,
    });
}
//# sourceMappingURL=approve.js.map