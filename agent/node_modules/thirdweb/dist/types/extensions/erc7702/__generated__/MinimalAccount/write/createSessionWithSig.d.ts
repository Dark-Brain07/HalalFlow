import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions, WithOverrides } from "../../../../../transaction/types.js";
/**
 * Represents the parameters for the "createSessionWithSig" function.
 */
export type CreateSessionWithSigParams = WithOverrides<{
    sessionSpec: AbiParameterToPrimitiveType<{
        type: "tuple";
        name: "sessionSpec";
        components: [
            {
                type: "address";
                name: "signer";
            },
            {
                type: "bool";
                name: "isWildcard";
            },
            {
                type: "uint256";
                name: "expiresAt";
            },
            {
                type: "tuple[]";
                name: "callPolicies";
                components: [
                    {
                        type: "address";
                        name: "target";
                    },
                    {
                        type: "bytes4";
                        name: "selector";
                    },
                    {
                        type: "uint256";
                        name: "maxValuePerUse";
                    },
                    {
                        type: "tuple";
                        name: "valueLimit";
                        components: [
                            {
                                type: "uint8";
                                name: "limitType";
                            },
                            {
                                type: "uint256";
                                name: "limit";
                            },
                            {
                                type: "uint256";
                                name: "period";
                            }
                        ];
                    },
                    {
                        type: "tuple[]";
                        name: "constraints";
                        components: [
                            {
                                type: "uint8";
                                name: "condition";
                            },
                            {
                                type: "uint64";
                                name: "index";
                            },
                            {
                                type: "bytes32";
                                name: "refValue";
                            },
                            {
                                type: "tuple";
                                name: "limit";
                                components: [
                                    {
                                        type: "uint8";
                                        name: "limitType";
                                    },
                                    {
                                        type: "uint256";
                                        name: "limit";
                                    },
                                    {
                                        type: "uint256";
                                        name: "period";
                                    }
                                ];
                            }
                        ];
                    }
                ];
            },
            {
                type: "tuple[]";
                name: "transferPolicies";
                components: [
                    {
                        type: "address";
                        name: "target";
                    },
                    {
                        type: "uint256";
                        name: "maxValuePerUse";
                    },
                    {
                        type: "tuple";
                        name: "valueLimit";
                        components: [
                            {
                                type: "uint8";
                                name: "limitType";
                            },
                            {
                                type: "uint256";
                                name: "limit";
                            },
                            {
                                type: "uint256";
                                name: "period";
                            }
                        ];
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
export declare const FN_SELECTOR: "0xb5051648";
/**
 * Checks if the `createSessionWithSig` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `createSessionWithSig` method is supported.
 * @extension ERC7702
 * @example
 * ```ts
 * import { isCreateSessionWithSigSupported } from "thirdweb/extensions/erc7702";
 *
 * const supported = isCreateSessionWithSigSupported(["0x..."]);
 * ```
 */
export declare function isCreateSessionWithSigSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "createSessionWithSig" function.
 * @param options - The options for the createSessionWithSig function.
 * @returns The encoded ABI parameters.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeCreateSessionWithSigParams } from "thirdweb/extensions/erc7702";
 * const result = encodeCreateSessionWithSigParams({
 *  sessionSpec: ...,
 *  signature: ...,
 * });
 * ```
 */
export declare function encodeCreateSessionWithSigParams(options: CreateSessionWithSigParams): `0x${string}`;
/**
 * Encodes the "createSessionWithSig" function into a Hex string with its parameters.
 * @param options - The options for the createSessionWithSig function.
 * @returns The encoded hexadecimal string.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeCreateSessionWithSig } from "thirdweb/extensions/erc7702";
 * const result = encodeCreateSessionWithSig({
 *  sessionSpec: ...,
 *  signature: ...,
 * });
 * ```
 */
export declare function encodeCreateSessionWithSig(options: CreateSessionWithSigParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Prepares a transaction to call the "createSessionWithSig" function on the contract.
 * @param options - The options for the "createSessionWithSig" function.
 * @returns A prepared transaction object.
 * @extension ERC7702
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { createSessionWithSig } from "thirdweb/extensions/erc7702";
 *
 * const transaction = createSessionWithSig({
 *  contract,
 *  sessionSpec: ...,
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
export declare function createSessionWithSig(options: BaseTransactionOptions<CreateSessionWithSigParams | {
    asyncParams: () => Promise<CreateSessionWithSigParams>;
}>): import("../../../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=createSessionWithSig.d.ts.map