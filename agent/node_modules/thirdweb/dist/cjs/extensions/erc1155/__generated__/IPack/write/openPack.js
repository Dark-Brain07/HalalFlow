"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isOpenPackSupported = isOpenPackSupported;
exports.encodeOpenPackParams = encodeOpenPackParams;
exports.encodeOpenPack = encodeOpenPack;
exports.openPack = openPack;
const prepare_contract_call_js_1 = require("../../../../../transaction/prepare-contract-call.js");
const encodeAbiParameters_js_1 = require("../../../../../utils/abi/encodeAbiParameters.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
const once_js_1 = require("../../../../../utils/promise/once.js");
exports.FN_SELECTOR = "0x914e126a";
const FN_INPUTS = [
    {
        name: "packId",
        type: "uint256",
    },
    {
        name: "amountToOpen",
        type: "uint256",
    },
];
const FN_OUTPUTS = [
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
        type: "tuple[]",
    },
];
/**
 * Checks if the `openPack` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `openPack` method is supported.
 * @extension ERC1155
 * @example
 * ```ts
 * import { isOpenPackSupported } from "thirdweb/extensions/erc1155";
 *
 * const supported = isOpenPackSupported(["0x..."]);
 * ```
 */
function isOpenPackSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "openPack" function.
 * @param options - The options for the openPack function.
 * @returns The encoded ABI parameters.
 * @extension ERC1155
 * @example
 * ```ts
 * import { encodeOpenPackParams } from "thirdweb/extensions/erc1155";
 * const result = encodeOpenPackParams({
 *  packId: ...,
 *  amountToOpen: ...,
 * });
 * ```
 */
function encodeOpenPackParams(options) {
    return (0, encodeAbiParameters_js_1.encodeAbiParameters)(FN_INPUTS, [options.packId, options.amountToOpen]);
}
/**
 * Encodes the "openPack" function into a Hex string with its parameters.
 * @param options - The options for the openPack function.
 * @returns The encoded hexadecimal string.
 * @extension ERC1155
 * @example
 * ```ts
 * import { encodeOpenPack } from "thirdweb/extensions/erc1155";
 * const result = encodeOpenPack({
 *  packId: ...,
 *  amountToOpen: ...,
 * });
 * ```
 */
function encodeOpenPack(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (exports.FN_SELECTOR +
        encodeOpenPackParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "openPack" function on the contract.
 * @param options - The options for the "openPack" function.
 * @returns A prepared transaction object.
 * @extension ERC1155
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { openPack } from "thirdweb/extensions/erc1155";
 *
 * const transaction = openPack({
 *  contract,
 *  packId: ...,
 *  amountToOpen: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
function openPack(options) {
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
            return [resolvedOptions.packId, resolvedOptions.amountToOpen];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=openPack.js.map