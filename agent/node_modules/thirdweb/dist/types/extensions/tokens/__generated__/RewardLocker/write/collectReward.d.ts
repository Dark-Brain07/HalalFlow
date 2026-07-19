import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "collectReward" function.
 */
export type CollectRewardParams = WithOverrides<{
    owner: AbiParameterToPrimitiveType<{
        type: "address";
        name: "owner";
    }>;
    asset: AbiParameterToPrimitiveType<{
        type: "address";
        name: "asset";
    }>;
}>;
export declare const FN_SELECTOR: "0x7bb87377";
/**
 * Checks if the `collectReward` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `collectReward` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isCollectRewardSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isCollectRewardSupported(["0x..."]);
 * ```
 */
export declare function isCollectRewardSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "collectReward" function.
 * @param options - The options for the collectReward function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeCollectRewardParams } from "thirdweb/extensions/tokens";
 * const result = encodeCollectRewardParams({
 *  owner: ...,
 *  asset: ...,
 * });
 * ```
 */
export declare function encodeCollectRewardParams(options: CollectRewardParams): `0x${string}`;
/**
 * Encodes the "collectReward" function into a Hex string with its parameters.
 * @param options - The options for the collectReward function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeCollectReward } from "thirdweb/extensions/tokens";
 * const result = encodeCollectReward({
 *  owner: ...,
 *  asset: ...,
 * });
 * ```
 */
export declare function encodeCollectReward(options: CollectRewardParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "collectReward" function on the contract.
 * @param options - The options for the "collectReward" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { collectReward } from "thirdweb/extensions/tokens";
 *
 * const transaction = collectReward({
 *  contract,
 *  owner: ...,
 *  asset: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export declare function collectReward(options: BaseTransactionOptions<CollectRewardParams | {
    asyncParams: () => Promise<CollectRewardParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=collectReward.d.ts.map