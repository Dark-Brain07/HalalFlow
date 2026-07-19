"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isAggregate3ValueSupported = isAggregate3ValueSupported;
exports.encodeAggregate3ValueParams = encodeAggregate3ValueParams;
exports.encodeAggregate3Value = encodeAggregate3Value;
exports.aggregate3Value = aggregate3Value;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x174dea71";
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
                name: "value",
                type: "uint256",
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
 * Checks if the `aggregate3Value` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `aggregate3Value` method is supported.
 * @extension MULTICALL3
 * @example
 * ```ts
 * import { isAggregate3ValueSupported } from "thirdweb/extensions/multicall3";
 *
 * const supported = isAggregate3ValueSupported(["0x..."]);
 * ```
 */
function isAggregate3ValueSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "aggregate3Value" function.
 * @param options - The options for the aggregate3Value function.
 * @returns The encoded ABI parameters.
 * @extension MULTICALL3
 * @example
 * ```ts
 * import { encodeAggregate3ValueParams } from "thirdweb/extensions/multicall3";
 * const result = encodeAggregate3ValueParams({
 *  calls: ...,
 * });
 * ```
 */
function encodeAggregate3ValueParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.calls]);
}
/**
 * Encodes the "aggregate3Value" function into a Hex string with its parameters.
 * @param options - The options for the aggregate3Value function.
 * @returns The encoded hexadecimal string.
 * @extension MULTICALL3
 * @example
 * ```ts
 * import { encodeAggregate3Value } from "thirdweb/extensions/multicall3";
 * const result = encodeAggregate3Value({
 *  calls: ...,
 * });
 * ```
 */
function encodeAggregate3Value(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeAggregate3ValueParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "aggregate3Value" function on the contract.
 * @param options - The options for the "aggregate3Value" function.
 * @returns A prepared transaction object.
 * @extension MULTICALL3
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { aggregate3Value } from "thirdweb/extensions/multicall3";
 *
 * const transaction = aggregate3Value({
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
function aggregate3Value(options) {
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
//# sourceMappingURL=aggregate3Value.js.map