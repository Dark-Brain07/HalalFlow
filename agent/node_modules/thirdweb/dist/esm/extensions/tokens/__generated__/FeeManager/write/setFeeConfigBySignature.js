import { prepareContractCall } from "../../../../../transaction/prepare-contract-call.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
import { once } from "../../../../../utils/promise/once.js";
export const FN_SELECTOR = "0x9ba861e3";
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
    {
        type: "uint256",
        name: "nonce",
    },
    {
        type: "uint256",
        name: "deadline",
    },
    {
        type: "bytes",
        name: "signature",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `setFeeConfigBySignature` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `setFeeConfigBySignature` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isSetFeeConfigBySignatureSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isSetFeeConfigBySignatureSupported(["0x..."]);
 * ```
 */
export function isSetFeeConfigBySignatureSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "setFeeConfigBySignature" function.
 * @param options - The options for the setFeeConfigBySignature function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSetFeeConfigBySignatureParams } from "thirdweb/extensions/tokens";
 * const result = encodeSetFeeConfigBySignatureParams({
 *  target: ...,
 *  action: ...,
 *  recipient: ...,
 *  feeType: ...,
 *  value: ...,
 *  nonce: ...,
 *  deadline: ...,
 *  signature: ...,
 * });
 * ```
 */
export function encodeSetFeeConfigBySignatureParams(options) {
    return encodeAbiParameters(FN_INPUTS, [
        options.target,
        options.action,
        options.recipient,
        options.feeType,
        options.value,
        options.nonce,
        options.deadline,
        options.signature,
    ]);
}
/**
 * Encodes the "setFeeConfigBySignature" function into a Hex string with its parameters.
 * @param options - The options for the setFeeConfigBySignature function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSetFeeConfigBySignature } from "thirdweb/extensions/tokens";
 * const result = encodeSetFeeConfigBySignature({
 *  target: ...,
 *  action: ...,
 *  recipient: ...,
 *  feeType: ...,
 *  value: ...,
 *  nonce: ...,
 *  deadline: ...,
 *  signature: ...,
 * });
 * ```
 */
export function encodeSetFeeConfigBySignature(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodeSetFeeConfigBySignatureParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "setFeeConfigBySignature" function on the contract.
 * @param options - The options for the "setFeeConfigBySignature" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { setFeeConfigBySignature } from "thirdweb/extensions/tokens";
 *
 * const transaction = setFeeConfigBySignature({
 *  contract,
 *  target: ...,
 *  action: ...,
 *  recipient: ...,
 *  feeType: ...,
 *  value: ...,
 *  nonce: ...,
 *  deadline: ...,
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
export function setFeeConfigBySignature(options) {
    const asyncOptions = once(async () => {
        return "asyncParams" in options ? await options.asyncParams() : options;
    });
    return prepareContractCall({
        contract: options.contract,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: async () => {
            const resolvedOptions = await asyncOptions();
            return [
                resolvedOptions.target,
                resolvedOptions.action,
                resolvedOptions.recipient,
                resolvedOptions.feeType,
                resolvedOptions.value,
                resolvedOptions.nonce,
                resolvedOptions.deadline,
                resolvedOptions.signature,
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
//# sourceMappingURL=setFeeConfigBySignature.js.map