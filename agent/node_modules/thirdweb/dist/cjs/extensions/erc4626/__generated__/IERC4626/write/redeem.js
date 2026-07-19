"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isRedeemSupported = isRedeemSupported;
exports.encodeRedeemParams = encodeRedeemParams;
exports.encodeRedeem = encodeRedeem;
exports.redeem = redeem;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0xba087652";
const FN_INPUTS = [
    {
        name: "shares",
        type: "uint256",
    },
    {
        name: "receiver",
        type: "address",
    },
    {
        name: "owner",
        type: "address",
    },
];
const FN_OUTPUTS = [
    {
        name: "assets",
        type: "uint256",
    },
];
/**
 * Checks if the `redeem` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `redeem` method is supported.
 * @extension ERC4626
 * @example
 * ```ts
 * import { isRedeemSupported } from "thirdweb/extensions/erc4626";
 *
 * const supported = isRedeemSupported(["0x..."]);
 * ```
 */
function isRedeemSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "redeem" function.
 * @param options - The options for the redeem function.
 * @returns The encoded ABI parameters.
 * @extension ERC4626
 * @example
 * ```ts
 * import { encodeRedeemParams } from "thirdweb/extensions/erc4626";
 * const result = encodeRedeemParams({
 *  shares: ...,
 *  receiver: ...,
 *  owner: ...,
 * });
 * ```
 */
function encodeRedeemParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.shares,
        options.receiver,
        options.owner,
    ]);
}
/**
 * Encodes the "redeem" function into a Hex string with its parameters.
 * @param options - The options for the redeem function.
 * @returns The encoded hexadecimal string.
 * @extension ERC4626
 * @example
 * ```ts
 * import { encodeRedeem } from "thirdweb/extensions/erc4626";
 * const result = encodeRedeem({
 *  shares: ...,
 *  receiver: ...,
 *  owner: ...,
 * });
 * ```
 */
function encodeRedeem(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeRedeemParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "redeem" function on the contract.
 * @param options - The options for the "redeem" function.
 * @returns A prepared transaction object.
 * @extension ERC4626
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { redeem } from "thirdweb/extensions/erc4626";
 *
 * const transaction = redeem({
 *  contract,
 *  shares: ...,
 *  receiver: ...,
 *  owner: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function redeem(options) {
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
                resolvedOptions.shares,
                resolvedOptions.receiver,
                resolvedOptions.owner,
            ];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=redeem.js.map