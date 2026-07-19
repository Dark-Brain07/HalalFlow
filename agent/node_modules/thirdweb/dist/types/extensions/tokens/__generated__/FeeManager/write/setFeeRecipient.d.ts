import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "setFeeRecipient" function.
 */
export type SetFeeRecipientParams = WithOverrides<{
    feeRecipient: AbiParameterToPrimitiveType<{
        type: "address";
        name: "_feeRecipient";
    }>;
}>;
export declare const FN_SELECTOR: "0xe74b981b";
/**
 * Checks if the `setFeeRecipient` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `setFeeRecipient` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isSetFeeRecipientSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isSetFeeRecipientSupported(["0x..."]);
 * ```
 */
export declare function isSetFeeRecipientSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "setFeeRecipient" function.
 * @param options - The options for the setFeeRecipient function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSetFeeRecipientParams } from "thirdweb/extensions/tokens";
 * const result = encodeSetFeeRecipientParams({
 *  feeRecipient: ...,
 * });
 * ```
 */
export declare function encodeSetFeeRecipientParams(options: SetFeeRecipientParams): `0x${string}`;
/**
 * Encodes the "setFeeRecipient" function into a Hex string with its parameters.
 * @param options - The options for the setFeeRecipient function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSetFeeRecipient } from "thirdweb/extensions/tokens";
 * const result = encodeSetFeeRecipient({
 *  feeRecipient: ...,
 * });
 * ```
 */
export declare function encodeSetFeeRecipient(options: SetFeeRecipientParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "setFeeRecipient" function on the contract.
 * @param options - The options for the "setFeeRecipient" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { setFeeRecipient } from "thirdweb/extensions/tokens";
 *
 * const transaction = setFeeRecipient({
 *  contract,
 *  feeRecipient: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export declare function setFeeRecipient(options: BaseTransactionOptions<SetFeeRecipientParams | {
    asyncParams: () => Promise<SetFeeRecipientParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=setFeeRecipient.d.ts.map