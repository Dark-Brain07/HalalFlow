import type { TokenWithPrices } from "../../../bridge/types/Token.js";
import type { ThirdwebClient } from "../../../client/client.js";
import type { Wallet } from "../../../wallets/interfaces/wallet.js";
import type { PaymentMethod } from "../../web/ui/Bridge/types.js";
import type { SupportedTokens } from "../utils/defaultTokens.js";
/**
 * Hook that returns available payment methods for BridgeEmbed
 * Fetches real routes data based on the destination token
 *
 * @param options - Configuration options
 * @param options.destinationToken - The destination token to find routes for
 * @param options.client - ThirdwebClient for API calls
 * @returns Available payment methods with route data
 *
 * @example
 * ```tsx
 * const { data: paymentMethods, isLoading, error } = usePaymentMethods({
 *   destinationToken,
 *   client
 * });
 * ```
 */
export declare function usePaymentMethods(options: {
    destinationToken: TokenWithPrices;
    destinationAmount: string;
    client: ThirdwebClient;
    payerWallet?: Wallet;
    supportedTokens?: SupportedTokens;
}): {
    data: PaymentMethod[];
    error: Error | null;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    refetch: (options?: import("@tanstack/react-query").RefetchOptions) => Promise<import("@tanstack/react-query").QueryObserverResult<PaymentMethod[], Error>>;
};
//# sourceMappingURL=usePaymentMethods.d.ts.map