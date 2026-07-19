"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isBlockAndAggregateSupported = isBlockAndAggregateSupported;
exports.encodeBlockAndAggregateParams = encodeBlockAndAggregateParams;
exports.encodeBlockAndAggregate = encodeBlockAndAggregate;
exports.blockAndAggregate = blockAndAggregate;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0xc3077fa9";
const FN_INPUTS = [
    {
        components: [
            {
                name: "target",
                type: "address",
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
        name: "blockNumber",
        type: "uint256",
    },
    {
        name: "blockHash",
        type: "bytes32",
    },
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
 * Checks if the `blockAndAggregate` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `blockAndAggregate` method is supported.
 * @extension MULTICALL3
 * @example
 * ```ts
 * import { isBlockAndAggregateSupported } from "thirdweb/extensions/multicall3";
 *
 * const supported = isBlockAndAggregateSupported(["0x..."]);
 * ```
 */
function isBlockAndAggregateSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "blockAndAggregate" function.
 * @param options - The options for the blockAndAggregate function.
 * @returns The encoded ABI parameters.
 * @extension MULTICALL3
 * @example
 * ```ts
 * import { encodeBlockAndAggregateParams } from "thirdweb/extensions/multicall3";
 * const result = encodeBlockAndAggregateParams({
 *  calls: ...,
 * });
 * ```
 */
function encodeBlockAndAggregateParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.calls]);
}
/**
 * Encodes the "blockAndAggregate" function into a Hex string with its parameters.
 * @param options - The options for the blockAndAggregate function.
 * @returns The encoded hexadecimal string.
 * @extension MULTICALL3
 * @example
 * ```ts
 * import { encodeBlockAndAggregate } from "thirdweb/extensions/multicall3";
 * const result = encodeBlockAndAggregate({
 *  calls: ...,
 * });
 * ```
 */
function encodeBlockAndAggregate(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeBlockAndAggregateParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "blockAndAggregate" function on the contract.
 * @param options - The options for the "blockAndAggregate" function.
 * @returns A prepared transaction object.
 * @extension MULTICALL3
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { blockAndAggregate } from "thirdweb/extensions/multicall3";
 *
 * const transaction = blockAndAggregate({
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
function blockAndAggregate(options) {
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
//# sourceMappingURL=blockAndAggregate.js.map