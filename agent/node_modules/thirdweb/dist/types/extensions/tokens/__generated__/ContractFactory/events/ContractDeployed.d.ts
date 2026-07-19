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
export declare function contractDeployedEvent(): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "ContractDeployed";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "id";
    }, {
        readonly type: "uint256";
        readonly name: "version";
    }, {
        readonly type: "address";
        readonly name: "contractAddress";
    }, {
        readonly type: "bytes32";
        readonly name: "salt";
    }];
}>;
//# sourceMappingURL=ContractDeployed.d.ts.map