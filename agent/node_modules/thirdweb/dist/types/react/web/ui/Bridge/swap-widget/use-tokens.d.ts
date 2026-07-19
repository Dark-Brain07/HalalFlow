import type { Token } from "../../../../../bridge/index.js";
import type { ThirdwebClient } from "../../../../../client/client.js";
export declare function useTokens(options: {
    client: ThirdwebClient;
    chainId?: number;
    search?: string;
    offset: number;
    limit: number;
}): import("@tanstack/react-query").UseQueryResult<Token[], Error>;
export type TokenBalance = {
    balance: string;
    chain_id: number;
    decimals: number;
    name: string;
    icon_uri: string;
    price_data: {
        circulating_supply: number;
        market_cap_usd: number;
        percent_change_24h: number;
        price_timestamp: string;
        price_usd: number;
        total_supply: number;
        usd_value: number;
        volume_24h_usd: number;
    };
    symbol: string;
    token_address: string;
};
export declare function useTokenBalances(options: {
    client: ThirdwebClient;
    page: number;
    limit: number;
    walletAddress: string | undefined;
    chainId: number | undefined;
}): import("@tanstack/react-query").UseQueryResult<{
    pagination: {
        hasMore: boolean;
        limit: number;
        page: number;
        totalCount: number;
    };
    tokens: TokenBalance[];
}, Error>;
//# sourceMappingURL=use-tokens.d.ts.map