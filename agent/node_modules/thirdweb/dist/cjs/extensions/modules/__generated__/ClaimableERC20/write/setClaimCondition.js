"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isSetClaimConditionSupported = isSetClaimConditionSupported;
exports.encodeSetClaimConditionParams = encodeSetClaimConditionParams;
exports.encodeSetClaimCondition = encodeSetClaimCondition;
exports.setClaimCondition = setClaimCondition;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0xac0c12f4";
const FN_INPUTS = [
    {
        components: [
            {
                name: "availableSupply",
                type: "uint256",
            },
            {
                name: "allowlistMerkleRoot",
                type: "bytes32",
            },
            {
                name: "pricePerUnit",
                type: "uint256",
            },
            {
                name: "currency",
                type: "address",
            },
            {
                name: "maxMintPerWallet",
                type: "uint256",
            },
            {
                name: "startTimestamp",
                type: "uint48",
            },
            {
                name: "endTimestamp",
                type: "uint48",
            },
            {
                name: "auxData",
                type: "string",
            },
        ],
        name: "_claimCondition",
        type: "tuple",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `setClaimCondition` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `setClaimCondition` method is supported.
 * @modules ClaimableERC20
 * @example
 * ```ts
 * import { ClaimableERC20 } from "thirdweb/modules";
 *
 * const supported = ClaimableERC20.isSetClaimConditionSupported(["0x..."]);
 * ```
 */
function isSetClaimConditionSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "setClaimCondition" function.
 * @param options - The options for the setClaimCondition function.
 * @returns The encoded ABI parameters.
 * @modules ClaimableERC20
 * @example
 * ```ts
 * import { ClaimableERC20 } from "thirdweb/modules";
 * const result = ClaimableERC20.encodeSetClaimConditionParams({
 *  claimCondition: ...,
 * });
 * ```
 */
function encodeSetClaimConditionParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.claimCondition]);
}
/**
 * Encodes the "setClaimCondition" function into a Hex string with its parameters.
 * @param options - The options for the setClaimCondition function.
 * @returns The encoded hexadecimal string.
 * @modules ClaimableERC20
 * @example
 * ```ts
 * import { ClaimableERC20 } from "thirdweb/modules";
 * const result = ClaimableERC20.encodeSetClaimCondition({
 *  claimCondition: ...,
 * });
 * ```
 */
function encodeSetClaimCondition(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeSetClaimConditionParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "setClaimCondition" function on the contract.
 * @param options - The options for the "setClaimCondition" function.
 * @returns A prepared transaction object.
 * @modules ClaimableERC20
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { ClaimableERC20 } from "thirdweb/modules";
 *
 * const transaction = ClaimableERC20.setClaimCondition({
 *  contract,
 *  claimCondition: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function setClaimCondition(options) {
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
            return [resolvedOptions.claimCondition];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=setClaimCondition.js.map