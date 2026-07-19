"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isTransferSupported = isTransferSupported;
exports.encodeTransferParams = encodeTransferParams;
exports.encodeTransfer = encodeTransfer;
exports.transfer = transfer;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0xa9059cbb";
const FN_INPUTS = [
    {
        type: "address",
        name: "to",
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
 * Checks if the `transfer` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `transfer` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isTransferSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isTransferSupported(["0x..."]);
 * ```
 */
function isTransferSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "transfer" function.
 * @param options - The options for the transfer function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeTransferParams } from "thirdweb/extensions/tokens";
 * const result = encodeTransferParams({
 *  to: ...,
 *  amount: ...,
 * });
 * ```
 */
function encodeTransferParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.to, options.amount]);
}
/**
 * Encodes the "transfer" function into a Hex string with its parameters.
 * @param options - The options for the transfer function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeTransfer } from "thirdweb/extensions/tokens";
 * const result = encodeTransfer({
 *  to: ...,
 *  amount: ...,
 * });
 * ```
 */
function encodeTransfer(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeTransferParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "transfer" function on the contract.
 * @param options - The options for the "transfer" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { transfer } from "thirdweb/extensions/tokens";
 *
 * const transaction = transfer({
 *  contract,
 *  to: ...,
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
function transfer(options) {
    const asyncOptions = (0, once_js_1.once)(async () => {
        return "asyncParams" in options ? await options.asyncParams() : options;
    });
    return (0, prepare_contract_call_js_1.prepareContractCall)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: async () => {
            const resolvedOptions = await asyncOptions();
            return [resolvedOptions.to, resolvedOptions.amount];
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
//# sourceMappingURL=transfer.js.map