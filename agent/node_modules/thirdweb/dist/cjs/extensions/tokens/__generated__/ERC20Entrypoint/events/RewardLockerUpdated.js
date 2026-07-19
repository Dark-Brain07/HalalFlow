"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewardLockerUpdatedEvent = rewardLockerUpdatedEvent;
const prepare_event_js_1 = require("../../../../../event/prepare-event.js");
/**
 * Creates an event object for the RewardLockerUpdated event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { rewardLockerUpdatedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  rewardLockerUpdatedEvent()
 * ],
 * });
 * ```
 */
function rewardLockerUpdatedEvent() {
    return (0, prepare_event_js_1.prepareEvent)({
        signature: "event RewardLockerUpdated(address locker)",
    });
}
//# sourceMappingURL=RewardLockerUpdated.js.map