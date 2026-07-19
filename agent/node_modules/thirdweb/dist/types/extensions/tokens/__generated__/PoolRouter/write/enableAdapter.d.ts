import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "enableAdapter" function.
 */
export type EnableAdapterParams = WithOverrides<{
    adapterType: AbiParameterToPrimitiveType<{
        type: "uint8";
        name: "adapterType";
    }>;
    config: AbiParameterToPrimitiveType<{
        type: "bytes";
        name: "config";
    }>;
    rewardLocker: AbiParameterToPrimitiveType<{
        type: "address";
        name: "rewardLocker";
    }>;
}>;
export declare const FN_SELECTOR: "0xa5a2fa73";
/**
 * Checks if the `enableAdapter` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `enableAdapter` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isEnableAdapterSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isEnableAdapterSupported(["0x..."]);
 * ```
 */
export declare function isEnableAdapterSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "enableAdapter" function.
 * @param options - The options for the enableAdapter function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeEnableAdapterParams } from "thirdweb/extensions/tokens";
 * const result = encodeEnableAdapterParams({
 *  adapterType: ...,
 *  config: ...,
 *  rewardLocker: ...,
 * });
 * ```
 */
export declare function encodeEnableAdapterParams(options: EnableAdapterParams): `0x${string}`;
/**
 * Encodes the "enableAdapter" function into a Hex string with its parameters.
 * @param options - The options for the enableAdapter function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeEnableAdapter } from "thirdweb/extensions/tokens";
 * const result = encodeEnableAdapter({
 *  adapterType: ...,
 *  config: ...,
 *  rewardLocker: ...,
 * });
 * ```
 */
export declare function encodeEnableAdapter(options: EnableAdapterParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "enableAdapter" function on the contract.
 * @param options - The options for the "enableAdapter" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { enableAdapter } from "thirdweb/extensions/tokens";
 *
 * const transaction = enableAdapter({
 *  contract,
 *  adapterType: ...,
 *  config: ...,
 *  rewardLocker: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export declare function enableAdapter(options: BaseTransactionOptions<EnableAdapterParams | {
    asyncParams: () => Promise<EnableAdapterParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=enableAdapter.d.ts.map