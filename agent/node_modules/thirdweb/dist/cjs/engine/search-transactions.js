"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchTransactions = searchTransactions;
const engine_1 = require("@thirdweb-dev/engine");
const domains_js_1 = require("../utils/domains.js");
const fetch_js_1 = require("../utils/fetch.js");
const json_js_1 = require("../utils/json.js");
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
async function searchTransactions(args) {
    const { client, filters, pageSize = 100, page = 1 } = args;
    const searchResult = await (0, engine_1.searchTransactions)({
        baseUrl: (0, domains_js_1.getThirdwebBaseUrl)("engineCloud"),
        body: {
            filters,
            limit: pageSize,
            page,
        },
        bodySerializer: json_js_1.stringify,
        fetch: (0, fetch_js_1.getClientFetch)(client),
    });
    if (searchResult.error) {
        throw new Error(`Error searching for transaction with filters ${(0, json_js_1.stringify)(filters)}: ${(0, json_js_1.stringify)(searchResult.error)}`);
    }
    const data = searchResult.data?.result;
    if (!data) {
        throw new Error(`No transactions found with filters ${(0, json_js_1.stringify)(filters)}`);
    }
    return data;
}
//# sourceMappingURL=search-transactions.js.map