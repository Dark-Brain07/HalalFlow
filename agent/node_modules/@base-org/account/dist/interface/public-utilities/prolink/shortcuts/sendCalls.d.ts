/**
 * Shortcut 1: wallet_sendCalls encoder/decoder
 * Optimizes EIP-5792 wallet_sendCalls requests
 */
import type { WalletSendCalls } from '../types.js';
type SendCallsParams = {
    version?: string;
    chainId: string;
    from?: string;
    calls: Array<{
        to: string;
        data?: string;
        value?: string;
    }>;
    capabilities?: Record<string, unknown>;
};
/**
 * Encode wallet_sendCalls request
 * @param params - EIP-5792 wallet_sendCalls parameters
 * @returns WalletSendCalls message
 */
export declare function encodeWalletSendCalls(params: SendCallsParams): WalletSendCalls;
/**
 * Decode wallet_sendCalls request
 * @param payload - WalletSendCalls message
 * @param chainId - Chain ID from top-level payload
 * @returns EIP-5792 wallet_sendCalls parameters
 */
export declare function decodeWalletSendCalls(payload: WalletSendCalls, chainId: number): SendCallsParams;
export {};
//# sourceMappingURL=sendCalls.d.ts.map