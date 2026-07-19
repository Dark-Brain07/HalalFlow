import type { AsyncStorage } from "../utils/storage/AsyncStorage.js";
import type { RequestedPaymentPayload } from "./schemas.js";
/**
 * Cached permit signature data structure
 */
type CachedPermitSignature = {
    payload: RequestedPaymentPayload;
    deadline: string;
    maxAmount: string;
};
/**
 * Parameters for generating a permit cache key
 */
export type PermitCacheKeyParams = {
    chainId: number;
    asset: string;
    owner: string;
    spender: string;
};
/**
 * Retrieves a cached permit signature from storage
 * @param storage - The AsyncStorage instance to use
 * @param params - The parameters identifying the cached signature
 * @returns The cached signature data or null if not found
 */
export declare function getPermitSignatureFromCache(storage: AsyncStorage, params: PermitCacheKeyParams): Promise<CachedPermitSignature | null>;
/**
 * Saves a permit signature to storage cache
 * @param storage - The AsyncStorage instance to use
 * @param params - The parameters identifying the signature
 * @param payload - The signed payment payload to cache
 * @param deadline - The deadline timestamp of the permit
 * @param maxAmount - The maximum amount authorized
 */
export declare function savePermitSignatureToCache(storage: AsyncStorage, params: PermitCacheKeyParams, payload: RequestedPaymentPayload, deadline: string, maxAmount: string): Promise<void>;
/**
 * Clears a cached permit signature from storage
 * @param storage - The AsyncStorage instance to use
 * @param params - The parameters identifying the cached signature
 */
export declare function clearPermitSignatureFromCache(storage: AsyncStorage, params: PermitCacheKeyParams): Promise<void>;
export {};
//# sourceMappingURL=permitSignatureStorage.d.ts.map