"use strict";
/* ────────────────────────────────
   Enums
   ──────────────────────────────── */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionSpecRequest = exports.TransferSpecRequest = exports.CallSpecRequest = exports.ConstraintRequest = exports.UsageLimitRequest = exports.Condition = exports.LimitType = void 0;
var LimitType;
(function (LimitType) {
    LimitType[LimitType["Unlimited"] = 0] = "Unlimited";
    LimitType[LimitType["Lifetime"] = 1] = "Lifetime";
    LimitType[LimitType["Allowance"] = 2] = "Allowance";
})(LimitType || (exports.LimitType = LimitType = {}));
var Condition;
(function (Condition) {
    Condition[Condition["Unconstrained"] = 0] = "Unconstrained";
    Condition[Condition["Equal"] = 1] = "Equal";
    Condition[Condition["Greater"] = 2] = "Greater";
    Condition[Condition["Less"] = 3] = "Less";
    Condition[Condition["GreaterOrEqual"] = 4] = "GreaterOrEqual";
    Condition[Condition["LessOrEqual"] = 5] = "LessOrEqual";
    Condition[Condition["NotEqual"] = 6] = "NotEqual";
})(Condition || (exports.Condition = Condition = {}));
/* ────────────────────────────────
   EIP-712 structs
   ──────────────────────────────── */
exports.UsageLimitRequest = [
    { name: "limitType", type: "uint8" },
    { name: "limit", type: "uint256" },
    { name: "period", type: "uint256" },
];
exports.ConstraintRequest = [
    { name: "condition", type: "uint8" },
    { name: "index", type: "uint64" },
    { name: "refValue", type: "bytes32" },
    { name: "limit", type: "UsageLimit" },
];
exports.CallSpecRequest = [
    { name: "target", type: "address" },
    { name: "selector", type: "bytes4" },
    { name: "maxValuePerUse", type: "uint256" },
    { name: "valueLimit", type: "UsageLimit" },
    { name: "constraints", type: "Constraint[]" },
];
exports.TransferSpecRequest = [
    { name: "target", type: "address" },
    { name: "maxValuePerUse", type: "uint256" },
    { name: "valueLimit", type: "UsageLimit" },
];
exports.SessionSpecRequest = [
    { name: "signer", type: "address" },
    { name: "isWildcard", type: "bool" },
    { name: "expiresAt", type: "uint256" },
    { name: "callPolicies", type: "CallSpec[]" },
    { name: "transferPolicies", type: "TransferSpec[]" },
    { name: "uid", type: "bytes32" },
];
//# sourceMappingURL=types.js.map