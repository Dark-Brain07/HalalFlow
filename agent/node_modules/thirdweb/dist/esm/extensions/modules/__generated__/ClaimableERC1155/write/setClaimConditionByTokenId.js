import { prepareContractCall } from "../../../../../transaction/prepare-contract-call.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
import { once } from "../../../../../utils/promise/once.js";
export const FN_SELECTOR = "0x3bcec708";
const FN_INPUTS = [
    {
        name: "tokenId",
        type: "uint256",
    },
    {
        components: [
            {
                name: "availableSupply",
                type: "uint256",
            },
            {
                name: "allowlistMerkleRoot",
                type: "bytes32",
            },
            {
                name: "pricePerUnit",
                type: "uint256",
            },
            {
                name: "currency",
                type: "address",
            },
            {
                name: "maxMintPerWallet",
                type: "uint256",
            },
            {
                name: "startTimestamp",
                type: "uint48",
            },
            {
                name: "endTimestamp",
                type: "uint48",
            },
            {
                name: "auxData",
                type: "string",
            },
        ],
        name: "_claimCondition",
        type: "tuple",
    },
];
const FN_OUTPUTS = [];
/**
 * Checks if the `setClaimConditionByTokenId` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `setClaimConditionByTokenId` method is supported.
 * @modules ClaimableERC1155
 * @example
 * ```ts
 * import { ClaimableERC1155 } from "thirdweb/modules";
 *
 * const supported = ClaimableERC1155.isSetClaimConditionByTokenIdSupported(["0x..."]);
 * ```
 */
export function isSetClaimConditionByTokenIdSupported(availableSelectors) {
    return detectMethod({
        availableSelectors,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Encodes the parameters for the "setClaimConditionByTokenId" function.
 * @param options - The options for the setClaimConditionByTokenId function.
 * @returns The encoded ABI parameters.
 * @modules ClaimableERC1155
 * @example
 * ```ts
 * import { ClaimableERC1155 } from "thirdweb/modules";
 * const result = ClaimableERC1155.encodeSetClaimConditionByTokenIdParams({
 *  tokenId: ...,
 *  claimCondition: ...,
 * });
 * ```
 */
export function encodeSetClaimConditionByTokenIdParams(options) {
    return encodeAbiParameters(FN_INPUTS, [
        options.tokenId,
        options.claimCondition,
    ]);
}
/**
 * Encodes the "setClaimConditionByTokenId" function into a Hex string with its parameters.
 * @param options - The options for the setClaimConditionByTokenId function.
 * @returns The encoded hexadecimal string.
 * @modules ClaimableERC1155
 * @example
 * ```ts
 * import { ClaimableERC1155 } from "thirdweb/modules";
 * const result = ClaimableERC1155.encodeSetClaimConditionByTokenId({
 *  tokenId: ...,
 *  claimCondition: ...,
 * });
 * ```
 */
export function encodeSetClaimConditionByTokenId(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return (FN_SELECTOR +
        encodeSetClaimConditionByTokenIdParams(options).slice(2));
}
/**
 * Prepares a transaction to call the "setClaimConditionByTokenId" function on the contract.
 * @param options - The options for the "setClaimConditionByTokenId" function.
 * @returns A prepared transaction object.
 * @modules ClaimableERC1155
 * @example
 * ```ts
 * import { sendTransaction } from "thirdweb";
 * import { ClaimableERC1155 } from "thirdweb/modules";
 *
 * const transaction = ClaimableERC1155.setClaimConditionByTokenId({
 *  contract,
 *  tokenId: ...,
 *  claimCondition: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * await sendTransaction({ transaction, account });
 * ```
 */
export function setClaimConditionByTokenId(options) {
    const asyncOptions = once(async () => {
        return "asyncParams" in options ? await options.asyncParams() : options;
    });
    return prepareContractCall({
        accessList: async () => (await asyncOptions()).overrides?.accessList,
        authorizationList: async () => (await asyncOptions()).overrides?.authorizationList,
        contract: options.contract,
        erc20Value: async () => (await asyncOptions()).overrides?.erc20Value,
        extraGas: async () => (await asyncOptions()).overrides?.extraGas,
        gas: async () => (await asyncOptions()).overrides?.gas,
        gasPrice: async () => (await asyncOptions()).overrides?.gasPrice,
        maxFeePerGas: async () => (await asyncOptions()).overrides?.maxFeePerGas,
        maxPriorityFeePerGas: async () => (await asyncOptions()).overrides?.maxPriorityFeePerGas,
        method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        nonce: async () => (await asyncOptions()).overrides?.nonce,
        params: async () => {
            const resolvedOptions = await asyncOptions();
            return [resolvedOptions.tokenId, resolvedOptions.claimCondition];
        },
        value: async () => (await asyncOptions()).overrides?.value,
    });
}
//# sourceMappingURL=setClaimConditionByTokenId.js.map