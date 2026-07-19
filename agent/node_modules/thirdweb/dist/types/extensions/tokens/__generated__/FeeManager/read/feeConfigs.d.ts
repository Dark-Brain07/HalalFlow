import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "feeConfigs" function.
 */
export type FeeConfigsParams = {
    target: AbiParameterToPrimitiveType<{
        type: "address";
        name: "target";
    }>;
    action: AbiParameterToPrimitiveType<{
        type: "bytes4";
        name: "action";
    }>;
};
export declare const FN_SELECTOR: "0x758515e1";
/**
 * Checks if the `feeConfigs` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `feeConfigs` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isFeeConfigsSupported } from "thirdweb/extensions/tokens";
 * const supported = isFeeConfigsSupported(["0x..."]);
 * ```
 */
export declare function isFeeConfigsSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "feeConfigs" function.
 * @param options - The options for the feeConfigs function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeFeeConfigsParams } from "thirdweb/extensions/tokens";
 * const result = encodeFeeConfigsParams({
 *  target: ...,
 *  action: ...,
 * });
 * ```
 */
export declare function encodeFeeConfigsParams(options: FeeConfigsParams): `0x${string}`;
/**
 * Encodes the "feeConfigs" function into a Hex string with its parameters.
 * @param options - The options for the feeConfigs function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeFeeConfigs } from "thirdweb/extensions/tokens";
 * const result = encodeFeeConfigs({
 *  target: ...,
 *  action: ...,
 * });
 * ```
 */
export declare function encodeFeeConfigs(options: FeeConfigsParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the feeConfigs function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeFeeConfigsResult } from "thirdweb/extensions/tokens";
 * const result = decodeFeeConfigsResultResult("...");
 * ```
 */
export declare function decodeFeeConfigsResult(result: Hex): readonly [`0x${string}`, number, bigint];
/**
 * Calls the "feeConfigs" function on the contract.
 * @param options - The options for the feeConfigs function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { feeConfigs } from "thirdweb/extensions/tokens";
 *
 * const result = await feeConfigs({
 *  contract,
 *  target: ...,
 *  action: ...,
 * });
 *
 * ```
 */
export declare function feeConfigs(options: BaseTransactionOptions<FeeConfigsParams>): Promise<readonly [string, number, bigint]>;
//# sourceMappingURL=feeConfigs.d.ts.map