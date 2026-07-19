import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "position" function.
 */
export type PositionParams = {
    owner: AbiParameterToPrimitiveType<{
        type: "address";
        name: "owner";
    }>;
    asset: AbiParameterToPrimitiveType<{
        type: "address";
        name: "asset";
    }>;
};
export declare const FN_SELECTOR: "0xe9c6b4c1";
/**
 * Checks if the `position` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `position` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isPositionSupported } from "thirdweb/extensions/tokens";
 * const supported = isPositionSupported(["0x..."]);
 * ```
 */
export declare function isPositionSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "position" function.
 * @param options - The options for the position function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodePositionParams } from "thirdweb/extensions/tokens";
 * const result = encodePositionParams({
 *  owner: ...,
 *  asset: ...,
 * });
 * ```
 */
export declare function encodePositionParams(options: PositionParams): `0x${string}`;
/**
 * Encodes the "position" function into a Hex string with its parameters.
 * @param options - The options for the position function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodePosition } from "thirdweb/extensions/tokens";
 * const result = encodePosition({
 *  owner: ...,
 *  asset: ...,
 * });
 * ```
 */
export declare function encodePosition(options: PositionParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the position function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodePositionResult } from "thirdweb/extensions/tokens";
 * const result = decodePositionResultResult("...");
 * ```
 */
export declare function decodePositionResult(result: Hex): {
    positionId: bigint;
    recipient: `0x${string}`;
    developer: `0x${string}`;
    developerBps: number;
    data: `0x${string}`;
};
/**
 * Calls the "position" function on the contract.
 * @param options - The options for the position function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { position } from "thirdweb/extensions/tokens";
 *
 * const result = await position({
 *  contract,
 *  owner: ...,
 *  asset: ...,
 * });
 *
 * ```
 */
export declare function position(options: BaseTransactionOptions<PositionParams>): Promise<{
    positionId: bigint;
    recipient: string;
    developer: string;
    developerBps: number;
    data: `0x${string}`;
}>;
//# sourceMappingURL=position.d.ts.map