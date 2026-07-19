import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "lockPosition" function.
 */
export type LockPositionParams = WithOverrides<{
    asset: AbiParameterToPrimitiveType<{
        type: "address";
        name: "asset";
    }>;
    positionId: AbiParameterToPrimitiveType<{
        type: "uint256";
        name: "positionId";
    }>;
    recipient: AbiParameterToPrimitiveType<{
        type: "address";
        name: "recipient";
    }>;
    developer: AbiParameterToPrimitiveType<{
        type: "address";
        name: "developer";
    }>;
    developerBps: AbiParameterToPrimitiveType<{
        type: "uint16";
        name: "developerBps";
    }>;
    data: AbiParameterToPrimitiveType<{
        type: "bytes";
        name: "data";
    }>;
}>;
export declare const FN_SELECTOR: "0xbe7506e8";
/**
 * Checks if the `lockPosition` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `lockPosition` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isLockPositionSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isLockPositionSupported(["0x..."]);
 * ```
 */
export declare function isLockPositionSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "lockPosition" function.
 * @param options - The options for the lockPosition function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeLockPositionParams } from "thirdweb/extensions/tokens";
 * const result = encodeLockPositionParams({
 *  asset: ...,
 *  positionId: ...,
 *  recipient: ...,
 *  developer: ...,
 *  developerBps: ...,
 *  data: ...,
 * });
 * ```
 */
export declare function encodeLockPositionParams(options: LockPositionParams): `0x${string}`;
/**
 * Encodes the "lockPosition" function into a Hex string with its parameters.
 * @param options - The options for the lockPosition function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeLockPosition } from "thirdweb/extensions/tokens";
 * const result = encodeLockPosition({
 *  asset: ...,
 *  positionId: ...,
 *  recipient: ...,
 *  developer: ...,
 *  developerBps: ...,
 *  data: ...,
 * });
 * ```
 */
export declare function encodeLockPosition(options: LockPositionParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "lockPosition" function on the contract.
 * @param options - The options for the "lockPosition" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { lockPosition } from "thirdweb/extensions/tokens";
 *
 * const transaction = lockPosition({
 *  contract,
 *  asset: ...,
 *  positionId: ...,
 *  recipient: ...,
 *  developer: ...,
 *  developerBps: ...,
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
export declare function lockPosition(options: BaseTransactionOptions<LockPositionParams | {
    asyncParams: () => Promise<LockPositionParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=lockPosition.d.ts.map