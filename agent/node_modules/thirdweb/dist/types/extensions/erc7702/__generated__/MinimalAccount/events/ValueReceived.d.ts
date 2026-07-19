import type { AbiParameterToPrimitiveType } from "abitype";
/**
 * Represents the filters for the "ValueReceived" event.
 */
export type ValueReceivedEventFilters = Partial<{
    user: AbiParameterToPrimitiveType<{
        type: "address";
        name: "user";
        indexed: true;
    }>;
    from: AbiParameterToPrimitiveType<{
        type: "address";
        name: "from";
        indexed: true;
    }>;
}>;
/**
 * Creates an event object for the ValueReceived event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension ERC7702
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { valueReceivedEvent } from "thirdweb/extensions/erc7702";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  valueReceivedEvent({
 *  user: ...,
 *  from: ...,
 * })
 * ],
 * });
 * ```
 */
export declare function valueReceivedEvent(filters?: ValueReceivedEventFilters): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "ValueReceived";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "user";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "from";
        readonly indexed: true;
    }, {
        readonly type: "uint256";
        readonly name: "value";
    }];
}>;
//# sourceMappingURL=ValueReceived.d.ts.map