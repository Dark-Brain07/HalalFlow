"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionStore = getTransactionStore;
exports.addTransactionToStore = addTransactionToStore;
exports.getPastTransactions = getPastTransactions;
const get_transactions_js_1 = require("../insight/get-transactions.js");
const store_js_1 = require("../reactive/store.js");
const transactionsByAddress = new Map();
/**
 * Retrieve the transaction store for a given address.
 * @param address - The address to retrieve the transaction store for.
 * @returns A store of transactions for the given account to subscribe to.
 * @transaction
 * @example
 * ```ts
 * import { getTransactionStore } from "thirdweb/transaction";
 *
 * const store = getTransactionStore("0x...");
 * store.subscribe((transactions) => {
 *   console.log(transactions);
 * });
 * ```
 */
function getTransactionStore(address) {
    const existingStore = transactionsByAddress.get(address);
    if (existingStore) {
        return existingStore;
    }
    const newStore = (0, store_js_1.createStore)([]);
    transactionsByAddress.set(address, newStore);
    return newStore;
}
/**
 * @internal
 */
function addTransactionToStore(options) {
    const { address, transactionHash, chainId } = options;
    const tranasctionStore = getTransactionStore(address);
    tranasctionStore.setValue([
        ...tranasctionStore.getValue(),
        { chainId, transactionHash },
    ]);
    transactionsByAddress.set(address, tranasctionStore);
}
/**
 * @internal for now
 */
async function getPastTransactions(options) {
    const { walletAddress, chain, client } = options;
    const oneMonthsAgoInSeconds = Math.floor((Date.now() - 1 * 30 * 24 * 60 * 60 * 1000) / 1000);
    const result = await (0, get_transactions_js_1.getTransactions)({
        chains: [chain],
        client,
        queryOptions: {
            filter_block_timestamp_gte: oneMonthsAgoInSeconds,
            limit: 20,
            decode: true,
        },
        walletAddress,
    });
    return result.map((tx) => ({
        chainId: typeof tx.chain_id === "string"
            ? Number(tx.chain_id)
            : tx.chain_id,
        receipt: {
            status: tx.status === 0 ? "failed" : "success",
            to: tx.to_address,
        },
        transactionHash: tx.hash,
        decoded: tx.decoded,
    }));
}
//# sourceMappingURL=transaction-store.js.map