import type * as ox__Abi from "ox/Abi";
import type * as ox__Hex from "ox/Hex";
import type { ThirdwebContract } from "../../contract/contract.js";
/**
 * Decodes the data of a function call.
 * @param options - The options object.
 * @returns The decoded data.
 * @example
 * ```ts
 * import { decodeFunctionData } from "thirdweb/utils";
 *
 * const data = "0x...";
 * const decodedData = await decodeFunctionData({ contract, data });
 * ```
 *
 * @utils
 */
export declare function decodeFunctionData<abi extends ox__Abi.Abi>(options: {
    contract: ThirdwebContract<abi>;
    data: ox__Hex.Hex;
}): Promise<unknown>;
//# sourceMappingURL=decodeFunctionData.d.ts.map