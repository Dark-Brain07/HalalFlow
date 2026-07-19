"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isVerifySupported = isVerifySupported;
exports.encodeVerifyParams = encodeVerifyParams;
exports.encodeVerify = encodeVerify;
exports.decodeVerifyResult = decodeVerifyResult;
exports.verify = verify;
const viem_1 = require("viem");
const read_contract_js_1 = require("../../../../../transaction/read-contract.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0xb17cd86f";
const FN_INPUTS = [
    {
        components: [
            {
                name: "to",
                type: "address",
            },
            {
                name: "royaltyRecipient",
                type: "address",
            },
            {
                name: "royaltyBps",
                type: "uint256",
            },
            {
                name: "primarySaleRecipient",
                type: "address",
            },
            {
                name: "tokenId",
                type: "uint256",
            },
            {
                name: "uri",
                type: "string",
            },
            {
                name: "quantity",
                type: "uint256",
            },
            {
                name: "pricePerToken",
                type: "uint256",
            },
            {
                name: "currency",
                type: "address",
            },
            {
                name: "validityStartTimestamp",
                type: "uint128",
            },
            {
                name: "validityEndTimestamp",
                type: "uint128",
            },
            {
                name: "uid",
                type: "bytes32",
            },
        ],
        name: "req",
        type: "tuple",
    },
    {
        name: "signature",
        type: "bytes",
    },
];
const FN_OUTPUTS = [
    {
        name: "success",
        type: "bool",
    },
    {
        name: "signer",
        type: "address",
    },
];
/**
 * Checks if the `verify` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `verify` method is supported.
 * @extension ERC1155
 * @example
 * ```ts
 * import { isVerifySupported } from "thirdweb/extensions/erc1155";
 * const supported = isVerifySupported(["0x..."]);
 * ```
 */
function isVerifySupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "verify" function.
 * @param options - The options for the verify function.
 * @returns The encoded ABI parameters.
 * @extension ERC1155
 * @example
 * ```ts
 * import { encodeVerifyParams } from "thirdweb/extensions/erc1155";
 * const result = encodeVerifyParams({
 *  req: ...,
 *  signature: ...,
 * });
 * ```
 */
function encodeVerifyParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.req, options.signature]);
}
/**
 * Encodes the "verify" function into a Hex string with its parameters.
 * @param options - The options for the verify function.
 * @returns The encoded hexadecimal string.
 * @extension ERC1155
 * @example
 * ```ts
 * import { encodeVerify } from "thirdweb/extensions/erc1155";
 * const result = encodeVerify({
 *  req: ...,
 *  signature: ...,
 * });
 * ```
 */
function encodeVerify(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeVerifyParams(options).slice(2));
}
/**
 * Decodes the result of the verify function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension ERC1155
 * @example
 * ```ts
 * import { decodeVerifyResult } from "thirdweb/extensions/erc1155";
 * const result = decodeVerifyResultResult("...");
 * ```
 */
function decodeVerifyResult(result) {
    return (0, viem_1.decodeAbiParameters)(FN_OUTPUTS, result);
}
/**
 * Calls the "verify" function on the contract.
 * @param options - The options for the verify function.
 * @returns The parsed result of the function call.
 * @extension ERC1155
 * @example
 * ```ts
 * import { verify } from "thirdweb/extensions/erc1155";
 *
 * const result = await verify({
 *  contract,
 *  req: ...,
 *  signature: ...,
 * });
 *
 * ```
 */
async function verify(options) {
    return (0, read_contract_js_1.readContract)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [options.req, options.signature],
    });
}
//# sourceMappingURL=verify.js.map