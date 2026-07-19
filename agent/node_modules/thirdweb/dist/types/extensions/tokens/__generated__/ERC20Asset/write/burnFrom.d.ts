import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "burnFrom" function.
 */
export type BurnFromParams = WithOverrides<{
    from: AbiParameterToPrimitiveType<{
        type: "address";
        name: "from";
    }>;
    amount: AbiParameterToPrimitiveType<{
        type: "uint256";
        name: "amount";
    }>;
}>;
export declare const FN_SELECTOR: "0x79cc6790";
/**
 * Checks if the `burnFrom` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `burnFrom` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isBurnFromSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isBurnFromSupported(["0x..."]);
 * ```
 */
export declare function isBurnFromSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "burnFrom" function.
 * @param options - The options for the burnFrom function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeBurnFromParams } from "thirdweb/extensions/tokens";
 * const result = encodeBurnFromParams({
 *  from: ...,
 *  amount: ...,
 * });
 * ```
 */
export declare function encodeBurnFromParams(options: BurnFromParams): `0x${string}`;
/**
 * Encodes the "burnFrom" function into a Hex string with its parameters.
 * @param options - The options for the burnFrom function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeBurnFrom } from "thirdweb/extensions/tokens";
 * const result = encodeBurnFrom({
 *  from: ...,
 *  amount: ...,
 * });
 * ```
 */
export declare function encodeBurnFrom(options: BurnFromParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "burnFrom" function on the contract.
 * @param options - The options for the "burnFrom" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { burnFrom } from "thirdweb/extensions/tokens";
 *
 * const transaction = burnFrom({
 *  contract,
 *  from: ...,
 *  amount: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export declare function burnFrom(options: BaseTransactionOptions<BurnFromParams | {
    asyncParams: () => Promise<BurnFromParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=burnFrom.d.ts.map