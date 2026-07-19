"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSendTransactionCore = useSendTransactionCore;
const react_query_1 = require("@tanstack/react-query");
const helpers_js_1 = require("../../../../analytics/track/helpers.js");
const pay_js_1 = require("../../../../analytics/track/pay.js");
const transaction_js_1 = require("../../../../analytics/track/transaction.js");
const Bridge = require("../../../../bridge/index.js");
const send_transaction_js_1 = require("../../../../transaction/actions/send-transaction.js");
const utils_js_1 = require("../../../../transaction/utils.js");
const resolve_promised_value_js_1 = require("../../../../utils/promise/resolve-promised-value.js");
const is_smart_wallet_js_1 = require("../../../../wallets/smart/is-smart-wallet.js");
const getTokenBalance_js_1 = require("../../../../wallets/utils/getTokenBalance.js");
const getWalletBalance_js_1 = require("../../../../wallets/utils/getWalletBalance.js");
/**
 * A hook to send a transaction.
 * @returns A mutation object to send a transaction.
 * @example
 * ```jsx
 * import { useSendTransaction } from "thirdweb/react";
 * const { mutate: sendTx, data: transactionResult } = useSendTransaction();
 *
 * // later
 * sendTx(tx);
 * ```
 * @internal
 */
function useSendTransactionCore(args) {
    const { showPayModal, gasless, wallet, switchChain } = args;
    let _account = wallet?.getAccount();
    return (0, react_query_1.useMutation)({
        mutationFn: async (tx) => {
            // switch chain if needed
            if (wallet && tx.chain.id !== wallet.getChain()?.id) {
                await switchChain(tx.chain);
                // in smart wallet case, account may change after chain switch
                _account = wallet.getAccount();
                // ensure that the account has switched to the correct chain
                if (wallet.getChain()?.id !== tx.chain.id) {
                    throw new Error(`Could not switch to chain ${tx.chain.id}`);
                }
            }
            const account = _account;
            if (!account) {
                throw new Error("No active account");
            }
            if (!showPayModal) {
                (0, pay_js_1.trackPayEvent)({
                    chainId: tx.chain.id,
                    client: tx.client,
                    event: "pay_transaction_modal_disabled",
                    walletAddress: account.address,
                    walletType: wallet?.id,
                });
                return (0, send_transaction_js_1.sendTransaction)({
                    account,
                    gasless,
                    transaction: tx,
                });
            }
            return new Promise((resolve, reject) => {
                const sendTx = async () => {
                    try {
                        const res = await (0, send_transaction_js_1.sendTransaction)({
                            account,
                            gasless,
                            transaction: tx,
                        });
                        resolve(res);
                    }
                    catch (e) {
                        // Track insufficient funds errors specifically
                        if ((0, helpers_js_1.isInsufficientFundsError)(e)) {
                            (0, transaction_js_1.trackInsufficientFundsError)({
                                chainId: tx.chain.id,
                                client: tx.client,
                                contractAddress: await (0, resolve_promised_value_js_1.resolvePromisedValue)(tx.to ?? undefined),
                                error: e,
                                transactionValue: await (0, resolve_promised_value_js_1.resolvePromisedValue)(tx.value),
                                walletAddress: account.address,
                            });
                        }
                        reject(e);
                    }
                };
                (async () => {
                    try {
                        const [_nativeValue, _erc20Value] = await Promise.all([
                            (0, resolve_promised_value_js_1.resolvePromisedValue)(tx.value),
                            (0, resolve_promised_value_js_1.resolvePromisedValue)(tx.erc20Value),
                        ]);
                        const nativeValue = _nativeValue || 0n;
                        const erc20Value = _erc20Value?.amountWei || 0n;
                        const [nativeBalance, erc20Balance, gasCost] = await Promise.all([
                            (0, getWalletBalance_js_1.getWalletBalance)({
                                address: account.address,
                                chain: tx.chain,
                                client: tx.client,
                            }),
                            _erc20Value?.tokenAddress
                                ? (0, getTokenBalance_js_1.getTokenBalance)({
                                    account,
                                    chain: tx.chain,
                                    client: tx.client,
                                    tokenAddress: _erc20Value.tokenAddress,
                                })
                                : undefined,
                            (0, utils_js_1.getTransactionGasCost)(tx, account.address),
                        ]);
                        const gasSponsored = (0, is_smart_wallet_js_1.hasSponsoredTransactionsEnabled)(wallet);
                        const txGasCost = gasSponsored ? 0n : gasCost;
                        const nativeCost = nativeValue + txGasCost;
                        const shouldShowModal = (erc20Value > 0n &&
                            erc20Balance &&
                            erc20Balance.value < erc20Value) ||
                            (nativeCost > 0n && nativeBalance.value < nativeCost);
                        if (shouldShowModal) {
                            const tokens = await Bridge.tokens({
                                client: tx.client,
                                chainId: tx.chain.id,
                                tokenAddress: _erc20Value?.tokenAddress,
                            }).catch((err) => {
                                (0, pay_js_1.trackPayEvent)({
                                    client: tx.client,
                                    error: err?.message,
                                    event: "pay_transaction_modal_pay_api_error",
                                    toChainId: tx.chain.id,
                                    walletAddress: account.address,
                                    walletType: wallet?.id,
                                });
                                return null;
                            });
                            if (!tokens || tokens.length === 0) {
                                // not a supported token -> show deposit screen
                                (0, pay_js_1.trackPayEvent)({
                                    client: tx.client,
                                    error: JSON.stringify({
                                        chain: tx.chain.id,
                                        message: "chain/token not supported",
                                        token: _erc20Value?.tokenAddress,
                                    }),
                                    event: "pay_transaction_modal_chain_token_not_supported",
                                    toChainId: tx.chain.id,
                                    toToken: _erc20Value?.tokenAddress || undefined,
                                    walletAddress: account.address,
                                    walletType: wallet?.id,
                                });
                                showPayModal({
                                    mode: "deposit",
                                    rejectTx: reject,
                                    resolveTx: resolve,
                                    sendTx,
                                    tx,
                                });
                                return;
                            }
                            // chain is supported, show buy mode
                            showPayModal({
                                mode: "buy",
                                rejectTx: reject,
                                resolveTx: resolve,
                                sendTx,
                                tx,
                            });
                        }
                        else {
                            (0, pay_js_1.trackPayEvent)({
                                client: tx.client,
                                event: "pay_transaction_modal_has_enough_funds",
                                toChainId: tx.chain.id,
                                toToken: _erc20Value?.tokenAddress || undefined,
                                walletAddress: account.address,
                                walletType: wallet?.id,
                            });
                            sendTx();
                        }
                    }
                    catch (e) {
                        console.error("Failed to estimate cost", e);
                        // send it anyway?
                        sendTx();
                    }
                })();
            });
        },
    });
}
//# sourceMappingURL=useSendTransaction.js.map