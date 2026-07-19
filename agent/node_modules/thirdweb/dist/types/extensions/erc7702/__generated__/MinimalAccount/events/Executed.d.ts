import type { AbiParameterToPrimitiveType } from "abitype";
/**
 * Represents the filters for the "Executed" event.
 */
export type ExecutedEventFilters = Partial<{
    user: AbiParameterToPrimitiveType<{
        type: "address";
        name: "user";
        indexed: true;
    }>;
    signer: AbiParameterToPrimitiveType<{
        type: "address";
        name: "signer";
        indexed: true;
    }>;
    executor: AbiParameterToPrimitiveType<{
        type: "address";
        name: "executor";
        indexed: true;
    }>;
}>;
/**
 * Creates an event object for the Executed event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension ERC7702
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { executedEvent } from "thirdweb/extensions/erc7702";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  executedEvent({
 *  user: ...,
 *  signer: ...,
 *  executor: ...,
 * })
 * ],
 * });
 * ```
 */
export declare function executedEvent(filters?: ExecutedEventFilters): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "Executed";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "user";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "signer";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "executor";
        readonly indexed: true;
    }, {
        readonly type: "uint256";
        readonly name: "batchSize";
    }];
}>;
//# sourceMappingURL=Executed.d.ts.map