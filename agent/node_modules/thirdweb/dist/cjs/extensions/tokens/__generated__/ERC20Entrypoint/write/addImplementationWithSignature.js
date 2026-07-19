"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isAddImplementationWithSignatureSupported = isAddImplementationWithSignatureSupported;
exports.encodeAddImplementationWithSignatureParams = encodeAddImplementationWithSignatureParams;
exports.encodeAddImplementationWithSignature = encodeAddImplementationWithSignature;
exports.addImplementationWithSignature = addImplementationWithSignature;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x63742df3";
const FN_INPUTS = [
    {
        type: "tuple",
        name: "request",
        components: [
            {
                type: "tuple",
                name: "config",
                components: [
                    {
                        type: "bytes32",
                        name: "contractId",
                    },
                    {
                        type: "address",
                        name: "implementation",
                    },
                    {
                        type: "uint8",
                        name: "implementationType",
                    },
                    {
                        type: "uint8",
                        name: "createHook",
                    },
                    {
                        type: "bytes",
                        name: "createHookData",
                    },
                ],
            },
            {
                type: "bool",
                name: "isDefault",
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
const FN_OUTPUTS = [];
/**
 * Checks if the `addImplementationWithSignature` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `addImplementationWithSignature` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isAddImplementationWithSignatureSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isAddImplementationWithSignatureSupported(["0x..."]);
 * ```
 */
function isAddImplementationWithSignatureSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "addImplementationWithSignature" function.
 * @param options - The options for the addImplementationWithSignature function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeAddImplementationWithSignatureParams } from "thirdweb/extensions/tokens";
 * const result = encodeAddImplementationWithSignatureParams({
 *  request: ...,
 *  signature: ...,
 * });
 * ```
 */
function encodeAddImplementationWithSignatureParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.request, options.signature]);
}
/**
 * Encodes the "addImplementationWithSignature" function into a Hex string with its parameters.
 * @param options - The options for the addImplementationWithSignature function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeAddImplementationWithSignature } from "thirdweb/extensions/tokens";
 * const result = encodeAddImplementationWithSignature({
 *  request: ...,
 *  signature: ...,
 * });
 * ```
 */
function encodeAddImplementationWithSignature(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeAddImplementationWithSignatureParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "addImplementationWithSignature" function on the contract.
 * @param options - The options for the "addImplementationWithSignature" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { addImplementationWithSignature } from "thirdweb/extensions/tokens";
 *
 * const transaction = addImplementationWithSignature({
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
function addImplementationWithSignature(options) {
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
//# sourceMappingURL=addImplementationWithSignature.js.map