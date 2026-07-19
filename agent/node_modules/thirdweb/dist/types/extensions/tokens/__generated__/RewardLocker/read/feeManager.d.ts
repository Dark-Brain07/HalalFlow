import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
export declare const FN_SELECTOR: "0xd0fb0203";
/**
 * Checks if the `feeManager` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `feeManager` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isFeeManagerSupported } from "thirdweb/extensions/tokens";
 * const supported = isFeeManagerSupported(["0x..."]);
 * ```
 */
export declare function isFeeManagerSupported(availableSelectors: string[]): boolean;
/**
 * Decodes the result of the feeManager function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeFeeManagerResult } from "thirdweb/extensions/tokens";
 * const result = decodeFeeManagerResultResult("...");
 * ```
 */
export declare function decodeFeeManagerResult(result: Hex): `0x${string}`;
/**
 * Calls the "feeManager" function on the contract.
 * @param options - The options for the feeManager function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { feeManager } from "thirdweb/extensions/tokens";
 *
 * const result = await feeManager({
 *  contract,
 * });
 *
 * ```
 */
export declare function feeManager(options: BaseTransactionOptions): Promise<string>;
//# sourceMappingURL=feeManager.d.ts.map