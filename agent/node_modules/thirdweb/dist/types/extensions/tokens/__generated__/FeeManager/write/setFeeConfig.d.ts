import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "setFeeConfig" function.
 */
export type SetFeeConfigParams = WithOverrides<{
    action: AbiParameterToPrimitiveType<{
        type: "bytes4";
        name: "action";
    }>;
    feeType: AbiParameterToPrimitiveType<{
        type: "uint8";
        name: "feeType";
    }>;
    value: AbiParameterToPrimitiveType<{
        type: "uint256";
        name: "value";
    }>;
}>;
export declare const FN_SELECTOR: "0x636d2be9";
/**
 * Checks if the `setFeeConfig` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `setFeeConfig` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isSetFeeConfigSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isSetFeeConfigSupported(["0x..."]);
 * ```
 */
export declare function isSetFeeConfigSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "setFeeConfig" function.
 * @param options - The options for the setFeeConfig function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSetFeeConfigParams } from "thirdweb/extensions/tokens";
 * const result = encodeSetFeeConfigParams({
 *  action: ...,
 *  feeType: ...,
 *  value: ...,
 * });
 * ```
 */
export declare function encodeSetFeeConfigParams(options: SetFeeConfigParams): `0x${string}`;
/**
 * Encodes the "setFeeConfig" function into a Hex string with its parameters.
 * @param options - The options for the setFeeConfig function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSetFeeConfig } from "thirdweb/extensions/tokens";
 * const result = encodeSetFeeConfig({
 *  action: ...,
 *  feeType: ...,
 *  value: ...,
 * });
 * ```
 */
export declare function encodeSetFeeConfig(options: SetFeeConfigParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "setFeeConfig" function on the contract.
 * @param options - The options for the "setFeeConfig" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { setFeeConfig } from "thirdweb/extensions/tokens";
 *
 * const transaction = setFeeConfig({
 *  contract,
 *  action: ...,
 *  feeType: ...,
 *  value: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export declare function setFeeConfig(options: BaseTransactionOptions<SetFeeConfigParams | {
    asyncParams: () => Promise<SetFeeConfigParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=setFeeConfig.d.ts.map