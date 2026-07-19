import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "upgradeToAndCall" function.
 */
export type UpgradeToAndCallParams = WithOverrides<{
    newImplementation: AbiParameterToPrimitiveType<{
        type: "address";
        name: "newImplementation";
    }>;
    data: AbiParameterToPrimitiveType<{
        type: "bytes";
        name: "data";
    }>;
}>;
export declare const FN_SELECTOR: "0x4f1ef286";
/**
 * Checks if the `upgradeToAndCall` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `upgradeToAndCall` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isUpgradeToAndCallSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isUpgradeToAndCallSupported(["0x..."]);
 * ```
 */
export declare function isUpgradeToAndCallSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "upgradeToAndCall" function.
 * @param options - The options for the upgradeToAndCall function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeUpgradeToAndCallParams } from "thirdweb/extensions/tokens";
 * const result = encodeUpgradeToAndCallParams({
 *  newImplementation: ...,
 *  data: ...,
 * });
 * ```
 */
export declare function encodeUpgradeToAndCallParams(options: UpgradeToAndCallParams): `0x${string}`;
/**
 * Encodes the "upgradeToAndCall" function into a Hex string with its parameters.
 * @param options - The options for the upgradeToAndCall function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeUpgradeToAndCall } from "thirdweb/extensions/tokens";
 * const result = encodeUpgradeToAndCall({
 *  newImplementation: ...,
 *  data: ...,
 * });
 * ```
 */
export declare function encodeUpgradeToAndCall(options: UpgradeToAndCallParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "upgradeToAndCall" function on the contract.
 * @param options - The options for the "upgradeToAndCall" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { upgradeToAndCall } from "thirdweb/extensions/tokens";
 *
 * const transaction = upgradeToAndCall({
 *  contract,
 *  newImplementation: ...,
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
export declare function upgradeToAndCall(options: BaseTransactionOptions<UpgradeToAndCallParams | {
    asyncParams: () => Promise<UpgradeToAndCallParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=upgradeToAndCall.d.ts.map