import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "createById" function.
 */
export type CreateByIdParams = WithOverrides<{
    contractId: AbiParameterToPrimitiveType<{
        type: "bytes32";
        name: "contractId";
    }>;
    creator: AbiParameterToPrimitiveType<{
        type: "address";
        name: "creator";
    }>;
    params: AbiParameterToPrimitiveType<{
        type: "tuple";
        name: "params";
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
export declare const FN_SELECTOR: "0x1889d488";
/**
 * Checks if the `createById` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `createById` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isCreateByIdSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isCreateByIdSupported(["0x..."]);
 * ```
 */
export declare function isCreateByIdSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "createById" function.
 * @param options - The options for the createById function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeCreateByIdParams } from "thirdweb/extensions/tokens";
 * const result = encodeCreateByIdParams({
 *  contractId: ...,
 *  creator: ...,
 *  params: ...,
 * });
 * ```
 */
export declare function encodeCreateByIdParams(options: CreateByIdParams): `0x${string}`;
/**
 * Encodes the "createById" function into a Hex string with its parameters.
 * @param options - The options for the createById function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeCreateById } from "thirdweb/extensions/tokens";
 * const result = encodeCreateById({
 *  contractId: ...,
 *  creator: ...,
 *  params: ...,
 * });
 * ```
 */
export declare function encodeCreateById(options: CreateByIdParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "createById" function on the contract.
 * @param options - The options for the "createById" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { createById } from "thirdweb/extensions/tokens";
 *
 * const transaction = createById({
 *  contract,
 *  contractId: ...,
 *  creator: ...,
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
export declare function createById(options: BaseTransactionOptions<CreateByIdParams | {
    asyncParams: () => Promise<CreateByIdParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=createById.d.ts.map