"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractDeployedEvent = contractDeployedEvent;
const prepare_event_js_1 = require("../../../../../event/prepare-event.js");
/**
 * Creates an event object for the ContractDeployed event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { contractDeployedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  contractDeployedEvent()
 * ],
 * });
 * ```
 */
function contractDeployedEvent() {
    return (0, prepare_event_js_1.prepareEvent)({
        signature: "event ContractDeployed(bytes32 id, uint256 version, address contractAddress, bytes32 salt)",
    });
}
//# sourceMappingURL=ContractDeployed.js.map