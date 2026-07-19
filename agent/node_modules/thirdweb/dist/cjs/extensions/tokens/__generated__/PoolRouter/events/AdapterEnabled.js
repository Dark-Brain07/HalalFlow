"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adapterEnabledEvent = adapterEnabledEvent;
const prepare_event_js_1 = require("../../../../../event/prepare-event.js");
/**
 * Creates an event object for the AdapterEnabled event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { adapterEnabledEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  adapterEnabledEvent()
 * ],
 * });
 * ```
 */
function adapterEnabledEvent() {
    return (0, prepare_event_js_1.prepareEvent)({
        signature: "event AdapterEnabled(uint8 adapterType, address rewardLocker)",
    });
}
//# sourceMappingURL=AdapterEnabled.js.map