"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSendAndConfirmTransaction = useSendAndConfirmTransaction;
const react_query_1 = require("@tanstack/react-query");
const wait_for_tx_receipt_js_1 = require("../../../../transaction/actions/wait-for-tx-receipt.js");
const useSendTransaction_js_1 = require("./useSendTransaction.js");
/**
 * A hook to send a transaction and confirm the transaction with users's connected wallet
 * @returns A mutation object to send a transaction.
 * @example
 * ```jsx
 * import { useSendAndConfirmTransaction } from "thirdweb/react";
 * const { mutate: sendAndConfirmTx, data: transactionReceipt } = useSendAndConfirmTransaction();
 *
 * // later
 * sendAndConfirmTx(tx);
 * ```
 *
 *
 * ### Gasless usage with [thirdweb Engine](https://portal.thirdweb.com/engine)
 * ```tsx
 * import { useSendAndConfirmTransaction } from "thirdweb/react";
 * const mutation = useSendAndConfirmTransaction({
 *   gasless: {
 *     provider: "engine",
 *     relayerUrl: "https://thirdweb.engine-***.thirdweb.com/relayer/***",
 *     relayerForwarderAddress: "0x...",
 *   }
 * });
 * ```
 *
 * ### Gasless usage with OpenZeppelin
 * ```tsx
 * import { useSendAndConfirmTransaction } from "thirdweb/react";
 * const mutation = useSendAndConfirmTransaction({
 *   gasless: {
 *     provider: "openzeppelin",
 *     relayerUrl: "https://...",
 *     relayerForwarderAddress: "0x...",
 *   }
 * });
 * ```
 *
 * ### Configuring the Pay Modal
 *
 * When the wallet does not have enough funds to send the transaction, a modal is shown to the user to buy the required funds and then continue with the transaction.
 *
 * You can configure the pay modal by passing a [`SendTransactionPayModalConfig`](https://portal.thirdweb.com/references/typescript/v5/SendTransactionPayModalConfig) object to the `payModal` config.
 *
 * ```tsx
 * import { useSendAndConfirmTransaction } from "thirdweb/react";
 *
 * const sendAndConfirmTx = useSendAndConfirmTransaction({
 *   payModal: {
 *     theme: "light",
 *   },
 * });
 * ```
 *
 * By default, the pay modal is enabled. You can disable it by passing `payModal: false` to the config.
 *
 * ```tsx
 * import { useSendAndConfirmTransaction } from "thirdweb/react";
 *
 * const sendAndConfirmTx = useSendAndConfirmTransaction({
 *   payModal: false,
 * });
 * ```
 * @transaction
 */
function useSendAndConfirmTransaction(config = {}) {
    const sendTx = (0, useSendTransaction_js_1.useSendTransaction)(config);
    return (0, react_query_1.useMutation)({
        mutationFn: async (transaction) => {
            const receipt = await sendTx.mutateAsync(transaction);
            const confirmedReceipt = await (0, wait_for_tx_receipt_js_1.waitForReceipt)(receipt);
            return confirmedReceipt;
        },
    });
}
//# sourceMappingURL=useSendAndConfirmTransaction.js.map