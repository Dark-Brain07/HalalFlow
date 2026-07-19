"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isGetPoolRouterSupported = isGetPoolRouterSupported;
exports.decodeGetPoolRouterResult = decodeGetPoolRouterResult;
exports.getPoolRouter = getPoolRouter;
const viem_1 = require("viem");
const read_contract_js_1 = require("../../../../../transaction/read-contract.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0x824f512c";
const FN_INPUTS = [];
const FN_OUTPUTS = [
    {
        type: "address",
        name: "poolRouter",
    },
];
/**
 * Checks if the `getPoolRouter` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getPoolRouter` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isGetPoolRouterSupported } from "thirdweb/extensions/tokens";
 * const supported = isGetPoolRouterSupported(["0x..."]);
 * ```
 */
function isGetPoolRouterSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Decodes the result of the getPoolRouter function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeGetPoolRouterResult } from "thirdweb/extensions/tokens";
 * const result = decodeGetPoolRouterResultResult("...");
 * ```
 */
function decodeGetPoolRouterResult(result) {
    return (0, viem_1.decodeAbiParameters)(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "getPoolRouter" function on the contract.
 * @param options - The options for the getPoolRouter function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getPoolRouter } from "thirdweb/extensions/tokens";
 *
 * const result = await getPoolRouter({
 *  contract,
 * });
 *
 * ```
 */
async function getPoolRouter(options) {
    return (0, read_contract_js_1.readContract)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [],
    });
}
//# sourceMappingURL=getPoolRouter.js.map