import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "calculateFee" function.
 */
export type CalculateFeeParams = {
    payer: AbiParameterToPrimitiveType<{
        type: "address";
        name: "payer";
    }>;
    action: AbiParameterToPrimitiveType<{
        type: "bytes4";
        name: "action";
    }>;
    amount: AbiParameterToPrimitiveType<{
        type: "uint256";
        name: "amount";
    }>;
    maxFeeAmount: AbiParameterToPrimitiveType<{
        type: "uint256";
        name: "maxFeeAmount";
    }>;
};
export declare const FN_SELECTOR: "0x69588801";
/**
 * Checks if the `calculateFee` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `calculateFee` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isCalculateFeeSupported } from "thirdweb/extensions/tokens";
 * const supported = isCalculateFeeSupported(["0x..."]);
 * ```
 */
export declare function isCalculateFeeSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "calculateFee" function.
 * @param options - The options for the calculateFee function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeCalculateFeeParams } from "thirdweb/extensions/tokens";
 * const result = encodeCalculateFeeParams({
 *  payer: ...,
 *  action: ...,
 *  amount: ...,
 *  maxFeeAmount: ...,
 * });
 * ```
 */
export declare function encodeCalculateFeeParams(options: CalculateFeeParams): `0x${string}`;
/**
 * Encodes the "calculateFee" function into a Hex string with its parameters.
 * @param options - The options for the calculateFee function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeCalculateFee } from "thirdweb/extensions/tokens";
 * const result = encodeCalculateFee({
 *  payer: ...,
 *  action: ...,
 *  amount: ...,
 *  maxFeeAmount: ...,
 * });
 * ```
 */
export declare function encodeCalculateFee(options: CalculateFeeParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the calculateFee function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeCalculateFeeResult } from "thirdweb/extensions/tokens";
 * const result = decodeCalculateFeeResultResult("...");
 * ```
 */
export declare function decodeCalculateFeeResult(result: Hex): readonly [`0x${string}`, bigint];
/**
 * Calls the "calculateFee" function on the contract.
 * @param options - The options for the calculateFee function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { calculateFee } from "thirdweb/extensions/tokens";
 *
 * const result = await calculateFee({
 *  contract,
 *  payer: ...,
 *  action: ...,
 *  amount: ...,
 *  maxFeeAmount: ...,
 * });
 *
 * ```
 */
export declare function calculateFee(options: BaseTransactionOptions<CalculateFeeParams>): Promise<readonly [string, bigint]>;
//# sourceMappingURL=calculateFee.d.ts.map