"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isSetTransferableForSupported = isSetTransferableForSupported;
exports.encodeSetTransferableForParams = encodeSetTransferableForParams;
exports.encodeSetTransferableFor = encodeSetTransferableFor;
exports.setTransferableFor = setTransferableFor;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x4c297cbd";
const FN_INPUTS = [
    {
        name: "target",
        type: "address",
    },
    {
        name: "enableTransfer",
        type: "bool",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `setTransferableFor` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `setTransferableFor` method is supported.
 * @modules TransferableERC1155
 * @example
 * ```ts
 * import { TransferableERC1155 } from "thirdweb/modules";
 *
 * const supported = TransferableERC1155.isSetTransferableForSupported(["0x..."]);
 * ```
 */
function isSetTransferableForSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "setTransferableFor" function.
 * @param options - The options for the setTransferableFor function.
 * @returns The encoded ABI parameters.
 * @modules TransferableERC1155
 * @example
 * ```ts
 * import { TransferableERC1155 } from "thirdweb/modules";
 * const result = TransferableERC1155.encodeSetTransferableForParams({
 *  target: ...,
 *  enableTransfer: ...,
 * });
 * ```
 */
function encodeSetTransferableForParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.target,
        options.enableTransfer,
    ]);
}
/**
 * Encodes the "setTransferableFor" function into a Hex string with its parameters.
 * @param options - The options for the setTransferableFor function.
 * @returns The encoded hexadecimal string.
 * @modules TransferableERC1155
 * @example
 * ```ts
 * import { TransferableERC1155 } from "thirdweb/modules";
 * const result = TransferableERC1155.encodeSetTransferableFor({
 *  target: ...,
 *  enableTransfer: ...,
 * });
 * ```
 */
function encodeSetTransferableFor(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeSetTransferableForParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "setTransferableFor" function on the contract.
 * @param options - The options for the "setTransferableFor" function.
 * @returns A prepared transaction object.
 * @modules TransferableERC1155
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { TransferableERC1155 } from "thirdweb/modules";
 *
 * const transaction = TransferableERC1155.setTransferableFor({
 *  contract,
 *  target: ...,
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
function setTransferableFor(options) {
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
            return [resolvedOptions.target, resolvedOptions.enableTransfer];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=setTransferableFor.js.map