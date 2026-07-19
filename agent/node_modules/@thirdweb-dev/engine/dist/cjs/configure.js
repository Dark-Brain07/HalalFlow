"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = configure;
exports.isErrorResponse = isErrorResponse;
exports.isSuccessResponse = isSuccessResponse;
const client_gen_js_1 = require("./client/client.gen.js");
function configure(options) {
    client_gen_js_1.client.setConfig({
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
function isErrorResponse(res) {
    return "error" in res;
}
function isSuccessResponse(res) {
    return "result" in res;
}
//# sourceMappingURL=configure.js.map