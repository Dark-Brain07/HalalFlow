import { prepareContractCall } from "../../../../../transaction/prepare-contract-call.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
import { once } from "../../../../../utils/promise/once.js";
export const FN_SELECTOR = "0xa0c7529c";
const FN_INPUTS = [
    {
        name: "to",
        type: "address",
    },
    {
        name: "recovery",
        type: "address",
    },
    {
        name: "deadline",
        type: "uint256",
    },
    {
        name: "sig",
        type: "bytes",
    },
    {
        name: "extraStorage",
        type: "uint256",
    },
];
const FN_OUTPUTS = [
    {
        name: "fid",
        type: "uint256",
    },
    {
        name: "overpayment",
        type: "uint256",
    },
];
/**
 * Checks if the `registerFor` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `registerFor` method is supported.
 * @extension FARCASTER
 * @example
 * ```ts
 * import { isRegisterForSupported } from "thirdweb/extensions/farcaster";
 *
 * const supported = isRegisterForSupported(["0x..."]);
 * ```
 */
export function isRegisterForSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "registerFor" function.
 * @param options - The options for the registerFor function.
 * @returns The encoded ABI parameters.
 * @extension FARCASTER
 * @example
 * ```ts
 * import { encodeRegisterForParams } from "thirdweb/extensions/farcaster";
 * const result = encodeRegisterForParams({
 *  to: ...,
 *  recovery: ...,
 *  deadline: ...,
 *  sig: ...,
 *  extraStorage: ...,
 * });
 * ```
 */
export function encodeRegisterForParams(options) {
    return encodeAbiParameters(FN_INPUTS, [
        options.to,
        options.recovery,
        options.deadline,
        options.sig,
        options.extraStorage,
    ]);
}
/**
 * Encodes the "registerFor" function into a Hex string with its parameters.
 * @param options - The options for the registerFor function.
 * @returns The encoded hexadecimal string.
 * @extension FARCASTER
 * @example
 * ```ts
 * import { encodeRegisterFor } from "thirdweb/extensions/farcaster";
 * const result = encodeRegisterFor({
 *  to: ...,
 *  recovery: ...,
 *  deadline: ...,
 *  sig: ...,
 *  extraStorage: ...,
 * });
 * ```
 */
export function encodeRegisterFor(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodeRegisterForParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "registerFor" function on the contract.
 * @param options - The options for the "registerFor" function.
 * @returns A prepared transaction object.
 * @extension FARCASTER
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { registerFor } from "thirdweb/extensions/farcaster";
 *
 * const transaction = registerFor({
 *  contract,
 *  to: ...,
 *  recovery: ...,
 *  deadline: ...,
 *  sig: ...,
 *  extraStorage: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export function registerFor(options) {
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
                resolvedOptions.to,
                resolvedOptions.recovery,
                resolvedOptions.deadline,
                resolvedOptions.sig,
                resolvedOptions.extraStorage,
            ];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=registerFor.js.map