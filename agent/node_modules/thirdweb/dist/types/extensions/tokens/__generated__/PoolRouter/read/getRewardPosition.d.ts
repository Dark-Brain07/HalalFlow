import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "getRewardPosition" function.
 */
export type GetRewardPositionParams = {
    asset: AbiParameterToPrimitiveType<{
        type: "address";
        name: "asset";
    }>;
    adapterType: AbiParameterToPrimitiveType<{
        type: "uint8";
        name: "adapterType";
    }>;
};
export declare const FN_SELECTOR: "0x65798bfb";
/**
 * Checks if the `getRewardPosition` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getRewardPosition` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isGetRewardPositionSupported } from "thirdweb/extensions/tokens";
 * const supported = isGetRewardPositionSupported(["0x..."]);
 * ```
 */
export declare function isGetRewardPositionSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "getRewardPosition" function.
 * @param options - The options for the getRewardPosition function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetRewardPositionParams } from "thirdweb/extensions/tokens";
 * const result = encodeGetRewardPositionParams({
 *  asset: ...,
 *  adapterType: ...,
 * });
 * ```
 */
export declare function encodeGetRewardPositionParams(options: GetRewardPositionParams): `0x${string}`;
/**
 * Encodes the "getRewardPosition" function into a Hex string with its parameters.
 * @param options - The options for the getRewardPosition function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetRewardPosition } from "thirdweb/extensions/tokens";
 * const result = encodeGetRewardPosition({
 *  asset: ...,
 *  adapterType: ...,
 * });
 * ```
 */
export declare function encodeGetRewardPosition(options: GetRewardPositionParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the getRewardPosition function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeGetRewardPositionResult } from "thirdweb/extensions/tokens";
 * const result = decodeGetRewardPositionResultResult("...");
 * ```
 */
export declare function decodeGetRewardPositionResult(result: Hex): {
    positionId: bigint;
    recipient: `0x${string}`;
    developer: `0x${string}`;
    developerBps: number;
    positionManager: `0x${string}`;
    rewardLocker: `0x${string}`;
};
/**
 * Calls the "getRewardPosition" function on the contract.
 * @param options - The options for the getRewardPosition function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getRewardPosition } from "thirdweb/extensions/tokens";
 *
 * const result = await getRewardPosition({
 *  contract,
 *  asset: ...,
 *  adapterType: ...,
 * });
 *
 * ```
 */
export declare function getRewardPosition(options: BaseTransactionOptions<GetRewardPositionParams>): Promise<{
    positionId: bigint;
    recipient: string;
    developer: string;
    developerBps: number;
    positionManager: string;
    rewardLocker: string;
}>;
//# sourceMappingURL=getRewardPosition.d.ts.map