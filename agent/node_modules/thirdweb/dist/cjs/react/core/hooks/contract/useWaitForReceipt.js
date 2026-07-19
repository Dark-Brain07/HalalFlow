"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWaitForReceipt = useWaitForReceipt;
const react_query_1 = require("@tanstack/react-query");
const wait_for_tx_receipt_js_1 = require("../../../../transaction/actions/wait-for-tx-receipt.js");
/**
 * A hook to wait for a transaction receipt.
 * @param options - The options for waiting for a transaction receipt.
 * @returns a query object.
 * @example
 * ```jsx
 * import { useWaitForReceipt } from "thirdweb/react";
 * const { data: receipt, isLoading } = useWaitForReceipt({client, chain, transactionHash});
 * ```
 * @transaction
 */
function useWaitForReceipt(options) {
    return (0, react_query_1.useQuery)({
        enabled: !!options?.transactionHash && (options?.queryOptions?.enabled ?? true),
        queryFn: async () => {
            if (!options?.transactionHash) {
                throw new Error("No transaction hash or user op hash provided");
            }
            return (0, wait_for_tx_receipt_js_1.waitForReceipt)(options);
        },
        queryKey: [
            "waitForReceipt",
            // TODO: here chain can be undefined so we go to a `-1` chain but this feels wrong
            options?.chain.id || -1,
            options?.transactionHash,
        ],
        retry: false,
    });
}
//# sourceMappingURL=useWaitForReceipt.js.map