"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetClaimEligibility = resetClaimEligibility;
exports.isResetClaimEligibilitySupported = isResetClaimEligibilitySupported;
const setClaimConditions_js_1 = require("../../__generated__/IDrop1155/write/setClaimConditions.js");
const claimCondition_js_1 = require("../../__generated__/IDropSinglePhase1155/read/claimCondition.js");
const setClaimConditions_js_2 = require("../../__generated__/IDropSinglePhase1155/write/setClaimConditions.js");
const getClaimConditions_js_1 = require("../read/getClaimConditions.js");
/**
 * Reset the claim eligibility for all users.
 * This method is only available on the `DropERC1155` contract.
 * @param options
 * @returns the prepared transaction
 * @extension ERC1155
 * @example
 * ```ts
 * import { resetClaimEligibility } from "thirdweb/extensions/erc1155";
 * import { sendTransaction } from "thirdweb";
 *
 * const transaction = resetClaimEligibility({
 *  contract,
 * });
 *
 * await sendTransaction({ transaction, account });
 * ```
 */
function resetClaimEligibility(options) {
    if (options.singlePhaseDrop) {
        return (0, setClaimConditions_js_2.setClaimConditions)({
            asyncParams: async () => {
                // get existing condition
                const existingCondition = await (0, claimCondition_js_1.claimCondition)(options).then(([startTimestamp, maxClaimableSupply, supplyClaimed, quantityLimitPerWallet, merkleRoot, pricePerToken, currency, metadata,]) => ({
                    currency,
                    maxClaimableSupply,
                    merkleRoot,
                    metadata,
                    pricePerToken,
                    quantityLimitPerWallet,
                    startTimestamp,
                    supplyClaimed,
                }));
                // then simply return the exact same ones, but with the resetClaimEligibility flag set to true
                return {
                    // type is necessary because of viem hex shenanigans (strict vs non-strict `0x` prefix string)
                    phase: existingCondition,
                    resetClaimEligibility: true,
                    tokenId: options.tokenId,
                };
            },
            contract: options.contract,
            overrides: options.overrides,
        });
    }
    // download existing conditions
    return (0, setClaimConditions_js_1.setClaimConditions)({
        asyncParams: async () => {
            // get existing conditions
            const existingConditions = await (0, getClaimConditions_js_1.getClaimConditions)(options);
            // then simply return the exact same ones, but with the resetClaimEligibility flag set to true
            return {
                // type is necessary because of viem hex shenanigans (strict vs non-strict `0x` prefix string)
                phases: existingConditions,
                resetClaimEligibility: true,
                tokenId: options.tokenId,
            };
        },
        contract: options.contract,
        overrides: options.overrides,
    });
}
/**
 * Checks if the `resetClaimEligibility` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `resetClaimEligibility` method is supported.
 * @extension ERC1155
 * @example
 * ```ts
 * import { isResetClaimEligibilitySupported } from "thirdweb/extensions/erc1155";
 *
 * const supported = isResetClaimEligibilitySupported(["0x..."]);
 * ```
 */
function isResetClaimEligibilitySupported(availableSelectors) {
    return (((0, getClaimConditions_js_1.isGetClaimConditionsSupported)(availableSelectors) &&
        (0, setClaimConditions_js_1.isSetClaimConditionsSupported)(availableSelectors)) ||
        (0, claimCondition_js_1.isClaimConditionSupported)(availableSelectors) ||
        (0, setClaimConditions_js_2.isSetClaimConditionsSupported)(availableSelectors));
}
//# sourceMappingURL=resetClaimEligibility.js.map