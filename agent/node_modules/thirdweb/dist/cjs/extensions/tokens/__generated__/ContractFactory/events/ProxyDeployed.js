"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyDeployedEvent = proxyDeployedEvent;
const prepare_event_js_1 = require("../../../../../event/prepare-event.js");
/**
 * Creates an event object for the ProxyDeployed event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { proxyDeployedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  proxyDeployedEvent()
 * ],
 * });
 * ```
 */
function proxyDeployedEvent() {
    return (0, prepare_event_js_1.prepareEvent)({
        signature: "event ProxyDeployed(bytes32 id, uint256 version, address proxyAddress, address implementation, bytes32 salt)",
    });
}
//# sourceMappingURL=ProxyDeployed.js.map