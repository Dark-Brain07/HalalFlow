/**
 * Checks if a value is an object.
 * @param value - The value to check.
 * @returns True if the value is an object, false otherwise.
 * @internal
 */
export declare function isObject(value: unknown): value is object;
/**
 * Checks if a value is a string.
 * @param value - The value to check.
 * @returns True if the value is a string, false otherwise.
 * @internal
 */
export declare function isString(value: unknown): value is string;
/**
 * Checks if a value is an object with specified keys.
 * @param value - The value to check.
 * @param keys - The keys to check for in the object. Defaults to an empty array.
 * @returns True if the value is an object with the specified keys, false otherwise.
 * @internal
 */
export declare function isObjectWithKeys<key extends string>(value: unknown, keys?: key[]): value is Record<key, unknown>;
/**
 * Checks if a value is a record with string values.
 * @param value - The value to check.
 * @returns True if the value is a record with string values, false otherwise.
 * @internal
 */
export declare function isRecord<K extends string | number | symbol = string, V = string, T extends Record<K, V> = Record<K, V>>(value: unknown, guards?: {
    key?: (k: unknown) => k is K;
    value?: (v: unknown) => v is V;
}): value is T;
//# sourceMappingURL=type-guards.d.ts.map