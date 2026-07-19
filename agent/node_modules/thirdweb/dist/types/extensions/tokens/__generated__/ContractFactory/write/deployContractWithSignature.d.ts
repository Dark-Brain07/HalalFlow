import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "deployContractWithSignature" function.
 */
export type DeployContractWithSignatureParams = WithOverrides<{
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
                type: "bytes";
                name: "bytecode";
            },
            {
                type: "bytes";
                name: "constructorArgs";
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
export declare const FN_SELECTOR: "0xe4d59447";
/**
 * Checks if the `deployContractWithSignature` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `deployContractWithSignature` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isDeployContractWithSignatureSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isDeployContractWithSignatureSupported(["0x..."]);
 * ```
 */
export declare function isDeployContractWithSignatureSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "deployContractWithSignature" function.
 * @param options - The options for the deployContractWithSignature function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeDeployContractWithSignatureParams } from "thirdweb/extensions/tokens";
 * const result = encodeDeployContractWithSignatureParams({
 *  request: ...,
 *  signature: ...,
 * });
 * ```
 */
export declare function encodeDeployContractWithSignatureParams(options: DeployContractWithSignatureParams): `0x${string}`;
/**
 * Encodes the "deployContractWithSignature" function into a Hex string with its parameters.
 * @param options - The options for the deployContractWithSignature function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeDeployContractWithSignature } from "thirdweb/extensions/tokens";
 * const result = encodeDeployContractWithSignature({
 *  request: ...,
 *  signature: ...,
 * });
 * ```
 */
export declare function encodeDeployContractWithSignature(options: DeployContractWithSignatureParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "deployContractWithSignature" function on the contract.
 * @param options - The options for the "deployContractWithSignature" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { deployContractWithSignature } from "thirdweb/extensions/tokens";
 *
 * const transaction = deployContractWithSignature({
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
export declare function deployContractWithSignature(options: BaseTransactionOptions<DeployContractWithSignatureParams | {
    asyncParams: () => Promise<DeployContractWithSignatureParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=deployContractWithSignature.d.ts.map