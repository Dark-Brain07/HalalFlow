import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "setContractURI" function.
 */
export type SetContractURIParams = WithOverrides<{
    contractURI: AbiParameterToPrimitiveType<{
        type: "string";
        name: "_contractURI";
    }>;
}>;
export declare const FN_SELECTOR: "0x938e3d7b";
/**
 * Checks if the `setContractURI` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `setContractURI` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isSetContractURISupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isSetContractURISupported(["0x..."]);
 * ```
 */
export declare function isSetContractURISupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "setContractURI" function.
 * @param options - The options for the setContractURI function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSetContractURIParams } from "thirdweb/extensions/tokens";
 * const result = encodeSetContractURIParams({
 *  contractURI: ...,
 * });
 * ```
 */
export declare function encodeSetContractURIParams(options: SetContractURIParams): `0x${string}`;
/**
 * Encodes the "setContractURI" function into a Hex string with its parameters.
 * @param options - The options for the setContractURI function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeSetContractURI } from "thirdweb/extensions/tokens";
 * const result = encodeSetContractURI({
 *  contractURI: ...,
 * });
 * ```
 */
export declare function encodeSetContractURI(options: SetContractURIParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "setContractURI" function on the contract.
 * @param options - The options for the "setContractURI" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { setContractURI } from "thirdweb/extensions/tokens";
 *
 * const transaction = setContractURI({
 *  contract,
 *  contractURI: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export declare function setContractURI(options: BaseTransactionOptions<SetContractURIParams | {
    asyncParams: () => Promise<SetContractURIParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=setContractURI.d.ts.map