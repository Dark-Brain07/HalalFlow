import type { TokenWithPrices } from "../../../bridge/index.js";
import type { ThirdwebClient } from "../../../client/client.js";
import type { CompilerMetadata } from "../../../contract/actions/compiler-metadata.js";
import type { PreparedTransaction } from "../../../transaction/prepare-transaction.js";
import type { Wallet } from "../../../wallets/interfaces/wallet.js";
interface TransactionDetails {
    contractMetadata: CompilerMetadata | null;
    functionInfo: {
        functionName: string;
        selector: string;
        description?: string;
    };
    txCostDisplay: string;
    gasCostDisplay: string | null;
    tokenInfo: TokenWithPrices | null;
    costWei: bigint;
    gasCostWei: bigint | null;
    totalCost: string;
    totalCostWei: bigint;
}
interface UseTransactionDetailsOptions {
    transaction: PreparedTransaction;
    client: ThirdwebClient;
    wallet: Wallet | undefined;
}
/**
 * Hook to fetch comprehensive transaction details including contract metadata,
 * function information, cost calculations, and gas estimates.
 */
export declare function useTransactionDetails({ transaction, client, wallet, }: UseTransactionDetailsOptions): import("@tanstack/react-query").UseQueryResult<TransactionDetails, Error>;
export {};
//# sourceMappingURL=useTransactionDetails.d.ts.map