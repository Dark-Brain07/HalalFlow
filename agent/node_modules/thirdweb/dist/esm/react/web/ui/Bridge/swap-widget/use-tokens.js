import { useQuery } from "@tanstack/react-query";
import { tokens } from "../../../../../bridge/Token.js";
import { isAddress } from "../../../../../utils/address.js";
import { getThirdwebBaseUrl } from "../../../../../utils/domains.js";
import { getClientFetch } from "../../../../../utils/fetch.js";
export function useTokens(options) {
    return useQuery({
        queryKey: ["tokens", options],
        enabled: !!options.chainId,
        retry: false,
        queryFn: () => {
            if (!options.chainId) {
                throw new Error("Chain ID is required");
            }
            const isSearchAddress = options.search
                ? isAddress(options.search)
                : false;
            return tokens({
                chainId: options.chainId,
                client: options.client,
                offset: options.offset,
                limit: options.limit,
                includePrices: false,
                query: options.search && !isSearchAddress ? options.search : undefined,
                tokenAddress: options.search && isSearchAddress ? options.search : undefined,
            });
        },
    });
}
export function useTokenBalances(options) {
    return useQuery({
        queryKey: ["bridge/v1/wallets", options],
        enabled: !!options.chainId && !!options.walletAddress,
        queryFn: async () => {
            if (!options.chainId || !options.walletAddress) {
                throw new Error("invalid options");
            }
            const baseUrl = getThirdwebBaseUrl("bridge");
            const isDev = baseUrl.includes("thirdweb-dev");
            const url = new URL(`https://api.${isDev ? "thirdweb-dev" : "thirdweb"}.com/v1/wallets/${options.walletAddress}/tokens`);
            url.searchParams.set("chainId", options.chainId.toString());
            url.searchParams.set("limit", options.limit.toString());
            url.searchParams.set("page", options.page.toString());
            url.searchParams.set("metadata", "true");
            url.searchParams.set("resolveMetadataLinks", "true");
            url.searchParams.set("includeSpam", "false");
            url.searchParams.set("includeNative", "true");
            url.searchParams.set("sortBy", "usd_value");
            url.searchParams.set("sortOrder", "desc");
            url.searchParams.set("includeWithoutPrice", "false"); // filter out tokens with no price
            const clientFetch = getClientFetch(options.client);
            const response = await clientFetch(url.toString());
            if (!response.ok) {
                throw new Error(`Failed to fetch token balances: ${response.statusText}`);
            }
            const json = (await response.json());
            return json.result;
        },
        refetchOnMount: "always",
    });
}
//# sourceMappingURL=use-tokens.js.map