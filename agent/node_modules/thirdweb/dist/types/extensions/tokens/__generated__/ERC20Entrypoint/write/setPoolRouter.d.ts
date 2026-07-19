import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "setPoolRouter" function.
 */
export type SetPoolRouterParams = WithOverrides<{
    poolRouter: AbiParameterToPrimitiveType<{
        type: "address";
        name: "poolRouter";
    }>;
}>;
export declare const FN_SELECTOR: "0x0c8d9cc7";
/**
 * Checks if the `setPoolRouter` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `setPoolRouter` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isSetPoolRouterSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isSetPoolRouterSupported(["0x..."]);
 * ```
 */
export declare function isSetPoolRouterSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "setPoolRouter" function.
 * @param options - The options for the setPoolRouter function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSetPoolRouterParams } from "thirdweb/extensions/tokens";
 * const result = encodeSetPoolRouterParams({
 *  poolRouter: ...,
 * });
 * ```
 */
export declare function encodeSetPoolRouterParams(options: SetPoolRouterParams): `0x${string}`;
/**
 * Encodes the "setPoolRouter" function into a Hex string with its parameters.
 * @param options - The options for the setPoolRouter function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSetPoolRouter } from "thirdweb/extensions/tokens";
 * const result = encodeSetPoolRouter({
 *  poolRouter: ...,
 * });
 * ```
 */
export declare function encodeSetPoolRouter(options: SetPoolRouterParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "setPoolRouter" function on the contract.
 * @param options - The options for the "setPoolRouter" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { setPoolRouter } from "thirdweb/extensions/tokens";
 *
 * const transaction = setPoolRouter({
 *  contract,
 *  poolRouter: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export declare function setPoolRouter(options: BaseTransactionOptions<SetPoolRouterParams | {
    asyncParams: () => Promise<SetPoolRouterParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=setPoolRouter.d.ts.map