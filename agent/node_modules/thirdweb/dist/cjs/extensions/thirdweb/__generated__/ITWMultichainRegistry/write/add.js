"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isAddSupported = isAddSupported;
exports.encodeAddParams = encodeAddParams;
exports.encodeAdd = encodeAdd;
exports.add = add;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x26c5b516";
const FN_INPUTS = [
    {
        name: "_deployer",
        type: "address",
    },
    {
        name: "_deployment",
        type: "address",
    },
    {
        name: "_chainId",
        type: "uint256",
    },
    {
        name: "metadataUri",
        type: "string",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `add` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `add` method is supported.
 * @extension THIRDWEB
 * @example
 * ```ts
 * import { isAddSupported } from "thirdweb/extensions/thirdweb";
 *
 * const supported = isAddSupported(["0x..."]);
 * ```
 */
function isAddSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "add" function.
 * @param options - The options for the add function.
 * @returns The encoded ABI parameters.
 * @extension THIRDWEB
 * @example
 * ```ts
 * import { encodeAddParams } from "thirdweb/extensions/thirdweb";
 * const result = encodeAddParams({
 *  deployer: ...,
 *  deployment: ...,
 *  chainId: ...,
 *  metadataUri: ...,
 * });
 * ```
 */
function encodeAddParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.deployer,
        options.deployment,
        options.chainId,
        options.metadataUri,
    ]);
}
/**
 * Encodes the "add" function into a Hex string with its parameters.
 * @param options - The options for the add function.
 * @returns The encoded hexadecimal string.
 * @extension THIRDWEB
 * @example
 * ```ts
 * import { encodeAdd } from "thirdweb/extensions/thirdweb";
 * const result = encodeAdd({
 *  deployer: ...,
 *  deployment: ...,
 *  chainId: ...,
 *  metadataUri: ...,
 * });
 * ```
 */
function encodeAdd(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeAddParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "add" function on the contract.
 * @param options - The options for the "add" function.
 * @returns A prepared transaction object.
 * @extension THIRDWEB
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { add } from "thirdweb/extensions/thirdweb";
 *
 * const transaction = add({
 *  contract,
 *  deployer: ...,
 *  deployment: ...,
 *  chainId: ...,
 *  metadataUri: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function add(options) {
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
                resolvedOptions.deployer,
                resolvedOptions.deployment,
                resolvedOptions.chainId,
                resolvedOptions.metadataUri,
            ];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=add.js.map