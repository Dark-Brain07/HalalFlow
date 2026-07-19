import { prepareEvent } from "../../../../../event/prepare-event.js";
/**
 * Creates an event object for the PlatformFeeInfoUpdated event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension COMMON
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { platformFeeInfoUpdatedEvent } from "thirdweb/extensions/common";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  platformFeeInfoUpdatedEvent({
 *  platformFeeRecipient: ...,
 * })
 * ],
 * });
 * ```
 */
export function platformFeeInfoUpdatedEvent(filters = {}) {
    return prepareEvent({
        filters,
        signature: "event PlatformFeeInfoUpdated(address indexed platformFeeRecipient, uint256 platformFeeBps)",
    });
}
//# sourceMappingURL=PlatformFeeInfoUpdated.js.map