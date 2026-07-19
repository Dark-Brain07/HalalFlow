import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "execute" function.
 */
export type ExecuteParams = WithOverrides<{
    calls: AbiParameterToPrimitiveType<{
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
    }>;
}>;
export declare const FN_SELECTOR: "0x3f707e6b";
/**
 * Checks if the `execute` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `execute` method is supported.
 * @extension ERC7702
 * @example
 * ```ts
 * import { isExecuteSupported } from "thirdweb/extensions/erc7702";
 *
 * const supported = isExecuteSupported(["0x..."]);
 * ```
 */
export declare function isExecuteSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "execute" function.
 * @param options - The options for the execute function.
 * @returns The encoded ABI parameters.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeExecuteParams } from "thirdweb/extensions/erc7702";
 * const result = encodeExecuteParams({
 *  calls: ...,
 * });
 * ```
 */
export declare function encodeExecuteParams(options: ExecuteParams): `0x${string}`;
/**
 * Encodes the "execute" function into a Hex string with its parameters.
 * @param options - The options for the execute function.
 * @returns The encoded hexadecimal string.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeExecute } from "thirdweb/extensions/erc7702";
 * const result = encodeExecute({
 *  calls: ...,
 * });
 * ```
 */
export declare function encodeExecute(options: ExecuteParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "execute" function on the contract.
 * @param options - The options for the "execute" function.
 * @returns A prepared transaction object.
 * @extension ERC7702
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { execute } from "thirdweb/extensions/erc7702";
 *
 * const transaction = execute({
 *  contract,
 *  calls: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export declare function execute(options: BaseTransactionOptions<ExecuteParams | {
    asyncParams: () => Promise<ExecuteParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=execute.d.ts.map