import { prepareEvent } from "../../../../../event/prepare-event.js";
/**
 * Creates an event object for the TokensClaimed event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension ERC20
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { tokensClaimedEvent } from "thirdweb/extensions/erc20";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  tokensClaimedEvent({
 *  claimer: ...,
 *  receiver: ...,
 * })
 * ],
 * });
 * ```
 */
export function tokensClaimedEvent(filters = {}) {
    return prepareEvent({
        filters,
        signature: "event TokensClaimed(address indexed claimer, address indexed receiver, uint256 quantityClaimed)",
    });
}
//# sourceMappingURL=TokensClaimed.js.map