"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isUnwrapSupported = isUnwrapSupported;
exports.encodeUnwrapParams = encodeUnwrapParams;
exports.encodeUnwrap = encodeUnwrap;
exports.unwrap = unwrap;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x7647691d";
const FN_INPUTS = [
    {
        name: "_tokenId",
        type: "uint256",
    },
    {
        name: "_recipient",
        type: "address",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `unwrap` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `unwrap` method is supported.
 * @extension ERC721
 * @example
 * ```ts
 * import { isUnwrapSupported } from "thirdweb/extensions/erc721";
 *
 * const supported = isUnwrapSupported(["0x..."]);
 * ```
 */
function isUnwrapSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "unwrap" function.
 * @param options - The options for the unwrap function.
 * @returns The encoded ABI parameters.
 * @extension ERC721
 * @example
 * ```ts
 * import { encodeUnwrapParams } from "thirdweb/extensions/erc721";
 * const result = encodeUnwrapParams({
 *  tokenId: ...,
 *  recipient: ...,
 * });
 * ```
 */
function encodeUnwrapParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.tokenId, options.recipient]);
}
/**
 * Encodes the "unwrap" function into a Hex string with its parameters.
 * @param options - The options for the unwrap function.
 * @returns The encoded hexadecimal string.
 * @extension ERC721
 * @example
 * ```ts
 * import { encodeUnwrap } from "thirdweb/extensions/erc721";
 * const result = encodeUnwrap({
 *  tokenId: ...,
 *  recipient: ...,
 * });
 * ```
 */
function encodeUnwrap(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeUnwrapParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "unwrap" function on the contract.
 * @param options - The options for the "unwrap" function.
 * @returns A prepared transaction object.
 * @extension ERC721
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { unwrap } from "thirdweb/extensions/erc721";
 *
 * const transaction = unwrap({
 *  contract,
 *  tokenId: ...,
 *  recipient: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function unwrap(options) {
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
            return [resolvedOptions.tokenId, resolvedOptions.recipient];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=unwrap.js.map