import * as ox__AbiFunction from "ox/AbiFunction";
import { resolveContractAbi } from "../../contract/actions/resolve-abi.js";
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
export async function decodeFunctionResult(options) {
    const { contract, ...rest } = options;
    let abi = contract?.abi;
    if (contract && !abi) {
        abi = await resolveContractAbi(contract).catch(() => undefined);
    }
    if (!abi) {
        throw new Error(`No ABI found for contract ${contract.address} on chain ${contract.chain.id}`);
    }
    const fn = abi.filter((i) => i.type === "function" &&
        ox__AbiFunction.getSelector(i) === rest.data.slice(0, 10));
    const abiFunction = fn[0];
    if (!abiFunction) {
        throw new Error(`No ABI function found for selector ${rest.data.slice(0, 10)}`);
    }
    return ox__AbiFunction.decodeResult(abiFunction, rest.data);
}
//# sourceMappingURL=decodeFunctionResult.js.map