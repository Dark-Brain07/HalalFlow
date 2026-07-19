/**
 * Encode a Uint8Array to Base64url without padding
 * @param data - Data to encode
 * @returns Base64url encoded string without padding
 */
export declare function encodeBase64url(data: Uint8Array): string;
/**
 * Decode a Base64url string to Uint8Array
 * Accepts strings with or without padding
 * @param payload - Base64url encoded string
 * @returns Decoded Uint8Array
 * @throws Error if payload contains invalid characters
 */
export declare function decodeBase64url(payload: string): Uint8Array;
//# sourceMappingURL=base64url.d.ts.map