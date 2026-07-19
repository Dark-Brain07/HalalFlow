import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "distribute" function.
 */
export type DistributeParams = WithOverrides<{
    asset: AbiParameterToPrimitiveType<{
        type: "address";
        name: "asset";
    }>;
    contents: AbiParameterToPrimitiveType<{
        type: "tuple[]";
        name: "contents";
        components: [
            {
                type: "uint256";
                name: "amount";
            },
            {
                type: "address";
                name: "recipient";
            }
        ];
    }>;
}>;
export declare const FN_SELECTOR: "0xe542b93b";
/**
 * Checks if the `distribute` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `distribute` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isDistributeSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isDistributeSupported(["0x..."]);
 * ```
 */
export declare function isDistributeSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "distribute" function.
 * @param options - The options for the distribute function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeDistributeParams } from "thirdweb/extensions/tokens";
 * const result = encodeDistributeParams({
 *  asset: ...,
 *  contents: ...,
 * });
 * ```
 */
export declare function encodeDistributeParams(options: DistributeParams): `0x${string}`;
/**
 * Encodes the "distribute" function into a Hex string with its parameters.
 * @param options - The options for the distribute function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeDistribute } from "thirdweb/extensions/tokens";
 * const result = encodeDistribute({
 *  asset: ...,
 *  contents: ...,
 * });
 * ```
 */
export declare function encodeDistribute(options: DistributeParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "distribute" function on the contract.
 * @param options - The options for the "distribute" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { distribute } from "thirdweb/extensions/tokens";
 *
 * const transaction = distribute({
 *  contract,
 *  asset: ...,
 *  contents: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export declare function distribute(options: BaseTransactionOptions<DistributeParams | {
    asyncParams: () => Promise<DistributeParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=distribute.d.ts.map