"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inAppWalletSendCalls = inAppWalletSendCalls;
exports.inAppWalletGetCallsStatus = inAppWalletGetCallsStatus;
exports.inAppWalletGetCallsStatusRaw = inAppWalletGetCallsStatusRaw;
const eth_getTransactionReceipt_js_1 = require("../../../../rpc/actions/eth_getTransactionReceipt.js");
const rpc_js_1 = require("../../../../rpc/rpc.js");
const send_and_confirm_transaction_js_1 = require("../../../../transaction/actions/send-and-confirm-transaction.js");
const send_batch_transaction_js_1 = require("../../../../transaction/actions/send-batch-transaction.js");
const lru_js_1 = require("../../../../utils/caching/lru.js");
const random_js_1 = require("../../../../utils/random.js");
const bundlesToTransactions = new lru_js_1.LruMap(1000);
/**
 * @internal
 */
async function inAppWalletSendCalls(args) {
    const { account, calls } = args;
    const transactions = calls.map((call) => ({
        ...call,
        chain: args.chain,
    }));
    const hashes = [];
    const id = (0, random_js_1.randomBytesHex)(65);
    bundlesToTransactions.set(id, hashes);
    if (account.sendBatchTransaction) {
        const receipt = await (0, send_batch_transaction_js_1.sendBatchTransaction)({
            account,
            transactions,
        });
        hashes.push(receipt.transactionHash);
        bundlesToTransactions.set(id, hashes);
    }
    else {
        for (const tx of transactions) {
            const receipt = await (0, send_and_confirm_transaction_js_1.sendAndConfirmTransaction)({
                account,
                transaction: tx,
            });
            hashes.push(receipt.transactionHash);
            bundlesToTransactions.set(id, hashes);
        }
    }
    return id;
}
/**
 * @internal
 */
async function inAppWalletGetCallsStatus(args) {
    const { chain, client, id } = args;
    const bundle = bundlesToTransactions.get(id);
    if (!bundle) {
        throw new Error("Failed to get calls status, unknown bundle id");
    }
    const request = (0, rpc_js_1.getRpcClient)({ chain, client });
    let status = "success";
    const receipts = await Promise.all(bundle.map((hash) => (0, eth_getTransactionReceipt_js_1.eth_getTransactionReceipt)(request, { hash })
        .then((receipt) => ({
        blockHash: receipt.blockHash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed,
        logs: receipt.logs.map((l) => ({
            address: l.address,
            data: l.data,
            topics: l.topics,
        })),
        status: receipt.status,
        transactionHash: receipt.transactionHash,
    }))
        .catch(() => {
        status = "pending";
        return null; // Return null if there's an error to filter out later
    })));
    return {
        atomic: false,
        chainId: chain.id,
        id,
        receipts: receipts.filter((r) => r !== null),
        status,
        statusCode: 200,
        version: "2.0.0",
    };
}
/**
 * @internal
 */
async function inAppWalletGetCallsStatusRaw(args) {
    const { chain, client, id } = args;
    const bundle = bundlesToTransactions.get(id);
    if (!bundle) {
        throw new Error("Failed to get calls status, unknown bundle id");
    }
    const request = (0, rpc_js_1.getRpcClient)({ chain, client });
    let status = 200; // BATCH_STATE_CONFIRMED
    const receipts = [];
    for (const hash of bundle) {
        try {
            const receipt = await (0, eth_getTransactionReceipt_js_1.eth_getTransactionReceipt)(request, { hash });
            receipts.push({
                blockHash: receipt.blockHash,
                blockNumber: `0x${receipt.blockNumber.toString(16)}`,
                gasUsed: `0x${receipt.gasUsed.toString(16)}`,
                logs: receipt.logs.map((l) => ({
                    address: l.address,
                    data: l.data,
                    topics: l.topics,
                })),
                status: receipt.status === "success" ? "0x1" : "0x0",
                transactionHash: receipt.transactionHash,
            });
        }
        catch {
            status = 100; // BATCH_STATE_PENDING
        }
    }
    return {
        atomic: false,
        chainId: `0x${chain.id.toString(16)}`,
        id: id,
        receipts,
        status,
        version: "2.0.0",
    };
}
//# sourceMappingURL=in-app-wallet-calls.js.map