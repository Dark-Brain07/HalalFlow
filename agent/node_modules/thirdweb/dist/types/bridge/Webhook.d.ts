import { z } from "zod/v4-mini";
declare const webhookSchema: z.ZodMiniDiscriminatedUnion<[z.ZodMiniDiscriminatedUnion<[z.ZodMiniObject<{
    data: z.ZodMiniObject<{}, z.core.$strip>;
    type: z.ZodMiniLiteral<"pay.onchain-transaction">;
    version: z.ZodMiniLiteral<1>;
}, z.core.$strip>, z.ZodMiniObject<{
    data: z.ZodMiniObject<{
        action: z.ZodMiniEnum<{
            TRANSFER: "TRANSFER";
            BUY: "BUY";
            SELL: "SELL";
        }>;
        clientId: z.ZodMiniString<string>;
        destinationAmount: z.ZodMiniBigInt<unknown>;
        destinationToken: z.ZodMiniObject<{
            address: z.ZodMiniString<string>;
            chainId: z.ZodMiniNumber<unknown>;
            decimals: z.ZodMiniNumber<unknown>;
            iconUri: z.ZodMiniOptional<z.ZodMiniString<string>>;
            name: z.ZodMiniString<string>;
            priceUsd: z.ZodMiniNumber<unknown>;
            symbol: z.ZodMiniString<string>;
        }, z.core.$strip>;
        developerFeeBps: z.ZodMiniNumber<unknown>;
        developerFeeRecipient: z.ZodMiniString<string>;
        originAmount: z.ZodMiniBigInt<unknown>;
        originToken: z.ZodMiniObject<{
            address: z.ZodMiniString<string>;
            chainId: z.ZodMiniNumber<unknown>;
            decimals: z.ZodMiniNumber<unknown>;
            iconUri: z.ZodMiniOptional<z.ZodMiniString<string>>;
            name: z.ZodMiniString<string>;
            priceUsd: z.ZodMiniNumber<unknown>;
            symbol: z.ZodMiniString<string>;
        }, z.core.$strip>;
        paymentId: z.ZodMiniString<string>;
        paymentLinkId: z.ZodMiniOptional<z.ZodMiniString<string>>;
        purchaseData: z.ZodMiniOptional<z.ZodMiniRecord<z.ZodMiniString<string>, z.ZodMiniUnknown>>;
        receiver: z.ZodMiniString<string>;
        sender: z.ZodMiniString<string>;
        status: z.ZodMiniEnum<{
            PENDING: "PENDING";
            COMPLETED: "COMPLETED";
            FAILED: "FAILED";
        }>;
        transactions: z.ZodMiniArray<z.ZodMiniObject<{
            chainId: z.ZodMiniNumber<unknown>;
            transactionHash: z.ZodMiniString<string>;
        }, z.core.$strip>>;
        type: z.ZodMiniString<string>;
    }, z.core.$strip>;
    type: z.ZodMiniLiteral<"pay.onchain-transaction">;
    version: z.ZodMiniLiteral<2>;
}, z.core.$strip>]>, z.ZodMiniDiscriminatedUnion<[z.ZodMiniObject<{
    data: z.ZodMiniObject<{}, z.core.$strip>;
    type: z.ZodMiniLiteral<"pay.onramp-transaction">;
    version: z.ZodMiniLiteral<1>;
}, z.core.$strip>, z.ZodMiniObject<{
    data: z.ZodMiniObject<{
        amount: z.ZodMiniBigInt<unknown>;
        currency: z.ZodMiniString<string>;
        currencyAmount: z.ZodMiniNumber<number>;
        id: z.ZodMiniString<string>;
        onramp: z.ZodMiniString<string>;
        paymentLinkId: z.ZodMiniOptional<z.ZodMiniString<string>>;
        purchaseData: z.ZodMiniUnknown;
        receiver: z.ZodMiniString<string>;
        sender: z.ZodMiniOptional<z.ZodMiniString<string>>;
        status: z.ZodMiniEnum<{
            PENDING: "PENDING";
            COMPLETED: "COMPLETED";
            FAILED: "FAILED";
        }>;
        token: z.ZodMiniObject<{
            address: z.ZodMiniString<string>;
            chainId: z.ZodMiniNumber<unknown>;
            decimals: z.ZodMiniNumber<unknown>;
            iconUri: z.ZodMiniOptional<z.ZodMiniString<string>>;
            name: z.ZodMiniString<string>;
            priceUsd: z.ZodMiniNumber<unknown>;
            symbol: z.ZodMiniString<string>;
        }, z.core.$strip>;
        transactionHash: z.ZodMiniOptional<z.ZodMiniString<string>>;
    }, z.core.$strip>;
    type: z.ZodMiniLiteral<"pay.onramp-transaction">;
    version: z.ZodMiniLiteral<2>;
}, z.core.$strip>]>]>;
export type WebhookPayload = Exclude<z.infer<typeof webhookSchema>, {
    version: 1;
}>;
/**
 * Parses an incoming Bridge webhook payload.
 *
 * @param payload - The raw text body received from thirdweb.
 * @param headers - The webhook headers received from thirdweb.
 * @param secret - The webhook secret to verify the payload with.
 * @bridge Webhook
 * @beta
 */
export declare function parse(
/**
 * Raw text body received from thirdweb.
 */
payload: string, 
/**
 * The webhook headers received from thirdweb.
 */
headers: Record<string, string>, 
/**
 * The webhook secret to verify the payload with.
 */
secret: string, 
/**
 * The tolerance in seconds for the timestamp verification.
 */
tolerance?: number, // Default to 5 minutes if not specified
/**
 * Add various validations to the parsed payload to ensure it matches the expected values. Throws error if any validation fails.
 */
verify?: {
    /**
     * Verify that the payload's the destination token amount (in wei) is greater than `minDestinationAmount` value
     */
    minDestinationAmount?: bigint;
    /**
     * Verify that the payload's destination token address is the same as `destinationTokenAddress` value
     */
    destinationTokenAddress?: string;
    /**
     * Verify that the payload's destination chain id is the same as `destinationChainId` value
     */
    destinationChainId?: number;
    /**
     * Verify that the payload's receiver address is the same as `receiverAddress` value.
     */
    receiverAddress?: string;
}): Promise<WebhookPayload>;
export {};
//# sourceMappingURL=Webhook.d.ts.map