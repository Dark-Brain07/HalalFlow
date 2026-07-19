import type { RequestedPaymentPayload, RequestedPaymentRequirements } from "./schemas.js";
/**
 * Encodes a payment payload into a base64 string, ensuring bigint values are properly stringified
 *
 * @param payment - The payment payload to encode
 * @returns A base64 encoded string representation of the payment payload
 */
export declare function encodePayment(payment: RequestedPaymentPayload): string;
/**
 * Decodes a base64 encoded payment string back into a PaymentPayload object
 *
 * @param payment - The base64 encoded payment string to decode
 * @returns The decoded and validated PaymentPayload object
 */
export declare function decodePayment(payment: string): RequestedPaymentPayload;
/**
 * Encodes a payment required object into a base64 string for the PAYMENT-REQUIRED header (x402 v2)
 *
 * @param paymentRequired - The payment required object to encode
 * @returns A base64 encoded string representation of the payment required object
 */
export declare function encodePaymentRequired(paymentRequired: {
    x402Version: number;
    error?: string;
    accepts: RequestedPaymentRequirements[];
    resource?: {
        url: string;
        description?: string;
        mimeType?: string;
    };
}): string;
/**
 * Encodes a string to base64 format
 *
 * @param data - The string to be encoded to base64
 * @returns The base64 encoded string
 */
export declare function safeBase64Encode(data: string): string;
/**
 * Decodes a base64 string back to its original format
 *
 * @param data - The base64 encoded string to be decoded
 * @returns The decoded string in UTF-8 format
 */
export declare function safeBase64Decode(data: string): string;
//# sourceMappingURL=encode.d.ts.map