import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "setAirdrop" function.
 */
export type SetAirdropParams = WithOverrides<{
    airdrop: AbiParameterToPrimitiveType<{
        type: "address";
        name: "airdrop";
    }>;
}>;
export declare const FN_SELECTOR: "0x72820dbc";
/**
 * Checks if the `setAirdrop` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `setAirdrop` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isSetAirdropSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isSetAirdropSupported(["0x..."]);
 * ```
 */
export declare function isSetAirdropSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "setAirdrop" function.
 * @param options - The options for the setAirdrop function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSetAirdropParams } from "thirdweb/extensions/tokens";
 * const result = encodeSetAirdropParams({
 *  airdrop: ...,
 * });
 * ```
 */
export declare function encodeSetAirdropParams(options: SetAirdropParams): `0x${string}`;
/**
 * Encodes the "setAirdrop" function into a Hex string with its parameters.
 * @param options - The options for the setAirdrop function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSetAirdrop } from "thirdweb/extensions/tokens";
 * const result = encodeSetAirdrop({
 *  airdrop: ...,
 * });
 * ```
 */
export declare function encodeSetAirdrop(options: SetAirdropParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "setAirdrop" function on the contract.
 * @param options - The options for the "setAirdrop" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { setAirdrop } from "thirdweb/extensions/tokens";
 *
 * const transaction = setAirdrop({
 *  contract,
 *  airdrop: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export declare function setAirdrop(options: BaseTransactionOptions<SetAirdropParams | {
    asyncParams: () => Promise<SetAirdropParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=setAirdrop.d.ts.map