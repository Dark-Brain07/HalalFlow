"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isAirdropERC20WithSignatureSupported = isAirdropERC20WithSignatureSupported;
exports.encodeAirdropERC20WithSignatureParams = encodeAirdropERC20WithSignatureParams;
exports.encodeAirdropERC20WithSignature = encodeAirdropERC20WithSignature;
exports.airdropERC20WithSignature = airdropERC20WithSignature;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0xaaba07f6";
const FN_INPUTS = [
    {
        components: [
            {
                name: "uid",
                type: "bytes32",
            },
            {
                name: "tokenAddress",
                type: "address",
            },
            {
                name: "expirationTimestamp",
                type: "uint256",
            },
            {
                components: [
                    {
                        name: "recipient",
                        type: "address",
                    },
                    {
                        name: "amount",
                        type: "uint256",
                    },
                ],
                name: "contents",
                type: "tuple[]",
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
const FN_OUTPUTS = [];
/**
 * Checks if the `airdropERC20WithSignature` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `airdropERC20WithSignature` method is supported.
 * @extension AIRDROP
 * @example
 * ```ts
 * import { isAirdropERC20WithSignatureSupported } from "thirdweb/extensions/airdrop";
 *
 * const supported = isAirdropERC20WithSignatureSupported(["0x..."]);
 * ```
 */
function isAirdropERC20WithSignatureSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "airdropERC20WithSignature" function.
 * @param options - The options for the airdropERC20WithSignature function.
 * @returns The encoded ABI parameters.
 * @extension AIRDROP
 * @example
 * ```ts
 * import { encodeAirdropERC20WithSignatureParams } from "thirdweb/extensions/airdrop";
 * const result = encodeAirdropERC20WithSignatureParams({
 *  req: ...,
 *  signature: ...,
 * });
 * ```
 */
function encodeAirdropERC20WithSignatureParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.req, options.signature]);
}
/**
 * Encodes the "airdropERC20WithSignature" function into a Hex string with its parameters.
 * @param options - The options for the airdropERC20WithSignature function.
 * @returns The encoded hexadecimal string.
 * @extension AIRDROP
 * @example
 * ```ts
 * import { encodeAirdropERC20WithSignature } from "thirdweb/extensions/airdrop";
 * const result = encodeAirdropERC20WithSignature({
 *  req: ...,
 *  signature: ...,
 * });
 * ```
 */
function encodeAirdropERC20WithSignature(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeAirdropERC20WithSignatureParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "airdropERC20WithSignature" function on the contract.
 * @param options - The options for the "airdropERC20WithSignature" function.
 * @returns A prepared transaction object.
 * @extension AIRDROP
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { airdropERC20WithSignature } from "thirdweb/extensions/airdrop";
 *
 * const transaction = airdropERC20WithSignature({
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
function airdropERC20WithSignature(options) {
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
//# sourceMappingURL=airdropERC20WithSignature.js.map