import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "setFeeConfigBySignature" function.
 */
export type SetFeeConfigBySignatureParams = WithOverrides<{
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
    nonce: AbiParameterToPrimitiveType<{
        type: "uint256";
        name: "nonce";
    }>;
    deadline: AbiParameterToPrimitiveType<{
        type: "uint256";
        name: "deadline";
    }>;
    signature: AbiParameterToPrimitiveType<{
        type: "bytes";
        name: "signature";
    }>;
}>;
export declare const FN_SELECTOR: "0x9ba861e3";
/**
 * Checks if the `setFeeConfigBySignature` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `setFeeConfigBySignature` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isSetFeeConfigBySignatureSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isSetFeeConfigBySignatureSupported(["0x..."]);
 * ```
 */
export declare function isSetFeeConfigBySignatureSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "setFeeConfigBySignature" function.
 * @param options - The options for the setFeeConfigBySignature function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSetFeeConfigBySignatureParams } from "thirdweb/extensions/tokens";
 * const result = encodeSetFeeConfigBySignatureParams({
 *  target: ...,
 *  action: ...,
 *  recipient: ...,
 *  feeType: ...,
 *  value: ...,
 *  nonce: ...,
 *  deadline: ...,
 *  signature: ...,
 * });
 * ```
 */
export declare function encodeSetFeeConfigBySignatureParams(options: SetFeeConfigBySignatureParams): `0x${string}`;
/**
 * Encodes the "setFeeConfigBySignature" function into a Hex string with its parameters.
 * @param options - The options for the setFeeConfigBySignature function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSetFeeConfigBySignature } from "thirdweb/extensions/tokens";
 * const result = encodeSetFeeConfigBySignature({
 *  target: ...,
 *  action: ...,
 *  recipient: ...,
 *  feeType: ...,
 *  value: ...,
 *  nonce: ...,
 *  deadline: ...,
 *  signature: ...,
 * });
 * ```
 */
export declare function encodeSetFeeConfigBySignature(options: SetFeeConfigBySignatureParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "setFeeConfigBySignature" function on the contract.
 * @param options - The options for the "setFeeConfigBySignature" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { setFeeConfigBySignature } from "thirdweb/extensions/tokens";
 *
 * const transaction = setFeeConfigBySignature({
 *  contract,
 *  target: ...,
 *  action: ...,
 *  recipient: ...,
 *  feeType: ...,
 *  value: ...,
 *  nonce: ...,
 *  deadline: ...,
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
export declare function setFeeConfigBySignature(options: BaseTransactionOptions<SetFeeConfigBySignatureParams | {
    asyncParams: () => Promise<SetFeeConfigBySignatureParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=setFeeConfigBySignature.d.ts.map