import { chains } from "../../../../../bridge/index.js";
import type { ThirdwebClient } from "../../../../../client/client.js";
export declare function useBridgeChains(options: chains.Options): import("@tanstack/react-query").UseQueryResult<import("../../../../../bridge/index.js").Chain[], Error>;
export declare function useBridgeChain({ chainId, client, }: {
    chainId: number | undefined;
    client: ThirdwebClient;
}): {
    data: import("../../../../../bridge/index.js").Chain | undefined;
    isPending: boolean;
};
/**
 * type=origin: Returns all chains that can be used as origin
 * type=destination: Returns all chains that can be used as destination
 * originChainId=X: Returns destination chains reachable from chain X
 * destinationChainId=X: Returns origin chains that can reach chain X
 */
export declare function useBridgeChainsWithFilters(options: {
    client: ThirdwebClient;
    buyChainId: number | undefined;
    sellChainId: number | undefined;
    type: "buy" | "sell";
}): import("@tanstack/react-query").UseQueryResult<import("../../../../../bridge/index.js").Chain[], Error>;
//# sourceMappingURL=use-bridge-chains.d.ts.map