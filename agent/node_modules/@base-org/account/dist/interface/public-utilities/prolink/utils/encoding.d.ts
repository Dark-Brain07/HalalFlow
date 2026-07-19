/**
 * Field encoding helpers for canonical encoding
 */
/**
 * Encode an Ethereum address to 20 bytes
 * @param address - Hex address string (with or without 0x prefix)
 * @returns 20-byte address
 * @throws Error if address is not 20 bytes
 */
export declare function encodeAddress(address: string): Uint8Array;
/**
 * Decode 20-byte address to hex string
 * @param bytes - 20-byte address
 * @returns Hex address string with 0x prefix
 */
export declare function decodeAddress(bytes: Uint8Array): string;
/**
 * Encode an amount to minimal big-endian bytes (no leading zeros)
 * @param value - Amount as bigint or hex string
 * @returns Minimal big-endian bytes
 */
export declare function encodeAmount(value: bigint | string): Uint8Array;
/**
 * Decode minimal big-endian bytes to bigint
 * @param bytes - Minimal big-endian bytes (or empty for zero)
 * @returns Amount as bigint
 */
export declare function decodeAmount(bytes: Uint8Array): bigint;
/**
 * Encode capabilities map to protobuf format
 * @param caps - Capabilities object
 * @returns Map with UTF-8 JSON-encoded values
 */
export declare function encodeCapabilities(caps: Record<string, unknown>): Map<string, Uint8Array>;
/**
 * Decode capabilities map from protobuf format
 * @param map - Map with UTF-8 JSON-encoded values
 * @returns Capabilities object
 */
export declare function decodeCapabilities(map: Map<string, Uint8Array>): Record<string, unknown>;
/**
 * Pad a value to 32 bytes (for EIP-712 encoding)
 * @param bytes - Value to pad
 * @returns 32-byte padded value
 */
export declare function pad32(bytes: Uint8Array): Uint8Array;
/**
 * Convert bytes to hex string with 0x prefix
 * Minimal encoding: no leading zeros unless value is zero
 * @param bytes - Bytes to convert
 * @returns Hex string
 */
export declare function bytesToHex(bytes: Uint8Array): string;
/**
 * Convert hex string to bytes
 * @param hex - Hex string (with or without 0x prefix)
 * @returns Bytes
 */
export declare function hexToBytes(hex: string): Uint8Array;
//# sourceMappingURL=encoding.d.ts.map