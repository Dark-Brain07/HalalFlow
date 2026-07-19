import { prepareEvent } from "../../../../../event/prepare-event.js";
/**
 * Creates an event object for the ValueReceived event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension ERC7702
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { valueReceivedEvent } from "thirdweb/extensions/erc7702";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  valueReceivedEvent({
 *  user: ...,
 *  from: ...,
 * })
 * ],
 * });
 * ```
 */
export function valueReceivedEvent(filters = {}) {
    return prepareEvent({
        signature: "event ValueReceived(address indexed user, address indexed from, uint256 value)",
        filters,
    });
}
//# sourceMappingURL=ValueReceived.js.map