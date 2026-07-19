"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isGetTransferPoliciesForSignerSupported = isGetTransferPoliciesForSignerSupported;
exports.encodeGetTransferPoliciesForSignerParams = encodeGetTransferPoliciesForSignerParams;
exports.encodeGetTransferPoliciesForSigner = encodeGetTransferPoliciesForSigner;
exports.decodeGetTransferPoliciesForSignerResult = decodeGetTransferPoliciesForSignerResult;
exports.getTransferPoliciesForSigner = getTransferPoliciesForSigner;
const viem_1 = require("viem");
const read_contract_js_1 = require("../../../../../transaction/read-contract.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0xed6ed279";
const FN_INPUTS = [
    {
        type: "address",
        name: "signer",
    },
];
const FN_OUTPUTS = [
    {
        type: "tuple[]",
        components: [
            {
                type: "address",
                name: "target",
            },
            {
                type: "uint256",
                name: "maxValuePerUse",
            },
            {
                type: "tuple",
                name: "valueLimit",
                components: [
                    {
                        type: "uint8",
                        name: "limitType",
                    },
                    {
                        type: "uint256",
                        name: "limit",
                    },
                    {
                        type: "uint256",
                        name: "period",
                    },
                ],
            },
        ],
    },
];
/**
 * Checks if the `getTransferPoliciesForSigner` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getTransferPoliciesForSigner` method is supported.
 * @extension ERC7702
 * @example
 * ```ts
 * import { isGetTransferPoliciesForSignerSupported } from "thirdweb/extensions/erc7702";
 * const supported = isGetTransferPoliciesForSignerSupported(["0x..."]);
 * ```
 */
function isGetTransferPoliciesForSignerSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "getTransferPoliciesForSigner" function.
 * @param options - The options for the getTransferPoliciesForSigner function.
 * @returns The encoded ABI parameters.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeGetTransferPoliciesForSignerParams } from "thirdweb/extensions/erc7702";
 * const result = encodeGetTransferPoliciesForSignerParams({
 *  signer: ...,
 * });
 * ```
 */
function encodeGetTransferPoliciesForSignerParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.signer]);
}
/**
 * Encodes the "getTransferPoliciesForSigner" function into a Hex string with its parameters.
 * @param options - The options for the getTransferPoliciesForSigner function.
 * @returns The encoded hexadecimal string.
 * @extension ERC7702
 * @example
 * ```ts
 * import { encodeGetTransferPoliciesForSigner } from "thirdweb/extensions/erc7702";
 * const result = encodeGetTransferPoliciesForSigner({
 *  signer: ...,
 * });
 * ```
 */
function encodeGetTransferPoliciesForSigner(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeGetTransferPoliciesForSignerParams(options).slice(2));
}
/**
 * Decodes the result of the getTransferPoliciesForSigner function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension ERC7702
 * @example
 * ```ts
 * import { decodeGetTransferPoliciesForSignerResult } from "thirdweb/extensions/erc7702";
 * const result = decodeGetTransferPoliciesForSignerResultResult("...");
 * ```
 */
function decodeGetTransferPoliciesForSignerResult(result) {
    return (0, viem_1.decodeAbiParameters)(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "getTransferPoliciesForSigner" function on the contract.
 * @param options - The options for the getTransferPoliciesForSigner function.
 * @returns The parsed result of the function call.
 * @extension ERC7702
 * @example
 * ```ts
 * import { getTransferPoliciesForSigner } from "thirdweb/extensions/erc7702";
 *
 * const result = await getTransferPoliciesForSigner({
 *  contract,
 *  signer: ...,
 * });
 *
 * ```
 */
async function getTransferPoliciesForSigner(options) {
    return (0, read_contract_js_1.readContract)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.signer],
    });
}
//# sourceMappingURL=getTransferPoliciesForSigner.js.map