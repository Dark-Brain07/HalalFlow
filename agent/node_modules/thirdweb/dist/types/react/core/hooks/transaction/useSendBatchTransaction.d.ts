import { type UseMutationResult } from "@tanstack/react-query";
import type { SendTransactionOptions } from "../../../../transaction/actions/send-transaction.js";
import type { WaitForReceiptOptions } from "../../../../transaction/actions/wait-for-tx-receipt.js";
/**
 * A hook to send a transaction.
 * @returns A mutation object to send a transaction.
 * @example
 * ```jsx
 * import { useSendBatchTransaction } from "thirdweb/react";
 * const { mutate: sendBatch, data: transactionResult } = useSendBatchTransaction();
 *
 * // later
 * sendBatch([tx1, tx2]);
 * ```
 * @transaction
 */
export declare function useSendBatchTransaction(): UseMutationResult<WaitForReceiptOptions, Error, SendTransactionOptions["transaction"][]>;
//# sourceMappingURL=useSendBatchTransaction.d.ts.map