import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "createByImplementationConfig" function.
 */
export type CreateByImplementationConfigParams = WithOverrides<{
    config: AbiParameterToPrimitiveType<{
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
    }>;
    creator: AbiParameterToPrimitiveType<{
        type: "address";
        name: "creator";
    }>;
    params: AbiParameterToPrimitiveType<{
        type: "tuple";
        name: "params";
        components: [
            {
                type: "address";
                name: "developer";
            },
            {
                type: "bytes32";
                name: "salt";
            },
            {
                type: "bytes";
                name: "data";
            },
            {
                type: "bytes";
                name: "hookData";
            }
        ];
    }>;
}>;
export declare const FN_SELECTOR: "0x1a1b2b88";
/**
 * Checks if the `createByImplementationConfig` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `createByImplementationConfig` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isCreateByImplementationConfigSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isCreateByImplementationConfigSupported(["0x..."]);
 * ```
 */
export declare function isCreateByImplementationConfigSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "createByImplementationConfig" function.
 * @param options - The options for the createByImplementationConfig function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeCreateByImplementationConfigParams } from "thirdweb/extensions/tokens";
 * const result = encodeCreateByImplementationConfigParams({
 *  config: ...,
 *  creator: ...,
 *  params: ...,
 * });
 * ```
 */
export declare function encodeCreateByImplementationConfigParams(options: CreateByImplementationConfigParams): `0x${string}`;
/**
 * Encodes the "createByImplementationConfig" function into a Hex string with its parameters.
 * @param options - The options for the createByImplementationConfig function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeCreateByImplementationConfig } from "thirdweb/extensions/tokens";
 * const result = encodeCreateByImplementationConfig({
 *  config: ...,
 *  creator: ...,
 *  params: ...,
 * });
 * ```
 */
export declare function encodeCreateByImplementationConfig(options: CreateByImplementationConfigParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "createByImplementationConfig" function on the contract.
 * @param options - The options for the "createByImplementationConfig" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { createByImplementationConfig } from "thirdweb/extensions/tokens";
 *
 * const transaction = createByImplementationConfig({
 *  contract,
 *  config: ...,
 *  creator: ...,
 *  params: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export declare function createByImplementationConfig(options: BaseTransactionOptions<CreateByImplementationConfigParams | {
    asyncParams: () => Promise<CreateByImplementationConfigParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=createByImplementationConfig.d.ts.map