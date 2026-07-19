import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
export declare const FN_SELECTOR: "0x46904840";
/**
 * Checks if the `feeRecipient` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `feeRecipient` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isFeeRecipientSupported } from "thirdweb/extensions/tokens";
 * const supported = isFeeRecipientSupported(["0x..."]);
 * ```
 */
export declare function isFeeRecipientSupported(availableSelectors: string[]): boolean;
/**
 * Decodes the result of the feeRecipient function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeFeeRecipientResult } from "thirdweb/extensions/tokens";
 * const result = decodeFeeRecipientResultResult("...");
 * ```
 */
export declare function decodeFeeRecipientResult(result: Hex): `0x${string}`;
/**
 * Calls the "feeRecipient" function on the contract.
 * @param options - The options for the feeRecipient function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { feeRecipient } from "thirdweb/extensions/tokens";
 *
 * const result = await feeRecipient({
 *  contract,
 * });
 *
 * ```
 */
export declare function feeRecipient(options: BaseTransactionOptions): Promise<string>;
//# sourceMappingURL=feeRecipient.d.ts.map