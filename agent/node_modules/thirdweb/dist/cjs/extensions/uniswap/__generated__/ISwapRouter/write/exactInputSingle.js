"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isExactInputSingleSupported = isExactInputSingleSupported;
exports.encodeExactInputSingleParams = encodeExactInputSingleParams;
exports.encodeExactInputSingle = encodeExactInputSingle;
exports.exactInputSingle = exactInputSingle;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x414bf389";
const FN_INPUTS = [
    {
        components: [
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
                name: "recipient",
                type: "address",
            },
            {
                name: "deadline",
                type: "uint256",
            },
            {
                name: "amountIn",
                type: "uint256",
            },
            {
                name: "amountOutMinimum",
                type: "uint256",
            },
            {
                name: "sqrtPriceLimitX96",
                type: "uint160",
            },
        ],
        name: "params",
        type: "tuple",
    },
];
const FN_OUTPUTS = [
    {
        name: "amountOut",
        type: "uint256",
    },
];
/**
 * Checks if the `exactInputSingle` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `exactInputSingle` method is supported.
 * @extension UNISWAP
 * @example
 * ```ts
 * import { isExactInputSingleSupported } from "thirdweb/extensions/uniswap";
 *
 * const supported = isExactInputSingleSupported(["0x..."]);
 * ```
 */
function isExactInputSingleSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "exactInputSingle" function.
 * @param options - The options for the exactInputSingle function.
 * @returns The encoded ABI parameters.
 * @extension UNISWAP
 * @example
 * ```ts
 * import { encodeExactInputSingleParams } from "thirdweb/extensions/uniswap";
 * const result = encodeExactInputSingleParams({
 *  params: ...,
 * });
 * ```
 */
function encodeExactInputSingleParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.params]);
}
/**
 * Encodes the "exactInputSingle" function into a Hex string with its parameters.
 * @param options - The options for the exactInputSingle function.
 * @returns The encoded hexadecimal string.
 * @extension UNISWAP
 * @example
 * ```ts
 * import { encodeExactInputSingle } from "thirdweb/extensions/uniswap";
 * const result = encodeExactInputSingle({
 *  params: ...,
 * });
 * ```
 */
function encodeExactInputSingle(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeExactInputSingleParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "exactInputSingle" function on the contract.
 * @param options - The options for the "exactInputSingle" function.
 * @returns A prepared transaction object.
 * @extension UNISWAP
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { exactInputSingle } from "thirdweb/extensions/uniswap";
 *
 * const transaction = exactInputSingle({
 *  contract,
 *  params: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function exactInputSingle(options) {
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
            return [resolvedOptions.params];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=exactInputSingle.js.map