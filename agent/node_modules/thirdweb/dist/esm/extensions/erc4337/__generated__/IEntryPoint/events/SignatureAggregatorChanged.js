import { prepareEvent } from "../../../../../event/prepare-event.js";
/**
 * Creates an event object for the SignatureAggregatorChanged event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension ERC4337
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { signatureAggregatorChangedEvent } from "thirdweb/extensions/erc4337";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  signatureAggregatorChangedEvent({
 *  aggregator: ...,
 * })
 * ],
 * });
 * ```
 */
export function signatureAggregatorChangedEvent(filters = {}) {
    return prepareEvent({
        filters,
        signature: "event SignatureAggregatorChanged(address indexed aggregator)",
    });
}
//# sourceMappingURL=SignatureAggregatorChanged.js.map