"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isAddPackContentsSupported = isAddPackContentsSupported;
exports.encodeAddPackContentsParams = encodeAddPackContentsParams;
exports.encodeAddPackContents = encodeAddPackContents;
exports.addPackContents = addPackContents;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0xa96b1438";
const FN_INPUTS = [
    {
        name: "_packId",
        type: "uint256",
    },
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
        name: "_contents",
        type: "tuple[]",
    },
    {
        name: "_numOfRewardUnits",
        type: "uint256[]",
    },
    {
        name: "_recipient",
        type: "address",
    },
];
const FN_OUTPUTS = [
    {
        name: "packTotalSupply",
        type: "uint256",
    },
    {
        name: "newSupplyAdded",
        type: "uint256",
    },
];
/**
 * Checks if the `addPackContents` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `addPackContents` method is supported.
 * @extension PACK
 * @example
 * ```ts
 * import { isAddPackContentsSupported } from "thirdweb/extensions/pack";
 *
 * const supported = isAddPackContentsSupported(["0x..."]);
 * ```
 */
function isAddPackContentsSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "addPackContents" function.
 * @param options - The options for the addPackContents function.
 * @returns The encoded ABI parameters.
 * @extension PACK
 * @example
 * ```ts
 * import { encodeAddPackContentsParams } from "thirdweb/extensions/pack";
 * const result = encodeAddPackContentsParams({
 *  packId: ...,
 *  contents: ...,
 *  numOfRewardUnits: ...,
 *  recipient: ...,
 * });
 * ```
 */
function encodeAddPackContentsParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.packId,
        options.contents,
        options.numOfRewardUnits,
        options.recipient,
    ]);
}
/**
 * Encodes the "addPackContents" function into a Hex string with its parameters.
 * @param options - The options for the addPackContents function.
 * @returns The encoded hexadecimal string.
 * @extension PACK
 * @example
 * ```ts
 * import { encodeAddPackContents } from "thirdweb/extensions/pack";
 * const result = encodeAddPackContents({
 *  packId: ...,
 *  contents: ...,
 *  numOfRewardUnits: ...,
 *  recipient: ...,
 * });
 * ```
 */
function encodeAddPackContents(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeAddPackContentsParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "addPackContents" function on the contract.
 * @param options - The options for the "addPackContents" function.
 * @returns A prepared transaction object.
 * @extension PACK
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { addPackContents } from "thirdweb/extensions/pack";
 *
 * const transaction = addPackContents({
 *  contract,
 *  packId: ...,
 *  contents: ...,
 *  numOfRewardUnits: ...,
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
function addPackContents(options) {
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
                resolvedOptions.packId,
                resolvedOptions.contents,
                resolvedOptions.numOfRewardUnits,
                resolvedOptions.recipient,
            ];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=addPackContents.js.map