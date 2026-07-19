"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isAggregate3Supported = isAggregate3Supported;
exports.encodeAggregate3Params = encodeAggregate3Params;
exports.encodeAggregate3 = encodeAggregate3;
exports.aggregate3 = aggregate3;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x82ad56cb";
const FN_INPUTS = [
    {
        components: [
            {
                name: "target",
                type: "address",
            },
            {
                name: "allowFailure",
                type: "bool",
            },
            {
                name: "callData",
                type: "bytes",
            },
        ],
        name: "calls",
        type: "tuple[]",
    },
];
const FN_OUTPUTS = [
    {
        components: [
            {
                name: "success",
                type: "bool",
            },
            {
                name: "returnData",
                type: "bytes",
            },
        ],
        name: "returnData",
        type: "tuple[]",
    },
];
/**
 * Checks if the `aggregate3` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `aggregate3` method is supported.
 * @extension MULTICALL3
 * @example
 * ```ts
 * import { isAggregate3Supported } from "thirdweb/extensions/multicall3";
 *
 * const supported = isAggregate3Supported(["0x..."]);
 * ```
 */
function isAggregate3Supported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "aggregate3" function.
 * @param options - The options for the aggregate3 function.
 * @returns The encoded ABI parameters.
 * @extension MULTICALL3
 * @example
 * ```ts
 * import { encodeAggregate3Params } from "thirdweb/extensions/multicall3";
 * const result = encodeAggregate3Params({
 *  calls: ...,
 * });
 * ```
 */
function encodeAggregate3Params(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.calls]);
}
/**
 * Encodes the "aggregate3" function into a Hex string with its parameters.
 * @param options - The options for the aggregate3 function.
 * @returns The encoded hexadecimal string.
 * @extension MULTICALL3
 * @example
 * ```ts
 * import { encodeAggregate3 } from "thirdweb/extensions/multicall3";
 * const result = encodeAggregate3({
 *  calls: ...,
 * });
 * ```
 */
function encodeAggregate3(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeAggregate3Params(options).slice(2));
}
/**
 * Prepares a transaction to call the "aggregate3" function on the contract.
 * @param options - The options for the "aggregate3" function.
 * @returns A prepared transaction object.
 * @extension MULTICALL3
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { aggregate3 } from "thirdweb/extensions/multicall3";
 *
 * const transaction = aggregate3({
 *  contract,
 *  calls: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function aggregate3(options) {
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
            return [resolvedOptions.calls];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=aggregate3.js.map