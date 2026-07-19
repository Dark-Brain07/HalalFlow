import { sendCalls } from "./send-calls.js";
import { waitForCallsReceipt } from "./wait-for-calls-receipt.js";
/**
 * Send and confirm calls in a single transaction.
 *
 * This is a convenience function that sends the calls with `sendCalls` and then waits for the receipts with `waitForCallsReceipt`.
 *
 * @param options - The options for sending and confirming calls.
 * @returns The receipts of the calls.
 * @example
 * ```ts
 * const call1 = approve({
 *   contract: USDT_CONTRACT,
 *   amount: 100,
 *   spender: "0x2a4f24F935Eb178e3e7BA9B53A5Ee6d8407C0709",
 * });
 * const call2 = transfer({
 *   contract: USDT_CONTRACT,
 *   to: "0x2a4f24F935Eb178e3e7BA9B53A5Ee6d8407C0709",
 *   amount: 100,
 * });
 * const result = await sendAndConfirmCalls({
 *   calls: [call1, call2],
 *   wallet: wallet,
 * });
 * console.log("Transaction receipts:", result.receipts);
 * ```
 * @extension EIP5792
 * @beta
 */
export async function sendAndConfirmCalls(options) {
    const sendCallsResult = await sendCalls(options);
    return waitForCallsReceipt({
        ...sendCallsResult,
        maxBlocksWaitTime: options.maxBlocksWaitTime,
    });
}
//# sourceMappingURL=send-and-confirm-calls.js.map