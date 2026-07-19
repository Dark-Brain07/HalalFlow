"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isQuoteExactInputSingleSupported = isQuoteExactInputSingleSupported;
exports.encodeQuoteExactInputSingleParams = encodeQuoteExactInputSingleParams;
exports.encodeQuoteExactInputSingle = encodeQuoteExactInputSingle;
exports.quoteExactInputSingle = quoteExactInputSingle;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0xf7729d43";
const FN_INPUTS = [
    {
        name: "tokenIn",
        type: "address",
    },
    {
        name: "tokenOut",
        type: "address",
    },
    {
        name: "fee",
        type: "uint24",
    },
    {
        name: "amountIn",
        type: "uint256",
    },
    {
        name: "sqrtPriceLimitX96",
        type: "uint160",
    },
];
const FN_OUTPUTS = [
    {
        name: "amountOut",
        type: "uint256",
    },
];
/**
 * Checks if the `quoteExactInputSingle` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `quoteExactInputSingle` method is supported.
 * @extension UNISWAP
 * @example
 * ```ts
 * import { isQuoteExactInputSingleSupported } from "thirdweb/extensions/uniswap";
 *
 * const supported = isQuoteExactInputSingleSupported(["0x..."]);
 * ```
 */
function isQuoteExactInputSingleSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "quoteExactInputSingle" function.
 * @param options - The options for the quoteExactInputSingle function.
 * @returns The encoded ABI parameters.
 * @extension UNISWAP
 * @example
 * ```ts
 * import { encodeQuoteExactInputSingleParams } from "thirdweb/extensions/uniswap";
 * const result = encodeQuoteExactInputSingleParams({
 *  tokenIn: ...,
 *  tokenOut: ...,
 *  fee: ...,
 *  amountIn: ...,
 *  sqrtPriceLimitX96: ...,
 * });
 * ```
 */
function encodeQuoteExactInputSingleParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.tokenIn,
        options.tokenOut,
        options.fee,
        options.amountIn,
        options.sqrtPriceLimitX96,
    ]);
}
/**
 * Encodes the "quoteExactInputSingle" function into a Hex string with its parameters.
 * @param options - The options for the quoteExactInputSingle function.
 * @returns The encoded hexadecimal string.
 * @extension UNISWAP
 * @example
 * ```ts
 * import { encodeQuoteExactInputSingle } from "thirdweb/extensions/uniswap";
 * const result = encodeQuoteExactInputSingle({
 *  tokenIn: ...,
 *  tokenOut: ...,
 *  fee: ...,
 *  amountIn: ...,
 *  sqrtPriceLimitX96: ...,
 * });
 * ```
 */
function encodeQuoteExactInputSingle(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeQuoteExactInputSingleParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "quoteExactInputSingle" function on the contract.
 * @param options - The options for the "quoteExactInputSingle" function.
 * @returns A prepared transaction object.
 * @extension UNISWAP
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { quoteExactInputSingle } from "thirdweb/extensions/uniswap";
 *
 * const transaction = quoteExactInputSingle({
 *  contract,
 *  tokenIn: ...,
 *  tokenOut: ...,
 *  fee: ...,
 *  amountIn: ...,
 *  sqrtPriceLimitX96: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function quoteExactInputSingle(options) {
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
                resolvedOptions.tokenIn,
                resolvedOptions.tokenOut,
                resolvedOptions.fee,
                resolvedOptions.amountIn,
                resolvedOptions.sqrtPriceLimitX96,
            ];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=quoteExactInputSingle.js.map