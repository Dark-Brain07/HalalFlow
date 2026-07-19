import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "deploy" function.
 */
export type DeployParams = WithOverrides<{
    bytecode: AbiParameterToPrimitiveType<{
        type: "bytes";
        name: "bytecode";
    }>;
    initData: AbiParameterToPrimitiveType<{
        type: "bytes";
        name: "initData";
    }>;
    initValue: AbiParameterToPrimitiveType<{
        type: "uint256";
        name: "initValue";
    }>;
    salt: AbiParameterToPrimitiveType<{
        type: "bytes32";
        name: "salt";
    }>;
}>;
export declare const FN_SELECTOR: "0xa9a8e4e9";
/**
 * Checks if the `deploy` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `deploy` method is supported.
 * @extension STYLUS
 * @example
 * ```ts
 * import { isDeploySupported } from "thirdweb/extensions/stylus";
 *
 * const supported = isDeploySupported(["0x..."]);
 * ```
 */
export declare function isDeploySupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "deploy" function.
 * @param options - The options for the deploy function.
 * @returns The encoded ABI parameters.
 * @extension STYLUS
 * @example
 * ```ts
 * import { encodeDeployParams } from "thirdweb/extensions/stylus";
 * const result = encodeDeployParams({
 *  bytecode: ...,
 *  initData: ...,
 *  initValue: ...,
 *  salt: ...,
 * });
 * ```
 */
export declare function encodeDeployParams(options: DeployParams): `0x${string}`;
/**
 * Encodes the "deploy" function into a Hex string with its parameters.
 * @param options - The options for the deploy function.
 * @returns The encoded hexadecimal string.
 * @extension STYLUS
 * @example
 * ```ts
 * import { encodeDeploy } from "thirdweb/extensions/stylus";
 * const result = encodeDeploy({
 *  bytecode: ...,
 *  initData: ...,
 *  initValue: ...,
 *  salt: ...,
 * });
 * ```
 */
export declare function encodeDeploy(options: DeployParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "deploy" function on the contract.
 * @param options - The options for the "deploy" function.
 * @returns A prepared transaction object.
 * @extension STYLUS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { deploy } from "thirdweb/extensions/stylus";
 *
 * const transaction = deploy({
 *  contract,
 *  bytecode: ...,
 *  initData: ...,
 *  initValue: ...,
 *  salt: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export declare function deploy(options: BaseTransactionOptions<DeployParams | {
    asyncParams: () => Promise<DeployParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=deploy.d.ts.map