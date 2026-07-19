import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "addImplementationWithSignature" function.
 */
export type AddImplementationWithSignatureParams = WithOverrides<{
    request: AbiParameterToPrimitiveType<{
        type: "tuple";
        name: "request";
        components: [
            {
                type: "tuple";
                name: "config";
                components: [
                    {
                        type: "bytes32";
                        name: "contractId";
                    },
                    {
                        type: "address";
                        name: "implementation";
                    },
                    {
                        type: "uint8";
                        name: "implementationType";
                    },
                    {
                        type: "uint8";
                        name: "createHook";
                    },
                    {
                        type: "bytes";
                        name: "createHookData";
                    }
                ];
            },
            {
                type: "bool";
                name: "isDefault";
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
export declare const FN_SELECTOR: "0x63742df3";
/**
 * Checks if the `addImplementationWithSignature` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `addImplementationWithSignature` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isAddImplementationWithSignatureSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isAddImplementationWithSignatureSupported(["0x..."]);
 * ```
 */
export declare function isAddImplementationWithSignatureSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "addImplementationWithSignature" function.
 * @param options - The options for the addImplementationWithSignature function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeAddImplementationWithSignatureParams } from "thirdweb/extensions/tokens";
 * const result = encodeAddImplementationWithSignatureParams({
 *  request: ...,
 *  signature: ...,
 * });
 * ```
 */
export declare function encodeAddImplementationWithSignatureParams(options: AddImplementationWithSignatureParams): `0x${string}`;
/**
 * Encodes the "addImplementationWithSignature" function into a Hex string with its parameters.
 * @param options - The options for the addImplementationWithSignature function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeAddImplementationWithSignature } from "thirdweb/extensions/tokens";
 * const result = encodeAddImplementationWithSignature({
 *  request: ...,
 *  signature: ...,
 * });
 * ```
 */
export declare function encodeAddImplementationWithSignature(options: AddImplementationWithSignatureParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "addImplementationWithSignature" function on the contract.
 * @param options - The options for the "addImplementationWithSignature" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { addImplementationWithSignature } from "thirdweb/extensions/tokens";
 *
 * const transaction = addImplementationWithSignature({
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
export declare function addImplementationWithSignature(options: BaseTransactionOptions<AddImplementationWithSignatureParams | {
    asyncParams: () => Promise<AddImplementationWithSignatureParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=addImplementationWithSignature.d.ts.map