"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isValidateUserOpSupported = isValidateUserOpSupported;
exports.encodeValidateUserOpParams = encodeValidateUserOpParams;
exports.encodeValidateUserOp = encodeValidateUserOp;
exports.validateUserOp = validateUserOp;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x3a871cdd";
const FN_INPUTS = [
    {
        components: [
            {
                name: "sender",
                type: "address",
            },
            {
                name: "nonce",
                type: "uint256",
            },
            {
                name: "initCode",
                type: "bytes",
            },
            {
                name: "callData",
                type: "bytes",
            },
            {
                name: "callGasLimit",
                type: "uint256",
            },
            {
                name: "verificationGasLimit",
                type: "uint256",
            },
            {
                name: "preVerificationGas",
                type: "uint256",
            },
            {
                name: "maxFeePerGas",
                type: "uint256",
            },
            {
                name: "maxPriorityFeePerGas",
                type: "uint256",
            },
            {
                name: "paymasterAndData",
                type: "bytes",
            },
            {
                name: "signature",
                type: "bytes",
            },
        ],
        name: "userOp",
        type: "tuple",
    },
    {
        name: "userOpHash",
        type: "bytes32",
    },
    {
        name: "missingAccountFunds",
        type: "uint256",
    },
];
const FN_OUTPUTS = [
    {
        name: "validationData",
        type: "uint256",
    },
];
/**
 * Checks if the `validateUserOp` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `validateUserOp` method is supported.
 * @extension ERC4337
 * @example
 * ```ts
 * import { isValidateUserOpSupported } from "thirdweb/extensions/erc4337";
 *
 * const supported = isValidateUserOpSupported(["0x..."]);
 * ```
 */
function isValidateUserOpSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "validateUserOp" function.
 * @param options - The options for the validateUserOp function.
 * @returns The encoded ABI parameters.
 * @extension ERC4337
 * @example
 * ```ts
 * import { encodeValidateUserOpParams } from "thirdweb/extensions/erc4337";
 * const result = encodeValidateUserOpParams({
 *  userOp: ...,
 *  userOpHash: ...,
 *  missingAccountFunds: ...,
 * });
 * ```
 */
function encodeValidateUserOpParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.userOp,
        options.userOpHash,
        options.missingAccountFunds,
    ]);
}
/**
 * Encodes the "validateUserOp" function into a Hex string with its parameters.
 * @param options - The options for the validateUserOp function.
 * @returns The encoded hexadecimal string.
 * @extension ERC4337
 * @example
 * ```ts
 * import { encodeValidateUserOp } from "thirdweb/extensions/erc4337";
 * const result = encodeValidateUserOp({
 *  userOp: ...,
 *  userOpHash: ...,
 *  missingAccountFunds: ...,
 * });
 * ```
 */
function encodeValidateUserOp(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeValidateUserOpParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "validateUserOp" function on the contract.
 * @param options - The options for the "validateUserOp" function.
 * @returns A prepared transaction object.
 * @extension ERC4337
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { validateUserOp } from "thirdweb/extensions/erc4337";
 *
 * const transaction = validateUserOp({
 *  contract,
 *  userOp: ...,
 *  userOpHash: ...,
 *  missingAccountFunds: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function validateUserOp(options) {
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
                resolvedOptions.userOp,
                resolvedOptions.userOpHash,
                resolvedOptions.missingAccountFunds,
            ];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=validateUserOp.js.map