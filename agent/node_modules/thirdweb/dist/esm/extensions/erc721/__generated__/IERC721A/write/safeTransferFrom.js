import { prepareContractCall } from "../../../../../transaction/prepare-contract-call.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
import { once } from "../../../../../utils/promise/once.js";
export const FN_SELECTOR = "0x42842e0e";
const FN_INPUTS = [
    {
        name: "from",
        type: "address",
    },
    {
        name: "to",
        type: "address",
    },
    {
        name: "tokenId",
        type: "uint256",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `safeTransferFrom` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `safeTransferFrom` method is supported.
 * @extension ERC721
 * @example
 * ```ts
 * import { isSafeTransferFromSupported } from "thirdweb/extensions/erc721";
 *
 * const supported = isSafeTransferFromSupported(["0x..."]);
 * ```
 */
export function isSafeTransferFromSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "safeTransferFrom" function.
 * @param options - The options for the safeTransferFrom function.
 * @returns The encoded ABI parameters.
 * @extension ERC721
 * @example
 * ```ts
 * import { encodeSafeTransferFromParams } from "thirdweb/extensions/erc721";
 * const result = encodeSafeTransferFromParams({
 *  from: ...,
 *  to: ...,
 *  tokenId: ...,
 * });
 * ```
 */
export function encodeSafeTransferFromParams(options) {
    return encodeAbiParameters(FN_INPUTS, [
        options.from,
        options.to,
        options.tokenId,
    ]);
}
/**
 * Encodes the "safeTransferFrom" function into a Hex string with its parameters.
 * @param options - The options for the safeTransferFrom function.
 * @returns The encoded hexadecimal string.
 * @extension ERC721
 * @example
 * ```ts
 * import { encodeSafeTransferFrom } from "thirdweb/extensions/erc721";
 * const result = encodeSafeTransferFrom({
 *  from: ...,
 *  to: ...,
 *  tokenId: ...,
 * });
 * ```
 */
export function encodeSafeTransferFrom(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodeSafeTransferFromParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "safeTransferFrom" function on the contract.
 * @param options - The options for the "safeTransferFrom" function.
 * @returns A prepared transaction object.
 * @extension ERC721
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { safeTransferFrom } from "thirdweb/extensions/erc721";
 *
 * const transaction = safeTransferFrom({
 *  contract,
 *  from: ...,
 *  to: ...,
 *  tokenId: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export function safeTransferFrom(options) {
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
            return [
                resolvedOptions.from,
                resolvedOptions.to,
                resolvedOptions.tokenId,
            ];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=safeTransferFrom.js.map