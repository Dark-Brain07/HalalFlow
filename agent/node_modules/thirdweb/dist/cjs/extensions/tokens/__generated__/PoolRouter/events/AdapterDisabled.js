"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adapterDisabledEvent = adapterDisabledEvent;
const prepare_event_js_1 = require("../../../../../event/prepare-event.js");
/**
 * Creates an event object for the AdapterDisabled event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { adapterDisabledEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  adapterDisabledEvent()
 * ],
 * });
 * ```
 */
function adapterDisabledEvent() {
    return (0, prepare_event_js_1.prepareEvent)({
        signature: "event AdapterDisabled(uint8 adapterType)",
    });
}
//# sourceMappingURL=AdapterDisabled.js.map