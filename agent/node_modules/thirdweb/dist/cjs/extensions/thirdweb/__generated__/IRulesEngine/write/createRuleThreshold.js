"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isCreateRuleThresholdSupported = isCreateRuleThresholdSupported;
exports.encodeCreateRuleThresholdParams = encodeCreateRuleThresholdParams;
exports.encodeCreateRuleThreshold = encodeCreateRuleThreshold;
exports.createRuleThreshold = createRuleThreshold;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x1022a25e";
const FN_INPUTS = [
    {
        components: [
            {
                name: "token",
                type: "address",
            },
            {
                name: "tokenType",
                type: "uint8",
            },
            {
                name: "tokenId",
                type: "uint256",
            },
            {
                name: "balance",
                type: "uint256",
            },
            {
                name: "score",
                type: "uint256",
            },
        ],
        name: "rule",
        type: "tuple",
    },
];
const FN_OUTPUTS = [
    {
        name: "ruleId",
        type: "bytes32",
    },
];
/**
 * Checks if the `createRuleThreshold` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `createRuleThreshold` method is supported.
 * @extension THIRDWEB
 * @example
 * ```ts
 * import { isCreateRuleThresholdSupported } from "thirdweb/extensions/thirdweb";
 *
 * const supported = isCreateRuleThresholdSupported(["0x..."]);
 * ```
 */
function isCreateRuleThresholdSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "createRuleThreshold" function.
 * @param options - The options for the createRuleThreshold function.
 * @returns The encoded ABI parameters.
 * @extension THIRDWEB
 * @example
 * ```ts
 * import { encodeCreateRuleThresholdParams } from "thirdweb/extensions/thirdweb";
 * const result = encodeCreateRuleThresholdParams({
 *  rule: ...,
 * });
 * ```
 */
function encodeCreateRuleThresholdParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.rule]);
}
/**
 * Encodes the "createRuleThreshold" function into a Hex string with its parameters.
 * @param options - The options for the createRuleThreshold function.
 * @returns The encoded hexadecimal string.
 * @extension THIRDWEB
 * @example
 * ```ts
 * import { encodeCreateRuleThreshold } from "thirdweb/extensions/thirdweb";
 * const result = encodeCreateRuleThreshold({
 *  rule: ...,
 * });
 * ```
 */
function encodeCreateRuleThreshold(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeCreateRuleThresholdParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "createRuleThreshold" function on the contract.
 * @param options - The options for the "createRuleThreshold" function.
 * @returns A prepared transaction object.
 * @extension THIRDWEB
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { createRuleThreshold } from "thirdweb/extensions/thirdweb";
 *
 * const transaction = createRuleThreshold({
 *  contract,
 *  rule: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function createRuleThreshold(options) {
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
            return [resolvedOptions.rule];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=createRuleThreshold.js.map