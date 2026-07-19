/**
 * Creates an event object for the AdapterDisabled event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { adapterDisabledEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  adapterDisabledEvent()
 * ],
 * });
 * ```
 */
export declare function adapterDisabledEvent(): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "AdapterDisabled";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "uint8";
        readonly name: "adapterType";
    }];
}>;
//# sourceMappingURL=AdapterDisabled.d.ts.map