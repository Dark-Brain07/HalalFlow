import type { AbiParameterToPrimitiveType } from "abitype";
/**
 * Represents the filters for the "ImplementationAdded" event.
 */
export type ImplementationAddedEventFilters = Partial<{
    implementation: AbiParameterToPrimitiveType<{
        type: "address";
        name: "implementation";
        indexed: true;
    }>;
}>;
/**
 * Creates an event object for the ImplementationAdded event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { implementationAddedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  implementationAddedEvent({
 *  implementation: ...,
 * })
 * ],
 * });
 * ```
 */
export declare function implementationAddedEvent(filters?: ImplementationAddedEventFilters): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "ImplementationAdded";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "bytes32";
        readonly name: "contractId";
    }, {
        readonly type: "address";
        readonly name: "implementation";
        readonly indexed: true;
    }, {
        readonly type: "uint8";
        readonly name: "implementationType";
    }, {
        readonly type: "uint8";
        readonly name: "createHook";
    }, {
        readonly type: "bytes";
        readonly name: "createHookData";
    }];
}>;
//# sourceMappingURL=ImplementationAdded.d.ts.map