import type { ThirdwebClient } from "../client/client.js";
import { type FacilitatorSettleResponse, type FacilitatorSupportedResponse, type FacilitatorVerifyResponse, type RequestedPaymentPayload, type RequestedPaymentRequirements } from "./schemas.js";
import { type PaymentArgs, type PaymentRequiredResultV1 } from "./types.js";
export type WaitUntil = "simulated" | "submitted" | "confirmed";
export type ThirdwebX402FacilitatorConfig = {
    client: ThirdwebClient;
    serverWalletAddress: string;
    waitUntil?: WaitUntil;
    vaultAccessToken?: string;
    baseUrl?: string;
};
/**
 * facilitator for the x402 payment protocol.
 * @public
 */
export type ThirdwebX402Facilitator = {
    url: `${string}://${string}`;
    address: string;
    createAuthHeaders: () => Promise<{
        verify: Record<string, string>;
        settle: Record<string, string>;
        supported: Record<string, string>;
        list: Record<string, string>;
    }>;
    verify: (payload: RequestedPaymentPayload, paymentRequirements: RequestedPaymentRequirements) => Promise<FacilitatorVerifyResponse>;
    settle: (payload: RequestedPaymentPayload, paymentRequirements: RequestedPaymentRequirements, waitUntil?: WaitUntil) => Promise<FacilitatorSettleResponse>;
    supported: (filters?: {
        chainId: number;
        tokenAddress?: string;
    }) => Promise<FacilitatorSupportedResponse>;
    accepts: (args: Omit<PaymentArgs, "facilitator">) => Promise<PaymentRequiredResultV1>;
};
/**
 * Creates a facilitator for the x402 payment protocol.
 * You can use this with `settlePayment` or with any x402 middleware to enable settling transactions with your thirdweb server wallet.
 *
 * @param config - The configuration for the facilitator
 * @returns a x402 compatible FacilitatorConfig
 *
 * @example
 * ```ts
 * import { facilitator } from "thirdweb/x402";
 * import { createThirdwebClient } from "thirdweb";
 * import { paymentMiddleware } from 'x402-hono'
 *
 * const client = createThirdwebClient({
 *   secretKey: "your-secret-key",
 * });
 * const thirdwebX402Facilitator = facilitator({
 *   client: client,
 *   serverWalletAddress: "0x1234567890123456789012345678901234567890",
 * });
 *
 * // add the facilitator to any x402 payment middleware
 * const middleware = paymentMiddleware(
 *   "0x1234567890123456789012345678901234567890",
 *   {
 *     "/api/paywall": {
 *       price: "$0.01",
 *       network: "base-sepolia",
 *       config: {
 *         description: "Access to paid content",
 *       },
 *     },
 *   },
 *   thirdwebX402Facilitator,
 * );
 * ```
 *
 * #### Configuration Options
 *
 * ```ts
 * const thirdwebX402Facilitator = facilitator({
 *   client: client,
 *   serverWalletAddress: "0x1234567890123456789012345678901234567890",
 *   // Optional: Wait behavior for settlements
 *   // - "simulated": Only simulate the transaction (fastest)
 *   // - "submitted": Wait until transaction is submitted
 *   // - "confirmed": Wait for full on-chain confirmation (slowest, default)
 *   waitUntil: "confirmed",
 * });

 * ```
 *
 * @x402
 */
export declare function facilitator(config: ThirdwebX402FacilitatorConfig): ThirdwebX402Facilitator;
//# sourceMappingURL=facilitator.d.ts.map