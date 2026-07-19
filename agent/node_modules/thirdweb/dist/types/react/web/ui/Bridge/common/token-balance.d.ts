import type { ThirdwebClient } from "../../../../../client/client.js";
export declare function useTokenBalance(props: {
    chainId: number | undefined;
    tokenAddress: string | undefined;
    client: ThirdwebClient;
    walletAddress: string | undefined;
}): import("@tanstack/react-query").UseQueryResult<import("../../../../../exports/extensions/erc20.js").GetBalanceResult>;
//# sourceMappingURL=token-balance.d.ts.map