import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "swap" function.
 */
export type SwapParams = WithOverrides<{
    params: AbiParameterToPrimitiveType<{
        type: "tuple";
        name: "params";
        components: [
            {
                type: "address";
                name: "tokenIn";
            },
            {
                type: "address";
                name: "tokenOut";
            },
            {
                type: "uint256";
                name: "amountIn";
            },
            {
                type: "uint256";
                name: "minAmountOut";
            },
            {
                type: "address";
                name: "recipient";
            },
            {
                type: "address";
                name: "developer";
            },
            {
                type: "uint256";
                name: "deadline";
            },
            {
                type: "bytes";
                name: "data";
            }
        ];
    }>;
}>;
export declare const FN_SELECTOR: "0x8892376c";
/**
 * Checks if the `swap` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `swap` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isSwapSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isSwapSupported(["0x..."]);
 * ```
 */
export declare function isSwapSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "swap" function.
 * @param options - The options for the swap function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSwapParams } from "thirdweb/extensions/tokens";
 * const result = encodeSwapParams({
 *  params: ...,
 * });
 * ```
 */
export declare function encodeSwapParams(options: SwapParams): `0x${string}`;
/**
 * Encodes the "swap" function into a Hex string with its parameters.
 * @param options - The options for the swap function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSwap } from "thirdweb/extensions/tokens";
 * const result = encodeSwap({
 *  params: ...,
 * });
 * ```
 */
export declare function encodeSwap(options: SwapParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "swap" function on the contract.
 * @param options - The options for the "swap" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { swap } from "thirdweb/extensions/tokens";
 *
 * const transaction = swap({
 *  contract,
 *  params: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export declare function swap(options: BaseTransactionOptions<SwapParams | {
    asyncParams: () => Promise<SwapParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=swap.d.ts.map