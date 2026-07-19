declare const UTF8Prefix: "data:application/json;utf-8";
type UTF8String = `${typeof UTF8Prefix},${string}`;
/**
 * Checks if a given string is a UTF-8 encoded JSON string.
 * @param input - The string to be checked.
 * @returns True if the input string starts with "data:application/json;utf-8", false otherwise.
 * @example
 * ```ts
 * isUTF8JSONString("data:application/json;utf-8,{ \"test\": \"utf8\" }")
 * // true
 * ```
 */
export declare function isUTF8JSONString(input: string): input is UTF8String;
/**
 * Parses a UTF-8 string and returns the decoded string.
 * @param input - The UTF-8 string to parse.
 * @returns The decoded string.
 * @example
 * ```ts
 * parseUTF8String("data:application/json;utf-8,{ \"test\": \"utf8\" }")
 * // '{"test":"utf8"}'
 * ```
 */
export declare function parseUTF8String(input: UTF8String): string;
export {};
//# sourceMappingURL=utf8.d.ts.map