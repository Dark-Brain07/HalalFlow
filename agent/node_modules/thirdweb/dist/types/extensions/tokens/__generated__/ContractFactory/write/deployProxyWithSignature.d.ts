import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "deployProxyWithSignature" function.
 */
export type DeployProxyWithSignatureParams = WithOverrides<{
    request: AbiParameterToPrimitiveType<{
        type: "tuple";
        name: "request";
        components: [
            {
                type: "bytes32";
                name: "id";
            },
            {
                type: "uint8";
                name: "deployType";
            },
            {
                type: "address";
                name: "implementation";
            },
            {
                type: "bytes";
                name: "data";
            },
            {
                type: "bytes32";
                name: "salt";
            },
            {
                type: "bytes[]";
                name: "postDeployCalls";
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
export declare const FN_SELECTOR: "0x7bd1368b";
/**
 * Checks if the `deployProxyWithSignature` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `deployProxyWithSignature` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isDeployProxyWithSignatureSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isDeployProxyWithSignatureSupported(["0x..."]);
 * ```
 */
export declare function isDeployProxyWithSignatureSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "deployProxyWithSignature" function.
 * @param options - The options for the deployProxyWithSignature function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeDeployProxyWithSignatureParams } from "thirdweb/extensions/tokens";
 * const result = encodeDeployProxyWithSignatureParams({
 *  request: ...,
 *  signature: ...,
 * });
 * ```
 */
export declare function encodeDeployProxyWithSignatureParams(options: DeployProxyWithSignatureParams): `0x${string}`;
/**
 * Encodes the "deployProxyWithSignature" function into a Hex string with its parameters.
 * @param options - The options for the deployProxyWithSignature function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeDeployProxyWithSignature } from "thirdweb/extensions/tokens";
 * const result = encodeDeployProxyWithSignature({
 *  request: ...,
 *  signature: ...,
 * });
 * ```
 */
export declare function encodeDeployProxyWithSignature(options: DeployProxyWithSignatureParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "deployProxyWithSignature" function on the contract.
 * @param options - The options for the "deployProxyWithSignature" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { deployProxyWithSignature } from "thirdweb/extensions/tokens";
 *
 * const transaction = deployProxyWithSignature({
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
export declare function deployProxyWithSignature(options: BaseTransactionOptions<DeployProxyWithSignatureParams | {
    asyncParams: () => Promise<DeployProxyWithSignatureParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=deployProxyWithSignature.d.ts.map