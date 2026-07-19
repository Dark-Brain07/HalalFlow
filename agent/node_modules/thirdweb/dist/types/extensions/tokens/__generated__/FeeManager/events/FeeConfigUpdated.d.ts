import type { AbiParameterToPrimitiveType } from "abitype";
/**
 * Represents the filters for the "FeeConfigUpdated" event.
 */
export type FeeConfigUpdatedEventFilters = Partial<{
    target: AbiParameterToPrimitiveType<{
        type: "address";
        name: "target";
        indexed: true;
    }>;
    action: AbiParameterToPrimitiveType<{
        type: "bytes4";
        name: "action";
        indexed: true;
    }>;
}>;
/**
 * Creates an event object for the FeeConfigUpdated event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { feeConfigUpdatedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  feeConfigUpdatedEvent({
 *  target: ...,
 *  action: ...,
 * })
 * ],
 * });
 * ```
 */
export declare function feeConfigUpdatedEvent(filters?: FeeConfigUpdatedEventFilters): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "FeeConfigUpdated";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "target";
        readonly indexed: true;
    }, {
        readonly type: "bytes4";
        readonly name: "action";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "recipient";
    }, {
        readonly type: "uint8";
        readonly name: "feeType";
    }, {
        readonly type: "uint256";
        readonly name: "value";
    }];
}>;
//# sourceMappingURL=FeeConfigUpdated.d.ts.map