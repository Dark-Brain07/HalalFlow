"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPermitSignatureFromCache = getPermitSignatureFromCache;
exports.savePermitSignatureToCache = savePermitSignatureToCache;
exports.clearPermitSignatureFromCache = clearPermitSignatureFromCache;
const CACHE_KEY_PREFIX = "x402:permit";
/**
 * Generates a cache key for permit signature storage
 * @param params - The parameters to generate the cache key from
 * @returns The cache key string
 */
function getPermitCacheKey(params) {
    return `${CACHE_KEY_PREFIX}:${params.chainId}:${params.asset.toLowerCase()}:${params.owner.toLowerCase()}:${params.spender.toLowerCase()}`;
}
/**
 * Retrieves a cached permit signature from storage
 * @param storage - The AsyncStorage instance to use
 * @param params - The parameters identifying the cached signature
 * @returns The cached signature data or null if not found
 */
async function getPermitSignatureFromCache(storage, params) {
    try {
        const key = getPermitCacheKey(params);
        const cached = await storage.getItem(key);
        if (!cached) {
            return null;
        }
        return JSON.parse(cached);
    }
    catch {
        return null;
    }
}
/**
 * Saves a permit signature to storage cache
 * @param storage - The AsyncStorage instance to use
 * @param params - The parameters identifying the signature
 * @param payload - The signed payment payload to cache
 * @param deadline - The deadline timestamp of the permit
 * @param maxAmount - The maximum amount authorized
 */
async function savePermitSignatureToCache(storage, params, payload, deadline, maxAmount) {
    try {
        const key = getPermitCacheKey(params);
        const data = {
            payload,
            deadline,
            maxAmount,
        };
        await storage.setItem(key, JSON.stringify(data));
    }
    catch {
        // Silently fail - caching is optional
    }
}
/**
 * Clears a cached permit signature from storage
 * @param storage - The AsyncStorage instance to use
 * @param params - The parameters identifying the cached signature
 */
async function clearPermitSignatureFromCache(storage, params) {
    try {
        const key = getPermitCacheKey(params);
        await storage.removeItem(key);
    }
    catch {
        // Silently fail
    }
}
//# sourceMappingURL=permitSignatureStorage.js.map