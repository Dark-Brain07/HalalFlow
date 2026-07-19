"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isAirdropNativeTokenSupported = isAirdropNativeTokenSupported;
exports.encodeAirdropNativeTokenParams = encodeAirdropNativeTokenParams;
exports.encodeAirdropNativeToken = encodeAirdropNativeToken;
exports.airdropNativeToken = airdropNativeToken;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x0d5818f7";
const FN_INPUTS = [
    {
        components: [
            {
                name: "recipient",
                type: "address",
            },
            {
                name: "amount",
                type: "uint256",
            },
        ],
        name: "_contents",
        type: "tuple[]",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `airdropNativeToken` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `airdropNativeToken` method is supported.
 * @extension AIRDROP
 * @example
 * ```ts
 * import { isAirdropNativeTokenSupported } from "thirdweb/extensions/airdrop";
 *
 * const supported = isAirdropNativeTokenSupported(["0x..."]);
 * ```
 */
function isAirdropNativeTokenSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "airdropNativeToken" function.
 * @param options - The options for the airdropNativeToken function.
 * @returns The encoded ABI parameters.
 * @extension AIRDROP
 * @example
 * ```ts
 * import { encodeAirdropNativeTokenParams } from "thirdweb/extensions/airdrop";
 * const result = encodeAirdropNativeTokenParams({
 *  contents: ...,
 * });
 * ```
 */
function encodeAirdropNativeTokenParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.contents]);
}
/**
 * Encodes the "airdropNativeToken" function into a Hex string with its parameters.
 * @param options - The options for the airdropNativeToken function.
 * @returns The encoded hexadecimal string.
 * @extension AIRDROP
 * @example
 * ```ts
 * import { encodeAirdropNativeToken } from "thirdweb/extensions/airdrop";
 * const result = encodeAirdropNativeToken({
 *  contents: ...,
 * });
 * ```
 */
function encodeAirdropNativeToken(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeAirdropNativeTokenParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "airdropNativeToken" function on the contract.
 * @param options - The options for the "airdropNativeToken" function.
 * @returns A prepared transaction object.
 * @extension AIRDROP
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { airdropNativeToken } from "thirdweb/extensions/airdrop";
 *
 * const transaction = airdropNativeToken({
 *  contract,
 *  contents: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function airdropNativeToken(options) {
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
            return [resolvedOptions.contents];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=airdropNativeToken.js.map