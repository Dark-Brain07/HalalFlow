"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isGrantRoleSupported = isGrantRoleSupported;
exports.encodeGrantRoleParams = encodeGrantRoleParams;
exports.encodeGrantRole = encodeGrantRole;
exports.grantRole = grantRole;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x2f2ff15d";
const FN_INPUTS = [
    {
        name: "role",
        type: "bytes32",
    },
    {
        name: "account",
        type: "address",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `grantRole` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `grantRole` method is supported.
 * @extension PERMISSIONS
 * @example
 * ```ts
 * import { isGrantRoleSupported } from "thirdweb/extensions/permissions";
 *
 * const supported = isGrantRoleSupported(["0x..."]);
 * ```
 */
function isGrantRoleSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "grantRole" function.
 * @param options - The options for the grantRole function.
 * @returns The encoded ABI parameters.
 * @extension PERMISSIONS
 * @example
 * ```ts
 * import { encodeGrantRoleParams } from "thirdweb/extensions/permissions";
 * const result = encodeGrantRoleParams({
 *  role: ...,
 *  account: ...,
 * });
 * ```
 */
function encodeGrantRoleParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.role, options.account]);
}
/**
 * Encodes the "grantRole" function into a Hex string with its parameters.
 * @param options - The options for the grantRole function.
 * @returns The encoded hexadecimal string.
 * @extension PERMISSIONS
 * @example
 * ```ts
 * import { encodeGrantRole } from "thirdweb/extensions/permissions";
 * const result = encodeGrantRole({
 *  role: ...,
 *  account: ...,
 * });
 * ```
 */
function encodeGrantRole(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeGrantRoleParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "grantRole" function on the contract.
 * @param options - The options for the "grantRole" function.
 * @returns A prepared transaction object.
 * @extension PERMISSIONS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { grantRole } from "thirdweb/extensions/permissions";
 *
 * const transaction = grantRole({
 *  contract,
 *  role: ...,
 *  account: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function grantRole(options) {
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
            return [resolvedOptions.role, resolvedOptions.account];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=grantRole.js.map