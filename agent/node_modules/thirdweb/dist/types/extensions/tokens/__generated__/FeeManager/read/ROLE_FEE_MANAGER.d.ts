import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
export declare const FN_SELECTOR: "0x99ba5936";
/**
 * Checks if the `ROLE_FEE_MANAGER` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `ROLE_FEE_MANAGER` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isROLE_FEE_MANAGERSupported } from "thirdweb/extensions/tokens";
 * const supported = isROLE_FEE_MANAGERSupported(["0x..."]);
 * ```
 */
export declare function isROLE_FEE_MANAGERSupported(availableSelectors: string[]): boolean;
/**
 * Decodes the result of the ROLE_FEE_MANAGER function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeROLE_FEE_MANAGERResult } from "thirdweb/extensions/tokens";
 * const result = decodeROLE_FEE_MANAGERResultResult("...");
 * ```
 */
export declare function decodeROLE_FEE_MANAGERResult(result: Hex): bigint;
/**
 * Calls the "ROLE_FEE_MANAGER" function on the contract.
 * @param options - The options for the ROLE_FEE_MANAGER function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { ROLE_FEE_MANAGER } from "thirdweb/extensions/tokens";
 *
 * const result = await ROLE_FEE_MANAGER({
 *  contract,
 * });
 *
 * ```
 */
export declare function ROLE_FEE_MANAGER(options: BaseTransactionOptions): Promise<bigint>;
//# sourceMappingURL=ROLE_FEE_MANAGER.d.ts.map