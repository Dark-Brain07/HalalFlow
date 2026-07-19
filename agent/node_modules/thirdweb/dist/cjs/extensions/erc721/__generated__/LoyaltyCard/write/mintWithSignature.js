"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isMintWithSignatureSupported = isMintWithSignatureSupported;
exports.encodeMintWithSignatureParams = encodeMintWithSignatureParams;
exports.encodeMintWithSignature = encodeMintWithSignature;
exports.mintWithSignature = mintWithSignature;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x91c5ee92";
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
                name: "uri",
                type: "string",
            },
        ],
        name: "_req",
        type: "tuple",
    },
    {
        name: "_signature",
        type: "bytes",
    },
];
const FN_OUTPUTS = [
    {
        name: "signer",
        type: "address",
    },
];
/**
 * Checks if the `mintWithSignature` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `mintWithSignature` method is supported.
 * @extension ERC721
 * @example
 * ```ts
 * import { isMintWithSignatureSupported } from "thirdweb/extensions/erc721";
 *
 * const supported = isMintWithSignatureSupported(["0x..."]);
 * ```
 */
function isMintWithSignatureSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "mintWithSignature" function.
 * @param options - The options for the mintWithSignature function.
 * @returns The encoded ABI parameters.
 * @extension ERC721
 * @example
 * ```ts
 * import { encodeMintWithSignatureParams } from "thirdweb/extensions/erc721";
 * const result = encodeMintWithSignatureParams({
 *  req: ...,
 *  signature: ...,
 * });
 * ```
 */
function encodeMintWithSignatureParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.req, options.signature]);
}
/**
 * Encodes the "mintWithSignature" function into a Hex string with its parameters.
 * @param options - The options for the mintWithSignature function.
 * @returns The encoded hexadecimal string.
 * @extension ERC721
 * @example
 * ```ts
 * import { encodeMintWithSignature } from "thirdweb/extensions/erc721";
 * const result = encodeMintWithSignature({
 *  req: ...,
 *  signature: ...,
 * });
 * ```
 */
function encodeMintWithSignature(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeMintWithSignatureParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "mintWithSignature" function on the contract.
 * @param options - The options for the "mintWithSignature" function.
 * @returns A prepared transaction object.
 * @extension ERC721
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { mintWithSignature } from "thirdweb/extensions/erc721";
 *
 * const transaction = mintWithSignature({
 *  contract,
 *  req: ...,
 *  signature: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function mintWithSignature(options) {
    const asyncOptions = (0, once_js_1.once)(async () => {
        return "asyncParams" in options ? await options.asyncParams() : options;
    });
    return (0, prepare_contract_call_js_1.prepareContractCall)({
        accessList: async () => (await asyncOptions()).overrides?.accessList,
        authorizationList: async () => (await asyncOptions()).overrides?.authorizationList,
        contract: options.contract,
        erc20Value: async () => (await asyncOptions()).overrides?.erc20Value,
        extraGas: async () => (await asyncOptions()).overrides?.extraGas,
        gas: async () => (await asyncOptions()).overrides?.gas,
        gasPrice: async () => (await asyncOptions()).overrides?.gasPrice,
        maxFeePerGas: async () => (await asyncOptions()).overrides?.maxFeePerGas,
        maxPriorityFeePerGas: async () => (await asyncOptions()).overrides?.maxPriorityFeePerGas,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        nonce: async () => (await asyncOptions()).overrides?.nonce,
        params: async () => {
            const resolvedOptions = await asyncOptions();
            return [resolvedOptions.req, resolvedOptions.signature];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=mintWithSignature.js.map