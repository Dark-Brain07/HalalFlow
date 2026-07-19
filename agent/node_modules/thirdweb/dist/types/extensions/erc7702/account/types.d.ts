export declare enum LimitType {
    Unlimited = 0,
    Lifetime = 1,
    Allowance = 2
}
export declare enum Condition {
    Unconstrained = 0,
    Equal = 1,
    Greater = 2,
    Less = 3,
    GreaterOrEqual = 4,
    LessOrEqual = 5,
    NotEqual = 6
}
interface UsageLimitInput {
    limitType: LimitType;
    limit: bigint;
    period: bigint;
}
interface ConstraintInput {
    condition: Condition;
    index: bigint;
    refValue: `0x${string}`;
    limit?: UsageLimitInput;
}
export interface CallSpecInput {
    target: `0x${string}`;
    selector: `0x${string}`;
    maxValuePerUse?: bigint;
    valueLimit?: UsageLimitInput;
    constraints?: ConstraintInput[];
}
export interface TransferSpecInput {
    target: `0x${string}`;
    maxValuePerUse?: bigint;
    valueLimit?: UsageLimitInput;
}
export declare const UsageLimitRequest: readonly [{
    readonly name: "limitType";
    readonly type: "uint8";
}, {
    readonly name: "limit";
    readonly type: "uint256";
}, {
    readonly name: "period";
    readonly type: "uint256";
}];
export declare const ConstraintRequest: readonly [{
    readonly name: "condition";
    readonly type: "uint8";
}, {
    readonly name: "index";
    readonly type: "uint64";
}, {
    readonly name: "refValue";
    readonly type: "bytes32";
}, {
    readonly name: "limit";
    readonly type: "UsageLimit";
}];
export declare const CallSpecRequest: readonly [{
    readonly name: "target";
    readonly type: "address";
}, {
    readonly name: "selector";
    readonly type: "bytes4";
}, {
    readonly name: "maxValuePerUse";
    readonly type: "uint256";
}, {
    readonly name: "valueLimit";
    readonly type: "UsageLimit";
}, {
    readonly name: "constraints";
    readonly type: "Constraint[]";
}];
export declare const TransferSpecRequest: readonly [{
    readonly name: "target";
    readonly type: "address";
}, {
    readonly name: "maxValuePerUse";
    readonly type: "uint256";
}, {
    readonly name: "valueLimit";
    readonly type: "UsageLimit";
}];
export declare const SessionSpecRequest: readonly [{
    readonly name: "signer";
    readonly type: "address";
}, {
    readonly name: "isWildcard";
    readonly type: "bool";
}, {
    readonly name: "expiresAt";
    readonly type: "uint256";
}, {
    readonly name: "callPolicies";
    readonly type: "CallSpec[]";
}, {
    readonly name: "transferPolicies";
    readonly type: "TransferSpec[]";
}, {
    readonly name: "uid";
    readonly type: "bytes32";
}];
export {};
//# sourceMappingURL=types.d.ts.map