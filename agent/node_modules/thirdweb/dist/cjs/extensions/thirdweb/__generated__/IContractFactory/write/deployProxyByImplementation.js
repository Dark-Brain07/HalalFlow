"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isDeployProxyByImplementationSupported = isDeployProxyByImplementationSupported;
exports.encodeDeployProxyByImplementationParams = encodeDeployProxyByImplementationParams;
exports.encodeDeployProxyByImplementation = encodeDeployProxyByImplementation;
exports.deployProxyByImplementation = deployProxyByImplementation;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x11b804ab";
const FN_INPUTS = [
    {
        name: "implementation",
        type: "address",
    },
    {
        name: "data",
        type: "bytes",
    },
    {
        name: "salt",
        type: "bytes32",
    },
];
const FN_OUTPUTS = [
    {
        type: "address",
    },
];
/**
 * Checks if the `deployProxyByImplementation` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `deployProxyByImplementation` method is supported.
 * @extension THIRDWEB
 * @example
 * ```ts
 * import { isDeployProxyByImplementationSupported } from "thirdweb/extensions/thirdweb";
 *
 * const supported = isDeployProxyByImplementationSupported(["0x..."]);
 * ```
 */
function isDeployProxyByImplementationSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "deployProxyByImplementation" function.
 * @param options - The options for the deployProxyByImplementation function.
 * @returns The encoded ABI parameters.
 * @extension THIRDWEB
 * @example
 * ```ts
 * import { encodeDeployProxyByImplementationParams } from "thirdweb/extensions/thirdweb";
 * const result = encodeDeployProxyByImplementationParams({
 *  implementation: ...,
 *  data: ...,
 *  salt: ...,
 * });
 * ```
 */
function encodeDeployProxyByImplementationParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.implementation,
        options.data,
        options.salt,
    ]);
}
/**
 * Encodes the "deployProxyByImplementation" function into a Hex string with its parameters.
 * @param options - The options for the deployProxyByImplementation function.
 * @returns The encoded hexadecimal string.
 * @extension THIRDWEB
 * @example
 * ```ts
 * import { encodeDeployProxyByImplementation } from "thirdweb/extensions/thirdweb";
 * const result = encodeDeployProxyByImplementation({
 *  implementation: ...,
 *  data: ...,
 *  salt: ...,
 * });
 * ```
 */
function encodeDeployProxyByImplementation(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeDeployProxyByImplementationParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "deployProxyByImplementation" function on the contract.
 * @param options - The options for the "deployProxyByImplementation" function.
 * @returns A prepared transaction object.
 * @extension THIRDWEB
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { deployProxyByImplementation } from "thirdweb/extensions/thirdweb";
 *
 * const transaction = deployProxyByImplementation({
 *  contract,
 *  implementation: ...,
 *  data: ...,
 *  salt: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function deployProxyByImplementation(options) {
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
            return [
                resolvedOptions.implementation,
                resolvedOptions.data,
                resolvedOptions.salt,
            ];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=deployProxyByImplementation.js.map