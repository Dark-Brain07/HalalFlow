import { type SpecificExecutionOptions } from "@thirdweb-dev/engine";
import type { Chain } from "../chains/types.js";
import type { ThirdwebClient } from "../client/client.js";
import type { PreparedTransaction } from "../transaction/prepare-transaction.js";
import type { Prettify } from "../utils/type-utils.js";
import type { Account } from "../wallets/interfaces/wallet.js";
type ExecutionOptions = Prettify<SpecificExecutionOptions>;
/**
 * Options for creating an server wallet.
 */
export type ServerWalletOptions = {
    /**
     * The thirdweb client to use for authentication to thirdweb services.
     */
    client: ThirdwebClient;
    /**
     * Optional vault access token to use your server wallet.
     * If not provided, the server wallet will use the project secret key to authenticate.
     */
    vaultAccessToken?: string;
    /**
     * The server wallet address to use for sending transactions inside engine.
     */
    address: string;
    /**
     * The chain to use for signing messages and typed data (smart server wallet only).
     */
    chain?: Chain;
    /**
     * Optional custom execution options to use for sending transactions and signing data.
     */
    executionOptions?: ExecutionOptions;
};
export type ServerWallet = Account & {
    enqueueTransaction: (args: {
        transaction: PreparedTransaction;
        simulate?: boolean;
    }) => Promise<{
        transactionId: string;
    }>;
    enqueueBatchTransaction: (args: {
        transactions: PreparedTransaction[];
    }) => Promise<{
        transactionId: string;
    }>;
};
/**
 * Use a server wallet for sending transactions and signing messages via engine (v3+).
 * @param options - The server wallet options.
 * @returns An account object that can be used to send transactions and sign messages.
 * @engine
 * @example
 * ### Creating a server wallet
 * ```ts
 * import { Engine } from "thirdweb";
 *
 * const client = createThirdwebClient({
 *   secretKey: "<your-project-secret-key>",
 * });
 *
 * const myServerWallet = Engine.serverWallet({
 *   client,
 *   address: "<your-server-wallet-address>",
 * });
 * ```
 *
 * ### Sending a transaction
 * ```ts
 * // prepare the transaction
 * const transaction = claimTo({
 *   contract,
 *   to: "0x...",
 *   quantity: 1n,
 * });
 *
 * // enqueue the transaction
 * const { transactionId } = await myServerWallet.enqueueTransaction({
 *   transaction,
 * });
 * ```
 *
 * ### Polling for the transaction to be submitted onchain
 * ```ts
 * // optionally poll for the transaction to be submitted onchain
 * const { transactionHash } = await Engine.waitForTransactionHash({
 *   client,
 *   transactionId,
 * });
 * console.log("Transaction sent:", transactionHash);
 * ```
 *
 *  ### Sending a batch of transactions
 * ```ts
 * // prepare the transactions
 * const transaction1 = claimTo({
 *   contract,
 *   to: firstRecipient,
 *   quantity: 1n,
 * });
 * const transaction2 = claimTo({
 *   contract,
 *   to: secondRecipient,
 *   quantity: 1n,
 * });
 *
 *
 * // enqueue the transactions in a batch
 * const { transactionId } = await myServerWallet.enqueueBatchTransaction({
 *   transactions: [transaction1, transaction2],
 * });
 * ```
 *
 * ### Polling for the batch of transactions to be submitted onchain
 * ```ts
 * // optionally poll for the transaction to be submitted onchain
 * const { transactionHash } = await Engine.waitForTransactionHash({
 *   client,
 *   transactionId,
 * });
 * console.log("Transaction sent:", transactionHash);
 * ```
 *
 * ### Getting the execution status of a transaction
 * ```ts
 * const executionResult = await Engine.getTransactionStatus({
 *   client,
 *   transactionId,
 * });
 * console.log("Transaction status:", executionResult.status);
 * ```
 */
export declare function serverWallet(options: ServerWalletOptions): ServerWallet;
export {};
//# sourceMappingURL=server-wallet.d.ts.map