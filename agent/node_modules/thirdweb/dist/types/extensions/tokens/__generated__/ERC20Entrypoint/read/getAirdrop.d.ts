import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
export declare const FN_SELECTOR: "0xd25f82a0";
/**
 * Checks if the `getAirdrop` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getAirdrop` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isGetAirdropSupported } from "thirdweb/extensions/tokens";
 * const supported = isGetAirdropSupported(["0x..."]);
 * ```
 */
export declare function isGetAirdropSupported(availableSelectors: string[]): boolean;
/**
 * Decodes the result of the getAirdrop function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeGetAirdropResult } from "thirdweb/extensions/tokens";
 * const result = decodeGetAirdropResultResult("...");
 * ```
 */
export declare function decodeGetAirdropResult(result: Hex): `0x${string}`;
/**
 * Calls the "getAirdrop" function on the contract.
 * @param options - The options for the getAirdrop function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getAirdrop } from "thirdweb/extensions/tokens";
 *
 * const result = await getAirdrop({
 *  contract,
 * });
 *
 * ```
 */
export declare function getAirdrop(options: BaseTransactionOptions): Promise<string>;
//# sourceMappingURL=getAirdrop.d.ts.map