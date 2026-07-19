import { prepareContractCall } from "../../../../../transaction/prepare-contract-call.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
import { once } from "../../../../../utils/promise/once.js";
export const FN_SELECTOR = "0xd37c353b";
const FN_INPUTS = [
    {
        name: "amount",
        type: "uint256",
    },
    {
        name: "baseURIForTokens",
        type: "string",
    },
    {
        name: "extraData",
        type: "bytes",
    },
];
const FN_OUTPUTS = [
    {
        name: "batchId",
        type: "uint256",
    },
];
/**
 * Checks if the `lazyMint` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `lazyMint` method is supported.
 * @extension ERC721
 * @example
 * ```ts
 * import { isLazyMintSupported } from "thirdweb/extensions/erc721";
 *
 * const supported = isLazyMintSupported(["0x..."]);
 * ```
 */
export function isLazyMintSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "lazyMint" function.
 * @param options - The options for the lazyMint function.
 * @returns The encoded ABI parameters.
 * @extension ERC721
 * @example
 * ```ts
 * import { encodeLazyMintParams } from "thirdweb/extensions/erc721";
 * const result = encodeLazyMintParams({
 *  amount: ...,
 *  baseURIForTokens: ...,
 *  extraData: ...,
 * });
 * ```
 */
export function encodeLazyMintParams(options) {
    return encodeAbiParameters(FN_INPUTS, [
        options.amount,
        options.baseURIForTokens,
        options.extraData,
    ]);
}
/**
 * Encodes the "lazyMint" function into a Hex string with its parameters.
 * @param options - The options for the lazyMint function.
 * @returns The encoded hexadecimal string.
 * @extension ERC721
 * @example
 * ```ts
 * import { encodeLazyMint } from "thirdweb/extensions/erc721";
 * const result = encodeLazyMint({
 *  amount: ...,
 *  baseURIForTokens: ...,
 *  extraData: ...,
 * });
 * ```
 */
export function encodeLazyMint(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodeLazyMintParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "lazyMint" function on the contract.
 * @param options - The options for the "lazyMint" function.
 * @returns A prepared transaction object.
 * @extension ERC721
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { lazyMint } from "thirdweb/extensions/erc721";
 *
 * const transaction = lazyMint({
 *  contract,
 *  amount: ...,
 *  baseURIForTokens: ...,
 *  extraData: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export function lazyMint(options) {
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
                resolvedOptions.amount,
                resolvedOptions.baseURIForTokens,
                resolvedOptions.extraData,
            ];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=lazyMint.js.map