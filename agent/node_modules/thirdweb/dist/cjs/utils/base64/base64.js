"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBase64JSON = isBase64JSON;
exports.parseBase64String = parseBase64String;
const uint8_array_js_1 = require("../uint8-array.js");
const Base64Prefix = "data:application/json;base64";
/**
 * Checks if a given string is a base64 encoded JSON string.
 * @param input - The string to be checked.
 * @returns True if the input string starts with "data:application/json;base64", false otherwise.
 * @example
 * ```ts
 * isBase64JSON("data:application/json;base64,eyJ0ZXN0IjoiYmFzZTY0In0=")
 * // true
 * ```
 */
function isBase64JSON(input) {
    if (input.toLowerCase().startsWith(Base64Prefix)) {
        return true;
    }
    return false;
}
/**
 * Parses a base64 string and returns the decoded string.
 * @param input - The base64 string to parse.
 * @returns The decoded string.
 * @example
 * ```ts
 * parseBase64String("data:application/json;base64,eyJ0ZXN0IjoiYmFzZTY0In0=")
 * // '{"test":"base64"}'
 * ```
 */
function parseBase64String(input) {
    const commaIndex = input.indexOf(",");
    const base64 = input.slice(commaIndex + 1);
    return (0, uint8_array_js_1.base64ToString)(base64);
}
//# sourceMappingURL=base64.js.map