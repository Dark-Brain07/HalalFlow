"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isExecuteFromExecutorSupported = isExecuteFromExecutorSupported;
exports.encodeExecuteFromExecutorParams = encodeExecuteFromExecutorParams;
exports.encodeExecuteFromExecutor = encodeExecuteFromExecutor;
exports.executeFromExecutor = executeFromExecutor;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0xd691c964";
const FN_INPUTS = [
    {
        name: "mode",
        type: "bytes32",
    },
    {
        name: "executionCalldata",
        type: "bytes",
    },
];
const FN_OUTPUTS = [
    {
        name: "returnData",
        type: "bytes[]",
    },
];
/**
 * Checks if the `executeFromExecutor` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `executeFromExecutor` method is supported.
 * @extension ERC7579
 * @example
 * ```ts
 * import { isExecuteFromExecutorSupported } from "thirdweb/extensions/erc7579";
 *
 * const supported = isExecuteFromExecutorSupported(["0x..."]);
 * ```
 */
function isExecuteFromExecutorSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "executeFromExecutor" function.
 * @param options - The options for the executeFromExecutor function.
 * @returns The encoded ABI parameters.
 * @extension ERC7579
 * @example
 * ```ts
 * import { encodeExecuteFromExecutorParams } from "thirdweb/extensions/erc7579";
 * const result = encodeExecuteFromExecutorParams({
 *  mode: ...,
 *  executionCalldata: ...,
 * });
 * ```
 */
function encodeExecuteFromExecutorParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.mode,
        options.executionCalldata,
    ]);
}
/**
 * Encodes the "executeFromExecutor" function into a Hex string with its parameters.
 * @param options - The options for the executeFromExecutor function.
 * @returns The encoded hexadecimal string.
 * @extension ERC7579
 * @example
 * ```ts
 * import { encodeExecuteFromExecutor } from "thirdweb/extensions/erc7579";
 * const result = encodeExecuteFromExecutor({
 *  mode: ...,
 *  executionCalldata: ...,
 * });
 * ```
 */
function encodeExecuteFromExecutor(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeExecuteFromExecutorParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "executeFromExecutor" function on the contract.
 * @param options - The options for the "executeFromExecutor" function.
 * @returns A prepared transaction object.
 * @extension ERC7579
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { executeFromExecutor } from "thirdweb/extensions/erc7579";
 *
 * const transaction = executeFromExecutor({
 *  contract,
 *  mode: ...,
 *  executionCalldata: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function executeFromExecutor(options) {
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
            return [resolvedOptions.mode, resolvedOptions.executionCalldata];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=executeFromExecutor.js.map