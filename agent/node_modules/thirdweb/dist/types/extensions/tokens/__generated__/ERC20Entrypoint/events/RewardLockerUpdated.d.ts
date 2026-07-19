/**
 * Creates an event object for the RewardLockerUpdated event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { rewardLockerUpdatedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  rewardLockerUpdatedEvent()
 * ],
 * });
 * ```
 */
export declare function rewardLockerUpdatedEvent(): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "RewardLockerUpdated";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "locker";
    }];
}>;
//# sourceMappingURL=RewardLockerUpdated.d.ts.map