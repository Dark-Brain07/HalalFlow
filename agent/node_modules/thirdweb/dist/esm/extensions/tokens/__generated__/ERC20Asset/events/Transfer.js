import { prepareEvent } from "../../../../../event/prepare-event.js";
/**
 * Creates an event object for the Transfer event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { transferEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  transferEvent({
 *  from: ...,
 *  to: ...,
 * })
 * ],
 * });
 * ```
 */
export function transferEvent(filters = {}) {
    return prepareEvent({
        signature: "event Transfer(address indexed from, address indexed to, uint256 amount)",
        filters,
    });
}
//# sourceMappingURL=Transfer.js.map