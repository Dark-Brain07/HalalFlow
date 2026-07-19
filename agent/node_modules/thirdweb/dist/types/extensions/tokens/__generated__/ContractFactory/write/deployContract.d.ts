import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "deployContract" function.
 */
export type DeployContractParams = WithOverrides<{
    id: AbiParameterToPrimitiveType<{
        type: "bytes32";
        name: "id";
    }>;
    deployType: AbiParameterToPrimitiveType<{
        type: "uint8";
        name: "deployType";
    }>;
    bytecode: AbiParameterToPrimitiveType<{
        type: "bytes";
        name: "bytecode";
    }>;
    constructorArgs: AbiParameterToPrimitiveType<{
        type: "bytes";
        name: "constructorArgs";
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
export declare const FN_SELECTOR: "0x8bc106dd";
/**
 * Checks if the `deployContract` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `deployContract` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isDeployContractSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isDeployContractSupported(["0x..."]);
 * ```
 */
export declare function isDeployContractSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "deployContract" function.
 * @param options - The options for the deployContract function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeDeployContractParams } from "thirdweb/extensions/tokens";
 * const result = encodeDeployContractParams({
 *  id: ...,
 *  deployType: ...,
 *  bytecode: ...,
 *  constructorArgs: ...,
 *  salt: ...,
 *  postDeployCalls: ...,
 * });
 * ```
 */
export declare function encodeDeployContractParams(options: DeployContractParams): `0x${string}`;
/**
 * Encodes the "deployContract" function into a Hex string with its parameters.
 * @param options - The options for the deployContract function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeDeployContract } from "thirdweb/extensions/tokens";
 * const result = encodeDeployContract({
 *  id: ...,
 *  deployType: ...,
 *  bytecode: ...,
 *  constructorArgs: ...,
 *  salt: ...,
 *  postDeployCalls: ...,
 * });
 * ```
 */
export declare function encodeDeployContract(options: DeployContractParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "deployContract" function on the contract.
 * @param options - The options for the "deployContract" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { deployContract } from "thirdweb/extensions/tokens";
 *
 * const transaction = deployContract({
 *  contract,
 *  id: ...,
 *  deployType: ...,
 *  bytecode: ...,
 *  constructorArgs: ...,
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
export declare function deployContract(options: BaseTransactionOptions<DeployContractParams | {
    asyncParams: () => Promise<DeployContractParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=deployContract.d.ts.map