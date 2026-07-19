import { prepareContractCall } from "../../../../../transaction/prepare-contract-call.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
import { once } from "../../../../../utils/promise/once.js";
export const FN_SELECTOR = "0x3f3e4c11";
const FN_INPUTS = [
    {
        name: "_maxTotalSupply",
        type: "uint256",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `setMaxTotalSupply` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `setMaxTotalSupply` method is supported.
 * @extension ERC721
 * @example
 * ```ts
 * import { isSetMaxTotalSupplySupported } from "thirdweb/extensions/erc721";
 *
 * const supported = isSetMaxTotalSupplySupported(["0x..."]);
 * ```
 */
export function isSetMaxTotalSupplySupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "setMaxTotalSupply" function.
 * @param options - The options for the setMaxTotalSupply function.
 * @returns The encoded ABI parameters.
 * @extension ERC721
 * @example
 * ```ts
 * import { encodeSetMaxTotalSupplyParams } from "thirdweb/extensions/erc721";
 * const result = encodeSetMaxTotalSupplyParams({
 *  maxTotalSupply: ...,
 * });
 * ```
 */
export function encodeSetMaxTotalSupplyParams(options) {
    return encodeAbiParameters(FN_INPUTS, [options.maxTotalSupply]);
}
/**
 * Encodes the "setMaxTotalSupply" function into a Hex string with its parameters.
 * @param options - The options for the setMaxTotalSupply function.
 * @returns The encoded hexadecimal string.
 * @extension ERC721
 * @example
 * ```ts
 * import { encodeSetMaxTotalSupply } from "thirdweb/extensions/erc721";
 * const result = encodeSetMaxTotalSupply({
 *  maxTotalSupply: ...,
 * });
 * ```
 */
export function encodeSetMaxTotalSupply(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodeSetMaxTotalSupplyParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "setMaxTotalSupply" function on the contract.
 * @param options - The options for the "setMaxTotalSupply" function.
 * @returns A prepared transaction object.
 * @extension ERC721
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { setMaxTotalSupply } from "thirdweb/extensions/erc721";
 *
 * const transaction = setMaxTotalSupply({
 *  contract,
 *  maxTotalSupply: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export function setMaxTotalSupply(options) {
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
            return [resolvedOptions.maxTotalSupply];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=setMaxTotalSupply.js.map