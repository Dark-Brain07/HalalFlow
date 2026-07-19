import { prepareEvent } from "../../../../../event/prepare-event.js";
/**
 * Creates an event object for the Executed event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension ERC7702
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { executedEvent } from "thirdweb/extensions/erc7702";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  executedEvent({
 *  user: ...,
 *  signer: ...,
 *  executor: ...,
 * })
 * ],
 * });
 * ```
 */
export function executedEvent(filters = {}) {
    return prepareEvent({
        signature: "event Executed(address indexed user, address indexed signer, address indexed executor, uint256 batchSize)",
        filters,
    });
}
//# sourceMappingURL=Executed.js.map