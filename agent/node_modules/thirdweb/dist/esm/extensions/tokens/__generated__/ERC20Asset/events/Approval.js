import { prepareEvent } from "../../../../../event/prepare-event.js";
/**
 * Creates an event object for the Approval event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { approvalEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  approvalEvent({
 *  owner: ...,
 *  spender: ...,
 * })
 * ],
 * });
 * ```
 */
export function approvalEvent(filters = {}) {
    return prepareEvent({
        signature: "event Approval(address indexed owner, address indexed spender, uint256 amount)",
        filters,
    });
}
//# sourceMappingURL=Approval.js.map