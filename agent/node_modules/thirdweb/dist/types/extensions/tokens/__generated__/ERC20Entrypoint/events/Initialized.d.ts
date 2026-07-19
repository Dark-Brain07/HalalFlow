/**
 * Creates an event object for the Initialized event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { initializedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  initializedEvent()
 * ],
 * });
 * ```
 */
export declare function initializedEvent(): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "Initialized";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "uint64";
        readonly name: "version";
    }];
}>;
//# sourceMappingURL=Initialized.d.ts.map