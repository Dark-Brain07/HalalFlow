import type { AbiParameterToPrimitiveType } from "abitype";
/**
 * Represents the filters for the "FeeConfigUpdatedBySignature" event.
 */
export type FeeConfigUpdatedBySignatureEventFilters = Partial<{
    signer: AbiParameterToPrimitiveType<{
        type: "address";
        name: "signer";
        indexed: true;
    }>;
    target: AbiParameterToPrimitiveType<{
        type: "address";
        name: "target";
        indexed: true;
    }>;
    action: AbiParameterToPrimitiveType<{
        type: "bytes4";
        name: "action";
        indexed: true;
    }>;
}>;
/**
 * Creates an event object for the FeeConfigUpdatedBySignature event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { feeConfigUpdatedBySignatureEvent } from "thirdweb/extensions/tokens";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  feeConfigUpdatedBySignatureEvent({
 *  signer: ...,
 *  target: ...,
 *  action: ...,
 * })
 * ],
 * });
 * ```
 */
export declare function feeConfigUpdatedBySignatureEvent(filters?: FeeConfigUpdatedBySignatureEventFilters): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "FeeConfigUpdatedBySignature";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "signer";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "target";
        readonly indexed: true;
    }, {
        readonly type: "bytes4";
        readonly name: "action";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "recipient";
    }, {
        readonly type: "uint8";
        readonly name: "feeType";
    }, {
        readonly type: "uint256";
        readonly name: "value";
    }];
}>;
//# sourceMappingURL=FeeConfigUpdatedBySignature.d.ts.map