/**
 * Creates an event object for the FeeRecipientUpdated event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { feeRecipientUpdatedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  feeRecipientUpdatedEvent()
 * ],
 * });
 * ```
 */
export declare function feeRecipientUpdatedEvent(): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "FeeRecipientUpdated";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "feeRecipient";
    }];
}>;
//# sourceMappingURL=FeeRecipientUpdated.d.ts.map