"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewardClaimedEvent = rewardClaimedEvent;
const prepare_event_js_1 = require("../../../../../event/prepare-event.js");
/**
 * Creates an event object for the RewardClaimed event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { rewardClaimedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  rewardClaimedEvent()
 * ],
 * });
 * ```
 */
function rewardClaimedEvent() {
    return (0, prepare_event_js_1.prepareEvent)({
        signature: "event RewardClaimed(address rewardLocker, address asset, address claimer)",
    });
}
//# sourceMappingURL=RewardClaimed.js.map