"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isROLE_FEE_MANAGERSupported = isROLE_FEE_MANAGERSupported;
exports.decodeROLE_FEE_MANAGERResult = decodeROLE_FEE_MANAGERResult;
exports.ROLE_FEE_MANAGER = ROLE_FEE_MANAGER;
const viem_1 = require("viem");
const read_contract_js_1 = require("../../../../../transaction/read-contract.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0x99ba5936";
const FN_INPUTS = [];
const FN_OUTPUTS = [
    {
        type: "uint256",
    },
];
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
function isROLE_FEE_MANAGERSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
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
function decodeROLE_FEE_MANAGERResult(result) {
    return (0, viem_1.decodeAbiParameters)(FN_OUTPUTS, result)[0];
}
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
async function ROLE_FEE_MANAGER(options) {
    return (0, read_contract_js_1.readContract)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [],
    });
}
//# sourceMappingURL=ROLE_FEE_MANAGER.js.map