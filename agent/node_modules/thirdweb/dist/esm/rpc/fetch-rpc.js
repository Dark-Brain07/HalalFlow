import { getClientFetch } from "../utils/fetch.js";
import { stringify } from "../utils/json.js";
/**
 * @internal
 */
export async function fetchRpc(rpcUrl, client, options) {
    const response = await getClientFetch(client)(rpcUrl, {
        body: stringify(options.requests),
        headers: {
            ...client.config?.rpc?.fetch?.headers,
            "Content-Type": "application/json",
        },
        keepalive: client.config?.rpc?.fetch?.keepalive,
        method: "POST",
        requestTimeoutMs: options.requestTimeoutMs ?? client.config?.rpc?.fetch?.requestTimeoutMs,
    });
    if (!response.ok) {
        const error = await response.text().catch(() => null);
        throw new Error(`RPC request failed with status ${response.status} - ${response.statusText}: ${error || "unknown error"}`);
    }
    return await response.json();
}
/**
 * @internal
 */
export async function fetchSingleRpc(rpcUrl, client, options) {
    const response = await getClientFetch(client)(rpcUrl, {
        body: stringify(options.request),
        headers: {
            ...(client.config?.rpc?.fetch?.headers || {}),
            "Content-Type": "application/json",
        },
        keepalive: client.config?.rpc?.fetch?.keepalive,
        method: "POST",
        requestTimeoutMs: options.requestTimeoutMs ?? client.config?.rpc?.fetch?.requestTimeoutMs,
    });
    if (!response.ok) {
        const error = await response.text().catch(() => null);
        throw new Error(`RPC request failed with status ${response.status} - ${response.statusText}: ${error || "unknown error"}`);
    }
    return await response.json();
}
//# sourceMappingURL=fetch-rpc.js.map