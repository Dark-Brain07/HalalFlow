/**
 * Creates an event object for the ContractDeployed event.
 * @returns The prepared event object.
 * @extension STYLUS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { contractDeployedEvent } from "thirdweb/extensions/stylus";
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
        readonly type: "address";
        readonly name: "deployedContract";
    }];
}>;
//# sourceMappingURL=ContractDeployed.d.ts.map