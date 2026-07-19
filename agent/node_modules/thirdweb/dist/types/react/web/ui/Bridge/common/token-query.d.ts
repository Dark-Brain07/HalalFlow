import type { TokenWithPrices } from "../../../../../bridge/index.js";
import type { ThirdwebClient } from "../../../../../client/client.js";
type TokenQueryResult = {
    type: "success";
    token: TokenWithPrices;
} | {
    type: "unsupported_token";
};
export declare function useTokenQuery(params: {
    tokenAddress: string | undefined;
    chainId: number | undefined;
    client: ThirdwebClient;
}): import("@tanstack/react-query").UseQueryResult<TokenQueryResult, Error>;
export {};
//# sourceMappingURL=token-query.d.ts.map