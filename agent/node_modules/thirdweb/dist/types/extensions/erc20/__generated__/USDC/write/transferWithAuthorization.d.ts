import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "transferWithAuthorization" function.
 */
export type TransferWithAuthorizationParams = WithOverrides<{
    from: AbiParameterToPrimitiveType<{
        type: "address";
        name: "from";
    }>;
    to: AbiParameterToPrimitiveType<{
        type: "address";
        name: "to";
    }>;
    value: AbiParameterToPrimitiveType<{
        type: "uint256";
        name: "value";
    }>;
    validAfter: AbiParameterToPrimitiveType<{
        type: "uint256";
        name: "validAfter";
    }>;
    validBefore: AbiParameterToPrimitiveType<{
        type: "uint256";
        name: "validBefore";
    }>;
    nonce: AbiParameterToPrimitiveType<{
        type: "bytes32";
        name: "nonce";
    }>;
    signature: AbiParameterToPrimitiveType<{
        type: "bytes";
        name: "signature";
    }>;
}>;
export declare const FN_SELECTOR: "0xcf092995";
/**
 * Checks if the `transferWithAuthorization` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `transferWithAuthorization` method is supported.
 * @extension ERC20
 * @example
 * ```ts
 * import { isTransferWithAuthorizationSupported } from "thirdweb/extensions/erc20";
 *
 * const supported = isTransferWithAuthorizationSupported(["0x..."]);
 * ```
 */
export declare function isTransferWithAuthorizationSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "transferWithAuthorization" function.
 * @param options - The options for the transferWithAuthorization function.
 * @returns The encoded ABI parameters.
 * @extension ERC20
 * @example
 * ```ts
 * import { encodeTransferWithAuthorizationParams } from "thirdweb/extensions/erc20";
 * const result = encodeTransferWithAuthorizationParams({
 *  from: ...,
 *  to: ...,
 *  value: ...,
 *  validAfter: ...,
 *  validBefore: ...,
 *  nonce: ...,
 *  signature: ...,
 * });
 * ```
 */
export declare function encodeTransferWithAuthorizationParams(options: TransferWithAuthorizationParams): `0x${string}`;
/**
 * Encodes the "transferWithAuthorization" function into a Hex string with its parameters.
 * @param options - The options for the transferWithAuthorization function.
 * @returns The encoded hexadecimal string.
 * @extension ERC20
 * @example
 * ```ts
 * import { encodeTransferWithAuthorization } from "thirdweb/extensions/erc20";
 * const result = encodeTransferWithAuthorization({
 *  from: ...,
 *  to: ...,
 *  value: ...,
 *  validAfter: ...,
 *  validBefore: ...,
 *  nonce: ...,
 *  signature: ...,
 * });
 * ```
 */
export declare function encodeTransferWithAuthorization(options: TransferWithAuthorizationParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "transferWithAuthorization" function on the contract.
 * @param options - The options for the "transferWithAuthorization" function.
 * @returns A prepared transaction object.
 * @extension ERC20
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { transferWithAuthorization } from "thirdweb/extensions/erc20";
 *
 * const transaction = transferWithAuthorization({
 *  contract,
 *  from: ...,
 *  to: ...,
 *  value: ...,
 *  validAfter: ...,
 *  validBefore: ...,
 *  nonce: ...,
 *  signature: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export declare function transferWithAuthorization(options: BaseTransactionOptions<TransferWithAuthorizationParams | {
    asyncParams: () => Promise<TransferWithAuthorizationParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=transferWithAuthorization.d.ts.map