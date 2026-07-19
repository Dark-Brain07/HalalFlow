import { prepareEvent } from "../../../../../event/prepare-event.js";
/**
 * Creates an event object for the Added event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension THIRDWEB
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { addedEvent } from "thirdweb/extensions/thirdweb";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  addedEvent({
 *  deployer: ...,
 *  deployment: ...,
 *  chainId: ...,
 * })
 * ],
 * });
 * ```
 */
export function addedEvent(filters = {}) {
    return prepareEvent({
        filters,
        signature: "event Added(address indexed deployer, address indexed deployment, uint256 indexed chainId, string metadataUri)",
    });
}
//# sourceMappingURL=Added.js.map