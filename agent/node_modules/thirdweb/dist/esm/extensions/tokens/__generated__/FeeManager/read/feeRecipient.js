import { decodeAbiParameters } from "viem";
import { readContract } from "../../../../../transaction/read-contract.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
export const FN_SELECTOR = "0x46904840";
const FN_INPUTS = [];
const FN_OUTPUTS = [
    {
        type: "address",
    },
];
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
export function isFeeRecipientSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
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
export function decodeFeeRecipientResult(result) {
    return decodeAbiParameters(FN_OUTPUTS, result)[0];
}
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
export async function feeRecipient(options) {
    return readContract({
        contract: options.contract,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [],
    });
}
//# sourceMappingURL=feeRecipient.js.map