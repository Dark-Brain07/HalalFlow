"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isSetTransferableSupported = isSetTransferableSupported;
exports.encodeSetTransferableParams = encodeSetTransferableParams;
exports.encodeSetTransferable = encodeSetTransferable;
exports.setTransferable = setTransferable;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x9cd23707";
const FN_INPUTS = [
    {
        name: "enableTransfer",
        type: "bool",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `setTransferable` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `setTransferable` method is supported.
 * @modules TransferableERC1155
 * @example
 * ```ts
 * import { TransferableERC1155 } from "thirdweb/modules";
 *
 * const supported = TransferableERC1155.isSetTransferableSupported(["0x..."]);
 * ```
 */
function isSetTransferableSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "setTransferable" function.
 * @param options - The options for the setTransferable function.
 * @returns The encoded ABI parameters.
 * @modules TransferableERC1155
 * @example
 * ```ts
 * import { TransferableERC1155 } from "thirdweb/modules";
 * const result = TransferableERC1155.encodeSetTransferableParams({
 *  enableTransfer: ...,
 * });
 * ```
 */
function encodeSetTransferableParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.enableTransfer]);
}
/**
 * Encodes the "setTransferable" function into a Hex string with its parameters.
 * @param options - The options for the setTransferable function.
 * @returns The encoded hexadecimal string.
 * @modules TransferableERC1155
 * @example
 * ```ts
 * import { TransferableERC1155 } from "thirdweb/modules";
 * const result = TransferableERC1155.encodeSetTransferable({
 *  enableTransfer: ...,
 * });
 * ```
 */
function encodeSetTransferable(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeSetTransferableParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "setTransferable" function on the contract.
 * @param options - The options for the "setTransferable" function.
 * @returns A prepared transaction object.
 * @modules TransferableERC1155
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { TransferableERC1155 } from "thirdweb/modules";
 *
 * const transaction = TransferableERC1155.setTransferable({
 *  contract,
 *  enableTransfer: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function setTransferable(options) {
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
            return [resolvedOptions.enableTransfer];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=setTransferable.js.map