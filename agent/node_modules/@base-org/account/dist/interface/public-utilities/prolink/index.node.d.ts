import type { ProlinkDecoded, ProlinkRequest } from './types.js';
/**
 * Encode a JSON-RPC request to prolink format
 * @param request - JSON-RPC request with method, params, optional chainId and capabilities
 * @returns Base64url-encoded prolink payload
 */
export declare function encodeProlink(request: ProlinkRequest): Promise<string>;
/**
 * Decode a prolink payload to JSON-RPC request
 * @param payload - Base64url-encoded prolink payload
 * @returns Decoded JSON-RPC request
 */
export declare function decodeProlink(payload: string): Promise<ProlinkDecoded>;
export type { ProlinkDecoded, ProlinkRequest } from './types.js';
//# sourceMappingURL=index.node.d.ts.map