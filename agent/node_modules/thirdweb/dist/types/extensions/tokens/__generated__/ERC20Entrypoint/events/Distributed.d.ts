/**
 * Creates an event object for the Distributed event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { distributedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  distributedEvent()
 * ],
 * });
 * ```
 */
export declare function distributedEvent(): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "Distributed";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "asset";
    }, {
        readonly type: "uint256";
        readonly name: "recipientCount";
    }, {
        readonly type: "uint256";
        readonly name: "totalAmount";
    }];
}>;
//# sourceMappingURL=Distributed.d.ts.map