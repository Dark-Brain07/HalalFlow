import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "setSwapRouter" function.
 */
export type SetSwapRouterParams = WithOverrides<{
    swapRouter: AbiParameterToPrimitiveType<{
        type: "address";
        name: "swapRouter";
    }>;
}>;
export declare const FN_SELECTOR: "0x41273657";
/**
 * Checks if the `setSwapRouter` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `setSwapRouter` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isSetSwapRouterSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isSetSwapRouterSupported(["0x..."]);
 * ```
 */
export declare function isSetSwapRouterSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "setSwapRouter" function.
 * @param options - The options for the setSwapRouter function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSetSwapRouterParams } from "thirdweb/extensions/tokens";
 * const result = encodeSetSwapRouterParams({
 *  swapRouter: ...,
 * });
 * ```
 */
export declare function encodeSetSwapRouterParams(options: SetSwapRouterParams): `0x${string}`;
/**
 * Encodes the "setSwapRouter" function into a Hex string with its parameters.
 * @param options - The options for the setSwapRouter function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSetSwapRouter } from "thirdweb/extensions/tokens";
 * const result = encodeSetSwapRouter({
 *  swapRouter: ...,
 * });
 * ```
 */
export declare function encodeSetSwapRouter(options: SetSwapRouterParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "setSwapRouter" function on the contract.
 * @param options - The options for the "setSwapRouter" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { setSwapRouter } from "thirdweb/extensions/tokens";
 *
 * const transaction = setSwapRouter({
 *  contract,
 *  swapRouter: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export declare function setSwapRouter(options: BaseTransactionOptions<SetSwapRouterParams | {
    asyncParams: () => Promise<SetSwapRouterParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=setSwapRouter.d.ts.map