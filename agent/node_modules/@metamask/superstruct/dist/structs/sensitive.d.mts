import { Struct } from "../struct.mjs";
import type { AnyStruct } from "../utils.mjs";
/**
 * Check whether a struct was created by `sensitive()`, or wraps one.
 *
 * @param struct - The struct to check.
 * @returns `true` if the struct carries the sensitive brand.
 */
export declare function isSensitiveStruct(struct: AnyStruct): boolean;
/**
 * Wrap a struct so that every failure it emits has any occurrence of
 * `parentObj` in `failure.branch` replaced with a sanitised copy where
 * `sensitiveKeys` are redacted. This prevents the parent object (which holds
 * secret field values) from leaking through sibling-field failures.
 *
 * The wrapping propagates recursively through `entries` so that failures from
 * deeply nested sibling structs are covered too.
 *
 * @param struct - The struct whose failures should be patched.
 * @param parentObj - The parent-object reference to look for in branch arrays.
 * @param sensitiveKeys - Keys to redact from `parentObj` when it appears.
 * @returns The wrapped struct.
 */
export declare function withRedactedBranch(struct: AnyStruct, parentObj: unknown, sensitiveKeys: string[]): AnyStruct;
/**
 * Wrap a struct so that any validation failure redacts the actual value from
 * the error message, `StructError.value`, and `StructError.branch`. Use this
 * for fields that hold secrets to prevent
 * sensitive material from leaking into error logs or external services.
 *
 * When composed with the `object()` or `type()` structs, sibling-field
 * failures will also have the parent object's sensitive keys redacted from
 * their branch.
 *
 * @example
 * ```ts
 * const MyStruct = object({ secret: sensitive(string()) });
 * assert({ secret: 123 }, MyStruct);
 * // throws: At path: secret -- Expected a value of type `string`,
 * //         but received: `***`
 * ```
 * @param struct - The struct to wrap.
 * @returns The wrapped struct with identical validation logic but redacted
 * failures.
 */
export declare function sensitive<Type, Schema>(struct: Struct<Type, Schema>): Struct<Type, Schema>;
//# sourceMappingURL=sensitive.d.mts.map