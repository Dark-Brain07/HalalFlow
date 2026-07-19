import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "setTargetFeeConfig" function.
 */
export type SetTargetFeeConfigParams = WithOverrides<{
    target: AbiParameterToPrimitiveType<{
        type: "address";
        name: "target";
    }>;
    action: AbiParameterToPrimitiveType<{
        type: "bytes4";
        name: "action";
    }>;
    recipient: AbiParameterToPrimitiveType<{
        type: "address";
        name: "recipient";
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
export declare const FN_SELECTOR: "0xd20caa1a";
/**
 * Checks if the `setTargetFeeConfig` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `setTargetFeeConfig` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isSetTargetFeeConfigSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isSetTargetFeeConfigSupported(["0x..."]);
 * ```
 */
export declare function isSetTargetFeeConfigSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "setTargetFeeConfig" function.
 * @param options - The options for the setTargetFeeConfig function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSetTargetFeeConfigParams } from "thirdweb/extensions/tokens";
 * const result = encodeSetTargetFeeConfigParams({
 *  target: ...,
 *  action: ...,
 *  recipient: ...,
 *  feeType: ...,
 *  value: ...,
 * });
 * ```
 */
export declare function encodeSetTargetFeeConfigParams(options: SetTargetFeeConfigParams): `0x${string}`;
/**
 * Encodes the "setTargetFeeConfig" function into a Hex string with its parameters.
 * @param options - The options for the setTargetFeeConfig function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSetTargetFeeConfig } from "thirdweb/extensions/tokens";
 * const result = encodeSetTargetFeeConfig({
 *  target: ...,
 *  action: ...,
 *  recipient: ...,
 *  feeType: ...,
 *  value: ...,
 * });
 * ```
 */
export declare function encodeSetTargetFeeConfig(options: SetTargetFeeConfigParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "setTargetFeeConfig" function on the contract.
 * @param options - The options for the "setTargetFeeConfig" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { setTargetFeeConfig } from "thirdweb/extensions/tokens";
 *
 * const transaction = setTargetFeeConfig({
 *  contract,
 *  target: ...,
 *  action: ...,
 *  recipient: ...,
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
export declare function setTargetFeeConfig(options: BaseTransactionOptions<SetTargetFeeConfigParams | {
    asyncParams: () => Promise<SetTargetFeeConfigParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=setTargetFeeConfig.d.ts.map