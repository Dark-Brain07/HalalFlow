import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "disableAdapter" function.
 */
export type DisableAdapterParams = WithOverrides<{
    adapterType: AbiParameterToPrimitiveType<{
        type: "uint8";
        name: "adapterType";
    }>;
}>;
export declare const FN_SELECTOR: "0xa3f3a7bd";
/**
 * Checks if the `disableAdapter` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `disableAdapter` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isDisableAdapterSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isDisableAdapterSupported(["0x..."]);
 * ```
 */
export declare function isDisableAdapterSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "disableAdapter" function.
 * @param options - The options for the disableAdapter function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeDisableAdapterParams } from "thirdweb/extensions/tokens";
 * const result = encodeDisableAdapterParams({
 *  adapterType: ...,
 * });
 * ```
 */
export declare function encodeDisableAdapterParams(options: DisableAdapterParams): `0x${string}`;
/**
 * Encodes the "disableAdapter" function into a Hex string with its parameters.
 * @param options - The options for the disableAdapter function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeDisableAdapter } from "thirdweb/extensions/tokens";
 * const result = encodeDisableAdapter({
 *  adapterType: ...,
 * });
 * ```
 */
export declare function encodeDisableAdapter(options: DisableAdapterParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "disableAdapter" function on the contract.
 * @param options - The options for the "disableAdapter" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { disableAdapter } from "thirdweb/extensions/tokens";
 *
 * const transaction = disableAdapter({
 *  contract,
 *  adapterType: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export declare function disableAdapter(options: BaseTransactionOptions<DisableAdapterParams | {
    asyncParams: () => Promise<DisableAdapterParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=disableAdapter.d.ts.map