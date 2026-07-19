"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feeConfigUpdatedEvent = feeConfigUpdatedEvent;
const prepare_event_js_1 = require("../../../../../event/prepare-event.js");
/**
 * Creates an event object for the FeeConfigUpdated event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { feeConfigUpdatedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  feeConfigUpdatedEvent({
 *  target: ...,
 *  action: ...,
 * })
 * ],
 * });
 * ```
 */
function feeConfigUpdatedEvent(filters = {}) {
    return (0, prepare_event_js_1.prepareEvent)({
        signature: "event FeeConfigUpdated(address indexed target, bytes4 indexed action, address recipient, uint8 feeType, uint256 value)",
        filters,
    });
}
//# sourceMappingURL=FeeConfigUpdated.js.map