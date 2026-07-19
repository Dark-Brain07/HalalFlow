import { prepareContractCall } from "../../../../../transaction/prepare-contract-call.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
import { once } from "../../../../../utils/promise/once.js";
export const FN_SELECTOR = "0x783a112b";
const FN_INPUTS = [
    {
        name: "fid",
        type: "uint256",
    },
    {
        name: "units",
        type: "uint256",
    },
];
const FN_OUTPUTS = [
    {
        name: "overpayment",
        type: "uint256",
    },
];
/**
 * Checks if the `rent` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `rent` method is supported.
 * @extension FARCASTER
 * @example
 * ```ts
 * import { isRentSupported } from "thirdweb/extensions/farcaster";
 *
 * const supported = isRentSupported(["0x..."]);
 * ```
 */
export function isRentSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "rent" function.
 * @param options - The options for the rent function.
 * @returns The encoded ABI parameters.
 * @extension FARCASTER
 * @example
 * ```ts
 * import { encodeRentParams } from "thirdweb/extensions/farcaster";
 * const result = encodeRentParams({
 *  fid: ...,
 *  units: ...,
 * });
 * ```
 */
export function encodeRentParams(options) {
    return encodeAbiParameters(FN_INPUTS, [options.fid, options.units]);
}
/**
 * Encodes the "rent" function into a Hex string with its parameters.
 * @param options - The options for the rent function.
 * @returns The encoded hexadecimal string.
 * @extension FARCASTER
 * @example
 * ```ts
 * import { encodeRent } from "thirdweb/extensions/farcaster";
 * const result = encodeRent({
 *  fid: ...,
 *  units: ...,
 * });
 * ```
 */
export function encodeRent(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodeRentParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "rent" function on the contract.
 * @param options - The options for the "rent" function.
 * @returns A prepared transaction object.
 * @extension FARCASTER
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { rent } from "thirdweb/extensions/farcaster";
 *
 * const transaction = rent({
 *  contract,
 *  fid: ...,
 *  units: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export function rent(options) {
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
            return [resolvedOptions.fid, resolvedOptions.units];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=rent.js.map