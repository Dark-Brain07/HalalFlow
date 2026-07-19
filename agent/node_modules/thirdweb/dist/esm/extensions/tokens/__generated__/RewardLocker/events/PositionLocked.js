import { prepareEvent } from "../../../../../event/prepare-event.js";
/**
 * Creates an event object for the PositionLocked event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { positionLockedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  positionLockedEvent({
 *  asset: ...,
 * })
 * ],
 * });
 * ```
 */
export function positionLockedEvent(filters = {}) {
    return prepareEvent({
        signature: "event PositionLocked(address owner, address indexed asset, address positionManager, uint256 positionId, address recipient, address developer)",
        filters,
    });
}
//# sourceMappingURL=PositionLocked.js.map