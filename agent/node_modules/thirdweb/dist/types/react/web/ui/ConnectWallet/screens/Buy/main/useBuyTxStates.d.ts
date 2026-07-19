import type { PreparedTransaction } from "../../../../../../../transaction/prepare-transaction.js";
import type { Account } from "../../../../../../../wallets/interfaces/wallet.js";
import type { SupportedChainAndTokens } from "../swap/useSwapSupportedChains.js";
export declare function useTransactionCostAndData(args: {
    transaction: PreparedTransaction;
    account: Account | undefined;
    supportedDestinations: SupportedChainAndTokens;
    refetchIntervalMs?: number;
}): import("@tanstack/react-query").UseQueryResult<{
    chainMetadata: import("../../../../../../../chains/types.js").ChainMetadata;
    decimals: number;
    gasCostWei: bigint;
    token: {
        address: string;
        icon: string | undefined;
        name: string;
        symbol: string;
    };
    transactionValueWei: bigint;
    walletBalance: import("../../../../../../../exports/extensions/erc20.js").GetBalanceResult;
}, Error>;
//# sourceMappingURL=useBuyTxStates.d.ts.map