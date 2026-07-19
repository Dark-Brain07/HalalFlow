"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isUninstallModuleSupported = isUninstallModuleSupported;
exports.encodeUninstallModuleParams = encodeUninstallModuleParams;
exports.encodeUninstallModule = encodeUninstallModule;
exports.uninstallModule = uninstallModule;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x70c109cd";
const FN_INPUTS = [
    {
        name: "moduleContract",
        type: "address",
    },
    {
        name: "data",
        type: "bytes",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `uninstallModule` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `uninstallModule` method is supported.
 * @extension MODULES
 * @example
 * ```ts
 * import { isUninstallModuleSupported } from "thirdweb/extensions/modules";
 *
 * const supported = isUninstallModuleSupported(["0x..."]);
 * ```
 */
function isUninstallModuleSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "uninstallModule" function.
 * @param options - The options for the uninstallModule function.
 * @returns The encoded ABI parameters.
 * @extension MODULES
 * @example
 * ```ts
 * import { encodeUninstallModuleParams } from "thirdweb/extensions/modules";
 * const result = encodeUninstallModuleParams({
 *  moduleContract: ...,
 *  data: ...,
 * });
 * ```
 */
function encodeUninstallModuleParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.moduleContract, options.data]);
}
/**
 * Encodes the "uninstallModule" function into a Hex string with its parameters.
 * @param options - The options for the uninstallModule function.
 * @returns The encoded hexadecimal string.
 * @extension MODULES
 * @example
 * ```ts
 * import { encodeUninstallModule } from "thirdweb/extensions/modules";
 * const result = encodeUninstallModule({
 *  moduleContract: ...,
 *  data: ...,
 * });
 * ```
 */
function encodeUninstallModule(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeUninstallModuleParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "uninstallModule" function on the contract.
 * @param options - The options for the "uninstallModule" function.
 * @returns A prepared transaction object.
 * @extension MODULES
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { uninstallModule } from "thirdweb/extensions/modules";
 *
 * const transaction = uninstallModule({
 *  contract,
 *  moduleContract: ...,
 *  data: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function uninstallModule(options) {
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
            return [resolvedOptions.moduleContract, resolvedOptions.data];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=uninstallModule.js.map