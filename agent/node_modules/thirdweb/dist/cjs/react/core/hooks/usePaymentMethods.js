"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePaymentMethods = usePaymentMethods;
const react_query_1 = require("@tanstack/react-query");
const Errors_js_1 = require("../../../bridge/types/Errors.js");
const domains_js_1 = require("../../../utils/domains.js");
const fetch_js_1 = require("../../../utils/fetch.js");
const units_js_1 = require("../../../utils/units.js");
const useActiveWallet_js_1 = require("./wallets/useActiveWallet.js");
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
function usePaymentMethods(options) {
    const { destinationToken, destinationAmount, client, payerWallet, supportedTokens, } = options;
    const localWallet = (0, useActiveWallet_js_1.useActiveWallet)(); // TODO (bridge): get all connected wallets
    const wallet = payerWallet || localWallet;
    const query = (0, react_query_1.useQuery)({
        enabled: !!wallet,
        queryFn: async () => {
            const account = wallet?.getAccount();
            if (!wallet || !account) {
                throw new Error("No wallet connected");
            }
            const url = new URL(`${(0, domains_js_1.getThirdwebBaseUrl)("bridge")}/v1/buy/quote/${account.address}`);
            url.searchParams.set("destinationChainId", destinationToken.chainId.toString());
            url.searchParams.set("destinationTokenAddress", destinationToken.address);
            url.searchParams.set("amount", (0, units_js_1.toUnits)(destinationAmount, destinationToken.decimals).toString());
            // dont include quotes to speed up the query
            url.searchParams.set("includeQuotes", "false");
            const clientFetch = (0, fetch_js_1.getClientFetch)(client);
            const response = await clientFetch(url.toString());
            if (!response.ok) {
                const errorJson = await response.json();
                throw new Errors_js_1.ApiError({
                    code: errorJson.code || "UNKNOWN_ERROR",
                    correlationId: errorJson.correlationId || undefined,
                    message: errorJson.message || response.statusText,
                    statusCode: response.status,
                });
            }
            const { data: allValidOriginTokens, } = await response.json();
            // Sort by enough balance to pay THEN gross balance
            const validTokenQuotes = allValidOriginTokens.map((s) => ({
                balance: BigInt(s.balance),
                originToken: s.token,
                payerWallet: wallet,
                type: "wallet",
                quote: s.quote,
            }));
            const sortedValidTokenQuotes = validTokenQuotes
                .filter((s) => !!s.originToken.prices.USD)
                .sort((a, b) => {
                return (Number.parseFloat((0, units_js_1.toTokens)(b.balance, b.originToken.decimals)) *
                    (b.originToken.prices.USD || 1) -
                    Number.parseFloat((0, units_js_1.toTokens)(a.balance, a.originToken.decimals)) *
                        (a.originToken.prices.USD || 1));
            });
            // Filter out quotes that are not included in the supportedTokens (if provided)
            const tokensToInclude = supportedTokens
                ? Object.keys(supportedTokens).flatMap((c) => supportedTokens[Number(c)]?.map((t) => ({
                    chainId: Number(c),
                    address: t.address,
                })) ?? [])
                : [];
            const finalQuotes = supportedTokens
                ? sortedValidTokenQuotes.filter((q) => tokensToInclude.find((t) => t.chainId === q.originToken.chainId &&
                    t.address.toLowerCase() === q.originToken.address.toLowerCase()))
                : sortedValidTokenQuotes;
            const requiredUsdValue = (destinationToken.prices?.["USD"] ?? 0) * Number(destinationAmount);
            return finalQuotes.map((x) => {
                const tokenUsdValue = (x.originToken.prices?.["USD"] ?? 0) *
                    Number((0, units_js_1.toTokens)(x.balance, x.originToken.decimals));
                const hasEnoughBalance = tokenUsdValue >= requiredUsdValue;
                return {
                    ...x,
                    action: "buy",
                    hasEnoughBalance,
                };
            });
        },
        queryKey: [
            "payment-methods",
            destinationToken.chainId,
            destinationToken.address,
            destinationAmount,
            payerWallet?.getAccount()?.address,
            supportedTokens,
        ], // 5 minutes
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
    });
    return {
        data: query.data || [],
        error: query.error,
        isError: query.isError,
        isLoading: query.isLoading,
        isSuccess: query.isSuccess,
        refetch: query.refetch,
    };
}
//# sourceMappingURL=usePaymentMethods.js.map