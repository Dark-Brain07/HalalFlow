/**
 * Compress payload with Brotli if beneficial
 * @param data - Data to compress
 * @returns Object with compressed data and flag byte
 */
export declare function compressPayload(data: Uint8Array): Promise<{
    compressed: Uint8Array;
    flag: 0x00 | 0x01;
}>;
/**
 * Decompress payload based on flag byte
 * @param data - Data with flag byte prefix
 * @returns Decompressed data
 * @throws Error if compression flag is unknown or decompression fails
 */
export declare function decompressPayload(data: Uint8Array): Promise<Uint8Array>;
//# sourceMappingURL=compression.node.d.ts.map