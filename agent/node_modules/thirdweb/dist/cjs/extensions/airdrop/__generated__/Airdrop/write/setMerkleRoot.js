"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isSetMerkleRootSupported = isSetMerkleRootSupported;
exports.encodeSetMerkleRootParams = encodeSetMerkleRootParams;
exports.encodeSetMerkleRoot = encodeSetMerkleRoot;
exports.setMerkleRoot = setMerkleRoot;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x8259a87b";
const FN_INPUTS = [
    {
        name: "_token",
        type: "address",
    },
    {
        name: "_tokenMerkleRoot",
        type: "bytes32",
    },
    {
        name: "_resetClaimStatus",
        type: "bool",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `setMerkleRoot` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `setMerkleRoot` method is supported.
 * @extension AIRDROP
 * @example
 * ```ts
 * import { isSetMerkleRootSupported } from "thirdweb/extensions/airdrop";
 *
 * const supported = isSetMerkleRootSupported(["0x..."]);
 * ```
 */
function isSetMerkleRootSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "setMerkleRoot" function.
 * @param options - The options for the setMerkleRoot function.
 * @returns The encoded ABI parameters.
 * @extension AIRDROP
 * @example
 * ```ts
 * import { encodeSetMerkleRootParams } from "thirdweb/extensions/airdrop";
 * const result = encodeSetMerkleRootParams({
 *  token: ...,
 *  tokenMerkleRoot: ...,
 *  resetClaimStatus: ...,
 * });
 * ```
 */
function encodeSetMerkleRootParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.token,
        options.tokenMerkleRoot,
        options.resetClaimStatus,
    ]);
}
/**
 * Encodes the "setMerkleRoot" function into a Hex string with its parameters.
 * @param options - The options for the setMerkleRoot function.
 * @returns The encoded hexadecimal string.
 * @extension AIRDROP
 * @example
 * ```ts
 * import { encodeSetMerkleRoot } from "thirdweb/extensions/airdrop";
 * const result = encodeSetMerkleRoot({
 *  token: ...,
 *  tokenMerkleRoot: ...,
 *  resetClaimStatus: ...,
 * });
 * ```
 */
function encodeSetMerkleRoot(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeSetMerkleRootParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "setMerkleRoot" function on the contract.
 * @param options - The options for the "setMerkleRoot" function.
 * @returns A prepared transaction object.
 * @extension AIRDROP
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { setMerkleRoot } from "thirdweb/extensions/airdrop";
 *
 * const transaction = setMerkleRoot({
 *  contract,
 *  token: ...,
 *  tokenMerkleRoot: ...,
 *  resetClaimStatus: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function setMerkleRoot(options) {
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
                resolvedOptions.tokenMerkleRoot,
                resolvedOptions.resetClaimStatus,
            ];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=setMerkleRoot.js.map