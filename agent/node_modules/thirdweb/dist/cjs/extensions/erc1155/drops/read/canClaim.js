"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canClaim = canClaim;
const extract_error_js_1 = require("../../../../transaction/extract-error.js");
const get_claim_params_js_1 = require("../../../../utils/extensions/drops/get-claim-params.js");
const verifyClaim_js_1 = require("../../__generated__/DropERC1155/read/verifyClaim.js");
const getActiveClaimConditionId_js_1 = require("../../__generated__/IDrop1155/read/getActiveClaimConditionId.js");
/**
 * Check if a user can claim a drop.
 * This method is only available on the `DropERC1155` contract.
 * @param options - The options for the transaction.
 * @returns Whether the user can claim the drop.
 *
 * @example
 * ```ts
 * const claimResult = await canClaim({
 *   contract: contract,
 *   claimer: "0x1234567890123456789012345678901234567890",
 *   quantity: "1",
 *   tokenId: 0n,
 * });
 * ```
 *
 * @extension ERC1155
 */
async function canClaim(options) {
    const [conditionId, { quantity, currency, pricePerToken, allowlistProof }] = await Promise.all([
        (0, getActiveClaimConditionId_js_1.getActiveClaimConditionId)({
            contract: options.contract,
            tokenId: options.tokenId,
        }),
        (0, get_claim_params_js_1.getClaimParams)({
            contract: options.contract,
            from: options.from,
            quantity: options.quantity,
            to: options.claimer,
            tokenId: options.tokenId,
            type: "erc1155",
        }),
    ]);
    try {
        await (0, verifyClaim_js_1.verifyClaim)({
            allowlistProof,
            claimer: options.claimer,
            conditionId,
            contract: options.contract,
            currency,
            pricePerToken,
            quantity,
            tokenId: options.tokenId,
        });
        return {
            result: true,
        };
    }
    catch (error) {
        return {
            reason: await (0, extract_error_js_1.extractErrorResult)({ contract: options.contract, error }),
            result: false,
        };
    }
}
//# sourceMappingURL=canClaim.js.map