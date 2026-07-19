import { prepareEvent } from "../../../../../event/prepare-event.js";
/**
 * Creates an event object for the Created event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { createdEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  createdEvent({
 *  creator: ...,
 *  asset: ...,
 * })
 * ],
 * });
 * ```
 */
export function createdEvent(filters = {}) {
    return prepareEvent({
        signature: "event Created(bytes32 contractId, address indexed creator, address indexed asset, address developer, bytes hookData)",
        filters,
    });
}
//# sourceMappingURL=Created.js.map