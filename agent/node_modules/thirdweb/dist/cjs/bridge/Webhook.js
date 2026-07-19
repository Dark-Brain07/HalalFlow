"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
const v4_mini_1 = require("zod/v4-mini");
const address_js_1 = require("../utils/address.js");
const hex_js_1 = require("../utils/encoding/hex.js");
const hexSchema = v4_mini_1.z
    .string()
    .check(v4_mini_1.z.refine(hex_js_1.isHex, { message: "Invalid hex string" }));
const addressSchema = v4_mini_1.z
    .string()
    .check(v4_mini_1.z.refine(address_js_1.isAddress, { message: "Invalid address" }));
const tokenSchema = v4_mini_1.z.object({
    address: addressSchema,
    chainId: v4_mini_1.z.coerce.number(),
    decimals: v4_mini_1.z.coerce.number(),
    iconUri: v4_mini_1.z.optional(v4_mini_1.z.string()),
    name: v4_mini_1.z.string(),
    priceUsd: v4_mini_1.z.coerce.number(),
    symbol: v4_mini_1.z.string(),
});
const onchainWebhookSchema = v4_mini_1.z.discriminatedUnion("version", [
    v4_mini_1.z.object({
        data: v4_mini_1.z.object({}),
        type: v4_mini_1.z.literal("pay.onchain-transaction"),
        version: v4_mini_1.z.literal(1),
    }),
    v4_mini_1.z.object({
        data: v4_mini_1.z.object({
            action: v4_mini_1.z.enum(["TRANSFER", "BUY", "SELL"]),
            clientId: v4_mini_1.z.string(),
            destinationAmount: v4_mini_1.z.coerce.bigint(),
            destinationToken: tokenSchema,
            developerFeeBps: v4_mini_1.z.coerce.number(),
            developerFeeRecipient: addressSchema,
            originAmount: v4_mini_1.z.coerce.bigint(),
            originToken: tokenSchema,
            paymentId: v4_mini_1.z.string(),
            // only exists when the payment was triggered from a developer specified payment link
            paymentLinkId: v4_mini_1.z.optional(v4_mini_1.z.string()),
            purchaseData: v4_mini_1.z.optional(v4_mini_1.z.record(v4_mini_1.z.string(), v4_mini_1.z.unknown())),
            receiver: addressSchema,
            sender: addressSchema,
            status: v4_mini_1.z.enum(["PENDING", "FAILED", "COMPLETED"]),
            transactions: v4_mini_1.z.array(v4_mini_1.z.object({
                chainId: v4_mini_1.z.coerce.number(),
                transactionHash: hexSchema,
            })),
            type: v4_mini_1.z.string(),
        }),
        type: v4_mini_1.z.literal("pay.onchain-transaction"),
        version: v4_mini_1.z.literal(2),
    }),
]);
const onrampWebhookSchema = v4_mini_1.z.discriminatedUnion("version", [
    v4_mini_1.z.object({
        data: v4_mini_1.z.object({}),
        type: v4_mini_1.z.literal("pay.onramp-transaction"),
        version: v4_mini_1.z.literal(1),
    }),
    v4_mini_1.z.object({
        data: v4_mini_1.z.object({
            amount: v4_mini_1.z.coerce.bigint(),
            currency: v4_mini_1.z.string(),
            currencyAmount: v4_mini_1.z.number(),
            id: v4_mini_1.z.string(),
            onramp: v4_mini_1.z.string(),
            paymentLinkId: v4_mini_1.z.optional(v4_mini_1.z.string()),
            purchaseData: v4_mini_1.z.unknown(),
            receiver: addressSchema,
            sender: v4_mini_1.z.optional(addressSchema),
            status: v4_mini_1.z.enum(["PENDING", "COMPLETED", "FAILED"]),
            token: tokenSchema,
            transactionHash: v4_mini_1.z.optional(hexSchema),
        }),
        type: v4_mini_1.z.literal("pay.onramp-transaction"),
        version: v4_mini_1.z.literal(2),
    }),
]);
const webhookSchema = v4_mini_1.z.discriminatedUnion("type", [
    onchainWebhookSchema,
    onrampWebhookSchema,
]);
/**
 * Parses an incoming Bridge webhook payload.
 *
 * @param payload - The raw text body received from thirdweb.
 * @param headers - The webhook headers received from thirdweb.
 * @param secret - The webhook secret to verify the payload with.
 * @bridge Webhook
 * @beta
 */
