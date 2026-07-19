"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonceUsedEvent = nonceUsedEvent;
const prepare_event_js_1 = require("../../../../../event/prepare-event.js");
/**
 * Creates an event object for the NonceUsed event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { nonceUsedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  nonceUsedEvent()
 * ],
 * });
 * ```
 */
function nonceUsedEvent() {
    return (0, prepare_event_js_1.prepareEvent)({
        signature: "event NonceUsed(address account, uint256 nonce)",
    });
}
//# sourceMappingURL=NonceUsed.js.map