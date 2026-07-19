import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "deployProxy" function.
 */
export type DeployProxyParams = WithOverrides<{
    id: AbiParameterToPrimitiveType<{
        type: "bytes32";
        name: "id";
    }>;
    deployType: AbiParameterToPrimitiveType<{
        type: "uint8";
        name: "deployType";
    }>;
    implementation: AbiParameterToPrimitiveType<{
        type: "address";
        name: "implementation";
    }>;
    data: AbiParameterToPrimitiveType<{
        type: "bytes";
        name: "data";
    }>;
    salt: AbiParameterToPrimitiveType<{
        type: "bytes32";
        name: "salt";
    }>;
    postDeployCalls: AbiParameterToPrimitiveType<{
        type: "bytes[]";
        name: "postDeployCalls";
    }>;
}>;
export declare const FN_SELECTOR: "0xfe513ef9";
/**
 * Checks if the `deployProxy` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `deployProxy` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isDeployProxySupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isDeployProxySupported(["0x..."]);
 * ```
 */
export declare function isDeployProxySupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "deployProxy" function.
 * @param options - The options for the deployProxy function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeDeployProxyParams } from "thirdweb/extensions/tokens";
 * const result = encodeDeployProxyParams({
 *  id: ...,
 *  deployType: ...,
 *  implementation: ...,
 *  data: ...,
 *  salt: ...,
 *  postDeployCalls: ...,
 * });
 * ```
 */
export declare function encodeDeployProxyParams(options: DeployProxyParams): `0x${string}`;
/**
 * Encodes the "deployProxy" function into a Hex string with its parameters.
 * @param options - The options for the deployProxy function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeDeployProxy } from "thirdweb/extensions/tokens";
 * const result = encodeDeployProxy({
 *  id: ...,
 *  deployType: ...,
 *  implementation: ...,
 *  data: ...,
 *  salt: ...,
 *  postDeployCalls: ...,
 * });
 * ```
 */
export declare function encodeDeployProxy(options: DeployProxyParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "deployProxy" function on the contract.
 * @param options - The options for the "deployProxy" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { deployProxy } from "thirdweb/extensions/tokens";
 *
 * const transaction = deployProxy({
 *  contract,
 *  id: ...,
 *  deployType: ...,
 *  implementation: ...,
 *  data: ...,
 *  salt: ...,
 *  postDeployCalls: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export declare function deployProxy(options: BaseTransactionOptions<DeployProxyParams | {
    asyncParams: () => Promise<DeployProxyParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=deployProxy.d.ts.map