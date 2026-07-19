"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feeRecipientUpdatedEvent = feeRecipientUpdatedEvent;
const prepare_event_js_1 = require("../../../../../event/prepare-event.js");
/**
 * Creates an event object for the FeeRecipientUpdated event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { feeRecipientUpdatedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  feeRecipientUpdatedEvent()
 * ],
 * });
 * ```
 */
function feeRecipientUpdatedEvent() {
    return (0, prepare_event_js_1.prepareEvent)({
        signature: "event FeeRecipientUpdated(address feeRecipient)",
    });
}
//# sourceMappingURL=FeeRecipientUpdated.js.map