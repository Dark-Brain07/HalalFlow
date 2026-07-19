"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isCreatePoolSupported = isCreatePoolSupported;
exports.encodeCreatePoolParams = encodeCreatePoolParams;
exports.encodeCreatePool = encodeCreatePool;
exports.createPool = createPool;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x91fe5f8c";
const FN_INPUTS = [
    {
        type: "tuple",
        name: "createPoolConfig",
        components: [
            {
                type: "address",
                name: "recipient",
            },
            {
                type: "address",
                name: "developer",
            },
            {
                type: "uint16",
                name: "developerBps",
            },
            {
                type: "address",
                name: "token",
            },
            {
                type: "address",
                name: "tokenPair",
            },
            {
                type: "uint256",
                name: "amount",
            },
            {
                type: "uint256",
                name: "amountPair",
            },
            {
                type: "bytes",
                name: "data",
            },
        ],
    },
];
const FN_OUTPUTS = [
    {
        type: "tuple",
        name: "result",
        components: [
            {
                type: "address",
                name: "pool",
            },
            {
                type: "address",
                name: "positionManager",
            },
            {
                type: "uint256",
                name: "positionId",
            },
            {
                type: "address",
                name: "refundToken0",
            },
            {
                type: "uint256",
                name: "refundAmount0",
            },
            {
                type: "address",
                name: "refundToken1",
            },
            {
                type: "uint256",
                name: "refundAmount1",
            },
        ],
    },
];
/**
 * Checks if the `createPool` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `createPool` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isCreatePoolSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isCreatePoolSupported(["0x..."]);
 * ```
 */
function isCreatePoolSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "createPool" function.
 * @param options - The options for the createPool function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeCreatePoolParams } from "thirdweb/extensions/tokens";
 * const result = encodeCreatePoolParams({
 *  createPoolConfig: ...,
 * });
 * ```
 */
function encodeCreatePoolParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.createPoolConfig]);
}
/**
 * Encodes the "createPool" function into a Hex string with its parameters.
 * @param options - The options for the createPool function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeCreatePool } from "thirdweb/extensions/tokens";
 * const result = encodeCreatePool({
 *  createPoolConfig: ...,
 * });
 * ```
 */
function encodeCreatePool(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeCreatePoolParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "createPool" function on the contract.
 * @param options - The options for the "createPool" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { createPool } from "thirdweb/extensions/tokens";
 *
 * const transaction = createPool({
 *  contract,
 *  createPoolConfig: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function createPool(options) {
    const asyncOptions = (0, once_js_1.once)(async () => {
        return "asyncParams" in options ? await options.asyncParams() : options;
    });
    return (0, prepare_contract_call_js_1.prepareContractCall)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: async () => {
            const resolvedOptions = await asyncOptions();
            return [resolvedOptions.createPoolConfig];
        },
        value: async () => (await asyncOptions()).overrides?.value,
        accessList: async () => (await asyncOptions()).overrides?.accessList,
        gas: async () => (await asyncOptions()).overrides?.gas,
        gasPrice: async () => (await asyncOptions()).overrides?.gasPrice,
        maxFeePerGas: async () => (await asyncOptions()).overrides?.maxFeePerGas,
        maxPriorityFeePerGas: async () => (await asyncOptions()).overrides?.maxPriorityFeePerGas,
        nonce: async () => (await asyncOptions()).overrides?.nonce,
        extraGas: async () => (await asyncOptions()).overrides?.extraGas,
        erc20Value: async () => (await asyncOptions()).overrides?.erc20Value,
        authorizationList: async () => (await asyncOptions()).overrides?.authorizationList,
    });
}
//# sourceMappingURL=createPool.js.map