import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "executeWithSig" function.
 */
export type ExecuteWithSigParams = WithOverrides<{
    wrappedCalls: AbiParameterToPrimitiveType<{
        type: "tuple";
        name: "wrappedCalls";
        components: [
            {
                type: "tuple[]";
                name: "calls";
                components: [
                    {
                        type: "address";
                        name: "target";
                    },
                    {
                        type: "uint256";
                        name: "value";
                    },
                    {
                        type: "bytes";
                        name: "data";
                    }
                ];
            },
            {
                type: "bytes32";
                name: "uid";
            }
        ];
    }>;
    signature: AbiParameterToPrimitiveType<{
        type: "bytes";
        name: "signature";
    }>;
}>;
export declare const FN_SELECTOR: "0xba61557d";
/**
 * Checks if the `executeWithSig` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `executeWithSig` method is supported.
 * @extension ERC7702
 * @example
 * ```ts
 * import { isExecuteWithSigSupported } from "thirdweb/extensions/erc7702";
 *
 * const supported = isExecuteWithSigSupported(["0x..."]);
 * ```
 */
export declare function isExecuteWithSigSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "executeWithSig" function.
 * @param options - The options for the executeWithSig function.
 * @returns The encoded ABI parameters.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeExecuteWithSigParams } from "thirdweb/extensions/erc7702";
 * const result = encodeExecuteWithSigParams({
 *  wrappedCalls: ...,
 *  signature: ...,
 * });
 * ```
 */
export declare function encodeExecuteWithSigParams(options: ExecuteWithSigParams): `0x${string}`;
/**
 * Encodes the "executeWithSig" function into a Hex string with its parameters.
 * @param options - The options for the executeWithSig function.
 * @returns The encoded hexadecimal string.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeExecuteWithSig } from "thirdweb/extensions/erc7702";
 * const result = encodeExecuteWithSig({
 *  wrappedCalls: ...,
 *  signature: ...,
 * });
 * ```
 */
export declare function encodeExecuteWithSig(options: ExecuteWithSigParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "executeWithSig" function on the contract.
 * @param options - The options for the "executeWithSig" function.
 * @returns A prepared transaction object.
 * @extension ERC7702
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { executeWithSig } from "thirdweb/extensions/erc7702";
 *
 * const transaction = executeWithSig({
 *  contract,
 *  wrappedCalls: ...,
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
export declare function executeWithSig(options: BaseTransactionOptions<ExecuteWithSigParams | {
    asyncParams: () => Promise<ExecuteWithSigParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=executeWithSig.d.ts.map