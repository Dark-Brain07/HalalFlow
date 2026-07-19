/**
 * Shortcut 2: wallet_sign encoder/decoder
 * Optimizes EIP-7871 wallet_sign requests with EIP-712 typed data
 */
import type { WalletSign } from '../types.js';
type TypedData = {
    types: Record<string, Array<{
        name: string;
        type: string;
    }>>;
    domain: {
        name?: string;
        version?: string;
        chainId?: number | string;
        verifyingContract?: string;
    };
    primaryType: string;
    message: Record<string, unknown>;
};
type WalletSignParams = {
    version?: string;
    chainId: string;
    type?: string | number;
    data: TypedData;
    capabilities?: Record<string, unknown>;
};
/**
 * Encode wallet_sign request
 * @param params - EIP-7871 wallet_sign parameters
 * @returns WalletSign message
 */
export declare function encodeWalletSign(params: WalletSignParams): WalletSign;
/**
 * Decode wallet_sign request
 * @param payload - WalletSign message
 * @param chainId - Chain ID from top-level payload
 * @returns EIP-7871 wallet_sign parameters
 */
export declare function decodeWalletSign(payload: WalletSign, chainId: number): WalletSignParams;
export {};
//# sourceMappingURL=sign.d.ts.map