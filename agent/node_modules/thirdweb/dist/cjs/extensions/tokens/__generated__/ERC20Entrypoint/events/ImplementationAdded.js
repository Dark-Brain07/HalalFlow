"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.implementationAddedEvent = implementationAddedEvent;
const prepare_event_js_1 = require("../../../../../event/prepare-event.js");
/**
 * Creates an event object for the ImplementationAdded event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { implementationAddedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  implementationAddedEvent({
 *  implementation: ...,
 * })
 * ],
 * });
 * ```
 */
function implementationAddedEvent(filters = {}) {
    return (0, prepare_event_js_1.prepareEvent)({
        signature: "event ImplementationAdded(bytes32 contractId, address indexed implementation, uint8 implementationType, uint8 createHook, bytes createHookData)",
        filters,
    });
}
//# sourceMappingURL=ImplementationAdded.js.map