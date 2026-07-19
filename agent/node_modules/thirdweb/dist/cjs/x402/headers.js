"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentRequestHeader = getPaymentRequestHeader;
exports.getPaymentResponseHeader = getPaymentResponseHeader;
const types_js_1 = require("./types.js");
const PAYMENT_HEADER_V1 = "X-PAYMENT";
const PAYMENT_HEADER_V2 = "PAYMENT-SIGNATURE";
const PAYMENT_RESPONSE_HEADER_V1 = "X-PAYMENT-RESPONSE";
const PAYMENT_RESPONSE_HEADER_V2 = "PAYMENT-RESPONSE";
function resolveVersion(version) {
    return version === 1 ? 1 : 2;
}
function getPaymentRequestHeader(version) {
    const resolvedVersion = resolveVersion(version ?? types_js_1.x402Version);
    return resolvedVersion === 1 ? PAYMENT_HEADER_V1 : PAYMENT_HEADER_V2;
}
function getPaymentResponseHeader(version) {
    const resolvedVersion = resolveVersion(version ?? types_js_1.x402Version);
    return resolvedVersion === 1
        ? PAYMENT_RESPONSE_HEADER_V1
        : PAYMENT_RESPONSE_HEADER_V2;
}
//# sourceMappingURL=headers.js.map