import { client } from "./client/client.gen.js";
export function configure(options) {
    client.setConfig({
        bodySerializer: stringify,
        headers: {
            ...(options.clientId && { "x-client-id": options.clientId }),
            ...(options.secretKey && { "x-secret-key": options.secretKey }),
        },
        ...(options.override ?? {}),
    });
}
function stringify(
// biome-ignore lint/suspicious/noExplicitAny: JSON.stringify signature
value, 
// biome-ignore lint/suspicious/noExplicitAny: JSON.stringify signature
replacer, space) {
    const res = JSON.stringify(value, (key, value_) => {
        const value__ = typeof value_ === "bigint" ? value_.toString() : value_;
        return typeof replacer === "function" ? replacer(key, value__) : value__;
    }, space);
    return res;
}
export function isErrorResponse(res) {
    return "error" in res;
}
export function isSuccessResponse(res) {
    return "result" in res;
}
//# sourceMappingURL=configure.js.map