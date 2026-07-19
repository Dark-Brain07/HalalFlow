/**
 * Creates an event object for the AirdropUpdated event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { airdropUpdatedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  airdropUpdatedEvent()
 * ],
 * });
 * ```
 */
export declare function airdropUpdatedEvent(): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "AirdropUpdated";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "airdrop";
    }];
}>;
//# sourceMappingURL=AirdropUpdated.d.ts.map