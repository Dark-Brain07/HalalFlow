import { eth_getTransactionReceipt } from "../../../../rpc/actions/eth_getTransactionReceipt.js";
import { getRpcClient } from "../../../../rpc/rpc.js";
import { sendAndConfirmTransaction } from "../../../../transaction/actions/send-and-confirm-transaction.js";
import { sendBatchTransaction } from "../../../../transaction/actions/send-batch-transaction.js";
import { LruMap } from "../../../../utils/caching/lru.js";
import { randomBytesHex } from "../../../../utils/random.js";
const bundlesToTransactions = new LruMap(1000);
/**
 * @internal
 */
export async function inAppWalletSendCalls(args) {
    const { account, calls } = args;
    const transactions = calls.map((call) => ({
        ...call,
        chain: args.chain,
    }));
    const hashes = [];
    const id = randomBytesHex(65);
    bundlesToTransactions.set(id, hashes);
    if (account.sendBatchTransaction) {
        const receipt = await sendBatchTransaction({
            account,
            transactions,
        });
        hashes.push(receipt.transactionHash);
        bundlesToTransactions.set(id, hashes);
    }
    else {
        for (const tx of transactions) {
            const receipt = await sendAndConfirmTransaction({
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
export async function inAppWalletGetCallsStatus(args) {
    const { chain, client, id } = args;
    const bundle = bundlesToTransactions.get(id);
    if (!bundle) {
        throw new Error("Failed to get calls status, unknown bundle id");
    }
    const request = getRpcClient({ chain, client });
    let status = "success";
    const receipts = await Promise.all(bundle.map((hash) => eth_getTransactionReceipt(request, { hash })
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
export async function inAppWalletGetCallsStatusRaw(args) {
    const { chain, client, id } = args;
    const bundle = bundlesToTransactions.get(id);
    if (!bundle) {
        throw new Error("Failed to get calls status, unknown bundle id");
    }
    const request = getRpcClient({ chain, client });
    let status = 200; // BATCH_STATE_CONFIRMED
    const receipts = [];
    for (const hash of bundle) {
        try {
            const receipt = await eth_getTransactionReceipt(request, { hash });
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