import type { AbiParameterToPrimitiveType } from "abitype";
/**
 * Represents the filters for the "PositionLocked" event.
 */
export type PositionLockedEventFilters = Partial<{
    asset: AbiParameterToPrimitiveType<{
        type: "address";
        name: "asset";
        indexed: true;
    }>;
}>;
/**
 * Creates an event object for the PositionLocked event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { positionLockedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  positionLockedEvent({
 *  asset: ...,
 * })
 * ],
 * });
 * ```
 */
export declare function positionLockedEvent(filters?: PositionLockedEventFilters): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "PositionLocked";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "owner";
    }, {
        readonly type: "address";
        readonly name: "asset";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "positionManager";
    }, {
        readonly type: "uint256";
        readonly name: "positionId";
    }, {
        readonly type: "address";
        readonly name: "recipient";
    }, {
        readonly type: "address";
        readonly name: "developer";
    }];
}>;
//# sourceMappingURL=PositionLocked.d.ts.map