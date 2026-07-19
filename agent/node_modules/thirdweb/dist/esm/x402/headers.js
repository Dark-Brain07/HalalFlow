import { x402Version } from "./types.js";
const PAYMENT_HEADER_V1 = "X-PAYMENT";
const PAYMENT_HEADER_V2 = "PAYMENT-SIGNATURE";
const PAYMENT_RESPONSE_HEADER_V1 = "X-PAYMENT-RESPONSE";
const PAYMENT_RESPONSE_HEADER_V2 = "PAYMENT-RESPONSE";
function resolveVersion(version) {
    return version === 1 ? 1 : 2;
}
export function getPaymentRequestHeader(version) {
    const resolvedVersion = resolveVersion(version ?? x402Version);
    return resolvedVersion === 1 ? PAYMENT_HEADER_V1 : PAYMENT_HEADER_V2;
}
export function getPaymentResponseHeader(version) {
    const resolvedVersion = resolveVersion(version ?? x402Version);
    return resolvedVersion === 1
        ? PAYMENT_RESPONSE_HEADER_V1
        : PAYMENT_RESPONSE_HEADER_V2;
}
//# sourceMappingURL=headers.js.map