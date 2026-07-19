import { prepareEvent } from "../../../../../event/prepare-event.js";
/**
 * Creates an event object for the RewardCollected event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { rewardCollectedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  rewardCollectedEvent({
 *  asset: ...,
 * })
 * ],
 * });
 * ```
 */
export function rewardCollectedEvent(filters = {}) {
    return prepareEvent({
        signature: "event RewardCollected(address owner, address indexed asset, address positionManager, uint256 positionId, address recipient, address developer, address token0, uint256 recipientAmount0, uint256 developerAmount0, uint256 feeAmount0, address token1, uint256 recipientAmount1, uint256 developerAmount1, uint256 feeAmount1)",
        filters,
    });
}
//# sourceMappingURL=RewardCollected.js.map