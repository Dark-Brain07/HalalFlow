"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approvalEvent = approvalEvent;
const prepare_event_js_1 = require("../../../../../event/prepare-event.js");
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
function approvalEvent(filters = {}) {
    return (0, prepare_event_js_1.prepareEvent)({
        signature: "event Approval(address indexed owner, address indexed spender, uint256 amount)",
        filters,
    });
}
//# sourceMappingURL=Approval.js.map