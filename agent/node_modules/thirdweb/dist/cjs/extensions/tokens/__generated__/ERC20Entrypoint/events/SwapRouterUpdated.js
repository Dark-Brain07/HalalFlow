"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swapRouterUpdatedEvent = swapRouterUpdatedEvent;
const prepare_event_js_1 = require("../../../../../event/prepare-event.js");
/**
 * Creates an event object for the SwapRouterUpdated event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { swapRouterUpdatedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  swapRouterUpdatedEvent()
 * ],
 * });
 * ```
 */
function swapRouterUpdatedEvent() {
    return (0, prepare_event_js_1.prepareEvent)({
        signature: "event SwapRouterUpdated(address swapRouter)",
    });
}
//# sourceMappingURL=SwapRouterUpdated.js.map