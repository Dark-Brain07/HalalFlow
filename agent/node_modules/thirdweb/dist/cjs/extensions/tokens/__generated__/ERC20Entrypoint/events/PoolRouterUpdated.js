"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.poolRouterUpdatedEvent = poolRouterUpdatedEvent;
const prepare_event_js_1 = require("../../../../../event/prepare-event.js");
/**
 * Creates an event object for the PoolRouterUpdated event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { poolRouterUpdatedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  poolRouterUpdatedEvent()
 * ],
 * });
 * ```
 */
function poolRouterUpdatedEvent() {
    return (0, prepare_event_js_1.prepareEvent)({
        signature: "event PoolRouterUpdated(address poolRouter)",
    });
}
//# sourceMappingURL=PoolRouterUpdated.js.map