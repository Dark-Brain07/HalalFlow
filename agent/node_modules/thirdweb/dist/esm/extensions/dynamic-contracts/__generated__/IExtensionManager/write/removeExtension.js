import { prepareContractCall } from "../../../../../transaction/prepare-contract-call.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
import { once } from "../../../../../utils/promise/once.js";
export const FN_SELECTOR = "0xee7d2adf";
const FN_INPUTS = [
    {
        name: "extensionName",
        type: "string",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `removeExtension` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `removeExtension` method is supported.
 * @extension DYNAMIC-CONTRACTS
 * @example
 * ```ts
 * import { isRemoveExtensionSupported } from "thirdweb/extensions/dynamic-contracts";
 *
 * const supported = isRemoveExtensionSupported(["0x..."]);
 * ```
 */
export function isRemoveExtensionSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "removeExtension" function.
 * @param options - The options for the removeExtension function.
 * @returns The encoded ABI parameters.
 * @extension DYNAMIC-CONTRACTS
 * @example
 * ```ts
 * import { encodeRemoveExtensionParams } from "thirdweb/extensions/dynamic-contracts";
 * const result = encodeRemoveExtensionParams({
 *  extensionName: ...,
 * });
 * ```
 */
export function encodeRemoveExtensionParams(options) {
    return encodeAbiParameters(FN_INPUTS, [options.extensionName]);
}
/**
 * Encodes the "removeExtension" function into a Hex string with its parameters.
 * @param options - The options for the removeExtension function.
 * @returns The encoded hexadecimal string.
 * @extension DYNAMIC-CONTRACTS
 * @example
 * ```ts
 * import { encodeRemoveExtension } from "thirdweb/extensions/dynamic-contracts";
 * const result = encodeRemoveExtension({
 *  extensionName: ...,
 * });
 * ```
 */
export function encodeRemoveExtension(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodeRemoveExtensionParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "removeExtension" function on the contract.
 * @param options - The options for the "removeExtension" function.
 * @returns A prepared transaction object.
 * @extension DYNAMIC-CONTRACTS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { removeExtension } from "thirdweb/extensions/dynamic-contracts";
 *
 * const transaction = removeExtension({
 *  contract,
 *  extensionName: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export function removeExtension(options) {
    const asyncOptions = once(async () => {
        return "asyncParams" in options ? await options.asyncParams() : options;
    });
    return prepareContractCall({
        accessList: async () => (await asyncOptions()).overrides?.accessList,
        authorizationList: async () => (await asyncOptions()).overrides?.authorizationList,
        contract: options.contract,
        erc20Value: async () => (await asyncOptions()).overrides?.erc20Value,
        extraGas: async () => (await asyncOptions()).overrides?.extraGas,
        gas: async () => (await asyncOptions()).overrides?.gas,
        gasPrice: async () => (await asyncOptions()).overrides?.gasPrice,
        maxFeePerGas: async () => (await asyncOptions()).overrides?.maxFeePerGas,
        maxPriorityFeePerGas: async () => (await asyncOptions()).overrides?.maxPriorityFeePerGas,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        nonce: async () => (await asyncOptions()).overrides?.nonce,
        params: async () => {
            const resolvedOptions = await asyncOptions();
            return [resolvedOptions.extensionName];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=removeExtension.js.map