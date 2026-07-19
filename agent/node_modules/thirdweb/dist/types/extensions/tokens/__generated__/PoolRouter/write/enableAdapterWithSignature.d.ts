import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "enableAdapterWithSignature" function.
 */
export type EnableAdapterWithSignatureParams = WithOverrides<{
    request: AbiParameterToPrimitiveType<{
        type: "tuple";
        name: "request";
        components: [
            {
                type: "uint8";
                name: "adapterType";
            },
            {
                type: "bytes";
                name: "config";
            },
            {
                type: "address";
                name: "rewardLocker";
            },
            {
                type: "uint256";
                name: "nonce";
            },
            {
                type: "uint256";
                name: "deadline";
            }
        ];
    }>;
    signature: AbiParameterToPrimitiveType<{
        type: "bytes";
        name: "signature";
    }>;
}>;
export declare const FN_SELECTOR: "0x2cb1f780";
/**
 * Checks if the `enableAdapterWithSignature` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `enableAdapterWithSignature` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isEnableAdapterWithSignatureSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isEnableAdapterWithSignatureSupported(["0x..."]);
 * ```
 */
export declare function isEnableAdapterWithSignatureSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "enableAdapterWithSignature" function.
 * @param options - The options for the enableAdapterWithSignature function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeEnableAdapterWithSignatureParams } from "thirdweb/extensions/tokens";
 * const result = encodeEnableAdapterWithSignatureParams({
 *  request: ...,
 *  signature: ...,
 * });
 * ```
 */
export declare function encodeEnableAdapterWithSignatureParams(options: EnableAdapterWithSignatureParams): `0x${string}`;
/**
 * Encodes the "enableAdapterWithSignature" function into a Hex string with its parameters.
 * @param options - The options for the enableAdapterWithSignature function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeEnableAdapterWithSignature } from "thirdweb/extensions/tokens";
 * const result = encodeEnableAdapterWithSignature({
 *  request: ...,
 *  signature: ...,
 * });
 * ```
 */
export declare function encodeEnableAdapterWithSignature(options: EnableAdapterWithSignatureParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "enableAdapterWithSignature" function on the contract.
 * @param options - The options for the "enableAdapterWithSignature" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { enableAdapterWithSignature } from "thirdweb/extensions/tokens";
 *
 * const transaction = enableAdapterWithSignature({
 *  contract,
 *  request: ...,
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
export declare function enableAdapterWithSignature(options: BaseTransactionOptions<EnableAdapterWithSignatureParams | {
    asyncParams: () => Promise<EnableAdapterWithSignatureParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=enableAdapterWithSignature.d.ts.map