async function parse(
/**
 * Raw text body received from thirdweb.
 */
payload, 
/**
 * The webhook headers received from thirdweb.
 */
headers, 
/**
 * The webhook secret to verify the payload with.
 */
secret, 
/**
 * The tolerance in seconds for the timestamp verification.
 */
tolerance = 300, // Default to 5 minutes if not specified
/**
 * Add various validations to the parsed payload to ensure it matches the expected values. Throws error if any validation fails.
 */
verify) {
    // Get the signature and timestamp from headers
    const receivedSignature = headers["x-payload-signature"] || headers["x-pay-signature"];
    const receivedTimestamp = headers["x-timestamp"] || headers["x-pay-timestamp"];
    if (!receivedSignature || !receivedTimestamp) {
        throw new Error("Missing required webhook headers: signature or timestamp");
    }
    // Verify timestamp
    const now = Math.floor(Date.now() / 1000);
    const timestamp = Number.parseInt(receivedTimestamp, 10);
    const diff = Math.abs(now - timestamp);
    if (diff > tolerance) {
        throw new Error(`Webhook timestamp is too old. Difference: ${diff}s, tolerance: ${tolerance}s`);
    }
    // Generate signature using the same method as the sender
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { hash: "SHA-256", name: "HMAC" }, false, ["sign"]);
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(`${receivedTimestamp}.${payload}`));
    // Convert the signature to hex string
    const computedSignature = Array.from(new Uint8Array(signature))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    // Compare signatures
    if (computedSignature !== receivedSignature) {
        throw new Error("Invalid webhook signature");
    }
    // Parse the payload as JSON
    let payloadObject;
    try {
        payloadObject = JSON.parse(payload);
    }
    catch {
        throw new Error("Invalid webhook payload: not valid JSON");
    }
    const parsedPayload = webhookSchema.parse(payloadObject);
    // v1 is no longer supported
    if (parsedPayload.version === 1) {
        throw new Error("Invalid webhook payload: version 1 is no longer supported, please upgrade to webhook version 2.");
    }
    if (verify) {
        // verify receiver address
        if (verify.receiverAddress) {
            if (parsedPayload.data.receiver.toLowerCase() !==
                verify.receiverAddress.toLowerCase()) {
                throw new Error(`Verification Failed: receiverAddress mismatch, Expected: ${verify.receiverAddress}, Received: ${parsedPayload.data.receiver}`);
            }
        }
        // verify destination token address
        if (verify.destinationTokenAddress) {
            // onchain transaction
            if ("destinationToken" in parsedPayload.data) {
                if (parsedPayload.data.destinationToken.address.toLowerCase() !==
                    verify.destinationTokenAddress.toLowerCase()) {
                    throw new Error(`Verification Failed: destinationTokenAddress mismatch, Expected: ${verify.destinationTokenAddress}, Received: ${parsedPayload.data.destinationToken.address}`);
                }
            }
            // onramp transaction
            else if ("onramp" in parsedPayload.data) {
                if (parsedPayload.data.token.address.toLowerCase() !==
                    verify.destinationTokenAddress.toLowerCase()) {
                    throw new Error(`Verification Failed: destinationTokenAddress mismatch, Expected: ${verify.destinationTokenAddress}, Received: ${parsedPayload.data.token.address}`);
                }
            }
        }
        // verify destination chain id
        if (verify.destinationChainId) {
            // onchain tx
            if ("destinationToken" in parsedPayload.data) {
                if (parsedPayload.data.destinationToken.chainId !==
                    verify.destinationChainId) {
                    throw new Error(`Verification Failed: destinationChainId mismatch, Expected: ${verify.destinationChainId}, Received: ${parsedPayload.data.destinationToken.chainId}`);
                }
            }
            // onramp tx
            else if ("onramp" in parsedPayload.data) {
                if (parsedPayload.data.token.chainId !== verify.destinationChainId) {
                    throw new Error(`Verification Failed: destinationChainId mismatch, Expected: ${verify.destinationChainId}, Received: ${parsedPayload.data.token.chainId}`);
                }
            }
        }
        // verify amount
        if (verify.minDestinationAmount) {
            // onchain tx
            if ("destinationAmount" in parsedPayload.data) {
                if (parsedPayload.data.destinationAmount < verify.minDestinationAmount) {
                    throw new Error(`Verification Failed: minDestinationAmount, Expected minimum amount to be ${verify.minDestinationAmount}, Received: ${parsedPayload.data.destinationAmount}`);
                }
            }
            // onramp tx
            else if ("onramp" in parsedPayload.data) {
                if (parsedPayload.data.amount < verify.minDestinationAmount) {
                    throw new Error(`Verification Failed: minDestinationAmount, Expected minimum amount to be ${verify.minDestinationAmount}, Received: ${parsedPayload.data.amount}`);
                }
            }
        }
    }
    return parsedPayload;
}
//# sourceMappingURL=Webhook.js.map