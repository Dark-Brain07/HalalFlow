import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "addImplementation" function.
 */
export type AddImplementationParams = WithOverrides<{
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
    isDefault: AbiParameterToPrimitiveType<{
        type: "bool";
        name: "isDefault";
    }>;
}>;
export declare const FN_SELECTOR: "0x4bf8055d";
/**
 * Checks if the `addImplementation` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `addImplementation` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isAddImplementationSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isAddImplementationSupported(["0x..."]);
 * ```
 */
export declare function isAddImplementationSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "addImplementation" function.
 * @param options - The options for the addImplementation function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeAddImplementationParams } from "thirdweb/extensions/tokens";
 * const result = encodeAddImplementationParams({
 *  config: ...,
 *  isDefault: ...,
 * });
 * ```
 */
export declare function encodeAddImplementationParams(options: AddImplementationParams): `0x${string}`;
/**
 * Encodes the "addImplementation" function into a Hex string with its parameters.
 * @param options - The options for the addImplementation function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeAddImplementation } from "thirdweb/extensions/tokens";
 * const result = encodeAddImplementation({
 *  config: ...,
 *  isDefault: ...,
 * });
 * ```
 */
export declare function encodeAddImplementation(options: AddImplementationParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "addImplementation" function on the contract.
 * @param options - The options for the "addImplementation" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { addImplementation } from "thirdweb/extensions/tokens";
 *
 * const transaction = addImplementation({
 *  contract,
 *  config: ...,
 *  isDefault: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export declare function addImplementation(options: BaseTransactionOptions<AddImplementationParams | {
    asyncParams: () => Promise<AddImplementationParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=addImplementation.d.ts.map