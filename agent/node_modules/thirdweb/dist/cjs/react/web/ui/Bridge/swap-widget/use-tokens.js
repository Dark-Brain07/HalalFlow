"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTokens = useTokens;
exports.useTokenBalances = useTokenBalances;
const react_query_1 = require("@tanstack/react-query");
const Token_js_1 = require("../../../../../bridge/Token.js");
const address_js_1 = require("../../../../../utils/address.js");
const domains_js_1 = require("../../../../../utils/domains.js");
const fetch_js_1 = require("../../../../../utils/fetch.js");
function useTokens(options) {
    return (0, react_query_1.useQuery)({
        queryKey: ["tokens", options],
        enabled: !!options.chainId,
        retry: false,
        queryFn: () => {
            if (!options.chainId) {
                throw new Error("Chain ID is required");
            }
            const isSearchAddress = options.search
                ? (0, address_js_1.isAddress)(options.search)
                : false;
            return (0, Token_js_1.tokens)({
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
function useTokenBalances(options) {
    return (0, react_query_1.useQuery)({
        queryKey: ["bridge/v1/wallets", options],
        enabled: !!options.chainId && !!options.walletAddress,
        queryFn: async () => {
            if (!options.chainId || !options.walletAddress) {
                throw new Error("invalid options");
            }
            const baseUrl = (0, domains_js_1.getThirdwebBaseUrl)("bridge");
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
            const clientFetch = (0, fetch_js_1.getClientFetch)(options.client);
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