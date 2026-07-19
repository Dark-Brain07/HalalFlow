import type { AbiParameterToPrimitiveType } from "abitype";
/**
 * Represents the filters for the "RewardCollected" event.
 */
export type RewardCollectedEventFilters = Partial<{
    asset: AbiParameterToPrimitiveType<{
        type: "address";
        name: "asset";
        indexed: true;
    }>;
}>;
/**
 * Creates an event object for the RewardCollected event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { rewardCollectedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  rewardCollectedEvent({
 *  asset: ...,
 * })
 * ],
 * });
 * ```
 */
export declare function rewardCollectedEvent(filters?: RewardCollectedEventFilters): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "RewardCollected";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "owner";
    }, {
        readonly type: "address";
        readonly name: "asset";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "positionManager";
    }, {
        readonly type: "uint256";
        readonly name: "positionId";
    }, {
        readonly type: "address";
        readonly name: "recipient";
    }, {
        readonly type: "address";
        readonly name: "developer";
    }, {
        readonly type: "address";
        readonly name: "token0";
    }, {
        readonly type: "uint256";
        readonly name: "recipientAmount0";
    }, {
        readonly type: "uint256";
        readonly name: "developerAmount0";
    }, {
        readonly type: "uint256";
        readonly name: "feeAmount0";
    }, {
        readonly type: "address";
        readonly name: "token1";
    }, {
        readonly type: "uint256";
        readonly name: "recipientAmount1";
    }, {
        readonly type: "uint256";
        readonly name: "developerAmount1";
    }, {
        readonly type: "uint256";
        readonly name: "feeAmount1";
    }];
}>;
//# sourceMappingURL=RewardCollected.d.ts.map