import type { AbiParameterToPrimitiveType } from "abitype";
/**
 * Represents the filters for the "Created" event.
 */
export type CreatedEventFilters = Partial<{
    creator: AbiParameterToPrimitiveType<{
        type: "address";
        name: "creator";
        indexed: true;
    }>;
    asset: AbiParameterToPrimitiveType<{
        type: "address";
        name: "asset";
        indexed: true;
    }>;
}>;
/**
 * Creates an event object for the Created event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { createdEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  createdEvent({
 *  creator: ...,
 *  asset: ...,
 * })
 * ],
 * });
 * ```
 */
export declare function createdEvent(filters?: CreatedEventFilters): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "Created";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "contractId";
    }, {
        readonly type: "address";
        readonly name: "creator";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "asset";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "developer";
    }, {
        readonly type: "bytes";
        readonly name: "hookData";
    }];
}>;
//# sourceMappingURL=Created.d.ts.map