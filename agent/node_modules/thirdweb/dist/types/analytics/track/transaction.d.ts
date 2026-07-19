import type { ThirdwebClient } from "../../client/client.js";
import type { Ecosystem } from "../../wallets/in-app/core/wallet/types.js";
import type { WalletId } from "../../wallets/wallet-types.js";
type TransactionEvent = {
    client: ThirdwebClient;
    ecosystem?: Ecosystem;
    transactionHash?: string;
    walletAddress?: string;
    walletType?: WalletId | ({} & string);
    chainId?: number;
    contractAddress?: string;
    functionName?: string;
    gasPrice?: bigint;
    error?: {
        message: string;
        code: string;
    };
};
/**
 * @internal
 */
export declare function trackTransaction(args: TransactionEvent): Promise<void | Response>;
/**
 * @internal
 */
export declare function trackInsufficientFundsError(args: {
    client: ThirdwebClient;
    ecosystem?: Ecosystem;
    error: Error | unknown;
    walletAddress?: string;
    chainId?: number;
    contractAddress?: string;
    functionName?: string;
    transactionValue?: bigint;
    requiredAmount?: bigint;
    userBalance?: bigint;
}): Promise<void | Response>;
export {};
//# sourceMappingURL=transaction.d.ts.map