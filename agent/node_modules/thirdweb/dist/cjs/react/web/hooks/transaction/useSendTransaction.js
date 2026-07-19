"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSendTransaction = useSendTransaction;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const random_js_1 = require("../../../../utils/random.js");
const useSendTransaction_js_1 = require("../../../core/hooks/transaction/useSendTransaction.js");
const useActiveWallet_js_1 = require("../../../core/hooks/wallets/useActiveWallet.js");
const useSwitchActiveWalletChain_js_1 = require("../../../core/hooks/wallets/useSwitchActiveWalletChain.js");
const RootElementContext_js_1 = require("../../../core/providers/RootElementContext.js");
const TransactionModal_js_1 = require("../../ui/TransactionButton/TransactionModal.js");
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
function useSendTransaction(config = {}) {
    const switchChain = (0, useSwitchActiveWalletChain_js_1.useSwitchActiveWalletChain)();
    const wallet = (0, useActiveWallet_js_1.useActiveWallet)();
    const setRootEl = (0, react_1.useContext)(RootElementContext_js_1.SetRootElementContext);
    const payModal = config.payModal;
    let payModalEnabled = true;
    if (payModal === false || config.gasless) {
        payModalEnabled = false;
    }
    const showPayModal = (data) => {
        if (payModal === false)
            return;
        setRootEl((0, jsx_runtime_1.jsx)(TransactionModal_js_1.TransactionModal, { country: payModal?.country, currency: payModal?.currency, client: data.tx.client, localeId: payModal?.locale || "en_US", modalMode: data.mode, onClose: () => {
                setRootEl(null);
                data.rejectTx(new Error("User rejected transaction by closing modal"));
            }, onComplete: data.sendTx, onTxSent: data.resolveTx, payOptions: {
                buyWithCrypto: payModal?.buyWithCrypto,
                buyWithFiat: payModal?.buyWithFiat,
                metadata: payModal?.metadata,
                mode: "transaction",
                onPurchaseSuccess: payModal?.onPurchaseSuccess,
                purchaseData: payModal?.purchaseData,
                showThirdwebBranding: payModal?.showThirdwebBranding,
                transaction: data.tx,
            }, supportedTokens: payModal?.supportedTokens, theme: payModal?.theme || "dark", title: payModal?.metadata?.name || "Transaction", tx: data.tx, txId: (0, random_js_1.randomBytesHex)() }));
    };
    return (0, useSendTransaction_js_1.useSendTransactionCore)({
        gasless: config.gasless,
        showPayModal: !payModalEnabled || payModal === false ? undefined : showPayModal,
        switchChain,
        wallet,
    });
}
//# sourceMappingURL=useSendTransaction.js.map