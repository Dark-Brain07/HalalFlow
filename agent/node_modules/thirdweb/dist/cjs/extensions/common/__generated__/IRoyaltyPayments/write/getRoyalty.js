"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isGetRoyaltySupported = isGetRoyaltySupported;
exports.encodeGetRoyaltyParams = encodeGetRoyaltyParams;
exports.encodeGetRoyalty = encodeGetRoyalty;
exports.getRoyalty = getRoyalty;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0xf533b802";
const FN_INPUTS = [
    {
        name: "tokenAddress",
        type: "address",
    },
    {
        name: "tokenId",
        type: "uint256",
    },
    {
        name: "value",
        type: "uint256",
    },
];
const FN_OUTPUTS = [
    {
        name: "recipients",
        type: "address[]",
    },
    {
        name: "amounts",
        type: "uint256[]",
    },
];
/**
 * Checks if the `getRoyalty` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getRoyalty` method is supported.
 * @extension COMMON
 * @example
 * ```ts
 * import { isGetRoyaltySupported } from "thirdweb/extensions/common";
 *
 * const supported = isGetRoyaltySupported(["0x..."]);
 * ```
 */
function isGetRoyaltySupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "getRoyalty" function.
 * @param options - The options for the getRoyalty function.
 * @returns The encoded ABI parameters.
 * @extension COMMON
 * @example
 * ```ts
 * import { encodeGetRoyaltyParams } from "thirdweb/extensions/common";
 * const result = encodeGetRoyaltyParams({
 *  tokenAddress: ...,
 *  tokenId: ...,
 *  value: ...,
 * });
 * ```
 */
function encodeGetRoyaltyParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.tokenAddress,
        options.tokenId,
        options.value,
    ]);
}
/**
 * Encodes the "getRoyalty" function into a Hex string with its parameters.
 * @param options - The options for the getRoyalty function.
 * @returns The encoded hexadecimal string.
 * @extension COMMON
 * @example
 * ```ts
 * import { encodeGetRoyalty } from "thirdweb/extensions/common";
 * const result = encodeGetRoyalty({
 *  tokenAddress: ...,
 *  tokenId: ...,
 *  value: ...,
 * });
 * ```
 */
function encodeGetRoyalty(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeGetRoyaltyParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "getRoyalty" function on the contract.
 * @param options - The options for the "getRoyalty" function.
 * @returns A prepared transaction object.
 * @extension COMMON
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { getRoyalty } from "thirdweb/extensions/common";
 *
 * const transaction = getRoyalty({
 *  contract,
 *  tokenAddress: ...,
 *  tokenId: ...,
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
function getRoyalty(options) {
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
                resolvedOptions.tokenAddress,
                resolvedOptions.tokenId,
                resolvedOptions.value,
            ];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=getRoyalty.js.map