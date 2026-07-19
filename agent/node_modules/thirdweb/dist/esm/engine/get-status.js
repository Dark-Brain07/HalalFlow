import { searchTransactions } from "@thirdweb-dev/engine";
import { getCachedChain } from "../chains/utils.js";
import { getThirdwebBaseUrl } from "../utils/domains.js";
import { getClientFetch } from "../utils/fetch.js";
import { stringify } from "../utils/json.js";
/**
 * Get the execution status of a transaction.
 * @param args - The arguments for the transaction.
 * @param args.client - The thirdweb client to use.
 * @param args.transactionId - The id of the transaction to get the status of.
 * @engine
 * @example
 * ```ts
 * import { Engine } from "thirdweb";
 *
 * const executionResult = await Engine.getTransactionStatus({
 *   client,
 *   transactionId,
 * });
 * console.log(executionResult.status);
 * ```
 */
export async function getTransactionStatus(args) {
    const { client, transactionId } = args;
    const searchResult = await searchTransactions({
        baseUrl: getThirdwebBaseUrl("engineCloud"),
        body: {
            filters: [
                {
                    field: "id",
                    operation: "OR",
                    values: [transactionId],
                },
            ],
        },
        bodySerializer: stringify,
        fetch: getClientFetch(client),
    });
    if (searchResult.error) {
        throw new Error(`Error searching for transaction ${transactionId}: ${stringify(searchResult.error)}`);
    }
    const data = searchResult.data?.result?.transactions?.[0];
    if (!data) {
        throw new Error(`Transaction ${transactionId} not found`);
    }
    const executionResult = data.executionResult;
    return {
        ...executionResult,
        cancelledAt: data.cancelledAt,
        chain: getCachedChain(Number(data.chainId)),
        confirmedAt: data.confirmedAt,
        createdAt: data.createdAt,
        from: data.from ?? undefined,
        id: data.id,
    };
}
//# sourceMappingURL=get-status.js.map