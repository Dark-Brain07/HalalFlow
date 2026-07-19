import { type SendTransactionConfig } from "../../../core/hooks/transaction/useSendTransaction.js";
/**
 * A hook to send a transaction with from the user's connected wallet.
 *
 * You can send a transaction with a [prepared contract call](https://portal.thirdweb.com/references/typescript/v5/prepareContractCall), a [prepared transaction](https://portal.thirdweb.com/references/typescript/v5/prepareTransaction), or using a write [Extension](https://portal.thirdweb.com/react/v5/extensions).
 *
 * @returns A UseMutationResult object to send a transaction.
 * @param config Configuration for the `useSendTransaction` hook.
 * Refer to [`SendTransactionConfig`](https://portal.thirdweb.com/references/typescript/v5/SendTransactionConfig) for more details.
 * @example
 *
 * ### Sending a prepared contract call
 *
 * ```tsx
 * import { useSendTransaction } from "thirdweb/react";
 * import { getContract, prepareContractCall } from "thirdweb";
 * import { sepolia } from "thirdweb/chains";
 *
 * const contract = getContract({
 *   address: "0x...",
 *   chain: sepolia,
 *   client,
 * });
 *
 * const { mutate: sendTx, data: transactionResult } = useSendTransaction();
 *
 * const onClick = () => {
 *   const transaction = prepareContractCall({
 *     contract,
 *     method: "function transfer(address to, uint256 value)",
 *     params: [to, value],
 *   });
 *   sendTx(transaction);
 * };
 * ```
 *
 * ### Using a write extension
 *
 * ```tsx
 * import { useSendTransaction } from "thirdweb/react";
 * import { mintTo } from "thirdweb/extensions/erc721";
 *
 * const { mutate: sendTx, data: transactionResult } = useSendTransaction();
 *
 * const onClick = () => {
 *   const transaction = mintTo({
 *     contract,
 *     to: "0x...",
 *     nft: {
 *       name: "NFT Name",
 *       description: "NFT Description",
 *       image: "https://example.com/image.png",
 *     },
 *   });
 *   sendTx(transaction);
 * };
 * ```
 *
 * ### Sending a prepared transaction
 *
 * ```tsx
 * import { useSendTransaction } from "thirdweb/react";
 * import { prepareTransaction } from "thirdweb";
 * import { sepolia } from "thirdweb/chains";
 *
 * const { mutate: sendTx, data: transactionResult } = useSendTransaction();
 *
 * const onClick = () => {
 *   // Send 0.1 SepoliaETH to an address
 *   const transaction = prepareTransaction({
 *     to: "0x...",
 *     value: toWei("0.1"),
 *     chain: sepolia,
 *     client: thirdwebClient,
 *     // Specify a token required for the transaction
 *     erc20Value: {
 *       amountWei: toWei("0.1"),
 *       tokenAddress: "0x...",
 *     },
 *   });
 *   sendTx(transaction);
 * };
 * ```
 *
 * ### Configuring the Pay Modal
 *
 * When the wallet does not have enough funds to send the transaction, a modal is shown to the user to buy the required funds and then continue with the transaction.
 *
 * You can configure the pay modal by passing a [`SendTransactionPayModalConfig`](https://portal.thirdweb.com/references/typescript/v5/SendTransactionPayModalConfig) object to the `payModal` config.
 *
 * ```tsx
 * import { useSendTransaction } from "thirdweb/react";
 *
 * const sendTx = useSendTransaction({
 *   payModal: {
 *     theme: "light",
 *   },
 * });
 * ```
 *
 * By default, the pay modal is enabled. You can disable it by passing `payModal: false` to the config.
 *
 * ```tsx
 * import { useSendTransaction } from "thirdweb/react";
 *
 * const sendTx = useSendTransaction({
 *   payModal: false,
 * });
 * ```
 *
 * @transaction
 */
export declare function useSendTransaction(config?: SendTransactionConfig): import("@tanstack/react-query").UseMutationResult<{
    readonly transactionHash: import("../../../../exports/thirdweb.js").Hex;
    client: import("../../../../client/client.js").ThirdwebClient;
    chain: import("../../../../chains/types.js").Chain;
    maxBlocksWaitTime?: number | undefined;
}, Error, import("../../../../transaction/prepare-transaction.js").PreparedTransaction<any>>;
//# sourceMappingURL=useSendTransaction.d.ts.map