import { prepareContractCall } from "../../../../../transaction/prepare-contract-call.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
import { once } from "../../../../../utils/promise/once.js";
export const FN_SELECTOR = "0xbe7506e8";
const FN_INPUTS = [
    {
        type: "address",
        name: "asset",
    },
    {
        type: "uint256",
        name: "positionId",
    },
    {
        type: "address",
        name: "recipient",
    },
    {
        type: "address",
        name: "developer",
    },
    {
        type: "uint16",
        name: "developerBps",
    },
    {
        type: "bytes",
        name: "data",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `lockPosition` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `lockPosition` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isLockPositionSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isLockPositionSupported(["0x..."]);
 * ```
 */
export function isLockPositionSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "lockPosition" function.
 * @param options - The options for the lockPosition function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeLockPositionParams } from "thirdweb/extensions/tokens";
 * const result = encodeLockPositionParams({
 *  asset: ...,
 *  positionId: ...,
 *  recipient: ...,
 *  developer: ...,
 *  developerBps: ...,
 *  data: ...,
 * });
 * ```
 */
export function encodeLockPositionParams(options) {
    return encodeAbiParameters(FN_INPUTS, [
        options.asset,
        options.positionId,
        options.recipient,
        options.developer,
        options.developerBps,
        options.data,
    ]);
}
/**
 * Encodes the "lockPosition" function into a Hex string with its parameters.
 * @param options - The options for the lockPosition function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeLockPosition } from "thirdweb/extensions/tokens";
 * const result = encodeLockPosition({
 *  asset: ...,
 *  positionId: ...,
 *  recipient: ...,
 *  developer: ...,
 *  developerBps: ...,
 *  data: ...,
 * });
 * ```
 */
export function encodeLockPosition(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodeLockPositionParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "lockPosition" function on the contract.
 * @param options - The options for the "lockPosition" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { lockPosition } from "thirdweb/extensions/tokens";
 *
 * const transaction = lockPosition({
 *  contract,
 *  asset: ...,
 *  positionId: ...,
 *  recipient: ...,
 *  developer: ...,
 *  developerBps: ...,
 *  data: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export function lockPosition(options) {
    const asyncOptions = once(async () => {
        return "asyncParams" in options ? await options.asyncParams() : options;
    });
    return prepareContractCall({
        contract: options.contract,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: async () => {
            const resolvedOptions = await asyncOptions();
            return [
                resolvedOptions.asset,
                resolvedOptions.positionId,
                resolvedOptions.recipient,
                resolvedOptions.developer,
                resolvedOptions.developerBps,
                resolvedOptions.data,
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
//# sourceMappingURL=lockPosition.js.map