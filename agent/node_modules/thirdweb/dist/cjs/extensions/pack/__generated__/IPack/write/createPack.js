"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isCreatePackSupported = isCreatePackSupported;
exports.encodeCreatePackParams = encodeCreatePackParams;
exports.encodeCreatePack = encodeCreatePack;
exports.createPack = createPack;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x092e6075";
const FN_INPUTS = [
    {
        components: [
            {
                name: "assetContract",
                type: "address",
            },
            {
                name: "tokenType",
                type: "uint8",
            },
            {
                name: "tokenId",
                type: "uint256",
            },
            {
                name: "totalAmount",
                type: "uint256",
            },
        ],
        name: "contents",
        type: "tuple[]",
    },
    {
        name: "numOfRewardUnits",
        type: "uint256[]",
    },
    {
        name: "packUri",
        type: "string",
    },
    {
        name: "openStartTimestamp",
        type: "uint128",
    },
    {
        name: "amountDistributedPerOpen",
        type: "uint128",
    },
    {
        name: "recipient",
        type: "address",
    },
];
const FN_OUTPUTS = [
    {
        name: "packId",
        type: "uint256",
    },
    {
        name: "packTotalSupply",
        type: "uint256",
    },
];
/**
 * Checks if the `createPack` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `createPack` method is supported.
 * @extension PACK
 * @example
 * ```ts
 * import { isCreatePackSupported } from "thirdweb/extensions/pack";
 *
 * const supported = isCreatePackSupported(["0x..."]);
 * ```
 */
function isCreatePackSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "createPack" function.
 * @param options - The options for the createPack function.
 * @returns The encoded ABI parameters.
 * @extension PACK
 * @example
 * ```ts
 * import { encodeCreatePackParams } from "thirdweb/extensions/pack";
 * const result = encodeCreatePackParams({
 *  contents: ...,
 *  numOfRewardUnits: ...,
 *  packUri: ...,
 *  openStartTimestamp: ...,
 *  amountDistributedPerOpen: ...,
 *  recipient: ...,
 * });
 * ```
 */
function encodeCreatePackParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.contents,
        options.numOfRewardUnits,
        options.packUri,
        options.openStartTimestamp,
        options.amountDistributedPerOpen,
        options.recipient,
    ]);
}
/**
 * Encodes the "createPack" function into a Hex string with its parameters.
 * @param options - The options for the createPack function.
 * @returns The encoded hexadecimal string.
 * @extension PACK
 * @example
 * ```ts
 * import { encodeCreatePack } from "thirdweb/extensions/pack";
 * const result = encodeCreatePack({
 *  contents: ...,
 *  numOfRewardUnits: ...,
 *  packUri: ...,
 *  openStartTimestamp: ...,
 *  amountDistributedPerOpen: ...,
 *  recipient: ...,
 * });
 * ```
 */
function encodeCreatePack(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeCreatePackParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "createPack" function on the contract.
 * @param options - The options for the "createPack" function.
 * @returns A prepared transaction object.
 * @extension PACK
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { createPack } from "thirdweb/extensions/pack";
 *
 * const transaction = createPack({
 *  contract,
 *  contents: ...,
 *  numOfRewardUnits: ...,
 *  packUri: ...,
 *  openStartTimestamp: ...,
 *  amountDistributedPerOpen: ...,
 *  recipient: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function createPack(options) {
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
                resolvedOptions.contents,
                resolvedOptions.numOfRewardUnits,
                resolvedOptions.packUri,
                resolvedOptions.openStartTimestamp,
                resolvedOptions.amountDistributedPerOpen,
                resolvedOptions.recipient,
            ];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=createPack.js.map