/**
 * Shortcut 0: Generic JSON-RPC encoder/decoder
 * Universal fallback for any JSON-RPC method
 */
import type { GenericJsonRpc } from '../types.js';
/**
 * Encode a generic JSON-RPC request
 * @param method - JSON-RPC method name
 * @param params - Parameters (any JSON-serializable value)
 * @returns GenericJsonRpc message
 */
export declare function encodeGenericRpc(method: string, params: unknown): GenericJsonRpc;
/**
 * Decode a generic JSON-RPC request
 * @param payload - GenericJsonRpc message
 * @returns Decoded method and params
 */
export declare function decodeGenericRpc(payload: GenericJsonRpc): {
    method: string;
    params: unknown;
};
//# sourceMappingURL=generic.d.ts.map