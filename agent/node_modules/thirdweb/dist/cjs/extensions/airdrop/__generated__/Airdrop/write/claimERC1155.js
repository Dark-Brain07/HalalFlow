"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isClaimERC1155Supported = isClaimERC1155Supported;
exports.encodeClaimERC1155Params = encodeClaimERC1155Params;
exports.encodeClaimERC1155 = encodeClaimERC1155;
exports.claimERC1155 = claimERC1155;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0xc6fa26ab";
const FN_INPUTS = [
    {
        name: "_token",
        type: "address",
    },
    {
        name: "_receiver",
        type: "address",
    },
    {
        name: "_tokenId",
        type: "uint256",
    },
    {
        name: "_quantity",
        type: "uint256",
    },
    {
        name: "_proofs",
        type: "bytes32[]",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `claimERC1155` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `claimERC1155` method is supported.
 * @extension AIRDROP
 * @example
 * ```ts
 * import { isClaimERC1155Supported } from "thirdweb/extensions/airdrop";
 *
 * const supported = isClaimERC1155Supported(["0x..."]);
 * ```
 */
function isClaimERC1155Supported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "claimERC1155" function.
 * @param options - The options for the claimERC1155 function.
 * @returns The encoded ABI parameters.
 * @extension AIRDROP
 * @example
 * ```ts
 * import { encodeClaimERC1155Params } from "thirdweb/extensions/airdrop";
 * const result = encodeClaimERC1155Params({
 *  token: ...,
 *  receiver: ...,
 *  tokenId: ...,
 *  quantity: ...,
 *  proofs: ...,
 * });
 * ```
 */
function encodeClaimERC1155Params(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.token,
        options.receiver,
        options.tokenId,
        options.quantity,
        options.proofs,
    ]);
}
/**
 * Encodes the "claimERC1155" function into a Hex string with its parameters.
 * @param options - The options for the claimERC1155 function.
 * @returns The encoded hexadecimal string.
 * @extension AIRDROP
 * @example
 * ```ts
 * import { encodeClaimERC1155 } from "thirdweb/extensions/airdrop";
 * const result = encodeClaimERC1155({
 *  token: ...,
 *  receiver: ...,
 *  tokenId: ...,
 *  quantity: ...,
 *  proofs: ...,
 * });
 * ```
 */
function encodeClaimERC1155(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeClaimERC1155Params(options).slice(2));
}
/**
 * Prepares a transaction to call the "claimERC1155" function on the contract.
 * @param options - The options for the "claimERC1155" function.
 * @returns A prepared transaction object.
 * @extension AIRDROP
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { claimERC1155 } from "thirdweb/extensions/airdrop";
 *
 * const transaction = claimERC1155({
 *  contract,
 *  token: ...,
 *  receiver: ...,
 *  tokenId: ...,
 *  quantity: ...,
 *  proofs: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function claimERC1155(options) {
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
            return [
                resolvedOptions.token,
                resolvedOptions.receiver,
                resolvedOptions.tokenId,
                resolvedOptions.quantity,
                resolvedOptions.proofs,
            ];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=claimERC1155.js.map