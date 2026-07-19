import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "create" function.
 */
export type CreateParams = WithOverrides<{
    creator: AbiParameterToPrimitiveType<{
        type: "address";
        name: "creator";
    }>;
    createParams: AbiParameterToPrimitiveType<{
        type: "tuple";
        name: "createParams";
        components: [
            {
                type: "address";
                name: "developer";
            },
            {
                type: "bytes32";
                name: "salt";
            },
            {
                type: "bytes";
                name: "data";
            },
            {
                type: "bytes";
                name: "hookData";
            }
        ];
    }>;
}>;
export declare const FN_SELECTOR: "0x65d53dd9";
/**
 * Checks if the `create` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `create` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isCreateSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isCreateSupported(["0x..."]);
 * ```
 */
export declare function isCreateSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "create" function.
 * @param options - The options for the create function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeCreateParams } from "thirdweb/extensions/tokens";
 * const result = encodeCreateParams({
 *  creator: ...,
 *  createParams: ...,
 * });
 * ```
 */
export declare function encodeCreateParams(options: CreateParams): `0x${string}`;
/**
 * Encodes the "create" function into a Hex string with its parameters.
 * @param options - The options for the create function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeCreate } from "thirdweb/extensions/tokens";
 * const result = encodeCreate({
 *  creator: ...,
 *  createParams: ...,
 * });
 * ```
 */
export declare function encodeCreate(options: CreateParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "create" function on the contract.
 * @param options - The options for the "create" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { create } from "thirdweb/extensions/tokens";
 *
 * const transaction = create({
 *  contract,
 *  creator: ...,
 *  createParams: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export declare function create(options: BaseTransactionOptions<CreateParams | {
    asyncParams: () => Promise<CreateParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=create.d.ts.map