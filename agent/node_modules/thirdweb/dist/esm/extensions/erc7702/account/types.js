/* ────────────────────────────────
   Enums
   ──────────────────────────────── */
export var LimitType;
(function (LimitType) {
    LimitType[LimitType["Unlimited"] = 0] = "Unlimited";
    LimitType[LimitType["Lifetime"] = 1] = "Lifetime";
    LimitType[LimitType["Allowance"] = 2] = "Allowance";
})(LimitType || (LimitType = {}));
export var Condition;
(function (Condition) {
    Condition[Condition["Unconstrained"] = 0] = "Unconstrained";
    Condition[Condition["Equal"] = 1] = "Equal";
    Condition[Condition["Greater"] = 2] = "Greater";
    Condition[Condition["Less"] = 3] = "Less";
    Condition[Condition["GreaterOrEqual"] = 4] = "GreaterOrEqual";
    Condition[Condition["LessOrEqual"] = 5] = "LessOrEqual";
    Condition[Condition["NotEqual"] = 6] = "NotEqual";
})(Condition || (Condition = {}));
/* ────────────────────────────────
   EIP-712 structs
   ──────────────────────────────── */
export const UsageLimitRequest = [
    { name: "limitType", type: "uint8" },
    { name: "limit", type: "uint256" },
    { name: "period", type: "uint256" },
];
export const ConstraintRequest = [
    { name: "condition", type: "uint8" },
    { name: "index", type: "uint64" },
    { name: "refValue", type: "bytes32" },
    { name: "limit", type: "UsageLimit" },
];
export const CallSpecRequest = [
    { name: "target", type: "address" },
    { name: "selector", type: "bytes4" },
    { name: "maxValuePerUse", type: "uint256" },
    { name: "valueLimit", type: "UsageLimit" },
    { name: "constraints", type: "Constraint[]" },
];
export const TransferSpecRequest = [
    { name: "target", type: "address" },
    { name: "maxValuePerUse", type: "uint256" },
    { name: "valueLimit", type: "UsageLimit" },
];
export const SessionSpecRequest = [
    { name: "signer", type: "address" },
    { name: "isWildcard", type: "bool" },
    { name: "expiresAt", type: "uint256" },
    { name: "callPolicies", type: "CallSpec[]" },
    { name: "transferPolicies", type: "TransferSpec[]" },
    { name: "uid", type: "bytes32" },
];
//# sourceMappingURL=types.js.map