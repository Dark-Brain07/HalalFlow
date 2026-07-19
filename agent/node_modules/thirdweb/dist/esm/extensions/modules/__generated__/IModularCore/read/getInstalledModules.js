import { decodeAbiParameters } from "viem";
import { readContract } from "../../../../../transaction/read-contract.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
export const FN_SELECTOR = "0x3e429396";
const FN_INPUTS = [];
const FN_OUTPUTS = [
    {
        components: [
            {
                name: "implementation",
                type: "address",
            },
            {
                components: [
                    {
                        name: "registerInstallationCallback",
                        type: "bool",
                    },
                    {
                        name: "requiredInterfaces",
                        type: "bytes4[]",
                    },
                    {
                        name: "supportedInterfaces",
                        type: "bytes4[]",
                    },
                    {
                        components: [
                            {
                                name: "selector",
                                type: "bytes4",
                            },
                        ],
                        name: "callbackFunctions",
                        type: "tuple[]",
                    },
                    {
                        components: [
                            {
                                name: "selector",
                                type: "bytes4",
                            },
                            {
                                name: "permissionBits",
                                type: "uint256",
                            },
                        ],
                        name: "fallbackFunctions",
                        type: "tuple[]",
                    },
                ],
                name: "config",
                type: "tuple",
            },
        ],
        type: "tuple[]",
    },
];
/**
 * Checks if the `getInstalledModules` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getInstalledModules` method is supported.
 * @extension MODULES
 * @example
 * ```ts
 * import { isGetInstalledModulesSupported } from "thirdweb/extensions/modules";
 * const supported = isGetInstalledModulesSupported(["0x..."]);
 * ```
 */
export function isGetInstalledModulesSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Decodes the result of the getInstalledModules function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension MODULES
 * @example
 * ```ts
 * import { decodeGetInstalledModulesResult } from "thirdweb/extensions/modules";
 * const result = decodeGetInstalledModulesResultResult("...");
 * ```
 */
export function decodeGetInstalledModulesResult(result) {
    return decodeAbiParameters(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "getInstalledModules" function on the contract.
 * @param options - The options for the getInstalledModules function.
 * @returns The parsed result of the function call.
 * @extension MODULES
 * @example
 * ```ts
 * import { getInstalledModules } from "thirdweb/extensions/modules";
 *
 * const result = await getInstalledModules({
 *  contract,
 * });
 *
 * ```
 */
export async function getInstalledModules(options) {
    return readContract({
        contract: options.contract,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [],
    });
}
//# sourceMappingURL=getInstalledModules.js.map