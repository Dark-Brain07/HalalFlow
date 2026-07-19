import type { ThirdwebClient } from "../client/client.js";
import type { WaitForReceiptOptions } from "../transaction/actions/wait-for-tx-receipt.js";
/**
 * Wait for a transaction to be submitted onchain and return the transaction hash.
 * @param args - The arguments for the transaction.
 * @param args.client - The thirdweb client to use.
 * @param args.transactionId - The id of the transaction to wait for.
 * @param args.timeoutInSeconds - The timeout in seconds.
 * @engine
 * @example
 * ```ts
 * import { Engine } from "thirdweb";
 *
 * const { transactionHash } = await Engine.waitForTransactionHash({
 *   client,
 *   transactionId, // the transaction id returned from enqueueTransaction
 * });
 * ```
 */
export declare function waitForTransactionHash(args: {
    client: ThirdwebClient;
    transactionId: string;
    timeoutInSeconds?: number;
}): Promise<WaitForReceiptOptions>;
//# sourceMappingURL=wait-for-tx-hash.d.ts.map