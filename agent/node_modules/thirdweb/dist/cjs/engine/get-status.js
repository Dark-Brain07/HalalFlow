"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionStatus = getTransactionStatus;
const engine_1 = require("@thirdweb-dev/engine");
const utils_js_1 = require("../chains/utils.js");
const domains_js_1 = require("../utils/domains.js");
const fetch_js_1 = require("../utils/fetch.js");
const json_js_1 = require("../utils/json.js");
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
async function getTransactionStatus(args) {
    const { client, transactionId } = args;
    const searchResult = await (0, engine_1.searchTransactions)({
        baseUrl: (0, domains_js_1.getThirdwebBaseUrl)("engineCloud"),
        body: {
            filters: [
                {
                    field: "id",
                    operation: "OR",
                    values: [transactionId],
                },
            ],
        },
        bodySerializer: json_js_1.stringify,
        fetch: (0, fetch_js_1.getClientFetch)(client),
    });
    if (searchResult.error) {
        throw new Error(`Error searching for transaction ${transactionId}: ${(0, json_js_1.stringify)(searchResult.error)}`);
    }
    const data = searchResult.data?.result?.transactions?.[0];
    if (!data) {
        throw new Error(`Transaction ${transactionId} not found`);
    }
    const executionResult = data.executionResult;
    return {
        ...executionResult,
        cancelledAt: data.cancelledAt,
        chain: (0, utils_js_1.getCachedChain)(Number(data.chainId)),
        confirmedAt: data.confirmedAt,
        createdAt: data.createdAt,
        from: data.from ?? undefined,
        id: data.id,
    };
}
//# sourceMappingURL=get-status.js.map