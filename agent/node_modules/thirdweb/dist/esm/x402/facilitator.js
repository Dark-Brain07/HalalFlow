import { stringify } from "../utils/json.js";
import { withCache } from "../utils/promise/withCache.js";
import { networkToCaip2ChainId, } from "./schemas.js";
import { x402Version, } from "./types.js";
const DEFAULT_BASE_URL = "https://api.thirdweb.com/v1/payments/x402";
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
export function facilitator(config) {
    const secretKey = config.client.secretKey;
    if (!secretKey) {
        throw new Error("Client secret key is required for the x402 facilitator");
    }
    const serverWalletAddress = config.serverWalletAddress;
    if (!serverWalletAddress) {
        throw new Error("Server wallet address is required for the x402 facilitator");
    }
    const facilitator = {
        url: (config.baseUrl ?? DEFAULT_BASE_URL),
        address: serverWalletAddress,
        createAuthHeaders: async () => {
            return {
                verify: {
                    "x-secret-key": secretKey,
                },
                settle: {
                    "x-secret-key": secretKey,
                    ...(config.vaultAccessToken
                        ? { "x-vault-access-token": config.vaultAccessToken }
                        : {}),
                },
                supported: {
                    "x-secret-key": secretKey,
                },
                list: {
                    "x-secret-key": secretKey,
                },
            };
        },
        /**
         * Verifies a payment payload with the facilitator service
         *
         * @param payload - The payment payload to verify
         * @param paymentRequirements - The payment requirements to verify against
         * @returns A promise that resolves to the verification response
         */
        async verify(payload, paymentRequirements) {
            const url = config.baseUrl ?? DEFAULT_BASE_URL;
            let headers = { "Content-Type": "application/json" };
            const authHeaders = await facilitator.createAuthHeaders();
            headers = { ...headers, ...authHeaders.verify };
            const res = await fetch(`${url}/verify`, {
                method: "POST",
                headers,
                body: stringify({
                    x402Version: payload.x402Version,
                    paymentPayload: payload,
                    paymentRequirements: paymentRequirements,
                }),
            });
            if (res.status !== 200) {
                const text = `${res.statusText} ${await res.text()}`;
                throw new Error(`Failed to verify payment: ${res.status} ${text}`);
            }
            const data = await res.json();
            return data;
        },
        /**
         * Settles a payment with the facilitator service
         *
         * @param payload - The payment payload to settle
         * @param paymentRequirements - The payment requirements for the settlement
         * @returns A promise that resolves to the settlement response
         */
        async settle(payload, paymentRequirements, waitUntil) {
            const url = config.baseUrl ?? DEFAULT_BASE_URL;
            let headers = { "Content-Type": "application/json" };
            const authHeaders = await facilitator.createAuthHeaders();
            headers = { ...headers, ...authHeaders.settle };
            const waitUntilParam = waitUntil || config.waitUntil;
            const res = await fetch(`${url}/settle`, {
                method: "POST",
                headers,
                body: JSON.stringify({
                    x402Version: payload.x402Version,
                    paymentPayload: payload,
                    paymentRequirements: paymentRequirements,
                    ...(waitUntilParam ? { waitUntil: waitUntilParam } : {}),
                }),
            });
            if (res.status !== 200) {
                const text = `${res.statusText} ${await res.text()}`;
                throw new Error(`Failed to settle payment: ${res.status} ${text}`);
            }
            const data = await res.json();
            return data;
        },
        /**
         * Gets the supported payment kinds from the facilitator service.
         *
         * @returns A promise that resolves to the supported payment kinds
         */
        async supported(filters) {
            const url = config.baseUrl ?? DEFAULT_BASE_URL;
            return withCache(async () => {
                let headers = { "Content-Type": "application/json" };
                const authHeaders = await facilitator.createAuthHeaders();
                headers = { ...headers, ...authHeaders.supported };
                const supportedUrl = new URL(`${url}/supported`);
                if (filters?.chainId) {
                    supportedUrl.searchParams.set("chainId", filters.chainId.toString());
                }
                if (filters?.tokenAddress) {
                    supportedUrl.searchParams.set("tokenAddress", filters.tokenAddress);
                }
                const res = await fetch(supportedUrl.toString(), { headers });
                if (res.status !== 200) {
                    throw new Error(`Failed to get supported payment kinds: ${res.statusText}`);
                }
                const data = await res.json();
                return data;
            }, {
                cacheKey: `supported-payment-kinds-${url}-${filters?.chainId}-${filters?.tokenAddress}2`,
                cacheTime: 1000 * 60 * 60 * 1, // 1 hour
            });
        },
        async accepts(args) {
            const url = config.baseUrl ?? DEFAULT_BASE_URL;
            let headers = { "Content-Type": "application/json" };
            const authHeaders = await facilitator.createAuthHeaders();
            headers = { ...headers, ...authHeaders.verify }; // same as verify
            const caip2ChainId = networkToCaip2ChainId(args.network);
            const res = await fetch(`${url}/accepts`, {
                method: "POST",
                headers,
                body: stringify({
                    resourceUrl: args.resourceUrl,
                    method: args.method,
                    network: caip2ChainId,
                    price: args.price,
                    minPrice: args.minPrice,
                    scheme: args.scheme,
                    routeConfig: args.routeConfig,
                    serverWalletAddress: facilitator.address,
                    recipientAddress: args.payTo,
                    extraMetadata: args.extraMetadata,
                    x402Version: args.x402Version ?? x402Version,
                }),
            });
            if (res.status !== 402) {
                throw new Error(`Failed to construct payment requirements: ${res.statusText} - ${await res.text()}`);
            }
            return {
                status: res.status,
                responseBody: (await res.json()),
                responseHeaders: {
                    "Content-Type": "application/json",
                },
            };
        },
    };
    return facilitator;
}
//# sourceMappingURL=facilitator.js.map