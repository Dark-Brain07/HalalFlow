"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.airdropUpdatedEvent = airdropUpdatedEvent;
const prepare_event_js_1 = require("../../../../../event/prepare-event.js");
/**
 * Creates an event object for the AirdropUpdated event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { airdropUpdatedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  airdropUpdatedEvent()
 * ],
 * });
 * ```
 */
function airdropUpdatedEvent() {
    return (0, prepare_event_js_1.prepareEvent)({
        signature: "event AirdropUpdated(address airdrop)",
    });
}
//# sourceMappingURL=AirdropUpdated.js.map