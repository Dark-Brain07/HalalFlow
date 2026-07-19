"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feeConfigUpdatedBySignatureEvent = feeConfigUpdatedBySignatureEvent;
const prepare_event_js_1 = require("../../../../../event/prepare-event.js");
/**
 * Creates an event object for the FeeConfigUpdatedBySignature event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { feeConfigUpdatedBySignatureEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  feeConfigUpdatedBySignatureEvent({
 *  signer: ...,
 *  target: ...,
 *  action: ...,
 * })
 * ],
 * });
 * ```
 */
function feeConfigUpdatedBySignatureEvent(filters = {}) {
    return (0, prepare_event_js_1.prepareEvent)({
        signature: "event FeeConfigUpdatedBySignature(address indexed signer, address indexed target, bytes4 indexed action, address recipient, uint8 feeType, uint256 value)",
        filters,
    });
}
//# sourceMappingURL=FeeConfigUpdatedBySignature.js.map