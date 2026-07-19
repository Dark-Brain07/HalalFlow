/**
 * Encodes a payment payload into a base64 string, ensuring bigint values are properly stringified
 *
 * @param payment - The payment payload to encode
 * @returns A base64 encoded string representation of the payment payload
 */
export function encodePayment(payment) {
    let safe;
    // evm
    const evmPayload = payment.payload;
    safe = {
        ...payment,
        payload: {
            ...evmPayload,
            authorization: Object.fromEntries(Object.entries(evmPayload.authorization).map(([key, value]) => [
                key,
                typeof value === "bigint" ? value.toString() : value,
            ])),
        },
    };
    return safeBase64Encode(JSON.stringify(safe));
}
/**
 * Decodes a base64 encoded payment string back into a PaymentPayload object
 *
 * @param payment - The base64 encoded payment string to decode
 * @returns The decoded and validated PaymentPayload object
 */
export function decodePayment(payment) {
    const decoded = safeBase64Decode(payment);
    const parsed = JSON.parse(decoded);
    const obj = {
        ...parsed,
        payload: parsed.payload,
    };
    return obj;
}
/**
 * Encodes a payment required object into a base64 string for the PAYMENT-REQUIRED header (x402 v2)
 *
 * @param paymentRequired - The payment required object to encode
 * @returns A base64 encoded string representation of the payment required object
 */
export function encodePaymentRequired(paymentRequired) {
    return safeBase64Encode(JSON.stringify(paymentRequired));
}
/**
 * Encodes a string to base64 format
 *
 * @param data - The string to be encoded to base64
 * @returns The base64 encoded string
 */
export function safeBase64Encode(data) {
    if (typeof globalThis !== "undefined" &&
        typeof globalThis.btoa === "function") {
        return globalThis.btoa(data);
    }
    return Buffer.from(data).toString("base64");
}
/**
 * Decodes a base64 string back to its original format
 *
 * @param data - The base64 encoded string to be decoded
 * @returns The decoded string in UTF-8 format
 */
export function safeBase64Decode(data) {
    if (typeof globalThis !== "undefined" &&
        typeof globalThis.atob === "function") {
        return globalThis.atob(data);
    }
    return Buffer.from(data, "base64").toString("utf-8");
}
//# sourceMappingURL=encode.js.map