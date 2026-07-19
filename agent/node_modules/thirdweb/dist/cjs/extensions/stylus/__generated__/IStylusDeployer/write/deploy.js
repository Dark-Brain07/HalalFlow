"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isDeploySupported = isDeploySupported;
exports.encodeDeployParams = encodeDeployParams;
exports.encodeDeploy = encodeDeploy;
exports.deploy = deploy;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0xa9a8e4e9";
const FN_INPUTS = [
    {
        name: "bytecode",
        type: "bytes",
    },
    {
        name: "initData",
        type: "bytes",
    },
    {
        name: "initValue",
        type: "uint256",
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
 * Checks if the `deploy` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `deploy` method is supported.
 * @extension STYLUS
 * @example
 * ```ts
 * import { isDeploySupported } from "thirdweb/extensions/stylus";
 *
 * const supported = isDeploySupported(["0x..."]);
 * ```
 */
function isDeploySupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "deploy" function.
 * @param options - The options for the deploy function.
 * @returns The encoded ABI parameters.
 * @extension STYLUS
 * @example
 * ```ts
 * import { encodeDeployParams } from "thirdweb/extensions/stylus";
 * const result = encodeDeployParams({
 *  bytecode: ...,
 *  initData: ...,
 *  initValue: ...,
 *  salt: ...,
 * });
 * ```
 */
function encodeDeployParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.bytecode,
        options.initData,
        options.initValue,
        options.salt,
    ]);
}
/**
 * Encodes the "deploy" function into a Hex string with its parameters.
 * @param options - The options for the deploy function.
 * @returns The encoded hexadecimal string.
 * @extension STYLUS
 * @example
 * ```ts
 * import { encodeDeploy } from "thirdweb/extensions/stylus";
 * const result = encodeDeploy({
 *  bytecode: ...,
 *  initData: ...,
 *  initValue: ...,
 *  salt: ...,
 * });
 * ```
 */
function encodeDeploy(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeDeployParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "deploy" function on the contract.
 * @param options - The options for the "deploy" function.
 * @returns A prepared transaction object.
 * @extension STYLUS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { deploy } from "thirdweb/extensions/stylus";
 *
 * const transaction = deploy({
 *  contract,
 *  bytecode: ...,
 *  initData: ...,
 *  initValue: ...,
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
function deploy(options) {
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
                resolvedOptions.bytecode,
                resolvedOptions.initData,
                resolvedOptions.initValue,
                resolvedOptions.salt,
            ];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=deploy.js.map