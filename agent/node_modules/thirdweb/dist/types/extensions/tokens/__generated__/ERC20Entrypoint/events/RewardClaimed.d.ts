/**
 * Creates an event object for the RewardClaimed event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { rewardClaimedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  rewardClaimedEvent()
 * ],
 * });
 * ```
 */
export declare function rewardClaimedEvent(): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "RewardClaimed";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "asset";
    }, {
        readonly type: "address";
        readonly name: "claimer";
    }];
}>;
//# sourceMappingURL=RewardClaimed.d.ts.map