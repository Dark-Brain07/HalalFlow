"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRequest = void 0;
exports.isCacheNoStoreSupported = isCacheNoStoreSupported;
exports.resetCacheNoStoreSupported = resetCacheNoStoreSupported;
const signals_js_1 = require("./signals.js");
/**
 * Cached result of checking whether the current runtime supports
 * the `cache` option in `Request`. Some runtimes (e.g. Cloudflare Workers)
 * throw a TypeError when this option is used.
 */
let _cacheNoStoreSupported;
function isCacheNoStoreSupported() {
    if (_cacheNoStoreSupported != null) {
        return _cacheNoStoreSupported;
    }
    try {
        new Request("http://localhost", { cache: "no-store" });
        _cacheNoStoreSupported = true;
    }
    catch {
        _cacheNoStoreSupported = false;
    }
    return _cacheNoStoreSupported;
}
/**
 * Reset the cached result of `isCacheNoStoreSupported`. Exposed for testing only.
 */
function resetCacheNoStoreSupported() {
    _cacheNoStoreSupported = undefined;
}
const makeRequest = async (fetchFn, url, method, headers, requestBody, timeoutMs, abortSignal, withCredentials, duplex, disableCache) => {
    const signals = [];
    let timeoutAbortId;
    if (timeoutMs != null) {
        const { signal, abortId } = (0, signals_js_1.getTimeoutSignal)(timeoutMs);
        timeoutAbortId = abortId;
        signals.push(signal);
    }
    if (abortSignal != null) {
        signals.push(abortSignal);
    }
    const newSignals = (0, signals_js_1.anySignal)(signals);
    const response = await fetchFn(url, {
        method: method,
        headers,
        body: requestBody,
        signal: newSignals,
        credentials: withCredentials ? "include" : undefined,
        // @ts-ignore
        duplex,
        ...(disableCache && isCacheNoStoreSupported() ? { cache: "no-store" } : {}),
    });
    if (timeoutAbortId != null) {
        clearTimeout(timeoutAbortId);
    }
    return response;
};
exports.makeRequest = makeRequest;
//# sourceMappingURL=makeRequest.js.map