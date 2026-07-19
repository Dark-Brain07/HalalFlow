/**
 * Creates an event object for the SwapRouterUpdated event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { swapRouterUpdatedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  swapRouterUpdatedEvent()
 * ],
 * });
 * ```
 */
export declare function swapRouterUpdatedEvent(): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "SwapRouterUpdated";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "swapRouter";
    }];
}>;
//# sourceMappingURL=SwapRouterUpdated.d.ts.map