import { prepareEvent } from "../../../../../event/prepare-event.js";
/**
 * Creates an event object for the OwnerChanged event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension UNISWAP
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { ownerChangedEvent } from "thirdweb/extensions/uniswap";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  ownerChangedEvent({
 *  oldOwner: ...,
 *  newOwner: ...,
 * })
 * ],
 * });
 * ```
 */
export function ownerChangedEvent(filters = {}) {
    return prepareEvent({
        filters,
        signature: "event OwnerChanged(address indexed oldOwner, address indexed newOwner)",
    });
}
//# sourceMappingURL=OwnerChanged.js.map