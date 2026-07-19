"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isSetProposalThresholdSupported = isSetProposalThresholdSupported;
exports.encodeSetProposalThresholdParams = encodeSetProposalThresholdParams;
exports.encodeSetProposalThreshold = encodeSetProposalThreshold;
exports.setProposalThreshold = setProposalThreshold;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0xece40cc1";
const FN_INPUTS = [
    {
        name: "newProposalThreshold",
        type: "uint256",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `setProposalThreshold` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `setProposalThreshold` method is supported.
 * @extension VOTE
 * @example
 * ```ts
 * import { isSetProposalThresholdSupported } from "thirdweb/extensions/vote";
 *
 * const supported = isSetProposalThresholdSupported(["0x..."]);
 * ```
 */
function isSetProposalThresholdSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "setProposalThreshold" function.
 * @param options - The options for the setProposalThreshold function.
 * @returns The encoded ABI parameters.
 * @extension VOTE
 * @example
 * ```ts
 * import { encodeSetProposalThresholdParams } from "thirdweb/extensions/vote";
 * const result = encodeSetProposalThresholdParams({
 *  newProposalThreshold: ...,
 * });
 * ```
 */
function encodeSetProposalThresholdParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.newProposalThreshold]);
}
/**
 * Encodes the "setProposalThreshold" function into a Hex string with its parameters.
 * @param options - The options for the setProposalThreshold function.
 * @returns The encoded hexadecimal string.
 * @extension VOTE
 * @example
 * ```ts
 * import { encodeSetProposalThreshold } from "thirdweb/extensions/vote";
 * const result = encodeSetProposalThreshold({
 *  newProposalThreshold: ...,
 * });
 * ```
 */
function encodeSetProposalThreshold(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeSetProposalThresholdParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "setProposalThreshold" function on the contract.
 * @param options - The options for the "setProposalThreshold" function.
 * @returns A prepared transaction object.
 * @extension VOTE
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { setProposalThreshold } from "thirdweb/extensions/vote";
 *
 * const transaction = setProposalThreshold({
 *  contract,
 *  newProposalThreshold: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function setProposalThreshold(options) {
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
            return [resolvedOptions.newProposalThreshold];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=setProposalThreshold.js.map