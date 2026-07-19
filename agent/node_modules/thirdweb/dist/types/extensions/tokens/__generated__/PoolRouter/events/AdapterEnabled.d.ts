/**
 * Creates an event object for the AdapterEnabled event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { adapterEnabledEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  adapterEnabledEvent()
 * ],
 * });
 * ```
 */
export declare function adapterEnabledEvent(): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "AdapterEnabled";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "uint8";
        readonly name: "adapterType";
    }, {
        readonly type: "address";
        readonly name: "rewardLocker";
    }];
}>;
//# sourceMappingURL=AdapterEnabled.d.ts.map