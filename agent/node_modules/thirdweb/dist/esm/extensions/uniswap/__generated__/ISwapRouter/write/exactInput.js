import { prepareContractCall } from "../../../../../transaction/prepare-contract-call.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
import { once } from "../../../../../utils/promise/once.js";
export const FN_SELECTOR = "0xc04b8d59";
const FN_INPUTS = [
    {
        components: [
            {
                name: "path",
                type: "bytes",
            },
            {
                name: "recipient",
                type: "address",
            },
            {
                name: "deadline",
                type: "uint256",
            },
            {
                name: "amountIn",
                type: "uint256",
            },
            {
                name: "amountOutMinimum",
                type: "uint256",
            },
        ],
        name: "params",
        type: "tuple",
    },
];
const FN_OUTPUTS = [
    {
        name: "amountOut",
        type: "uint256",
    },
];
/**
 * Checks if the `exactInput` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `exactInput` method is supported.
 * @extension UNISWAP
 * @example
 * ```ts
 * import { isExactInputSupported } from "thirdweb/extensions/uniswap";
 *
 * const supported = isExactInputSupported(["0x..."]);
 * ```
 */
export function isExactInputSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "exactInput" function.
 * @param options - The options for the exactInput function.
 * @returns The encoded ABI parameters.
 * @extension UNISWAP
 * @example
 * ```ts
 * import { encodeExactInputParams } from "thirdweb/extensions/uniswap";
 * const result = encodeExactInputParams({
 *  params: ...,
 * });
 * ```
 */
export function encodeExactInputParams(options) {
    return encodeAbiParameters(FN_INPUTS, [options.params]);
}
/**
 * Encodes the "exactInput" function into a Hex string with its parameters.
 * @param options - The options for the exactInput function.
 * @returns The encoded hexadecimal string.
 * @extension UNISWAP
 * @example
 * ```ts
 * import { encodeExactInput } from "thirdweb/extensions/uniswap";
 * const result = encodeExactInput({
 *  params: ...,
 * });
 * ```
 */
export function encodeExactInput(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodeExactInputParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "exactInput" function on the contract.
 * @param options - The options for the "exactInput" function.
 * @returns A prepared transaction object.
 * @extension UNISWAP
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { exactInput } from "thirdweb/extensions/uniswap";
 *
 * const transaction = exactInput({
 *  contract,
 *  params: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export function exactInput(options) {
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
            return [resolvedOptions.params];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=exactInput.js.map