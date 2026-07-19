"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isMintSupported = isMintSupported;
exports.encodeMintParams = encodeMintParams;
exports.encodeMint = encodeMint;
exports.mint = mint;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0xd2b04fd6";
const FN_INPUTS = [
    {
        name: "to",
        type: "address",
    },
    {
        name: "amount",
        type: "uint256",
    },
    {
        name: "baseURI",
        type: "string",
    },
    {
        name: "data",
        type: "bytes",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `mint` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `mint` method is supported.
 * @modules ERC721Core
 * @example
 * ```ts
 * import { ERC721Core } from "thirdweb/modules";
 *
 * const supported = ERC721Core.isMintSupported(["0x..."]);
 * ```
 */
function isMintSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "mint" function.
 * @param options - The options for the mint function.
 * @returns The encoded ABI parameters.
 * @modules ERC721Core
 * @example
 * ```ts
 * import { ERC721Core } from "thirdweb/modules";
 * const result = ERC721Core.encodeMintParams({
 *  to: ...,
 *  amount: ...,
 *  baseURI: ...,
 *  data: ...,
 * });
 * ```
 */
function encodeMintParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.to,
        options.amount,
        options.baseURI,
        options.data,
    ]);
}
/**
 * Encodes the "mint" function into a Hex string with its parameters.
 * @param options - The options for the mint function.
 * @returns The encoded hexadecimal string.
 * @modules ERC721Core
 * @example
 * ```ts
 * import { ERC721Core } from "thirdweb/modules";
 * const result = ERC721Core.encodeMint({
 *  to: ...,
 *  amount: ...,
 *  baseURI: ...,
 *  data: ...,
 * });
 * ```
 */
function encodeMint(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeMintParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "mint" function on the contract.
 * @param options - The options for the "mint" function.
 * @returns A prepared transaction object.
 * @modules ERC721Core
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { ERC721Core } from "thirdweb/modules";
 *
 * const transaction = ERC721Core.mint({
 *  contract,
 *  to: ...,
 *  amount: ...,
 *  baseURI: ...,
 *  data: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function mint(options) {
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
                resolvedOptions.to,
                resolvedOptions.amount,
                resolvedOptions.baseURI,
                resolvedOptions.data,
            ];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=mint.js.map