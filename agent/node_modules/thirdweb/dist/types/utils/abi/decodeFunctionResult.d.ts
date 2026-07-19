import type * as ox__Abi from "ox/Abi";
import type * as ox__Hex from "ox/Hex";
import type { ThirdwebContract } from "../../contract/contract.js";
/**
 * Decodes the result of a function call.
 * @param options - The options object.
 * @returns The decoded result.
 * @example
 * ```ts
 * import { decodeFunctionResult } from "thirdweb/utils";
 *
 * const data = "0x...";
 * const result = await decodeFunctionResult({ contract, data });
 * ```
 *
 * @utils
 */
export declare function decodeFunctionResult<abi extends ox__Abi.Abi>(options: {
    contract: ThirdwebContract<abi>;
    data: ox__Hex.Hex;
}): Promise<unknown>;
//# sourceMappingURL=decodeFunctionResult.d.ts.map