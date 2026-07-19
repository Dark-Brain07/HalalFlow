"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUTF8JSONString = isUTF8JSONString;
exports.parseUTF8String = parseUTF8String;
const UTF8Prefix = "data:application/json;utf-8";
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
function isUTF8JSONString(input) {
    if (input.toLowerCase().startsWith(UTF8Prefix)) {
        return true;
    }
    return false;
}
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
function parseUTF8String(input) {
    const commaIndex = input.indexOf(",");
    const utf8 = input.slice(commaIndex + 1);
    try {
        // try to decode the UTF-8 string, if it fails, return the original string
        return decodeURIComponent(utf8);
    }
    catch {
        return utf8;
    }
}
//# sourceMappingURL=utf8.js.map