import { prepareEvent } from "../../../../../event/prepare-event.js";
/**
 * Creates an event object for the ListingUpdated event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension MARKETPLACE
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { listingUpdatedEvent } from "thirdweb/extensions/marketplace";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  listingUpdatedEvent({
 *  listingId: ...,
 *  listingCreator: ...,
 * })
 * ],
 * });
 * ```
 */
export function listingUpdatedEvent(filters = {}) {
    return prepareEvent({
        filters,
        signature: "event ListingUpdated(uint256 indexed listingId, address indexed listingCreator)",
    });
}
//# sourceMappingURL=ListingUpdated.js.map