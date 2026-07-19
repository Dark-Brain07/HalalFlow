import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "getRewardPositions" function.
 */
export type GetRewardPositionsParams = {
    asset: AbiParameterToPrimitiveType<{
        type: "address";
        name: "asset";
    }>;
};
export declare const FN_SELECTOR: "0xcb62c6b6";
/**
 * Checks if the `getRewardPositions` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getRewardPositions` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isGetRewardPositionsSupported } from "thirdweb/extensions/tokens";
 * const supported = isGetRewardPositionsSupported(["0x..."]);
 * ```
 */
export declare function isGetRewardPositionsSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "getRewardPositions" function.
 * @param options - The options for the getRewardPositions function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetRewardPositionsParams } from "thirdweb/extensions/tokens";
 * const result = encodeGetRewardPositionsParams({
 *  asset: ...,
 * });
 * ```
 */
export declare function encodeGetRewardPositionsParams(options: GetRewardPositionsParams): `0x${string}`;
/**
 * Encodes the "getRewardPositions" function into a Hex string with its parameters.
 * @param options - The options for the getRewardPositions function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetRewardPositions } from "thirdweb/extensions/tokens";
 * const result = encodeGetRewardPositions({
 *  asset: ...,
 * });
 * ```
 */
export declare function encodeGetRewardPositions(options: GetRewardPositionsParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the getRewardPositions function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeGetRewardPositionsResult } from "thirdweb/extensions/tokens";
 * const result = decodeGetRewardPositionsResultResult("...");
 * ```
 */
export declare function decodeGetRewardPositionsResult(result: Hex): readonly {
    positionId: bigint;
    recipient: `0x${string}`;
    developer: `0x${string}`;
    developerBps: number;
    positionManager: `0x${string}`;
    rewardLocker: `0x${string}`;
}[];
/**
 * Calls the "getRewardPositions" function on the contract.
 * @param options - The options for the getRewardPositions function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getRewardPositions } from "thirdweb/extensions/tokens";
 *
 * const result = await getRewardPositions({
 *  contract,
 *  asset: ...,
 * });
 *
 * ```
 */
export declare function getRewardPositions(options: BaseTransactionOptions<GetRewardPositionsParams>): Promise<readonly {
    positionId: bigint;
    recipient: string;
    developer: string;
    developerBps: number;
    positionManager: string;
    rewardLocker: string;
}[]>;
//# sourceMappingURL=getRewardPositions.d.ts.map