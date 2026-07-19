import type { ThirdwebClient } from "../../../../../client/client.js";
import type { Wallet } from "../../../../../wallets/interfaces/wallet.js";
import type { ActiveWalletInfo, TokenSelection } from "./types.js";
export declare function useActiveWalletInfo(activeWalletOverride?: Wallet): ActiveWalletInfo | undefined;
export declare function useTokenPrice(options: {
    token: TokenSelection | undefined;
    client: ThirdwebClient;
}): import("@tanstack/react-query").UseQueryResult<import("../../../../../bridge/index.js").TokenWithPrices, Error>;
//# sourceMappingURL=hooks.d.ts.map