"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isBuyFromListingSupported = isBuyFromListingSupported;
exports.encodeBuyFromListingParams = encodeBuyFromListingParams;
exports.encodeBuyFromListing = encodeBuyFromListing;
exports.buyFromListing = buyFromListing;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x704232dc";
const FN_INPUTS = [
    {
        name: "_listingId",
        type: "uint256",
    },
    {
        name: "_buyFor",
        type: "address",
    },
    {
        name: "_quantity",
        type: "uint256",
    },
    {
        name: "_currency",
        type: "address",
    },
    {
        name: "_expectedTotalPrice",
        type: "uint256",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `buyFromListing` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `buyFromListing` method is supported.
 * @extension MARKETPLACE
 * @example
 * ```ts
 * import { isBuyFromListingSupported } from "thirdweb/extensions/marketplace";
 *
 * const supported = isBuyFromListingSupported(["0x..."]);
 * ```
 */
function isBuyFromListingSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "buyFromListing" function.
 * @param options - The options for the buyFromListing function.
 * @returns The encoded ABI parameters.
 * @extension MARKETPLACE
 * @example
 * ```ts
 * import { encodeBuyFromListingParams } from "thirdweb/extensions/marketplace";
 * const result = encodeBuyFromListingParams({
 *  listingId: ...,
 *  buyFor: ...,
 *  quantity: ...,
 *  currency: ...,
 *  expectedTotalPrice: ...,
 * });
 * ```
 */
function encodeBuyFromListingParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [
        options.listingId,
        options.buyFor,
        options.quantity,
        options.currency,
        options.expectedTotalPrice,
    ]);
}
/**
 * Encodes the "buyFromListing" function into a Hex string with its parameters.
 * @param options - The options for the buyFromListing function.
 * @returns The encoded hexadecimal string.
 * @extension MARKETPLACE
 * @example
 * ```ts
 * import { encodeBuyFromListing } from "thirdweb/extensions/marketplace";
 * const result = encodeBuyFromListing({
 *  listingId: ...,
 *  buyFor: ...,
 *  quantity: ...,
 *  currency: ...,
 *  expectedTotalPrice: ...,
 * });
 * ```
 */
function encodeBuyFromListing(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeBuyFromListingParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "buyFromListing" function on the contract.
 * @param options - The options for the "buyFromListing" function.
 * @returns A prepared transaction object.
 * @extension MARKETPLACE
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { buyFromListing } from "thirdweb/extensions/marketplace";
 *
 * const transaction = buyFromListing({
 *  contract,
 *  listingId: ...,
 *  buyFor: ...,
 *  quantity: ...,
 *  currency: ...,
 *  expectedTotalPrice: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function buyFromListing(options) {
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
                resolvedOptions.listingId,
                resolvedOptions.buyFor,
                resolvedOptions.quantity,
                resolvedOptions.currency,
                resolvedOptions.expectedTotalPrice,
            ];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=buyFromListing.js.map