"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = isObject;
exports.isString = isString;
exports.isObjectWithKeys = isObjectWithKeys;
exports.isRecord = isRecord;
/**
 * Checks if a value is an object.
 * @param value - The value to check.
 * @returns True if the value is an object, false otherwise.
 * @internal
 */
function isObject(value) {
    return typeof value === "object" && value !== null;
}
/**
 * Checks if a value is a string.
 * @param value - The value to check.
 * @returns True if the value is a string, false otherwise.
 * @internal
 */
function isString(value) {
    return typeof value === "string";
}
/**
 * Checks if a value is an object with specified keys.
 * @param value - The value to check.
 * @param keys - The keys to check for in the object. Defaults to an empty array.
 * @returns True if the value is an object with the specified keys, false otherwise.
 * @internal
 */
function isObjectWithKeys(value, keys = []) {
    return isObject(value) && keys.every((key) => key in value);
}
/**
 * Checks if a value is a record with string values.
 * @param value - The value to check.
 * @returns True if the value is a record with string values, false otherwise.
 * @internal
 */
function isRecord(value, guards) {
    const keyGuard = guards?.key ?? isString;
    const valueGuard = guards?.value ?? isString;
    return (isObject(value) &&
        !Array.isArray(value) &&
        Object.entries(value).every(([k, v]) => keyGuard(k) && valueGuard(v)));
}
//# sourceMappingURL=type-guards.js.map