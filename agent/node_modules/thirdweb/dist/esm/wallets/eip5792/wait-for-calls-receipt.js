import { watchBlockNumber } from "../../rpc/watchBlockNumber.js";
import { getCallsStatus } from "./get-calls-status.js";
const DEFAULT_MAX_BLOCKS_WAIT_TIME = 100;
const map = new Map();
/**
 * Waits for the [EIP-5792](https://eips.ethereum.org/EIPS/eip-5792) bundle to be confirmed.
 *
 *  This function is dependent on the wallet's support for EIP-5792 and could fail.
 *
 * @param options - The options for waiting for the bundle.
 * By default, the max wait time is 100 blocks.
 * @returns A promise that resolves with the final {@link getCallsStatus} result.
 * @throws an error if the wallet does not support EIP-5792.
 * @beta
 * @example
 * ```ts
 * import { waitForCallsReceipt } from "thirdweb/wallets/eip5792";
 * const result = await waitForCallsReceipt({
 *   client,
 *   chain,
 *   wallet,
 *   id: "0x123...",
 * });
 * ```
 *
 * Example with useSendCalls:
 * ```ts
 * const sendResult = await sendCalls({
 *   client,
 *   chain,
 *   wallet,
 *   calls: [...],
 * });
 * const confirmResult = await waitForCallsReceipt(sendResult);
 * console.log("Transaction confirmed: ", confirmResult.receipts?.[0].transactionHash);
 * ```
 * @extension EIP5792
 */
export function waitForCallsReceipt(options) {
    const { id, chain, wallet, client } = options;
    const chainId = chain.id;
    const key = `${chainId}:calls_${id}`;
    const maxBlocksWaitTime = options.maxBlocksWaitTime ?? DEFAULT_MAX_BLOCKS_WAIT_TIME;
    if (map.has(key)) {
        // biome-ignore lint/style/noNonNullAssertion: the `has` above ensures that this will always be set
        return map.get(key);
    }
    const promise = new Promise((resolve, reject) => {
        // start at -1 because the first block doesn't count
        let blocksWaited = -1;
        const unwatch = watchBlockNumber({
            chain: chain,
            client: client,
            onNewBlockNumber: async () => {
                blocksWaited++;
                if (blocksWaited >= maxBlocksWaitTime) {
                    unwatch();
                    reject(new Error(`Bundle not confirmed after ${maxBlocksWaitTime} blocks`));
                    return;
                }
                try {
                    const result = await getCallsStatus({
                        client,
                        id,
                        wallet,
                    });
                    if (result.status === "success" || result.status === "failure") {
                        // stop the polling
                        unwatch();
                        // resolve the top level promise with the result
                        resolve(result);
                        return;
                    }
                }
                catch (error) {
                    // we'll try again on the next blocks
                    console.error("waitForCallsReceipt error", error);
                }
            },
        });
        // remove the promise from the map when it's done (one way or the other)
    }).finally(() => {
        map.delete(key);
    });
    map.set(key, promise);
    return promise;
}
//# sourceMappingURL=wait-for-calls-receipt.js.map