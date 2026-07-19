import { type TransactionsFilterNested, type TransactionsFilterValue } from "@thirdweb-dev/engine";
import type { ThirdwebClient } from "../client/client.js";
export type SearchTransactionsArgs = {
    client: ThirdwebClient;
    filters?: (TransactionsFilterValue | TransactionsFilterNested)[];
    pageSize?: number;
    page?: number;
};
/**
 * Search for transactions by their ids.
 * @param args - The arguments for the search.
 * @param args.client - The thirdweb client to use.
 * @param args.transactionIds - The ids of the transactions to search for.
 * @engine
 * @example
 * ## Search for transactions by their ids
 *
 * ```ts
 * import { Engine } from "thirdweb";
 *
 * const transactions = await Engine.searchTransactions({
 *   client,
 *   filters: [
 *     {
 *       field: "id",
 *       values: ["1", "2", "3"],
 *     },
 *   ],
 * });
 * console.log(transactions);
 * ```
 *
 * ## Search for transactions by chain id
 *
 * ```ts
 * import { Engine } from "thirdweb";
 *
 * const transactions = await Engine.searchTransactions({
 *   client,
 *   filters: [
 *     {
 *       field: "chainId",
 *       values: ["1", "137"],
 *     },
 *   ],
 * });
 * console.log(transactions);
 * ```
 *
 * ## Search for transactions by sender wallet address
 *
 * ```ts
 * import { Engine } from "thirdweb";
 *
 * const transactions = await Engine.searchTransactions({
 *   client,
 *   filters: [
 *     {
 *       field: "from",
 *       values: ["0x1234567890123456789012345678901234567890"],
 *     },
 *   ],
 * });
 * console.log(transactions);
 * ```
 *
 * ## Combined search
 *
 * ```ts
 * import { Engine } from "thirdweb";
 *
 * const transactions = await Engine.searchTransactions({
 *   client,
 *   filters: [
 *     {
 *       filters: [
 *         {
 *          field: "from",
 *          values: ["0x1234567890123456789012345678901234567890"],
 *        },
 *        {
 *          field: "chainId",
 *          values: ["8453"],
 *        },
 *      ],
 *      operation: "AND",
 *    },
 *  ],
 *  pageSize: 100,
 *  page: 0,
 * });
 * console.log(transactions);
 * ```
 */
export declare function searchTransactions(args: SearchTransactionsArgs): Promise<{
    transactions: Array<{
        id: string;
        batchIndex: number;
        clientId: string;
        chainId: string;
        from: string | null;
        transactionParams: (string | number | boolean | null) | {
            [key: string]: unknown;
        } | Array<unknown>;
        transactionHash: string | null;
        status: string | null;
        confirmedAt: string | null;
        confirmedAtBlockNumber: string | null;
        enrichedData: (string | number | boolean | null) | {
            [key: string]: unknown;
        } | Array<unknown>;
        executionParams: (string | number | boolean | null) | {
            [key: string]: unknown;
        } | Array<unknown>;
        executionResult: (string | number | boolean | null) | {
            [key: string]: unknown;
        } | Array<unknown> | null;
        createdAt: string;
        errorMessage: string | null;
        cancelledAt: string | null;
    }>;
    pagination: {
        totalCount: number;
        page: number;
        limit: number;
    };
}>;
//# sourceMappingURL=search-transactions.d.ts.map