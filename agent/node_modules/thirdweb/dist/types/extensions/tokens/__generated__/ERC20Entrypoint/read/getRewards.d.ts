import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "getRewards" function.
 */
export type GetRewardsParams = {
    asset: AbiParameterToPrimitiveType<{
        type: "address";
        name: "asset";
    }>;
};
export declare const FN_SELECTOR: "0x79ee54f7";
/**
 * Checks if the `getRewards` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getRewards` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isGetRewardsSupported } from "thirdweb/extensions/tokens";
 * const supported = isGetRewardsSupported(["0x..."]);
 * ```
 */
export declare function isGetRewardsSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "getRewards" function.
 * @param options - The options for the getRewards function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetRewardsParams } from "thirdweb/extensions/tokens";
 * const result = encodeGetRewardsParams({
 *  asset: ...,
 * });
 * ```
 */
export declare function encodeGetRewardsParams(options: GetRewardsParams): `0x${string}`;
/**
 * Encodes the "getRewards" function into a Hex string with its parameters.
 * @param options - The options for the getRewards function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetRewards } from "thirdweb/extensions/tokens";
 * const result = encodeGetRewards({
 *  asset: ...,
 * });
 * ```
 */
export declare function encodeGetRewards(options: GetRewardsParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the getRewards function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeGetRewardsResult } from "thirdweb/extensions/tokens";
 * const result = decodeGetRewardsResultResult("...");
 * ```
 */
export declare function decodeGetRewardsResult(result: Hex): readonly {
    positionId: bigint;
    recipient: `0x${string}`;
    developer: `0x${string}`;
    developerBps: number;
    positionManager: `0x${string}`;
    rewardLocker: `0x${string}`;
}[];
/**
 * Calls the "getRewards" function on the contract.
 * @param options - The options for the getRewards function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getRewards } from "thirdweb/extensions/tokens";
 *
 * const result = await getRewards({
 *  contract,
 *  asset: ...,
 * });
 *
 * ```
 */
export declare function getRewards(options: BaseTransactionOptions<GetRewardsParams>): Promise<readonly {
    positionId: bigint;
    recipient: string;
    developer: string;
    developerBps: number;
    positionManager: string;
    rewardLocker: string;
}[]>;
//# sourceMappingURL=getRewards.d.ts.map