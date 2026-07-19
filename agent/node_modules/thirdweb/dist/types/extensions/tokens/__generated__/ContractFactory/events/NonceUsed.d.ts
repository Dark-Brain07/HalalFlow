/**
 * Creates an event object for the NonceUsed event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { nonceUsedEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  nonceUsedEvent()
 * ],
 * });
 * ```
 */
export declare function nonceUsedEvent(): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "NonceUsed";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "account";
    }, {
        readonly type: "uint256";
        readonly name: "nonce";
    }];
}>;
//# sourceMappingURL=NonceUsed.d.ts.map