/**
 * Protocol Buffers wire format encoding/decoding
 * Implements a subset of proto3 wire format for our message types
 */
import type { GenericJsonRpc, RpcLinkPayload, WalletSendCalls, WalletSign } from '../types.js';
/**
 * Encode WalletSendCalls message
 */
export declare function encodeWalletSendCalls(value: WalletSendCalls): Uint8Array;
/**
 * Encode WalletSign message
 */
export declare function encodeWalletSign(value: WalletSign): Uint8Array;
/**
 * Encode GenericJsonRpc message
 */
export declare function encodeGenericJsonRpc(value: GenericJsonRpc): Uint8Array;
/**
 * Encode RpcLinkPayload message
 */
export declare function encodeRpcLinkPayload(value: RpcLinkPayload): Uint8Array;
/**
 * Decode a protobuf message
 * This is a simplified decoder that reads fields sequentially
 */
export declare function decodeRpcLinkPayload(buffer: Uint8Array): RpcLinkPayload;
//# sourceMappingURL=protobuf.d.ts.map