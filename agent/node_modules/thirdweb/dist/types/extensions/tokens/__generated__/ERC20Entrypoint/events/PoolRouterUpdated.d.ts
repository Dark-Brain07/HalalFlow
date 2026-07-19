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
export declare function poolRouterUpdatedEvent(): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "PoolRouterUpdated";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "poolRouter";
    }];
}>;
//# sourceMappingURL=PoolRouterUpdated.d.ts.map