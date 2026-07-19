"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isDeployContractWithSignatureSupported = isDeployContractWithSignatureSupported;
exports.encodeDeployContractWithSignatureParams = encodeDeployContractWithSignatureParams;
exports.encodeDeployContractWithSignature = encodeDeployContractWithSignature;
exports.deployContractWithSignature = deployContractWithSignature;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0xe4d59447";
const FN_INPUTS = [
    {
        type: "tuple",
        name: "request",
        components: [
            {
                type: "bytes32",
                name: "id",
            },
            {
                type: "uint8",
                name: "deployType",
            },
            {
                type: "bytes",
                name: "bytecode",
            },
            {
                type: "bytes",
                name: "constructorArgs",
            },
            {
                type: "bytes32",
                name: "salt",
            },
            {
                type: "bytes[]",
                name: "postDeployCalls",
            },
            {
                type: "uint256",
                name: "nonce",
            },
            {
                type: "uint256",
                name: "deadline",
            },
        ],
    },
    {
        type: "bytes",
        name: "signature",
    },
];
const FN_OUTPUTS = [
    {
        type: "address",
        name: "deployed",
    },
];
/**
 * Checks if the `deployContractWithSignature` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `deployContractWithSignature` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isDeployContractWithSignatureSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isDeployContractWithSignatureSupported(["0x..."]);
 * ```
 */
function isDeployContractWithSignatureSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "deployContractWithSignature" function.
 * @param options - The options for the deployContractWithSignature function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeDeployContractWithSignatureParams } from "thirdweb/extensions/tokens";
 * const result = encodeDeployContractWithSignatureParams({
 *  request: ...,
 *  signature: ...,
 * });
 * ```
 */
function encodeDeployContractWithSignatureParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.request, options.signature]);
}
/**
 * Encodes the "deployContractWithSignature" function into a Hex string with its parameters.
 * @param options - The options for the deployContractWithSignature function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeDeployContractWithSignature } from "thirdweb/extensions/tokens";
 * const result = encodeDeployContractWithSignature({
 *  request: ...,
 *  signature: ...,
 * });
 * ```
 */
function encodeDeployContractWithSignature(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeDeployContractWithSignatureParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "deployContractWithSignature" function on the contract.
 * @param options - The options for the "deployContractWithSignature" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { deployContractWithSignature } from "thirdweb/extensions/tokens";
 *
 * const transaction = deployContractWithSignature({
 *  contract,
 *  request: ...,
 *  signature: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function deployContractWithSignature(options) {
    const asyncOptions = (0, once_js_1.once)(async () => {
        return "asyncParams" in options ? await options.asyncParams() : options;
    });
    return (0, prepare_contract_call_js_1.prepareContractCall)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: async () => {
            const resolvedOptions = await asyncOptions();
            return [resolvedOptions.request, resolvedOptions.signature];
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
//# sourceMappingURL=deployContractWithSignature.js.map