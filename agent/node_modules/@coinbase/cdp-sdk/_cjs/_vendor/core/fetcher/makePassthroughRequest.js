"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePassthroughRequest = makePassthroughRequest;
const logger_js_1 = require("../logging/logger.js");
const join_js_1 = require("../url/join.js");
const EndpointSupplier_js_1 = require("./EndpointSupplier.js");
const getFetchFn_js_1 = require("./getFetchFn.js");
const makeRequest_js_1 = require("./makeRequest.js");
const requestWithRetries_js_1 = require("./requestWithRetries.js");
const Supplier_js_1 = require("./Supplier.js");
/**
 * Makes a passthrough HTTP request using the SDK's configuration (auth, retry, logging, etc.)
 * while mimicking the standard `fetch` API.
 *
 * @param input - The URL, path, or Request object. If a relative path, it will be resolved against the configured base URL.
 * @param init - Standard RequestInit options (method, headers, body, signal, etc.)
 * @param clientOptions - SDK client options (auth, default headers, logging, etc.)
 * @param requestOptions - Per-request overrides (timeout, retries, extra headers, abort signal).
 * @returns A standard Response object.
 */
async function makePassthroughRequest(input, init, clientOptions, requestOptions) {
    const logger = (0, logger_js_1.createLogger)(clientOptions.logging);
    // Extract URL and default init properties from Request object if provided
    let url;
    let effectiveInit = init;
    if (input instanceof Request) {
        url = input.url;
        // If no explicit init provided, extract properties from the Request object
        if (init == null) {
            effectiveInit = {
                method: input.method,
                headers: Object.fromEntries(input.headers.entries()),
                body: input.body,
                signal: input.signal,
                credentials: input.credentials,
                cache: input.cache,
                redirect: input.redirect,
                referrer: input.referrer,
                integrity: input.integrity,
                mode: input.mode,
            };
        }
    }
    else {
        url = input instanceof URL ? input.toString() : input;
    }
    // Resolve the base URL
    const baseUrl = (clientOptions.baseUrl != null ? await Supplier_js_1.Supplier.get(clientOptions.baseUrl) : undefined) ??
        (clientOptions.environment != null ? await Supplier_js_1.Supplier.get(clientOptions.environment) : undefined);
    // Determine the full URL
    let fullUrl;
    if (url.startsWith("http://") || url.startsWith("https://")) {
        fullUrl = url;
    }
    else if (baseUrl != null) {
        fullUrl = (0, join_js_1.join)(baseUrl, url);
    }
    else {
        fullUrl = url;
    }
    // Merge headers: SDK default headers -> auth headers -> user-provided headers
    const mergedHeaders = {};
    // Apply SDK default headers (resolve suppliers)
    if (clientOptions.headers != null) {
        for (const [key, value] of Object.entries(clientOptions.headers)) {
            const resolved = await EndpointSupplier_js_1.EndpointSupplier.get(value, { endpointMetadata: {} });
            if (resolved != null) {
                mergedHeaders[key.toLowerCase()] = `${resolved}`;
            }
        }
    }
    // Apply auth headers
    if (clientOptions.getAuthHeaders != null) {
        const authHeaders = await clientOptions.getAuthHeaders();
        for (const [key, value] of Object.entries(authHeaders)) {
            mergedHeaders[key.toLowerCase()] = value;
        }
    }
    // Apply user-provided headers from init
    if (effectiveInit?.headers != null) {
        const initHeaders = effectiveInit.headers instanceof Headers
            ? Object.fromEntries(effectiveInit.headers.entries())
            : Array.isArray(effectiveInit.headers)
                ? Object.fromEntries(effectiveInit.headers)
                : effectiveInit.headers;
        for (const [key, value] of Object.entries(initHeaders)) {
            if (value != null) {
                mergedHeaders[key.toLowerCase()] = value;
            }
        }
    }
    // Apply per-request option headers (highest priority)
    if (requestOptions?.headers != null) {
        for (const [key, value] of Object.entries(requestOptions.headers)) {
            mergedHeaders[key.toLowerCase()] = value;
        }
    }
    const method = effectiveInit?.method ?? "GET";
    const body = effectiveInit?.body;
    const timeoutInSeconds = requestOptions?.timeoutInSeconds ?? clientOptions.timeoutInSeconds;
    const timeoutMs = timeoutInSeconds != null ? timeoutInSeconds * 1000 : undefined;
    const maxRetries = requestOptions?.maxRetries ?? clientOptions.maxRetries;
    const abortSignal = requestOptions?.abortSignal ?? effectiveInit?.signal ?? undefined;
    const fetchFn = clientOptions.fetch ?? (await (0, getFetchFn_js_1.getFetchFn)());
    if (logger.isDebug()) {
        logger.debug("Making passthrough HTTP request", {
            method,
            url: fullUrl,
            hasBody: body != null,
        });
    }
    const response = await (0, requestWithRetries_js_1.requestWithRetries)(async () => (0, makeRequest_js_1.makeRequest)(fetchFn, fullUrl, method, mergedHeaders, body ?? undefined, timeoutMs, abortSignal, effectiveInit?.credentials === "include", undefined, // duplex
    false), maxRetries);
    if (logger.isDebug()) {
        logger.debug("Passthrough HTTP request completed", {
            method,
            url: fullUrl,
            statusCode: response.status,
        });
    }
    return response;
}
//# sourceMappingURL=makePassthroughRequest.js.map