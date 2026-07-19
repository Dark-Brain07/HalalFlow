"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distributedEvent = distributedEvent;
const prepare_event_js_1 = require("../../../../../event/prepare-event.js");
/**
 * Creates an event object for the Distributed event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { distributedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  distributedEvent()
 * ],
 * });
 * ```
 */
function distributedEvent() {
    return (0, prepare_event_js_1.prepareEvent)({
        signature: "event Distributed(address asset, uint256 recipientCount, uint256 totalAmount)",
    });
}
//# sourceMappingURL=Distributed.js.map