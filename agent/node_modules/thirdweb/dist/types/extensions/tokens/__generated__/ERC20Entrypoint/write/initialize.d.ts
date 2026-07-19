import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "initialize" function.
 */
export type InitializeParams = WithOverrides<{
    owner: AbiParameterToPrimitiveType<{
        type: "address";
        name: "owner";
    }>;
    manager: AbiParameterToPrimitiveType<{
        type: "address";
        name: "manager";
    }>;
    poolRouter: AbiParameterToPrimitiveType<{
        type: "address";
        name: "poolRouter";
    }>;
    airdrop: AbiParameterToPrimitiveType<{
        type: "address";
        name: "airdrop";
    }>;
}>;
export declare const FN_SELECTOR: "0xf8c8765e";
/**
 * Checks if the `initialize` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `initialize` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isInitializeSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isInitializeSupported(["0x..."]);
 * ```
 */
export declare function isInitializeSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "initialize" function.
 * @param options - The options for the initialize function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeInitializeParams } from "thirdweb/extensions/tokens";
 * const result = encodeInitializeParams({
 *  owner: ...,
 *  manager: ...,
 *  poolRouter: ...,
 *  airdrop: ...,
 * });
 * ```
 */
export declare function encodeInitializeParams(options: InitializeParams): `0x${string}`;
/**
 * Encodes the "initialize" function into a Hex string with its parameters.
 * @param options - The options for the initialize function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeInitialize } from "thirdweb/extensions/tokens";
 * const result = encodeInitialize({
 *  owner: ...,
 *  manager: ...,
 *  poolRouter: ...,
 *  airdrop: ...,
 * });
 * ```
 */
export declare function encodeInitialize(options: InitializeParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "initialize" function on the contract.
 * @param options - The options for the "initialize" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { initialize } from "thirdweb/extensions/tokens";
 *
 * const transaction = initialize({
 *  contract,
 *  owner: ...,
 *  manager: ...,
 *  poolRouter: ...,
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
export declare function initialize(options: BaseTransactionOptions<InitializeParams | {
    asyncParams: () => Promise<InitializeParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=initialize.d.ts.map