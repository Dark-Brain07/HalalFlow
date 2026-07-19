import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "getFeeConfig" function.
 */
export type GetFeeConfigParams = {
    target: AbiParameterToPrimitiveType<{
        type: "address";
        name: "target";
    }>;
    action: AbiParameterToPrimitiveType<{
        type: "bytes4";
        name: "action";
    }>;
};
export declare const FN_SELECTOR: "0x17305ee1";
/**
 * Checks if the `getFeeConfig` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getFeeConfig` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isGetFeeConfigSupported } from "thirdweb/extensions/tokens";
 * const supported = isGetFeeConfigSupported(["0x..."]);
 * ```
 */
export declare function isGetFeeConfigSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "getFeeConfig" function.
 * @param options - The options for the getFeeConfig function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetFeeConfigParams } from "thirdweb/extensions/tokens";
 * const result = encodeGetFeeConfigParams({
 *  target: ...,
 *  action: ...,
 * });
 * ```
 */
export declare function encodeGetFeeConfigParams(options: GetFeeConfigParams): `0x${string}`;
/**
 * Encodes the "getFeeConfig" function into a Hex string with its parameters.
 * @param options - The options for the getFeeConfig function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetFeeConfig } from "thirdweb/extensions/tokens";
 * const result = encodeGetFeeConfig({
 *  target: ...,
 *  action: ...,
 * });
 * ```
 */
export declare function encodeGetFeeConfig(options: GetFeeConfigParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the getFeeConfig function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeGetFeeConfigResult } from "thirdweb/extensions/tokens";
 * const result = decodeGetFeeConfigResultResult("...");
 * ```
 */
export declare function decodeGetFeeConfigResult(result: Hex): {
    recipient: `0x${string}`;
    feeType: number;
    value: bigint;
};
/**
 * Calls the "getFeeConfig" function on the contract.
 * @param options - The options for the getFeeConfig function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getFeeConfig } from "thirdweb/extensions/tokens";
 *
 * const result = await getFeeConfig({
 *  contract,
 *  target: ...,
 *  action: ...,
 * });
 *
 * ```
 */
export declare function getFeeConfig(options: BaseTransactionOptions<GetFeeConfigParams>): Promise<{
    recipient: string;
    feeType: number;
    value: bigint;
}>;
//# sourceMappingURL=getFeeConfig.d.ts.map