"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cls = cls;
/**
 * @internal
 * Utility for merging class names
 *
 * @example
 * ```ts
 * cls("foo", "bar", true, false, "baz") // "foo bar baz"
 * cls('foo', someCondition && "bar") // "foo bar" or "foo"
 * ```
 */
function cls(...classes) {
    return classes.filter((v) => typeof v === "string").join(" ");
}
//# sourceMappingURL=cls.js.map