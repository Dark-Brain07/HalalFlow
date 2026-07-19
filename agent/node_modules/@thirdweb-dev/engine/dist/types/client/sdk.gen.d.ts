import type { Client, Options as ClientOptions, TDataShape } from "./client/index.js";
import type { CancelTransactionData, CancelTransactionResponses, CreateAccountData, CreateAccountResponses, CreateSolanaAccountData, CreateSolanaAccountResponses, EncodeContractData, EncodeContractResponses, GetActivityLogsData, GetActivityLogsErrors, GetActivityLogsResponses, GetSolanaActivityLogsData, GetSolanaActivityLogsErrors, GetSolanaActivityLogsResponses, GetSolanaTransactionsData, GetSolanaTransactionsResponses, GetTransactionAnalyticsData, GetTransactionAnalyticsResponses, GetTransactionAnalyticsSummaryData, GetTransactionAnalyticsSummaryErrors, GetTransactionAnalyticsSummaryResponses, GetTransactionsData, GetTransactionsResponses, ListAccountsData, ListAccountsResponses, ListSolanaAccountsData, ListSolanaAccountsResponses, ReadContractData, ReadContractResponses, SearchActivityLogsData, SearchActivityLogsErrors, SearchActivityLogsResponses, SearchSolanaActivityLogsData, SearchSolanaActivityLogsErrors, SearchSolanaActivityLogsResponses, SearchSolanaTransactionsData, SearchSolanaTransactionsResponses, SearchTransactionsData, SearchTransactionsResponses, SendSolanaTransactionData, SendSolanaTransactionResponses, SendTransactionData, SendTransactionResponses, SignMessageData, SignMessageResponses, SignSolanaMessageData, SignSolanaMessageResponses, SignSolanaTransactionData, SignSolanaTransactionResponses, SignTypedDataData, SignTypedDataResponses, WriteContractData, WriteContractResponses } from "./types.gen.js";
export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean> = ClientOptions<TData, ThrowOnError> & {
    /**
     * You can provide a client instance returned by `createClient()` instead of
     * individual options. This might be also useful if you want to implement a
     * custom client.
     */
    client?: Client;
    /**
     * You can pass arbitrary values through the `meta` object. This can be
     * used to access values that aren't defined as part of the SDK function.
     */
    meta?: Record<string, unknown>;
};
/**
 * Write Contract
 * Call a contract function with a transaction
 */
export declare const writeContract: <ThrowOnError extends boolean = false>(options: Options<WriteContractData, ThrowOnError>) => import("./client/types.js").RequestResult<WriteContractResponses, unknown, ThrowOnError, "fields">;
/**
 * Write Transaction
 * Execute raw transactions
 */
export declare const sendTransaction: <ThrowOnError extends boolean = false>(options: Options<SendTransactionData, ThrowOnError>) => import("./client/types.js").RequestResult<SendTransactionResponses, unknown, ThrowOnError, "fields">;
/**
 * Sign Message
 * Sign messages using either EOA or Smart Account
 */
export declare const signMessage: <ThrowOnError extends boolean = false>(options: Options<SignMessageData, ThrowOnError>) => import("./client/types.js").RequestResult<SignMessageResponses, unknown, ThrowOnError, "fields">;
/**
 * Sign Typed Data
 * Sign EIP-712 typed data using either EOA or Smart Account
 */
export declare const signTypedData: <ThrowOnError extends boolean = false>(options: Options<SignTypedDataData, ThrowOnError>) => import("./client/types.js").RequestResult<SignTypedDataResponses, unknown, ThrowOnError, "fields">;
/**
 * Read Contract
 * Read from smart contracts with intelligent execution strategy:
 * - Single calls: Always executed directly for efficiency
 * - Multiple calls: Uses multicall by default, or direct calls if disabled
 * - Failed preparations: Returns preparation errors directly
 *
 * If multicall is not specified, it will be used by default. In case of multicall related errors, engine will fallback to direct calls.
 * Only in the case where multicall is explicitly enabled, engine will not fallback to direct calls.
 */
export declare const readContract: <ThrowOnError extends boolean = false>(options: Options<ReadContractData, ThrowOnError>) => import("./client/types.js").RequestResult<ReadContractResponses, unknown, ThrowOnError, "fields">;
/**
 * Encode Contract
 * Encode contract function calls without execution
 */
export declare const encodeContract: <ThrowOnError extends boolean = false>(options: Options<EncodeContractData, ThrowOnError>) => import("./client/types.js").RequestResult<EncodeContractResponses, unknown, ThrowOnError, "fields">;
/**
 * Send Solana Transaction
 * Execute a Solana transaction with custom instructions
 */
export declare const sendSolanaTransaction: <ThrowOnError extends boolean = false>(options: Options<SendSolanaTransactionData, ThrowOnError>) => import("./client/types.js").RequestResult<SendSolanaTransactionResponses, unknown, ThrowOnError, "fields">;
/**
 * Sign Solana Transaction
 * Sign a Solana transaction without broadcasting it
 */
export declare const signSolanaTransaction: <ThrowOnError extends boolean = false>(options: Options<SignSolanaTransactionData, ThrowOnError>) => import("./client/types.js").RequestResult<SignSolanaTransactionResponses, unknown, ThrowOnError, "fields">;
/**
 * Cancel Transaction
 * Attempt to cancel a queued transaction. Transactions that have been sent and are waiting for mine cannot be cancelled.
 */
export declare const cancelTransaction: <ThrowOnError extends boolean = false>(options: Options<CancelTransactionData, ThrowOnError>) => import("./client/types.js").RequestResult<CancelTransactionResponses, unknown, ThrowOnError, "fields">;
/**
 * List Server Wallets
 * List all engine server wallets for the current project. Returns an array of EOA addresses with their corresponding predicted smart account addresses.
 */
