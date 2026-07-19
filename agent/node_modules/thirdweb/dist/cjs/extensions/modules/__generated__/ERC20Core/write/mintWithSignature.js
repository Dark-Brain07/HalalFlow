"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isMintWithSignatureSupported = isMintWithSignatureSupported;
exports.encodeMintWithSignatureParams = encodeMintWithSignatureParams;
exports.encodeMintWithSignature = encodeMintWithSignature;
exports.mintWithSignature = mintWithSignature;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x0f7d3652";
const FN_INPUTS = [
    {
        name: "to",
        type: "address",
    },
    {
        name: "amount",
        type: "uint256",
    },
    {
        name: "data",
        type: "bytes",
    },
    {
        name: "signature",
        type: "bytes",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `mintWithSignature` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `mintWithSignature` method is supported.
 * @modules ERC20Core
 * @example
 * ```ts
 * import { ERC20Core } from "thirdweb/modules";
 *
 * const supported = ERC20Core.isMintWithSignatureSupported(["0x..."]);
 * ```
 */
function isMintWithSignatureSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "mintWithSignature" function.
 * @param options - The options for the mintWithSignature function.
 * @returns The encoded ABI parameters.
 * @modules ERC20Core
 * @example
 * ```ts
 * import { ERC20Core } from "thirdweb/modules";
 * const result = ERC20Core.encodeMintWithSignatureParams({
 *  to: ...,
 *  amount: ...,
 *  data: ...,
 *  signature: ...,
 * });
 * ```
 */
function encodeMintWithSignatureParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.to,
        options.amount,
        options.data,
        options.signature,
    ]);
}
/**
 * Encodes the "mintWithSignature" function into a Hex string with its parameters.
 * @param options - The options for the mintWithSignature function.
 * @returns The encoded hexadecimal string.
 * @modules ERC20Core
 * @example
 * ```ts
 * import { ERC20Core } from "thirdweb/modules";
 * const result = ERC20Core.encodeMintWithSignature({
 *  to: ...,
 *  amount: ...,
 *  data: ...,
 *  signature: ...,
 * });
 * ```
 */
function encodeMintWithSignature(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeMintWithSignatureParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "mintWithSignature" function on the contract.
 * @param options - The options for the "mintWithSignature" function.
 * @returns A prepared transaction object.
 * @modules ERC20Core
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { ERC20Core } from "thirdweb/modules";
 *
 * const transaction = ERC20Core.mintWithSignature({
 *  contract,
 *  to: ...,
 *  amount: ...,
 *  data: ...,
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
function mintWithSignature(options) {
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
                resolvedOptions.to,
                resolvedOptions.amount,
                resolvedOptions.data,
                resolvedOptions.signature,
            ];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=mintWithSignature.js.map