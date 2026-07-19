import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "guardSalt" function.
 */
export type GuardSaltParams = {
    salt: AbiParameterToPrimitiveType<{
        type: "bytes32";
        name: "salt";
    }>;
    creator: AbiParameterToPrimitiveType<{
        type: "address";
        name: "creator";
    }>;
    contractInitData: AbiParameterToPrimitiveType<{
        type: "bytes";
        name: "contractInitData";
    }>;
    hookInitData: AbiParameterToPrimitiveType<{
        type: "bytes";
        name: "hookInitData";
    }>;
};
export declare const FN_SELECTOR: "0xd5ebb1df";
/**
 * Checks if the `guardSalt` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `guardSalt` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isGuardSaltSupported } from "thirdweb/extensions/tokens";
 * const supported = isGuardSaltSupported(["0x..."]);
 * ```
 */
export declare function isGuardSaltSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "guardSalt" function.
 * @param options - The options for the guardSalt function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGuardSaltParams } from "thirdweb/extensions/tokens";
 * const result = encodeGuardSaltParams({
 *  salt: ...,
 *  creator: ...,
 *  contractInitData: ...,
 *  hookInitData: ...,
 * });
 * ```
 */
export declare function encodeGuardSaltParams(options: GuardSaltParams): `0x${string}`;
/**
 * Encodes the "guardSalt" function into a Hex string with its parameters.
 * @param options - The options for the guardSalt function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGuardSalt } from "thirdweb/extensions/tokens";
 * const result = encodeGuardSalt({
 *  salt: ...,
 *  creator: ...,
 *  contractInitData: ...,
 *  hookInitData: ...,
 * });
 * ```
 */
export declare function encodeGuardSalt(options: GuardSaltParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the guardSalt function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeGuardSaltResult } from "thirdweb/extensions/tokens";
 * const result = decodeGuardSaltResultResult("...");
 * ```
 */
export declare function decodeGuardSaltResult(result: Hex): `0x${string}`;
/**
 * Calls the "guardSalt" function on the contract.
 * @param options - The options for the guardSalt function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { guardSalt } from "thirdweb/extensions/tokens";
 *
 * const result = await guardSalt({
 *  contract,
 *  salt: ...,
 *  creator: ...,
 *  contractInitData: ...,
 *  hookInitData: ...,
 * });
 *
 * ```
 */
export declare function guardSalt(options: BaseTransactionOptions<GuardSaltParams>): Promise<`0x${string}`>;
//# sourceMappingURL=guardSalt.d.ts.map