export declare const listAccounts: <ThrowOnError extends boolean = false>(options?: Options<ListAccountsData, ThrowOnError>) => import("./client/types.js").RequestResult<ListAccountsResponses, unknown, ThrowOnError, "fields">;
/**
 * Get or Create Server Wallet
 * Create a new engine server wallet or retrieve an existing one. If the EOA already exists for the given label, it will be returned without creating a new one.
 */
export declare const createAccount: <ThrowOnError extends boolean = false>(options?: Options<CreateAccountData, ThrowOnError>) => import("./client/types.js").RequestResult<CreateAccountResponses, unknown, ThrowOnError, "fields">;
/**
 * List Solana Accounts
 * List all Solana wallets provisioned for the project.
 */
export declare const listSolanaAccounts: <ThrowOnError extends boolean = false>(options?: Options<ListSolanaAccountsData, ThrowOnError>) => import("./client/types.js").RequestResult<ListSolanaAccountsResponses, unknown, ThrowOnError, "fields">;
/**
 * Get or Create Solana Account
 * Create a new solana wallet in the vault or return the existing wallet for a given label.
 */
export declare const createSolanaAccount: <ThrowOnError extends boolean = false>(options?: Options<CreateSolanaAccountData, ThrowOnError>) => import("./client/types.js").RequestResult<CreateSolanaAccountResponses, unknown, ThrowOnError, "fields">;
/**
 * Sign Solana Message
 * Sign an arbitrary message with a Solana wallet.
 */
export declare const signSolanaMessage: <ThrowOnError extends boolean = false>(options?: Options<SignSolanaMessageData, ThrowOnError>) => import("./client/types.js").RequestResult<SignSolanaMessageResponses, unknown, ThrowOnError, "fields">;
/**
 * Get Transactions
 * Search transactions with various filters and pagination
 */
export declare const getTransactions: <ThrowOnError extends boolean = false>(options?: Options<GetTransactionsData, ThrowOnError>) => import("./client/types.js").RequestResult<GetTransactionsResponses, unknown, ThrowOnError, "fields">;
/**
 * Transaction Analytics
 * Get transaction count analytics over time with filtering
 */
export declare const getTransactionAnalytics: <ThrowOnError extends boolean = false>(options?: Options<GetTransactionAnalyticsData, ThrowOnError>) => import("./client/types.js").RequestResult<GetTransactionAnalyticsResponses, unknown, ThrowOnError, "fields">;
/**
 * Transaction Analytics Summary
 * Get a summary (total count and total gas calculation) for transactions within a time range, supporting complex nested filters.
 */
export declare const getTransactionAnalyticsSummary: <ThrowOnError extends boolean = false>(options?: Options<GetTransactionAnalyticsSummaryData, ThrowOnError>) => import("./client/types.js").RequestResult<GetTransactionAnalyticsSummaryResponses, GetTransactionAnalyticsSummaryErrors, ThrowOnError, "fields">;
/**
 * Search Transactions
 * Advanced search for transactions with complex nested filters
 */
export declare const searchTransactions: <ThrowOnError extends boolean = false>(options?: Options<SearchTransactionsData, ThrowOnError>) => import("./client/types.js").RequestResult<SearchTransactionsResponses, unknown, ThrowOnError, "fields">;
/**
 * Get Activity Logs
 * Get paginated activity logs for a specific transaction with tenancy enforcement
 */
export declare const getActivityLogs: <ThrowOnError extends boolean = false>(options: Options<GetActivityLogsData, ThrowOnError>) => import("./client/types.js").RequestResult<GetActivityLogsResponses, GetActivityLogsErrors, ThrowOnError, "fields">;
/**
 * Search Activity Logs
 * Search activity logs across transactions with advanced filtering and tenancy enforcement
 */
export declare const searchActivityLogs: <ThrowOnError extends boolean = false>(options?: Options<SearchActivityLogsData, ThrowOnError>) => import("./client/types.js").RequestResult<SearchActivityLogsResponses, SearchActivityLogsErrors, ThrowOnError, "fields">;
/**
 * Get Solana Transactions
 * Search Solana transactions with various filters and pagination
 */
export declare const getSolanaTransactions: <ThrowOnError extends boolean = false>(options?: Options<GetSolanaTransactionsData, ThrowOnError>) => import("./client/types.js").RequestResult<GetSolanaTransactionsResponses, unknown, ThrowOnError, "fields">;
/**
 * Search Solana Transactions
 * Advanced search for Solana transactions with complex nested filters
 */
export declare const searchSolanaTransactions: <ThrowOnError extends boolean = false>(options?: Options<SearchSolanaTransactionsData, ThrowOnError>) => import("./client/types.js").RequestResult<SearchSolanaTransactionsResponses, unknown, ThrowOnError, "fields">;
/**
 * Get Solana Activity Logs
 * Get paginated activity logs for a specific Solana transaction with tenancy enforcement
 */
export declare const getSolanaActivityLogs: <ThrowOnError extends boolean = false>(options: Options<GetSolanaActivityLogsData, ThrowOnError>) => import("./client/types.js").RequestResult<GetSolanaActivityLogsResponses, GetSolanaActivityLogsErrors, ThrowOnError, "fields">;
/**
 * Search Solana Activity Logs
 * Search Solana activity logs across transactions with advanced filtering and tenancy enforcement
 */
export declare const searchSolanaActivityLogs: <ThrowOnError extends boolean = false>(options?: Options<SearchSolanaActivityLogsData, ThrowOnError>) => import("./client/types.js").RequestResult<SearchSolanaActivityLogsResponses, SearchSolanaActivityLogsErrors, ThrowOnError, "fields">;
//# sourceMappingURL=sdk.gen.d.ts.map