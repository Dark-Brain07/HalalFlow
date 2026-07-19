import type { AbiParameterToPrimitiveType } from "abitype";
/**
 * Represents the filters for the "SessionCreated" event.
 */
export type SessionCreatedEventFilters = Partial<{
    user: AbiParameterToPrimitiveType<{
        type: "address";
        name: "user";
        indexed: true;
    }>;
    newSigner: AbiParameterToPrimitiveType<{
        type: "address";
        name: "newSigner";
        indexed: true;
    }>;
}>;
/**
 * Creates an event object for the SessionCreated event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension ERC7702
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { sessionCreatedEvent } from "thirdweb/extensions/erc7702";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  sessionCreatedEvent({
 *  user: ...,
 *  newSigner: ...,
 * })
 * ],
 * });
 * ```
 */
export declare function sessionCreatedEvent(filters?: SessionCreatedEventFilters): import("../../../../../event/prepare-event.js").PreparedEvent<{
    readonly name: "SessionCreated";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly type: "address";
        readonly name: "user";
        readonly indexed: true;
    }, {
        readonly type: "address";
        readonly name: "newSigner";
        readonly indexed: true;
    }, {
        readonly type: "tuple";
        readonly components: readonly [{
            readonly type: "address";
            readonly name: "signer";
        }, {
            readonly type: "bool";
            readonly name: "isWildcard";
        }, {
            readonly type: "uint256";
            readonly name: "expiresAt";
        }, {
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly type: "Error:";
                readonly name: ["Error: Identifier \"Unbalanced parentheses. \" (uint8 condition, uint64 index, bytes32 refValue, (uint8 limitType, uint256 limit, uint256 period) limit\" has too many opening parentheses.\" cannot contain whitespace."];
            }];
            readonly name: ["Error: Identifier \"constraints)[] callPolicies\" cannot contain whitespace."];
        }, {
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "target";
            }, {
                readonly type: "uint256";
                readonly name: "maxValuePerUse";
            }, {
                readonly type: "tuple";
                readonly components: readonly [{
                    readonly type: "uint8";
                    readonly name: "limitType";
                }, {
                    readonly type: "uint256";
                    readonly name: "limit";
                }, {
                    readonly type: "uint256";
                    readonly name: "period";
                }];
                readonly name: "valueLimit";
            }];
            readonly name: "transferPolicies";
        }, {
            readonly type: "bytes32";
            readonly name: "uid";
        }];
        readonly name: "sessionSpec";
    }];
}>;
//# sourceMappingURL=SessionCreated.d.ts.map