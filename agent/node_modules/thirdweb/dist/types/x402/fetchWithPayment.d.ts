import type { ThirdwebClient } from "../client/client.js";
import type { AsyncStorage } from "../utils/storage/AsyncStorage.js";
import type { Wallet } from "../wallets/interfaces/wallet.js";
import { type RequestedPaymentRequirements } from "./schemas.js";
/**
 * Enables the payment of APIs using the x402 payment protocol.
 *
 * This function wraps the native fetch API to automatically handle 402 Payment Required responses
 * by creating and sending a payment header. It will:
 * 1. Make the initial request
 * 2. If a 402 response is received, parse the payment requirements
 * 3. Verify the payment amount is within the allowed maximum
 * 4. Create a payment header using the provided wallet client
 * 5. Retry the request with the payment header
 *
 * @param fetch - The fetch function to wrap (typically globalThis.fetch)
 * @param client - The thirdweb client used to access RPC infrastructure
 * @param wallet - The wallet used to sign payment messages
 * @param maxValue - The maximum allowed payment amount in base units
 * @returns A wrapped fetch function that handles 402 responses automatically
 *
 * @example
 * ```typescript
 * import { wrapFetchWithPayment } from "thirdweb/x402";
 * import { createThirdwebClient } from "thirdweb";
 * import { createWallet } from "thirdweb/wallets";
 *
 * const client = createThirdwebClient({ clientId: "your-client-id" });
 * const wallet = createWallet("io.metamask");
 * await wallet.connect({ client })
 *
 * const fetchWithPay = wrapFetchWithPayment(fetch, client, wallet);
 *
 * // Make a request that may require payment
 * const response = await fetchWithPay('https://api.example.com/paid-endpoint');
 * ```
 *
 * @throws {Error} If the payment amount exceeds the maximum allowed value
 * @throws {Error} If a payment has already been attempted for this request
 * @throws {Error} If there's an error creating the payment header
 *
 * @x402
 */
export declare function wrapFetchWithPayment(fetch: typeof globalThis.fetch, client: ThirdwebClient, wallet: Wallet, options?: {
    maxValue?: bigint;
    paymentRequirementsSelector?: (paymentRequirements: RequestedPaymentRequirements[]) => RequestedPaymentRequirements | undefined;
    /**
     * Storage for caching permit signatures (for "upto" scheme).
     * When provided, permit signatures will be cached and reused if the on-chain allowance is sufficient.
     */
    storage?: AsyncStorage;
}): (input: RequestInfo, init?: RequestInit) => Promise<Response>;
//# sourceMappingURL=fetchWithPayment.d.ts.map