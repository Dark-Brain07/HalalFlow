"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isSetTargetFeeConfigSupported = isSetTargetFeeConfigSupported;
exports.encodeSetTargetFeeConfigParams = encodeSetTargetFeeConfigParams;
exports.encodeSetTargetFeeConfig = encodeSetTargetFeeConfig;
exports.setTargetFeeConfig = setTargetFeeConfig;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0xd20caa1a";
const FN_INPUTS = [
    {
        type: "address",
        name: "target",
    },
    {
        type: "bytes4",
        name: "action",
    },
    {
        type: "address",
        name: "recipient",
    },
    {
        type: "uint8",
        name: "feeType",
    },
    {
        type: "uint256",
        name: "value",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `setTargetFeeConfig` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `setTargetFeeConfig` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isSetTargetFeeConfigSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isSetTargetFeeConfigSupported(["0x..."]);
 * ```
 */
function isSetTargetFeeConfigSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "setTargetFeeConfig" function.
 * @param options - The options for the setTargetFeeConfig function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSetTargetFeeConfigParams } from "thirdweb/extensions/tokens";
 * const result = encodeSetTargetFeeConfigParams({
 *  target: ...,
 *  action: ...,
 *  recipient: ...,
 *  feeType: ...,
 *  value: ...,
 * });
 * ```
 */
function encodeSetTargetFeeConfigParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.target,
        options.action,
        options.recipient,
        options.feeType,
        options.value,
    ]);
}
/**
 * Encodes the "setTargetFeeConfig" function into a Hex string with its parameters.
 * @param options - The options for the setTargetFeeConfig function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSetTargetFeeConfig } from "thirdweb/extensions/tokens";
 * const result = encodeSetTargetFeeConfig({
 *  target: ...,
 *  action: ...,
 *  recipient: ...,
 *  feeType: ...,
 *  value: ...,
 * });
 * ```
 */
function encodeSetTargetFeeConfig(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeSetTargetFeeConfigParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "setTargetFeeConfig" function on the contract.
 * @param options - The options for the "setTargetFeeConfig" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { setTargetFeeConfig } from "thirdweb/extensions/tokens";
 *
 * const transaction = setTargetFeeConfig({
 *  contract,
 *  target: ...,
 *  action: ...,
 *  recipient: ...,
 *  feeType: ...,
 *  value: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function setTargetFeeConfig(options) {
    const asyncOptions = (0, once_js_1.once)(async () => {
        return "asyncParams" in options ? await options.asyncParams() : options;
    });
    return (0, prepare_contract_call_js_1.prepareContractCall)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: async () => {
            const resolvedOptions = await asyncOptions();
            return [
                resolvedOptions.target,
                resolvedOptions.action,
                resolvedOptions.recipient,
                resolvedOptions.feeType,
                resolvedOptions.value,
            ];
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
//# sourceMappingURL=setTargetFeeConfig.js.map