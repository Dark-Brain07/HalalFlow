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
export declare function proxyDeployedEvent(): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "ProxyDeployed";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "id";
    }, {
        readonly type: "uint256";
        readonly name: "version";
    }, {
        readonly type: "address";
        readonly name: "proxyAddress";
    }, {
        readonly type: "address";
        readonly name: "implementation";
    }, {
        readonly type: "bytes32";
        readonly name: "salt";
    }];
}>;
//# sourceMappingURL=ProxyDeployed.d.ts.map