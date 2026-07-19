"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createdEvent = createdEvent;
const prepare_event_js_1 = require("../../../../../event/prepare-event.js");
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
function createdEvent(filters = {}) {
    return (0, prepare_event_js_1.prepareEvent)({
        signature: "event Created(bytes32 contractId, address indexed creator, address indexed asset, address developer, bytes hookData)",
        filters,
    });
}
//# sourceMappingURL=Created.js.map