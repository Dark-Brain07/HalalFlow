"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isCreateAuctionSupported = isCreateAuctionSupported;
exports.encodeCreateAuctionParams = encodeCreateAuctionParams;
exports.encodeCreateAuction = encodeCreateAuction;
exports.createAuction = createAuction;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x16654d40";
const FN_INPUTS = [
    {
        components: [
            {
                name: "assetContract",
                type: "address",
            },
            {
                name: "tokenId",
                type: "uint256",
            },
            {
                name: "quantity",
                type: "uint256",
            },
            {
                name: "currency",
                type: "address",
            },
            {
                name: "minimumBidAmount",
                type: "uint256",
            },
            {
                name: "buyoutBidAmount",
                type: "uint256",
            },
            {
                name: "timeBufferInSeconds",
                type: "uint64",
            },
            {
                name: "bidBufferBps",
                type: "uint64",
            },
            {
                name: "startTimestamp",
                type: "uint64",
            },
            {
                name: "endTimestamp",
                type: "uint64",
            },
        ],
        name: "_params",
        type: "tuple",
    },
];
const FN_OUTPUTS = [
    {
        name: "auctionId",
        type: "uint256",
    },
];
/**
 * Checks if the `createAuction` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `createAuction` method is supported.
 * @extension MARKETPLACE
 * @example
 * ```ts
 * import { isCreateAuctionSupported } from "thirdweb/extensions/marketplace";
 *
 * const supported = isCreateAuctionSupported(["0x..."]);
 * ```
 */
function isCreateAuctionSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "createAuction" function.
 * @param options - The options for the createAuction function.
 * @returns The encoded ABI parameters.
 * @extension MARKETPLACE
 * @example
 * ```ts
 * import { encodeCreateAuctionParams } from "thirdweb/extensions/marketplace";
 * const result = encodeCreateAuctionParams({
 *  params: ...,
 * });
 * ```
 */
function encodeCreateAuctionParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.params]);
}
/**
 * Encodes the "createAuction" function into a Hex string with its parameters.
 * @param options - The options for the createAuction function.
 * @returns The encoded hexadecimal string.
 * @extension MARKETPLACE
 * @example
 * ```ts
 * import { encodeCreateAuction } from "thirdweb/extensions/marketplace";
 * const result = encodeCreateAuction({
 *  params: ...,
 * });
 * ```
 */
function encodeCreateAuction(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeCreateAuctionParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "createAuction" function on the contract.
 * @param options - The options for the "createAuction" function.
 * @returns A prepared transaction object.
 * @extension MARKETPLACE
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { createAuction } from "thirdweb/extensions/marketplace";
 *
 * const transaction = createAuction({
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
function createAuction(options) {
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
//# sourceMappingURL=createAuction.js.map