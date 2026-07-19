"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isCreateByIdSupported = isCreateByIdSupported;
exports.encodeCreateByIdParams = encodeCreateByIdParams;
exports.encodeCreateById = encodeCreateById;
exports.createById = createById;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x1889d488";
const FN_INPUTS = [
    {
        type: "bytes32",
        name: "contractId",
    },
    {
        type: "address",
        name: "creator",
    },
    {
        type: "tuple",
        name: "params",
        components: [
            {
                type: "address",
                name: "developer",
            },
            {
                type: "bytes32",
                name: "salt",
            },
            {
                type: "bytes",
                name: "data",
            },
            {
                type: "bytes",
                name: "hookData",
            },
        ],
    },
];
const FN_OUTPUTS = [
    {
        type: "address",
        name: "asset",
    },
];
/**
 * Checks if the `createById` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `createById` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isCreateByIdSupported } from "thirdweb/extensions/tokens";
 *
 * const supported = isCreateByIdSupported(["0x..."]);
 * ```
 */
function isCreateByIdSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "createById" function.
 * @param options - The options for the createById function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeCreateByIdParams } from "thirdweb/extensions/tokens";
 * const result = encodeCreateByIdParams({
 *  contractId: ...,
 *  creator: ...,
 *  params: ...,
 * });
 * ```
 */
function encodeCreateByIdParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.contractId,
        options.creator,
        options.params,
    ]);
}
/**
 * Encodes the "createById" function into a Hex string with its parameters.
 * @param options - The options for the createById function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeCreateById } from "thirdweb/extensions/tokens";
 * const result = encodeCreateById({
 *  contractId: ...,
 *  creator: ...,
 *  params: ...,
 * });
 * ```
 */
function encodeCreateById(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeCreateByIdParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "createById" function on the contract.
 * @param options - The options for the "createById" function.
 * @returns A prepared transaction object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { createById } from "thirdweb/extensions/tokens";
 *
 * const transaction = createById({
 *  contract,
 *  contractId: ...,
 *  creator: ...,
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
function createById(options) {
    const asyncOptions = (0, once_js_1.once)(async () => {
        return "asyncParams" in options ? await options.asyncParams() : options;
    });
    return (0, prepare_contract_call_js_1.prepareContractCall)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: async () => {
            const resolvedOptions = await asyncOptions();
            return [
                resolvedOptions.contractId,
                resolvedOptions.creator,
                resolvedOptions.params,
            ];
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
//# sourceMappingURL=createById.js.map