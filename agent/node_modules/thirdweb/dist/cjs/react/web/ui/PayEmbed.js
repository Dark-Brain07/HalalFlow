"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayEmbed = PayEmbed;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ethereum_js_1 = require("../../../chains/chain-definitions/ethereum.js");
const CustomThemeProvider_js_1 = require("../../core/design-system/CustomThemeProvider.js");
const connection_manager_js_1 = require("../../core/providers/connection-manager.js");
const BuyWidget_js_1 = require("./Bridge/BuyWidget.js");
const CheckoutWidget_js_1 = require("./Bridge/CheckoutWidget.js");
const TransactionWidget_js_1 = require("./Bridge/TransactionWidget.js");
const ConnectEmbed_js_1 = require("./ConnectWallet/Modal/ConnectEmbed.js");
const DynamicHeight_js_1 = require("./components/DynamicHeight.js");
/**
 * Embed a prebuilt UI for funding wallets, purchases or transactions with crypto or fiat.
 *
 * @param props - Props of type [`PayEmbedProps`](https://portal.thirdweb.com/references/typescript/v5/PayEmbedProps) to configure the PayEmbed component.
 *
 * @example
 * ### Default configuration
 *
 * By default, the `PayEmbed` component will allows users to fund their wallets with crypto or fiat on any of the supported chains..
 *
 * ```tsx
 * <PayEmbed
 *   client={client}
 *  />
 * ```
 *
 * ### Top up wallets
 *
 * You can set the `mode` option to `"fund_wallet"` to allow users to top up their wallets with crypto or fiat.
 *
 * ```tsx
 * <PayEmbed
 *   client={client}
 *   payOptions={{
 *     mode: "fund_wallet",
 *     metadata: {
 *       name: "Get funds", // title of the payment modal
 *     },
 *     prefillBuy: {
 *       chain: base, // chain to prefill the buy screen with
 *       amount: "0.01", // amount to prefill the buy screen with
 *     },
 *   }}
 *  />
 * ```
 *
 * ### Direct Payments
 *
 * You can set the `mode` option to `"direct_payment"` to allow users to make a direct payment to a wallet address.
 *
 * ```tsx
 * <PayEmbed
 *   client={client}
 *   theme={"light"}
 *   payOptions={{
 *     mode: "direct_payment",
 *     paymentInfo: {
 *       amount: "35",
 *       chain: base,
 *       token: getDefaultToken(base, "USDC"),
 *       sellerAddress: "0x...", // the wallet address of the seller
 *     },
 *     metadata: {
 *       name: "Black Hoodie (Size L)",
 *       image: "/drip-hoodie.png",
 *     },
 *   }}
 *  />
 * ```
 *
 * ### Transactions
 *
 * You can set the `mode` option to `"transaction"` to allow users to execute a transaction with a different wallet, chain or token.
 *
 * ```tsx
 * <PayEmbed
 *   client={client}
 *   payOptions={{
 *     mode: "transaction",
 *     // can be any transaction
 *     transaction: claimTo({
 *       contract: nftContract,
 *       quantity: 1n,
 *       tokenId: 0n,
 *       to: "0x...",
 *     }),
 *     // this could be any metadata, including NFT metadata
 *     metadata: {
 *       name: "VIP Ticket",
 *       image: "https://...",
 *     },
 *   }}
 *  />
 * ```
 * You can also handle ERC20 payments by passing `erc20value` to your transaction:
 *
 * ```tsx
 * <PayEmbed
 *   client={client}
 *   payOptions={{
 *     mode: "transaction",
 *     transaction: prepareContractCall({
 *       contract: yourContract,
 *       functionName: "purchase",
 *       args: [arg1, arg2, ...],
 *       erc20value: {
 *         token: USDC_TOKEN_ADDRESS, // the erc20 token required to purchase
 *         amount: toUnits("100", 6), // the amount of erc20 token required to purchase
 *       },
 *     }),
 *   }}
 *  />
 * ```
 *
 * ### Enable/Disable payment methods
 *
 * You can disable the use of crypto or fiat by setting the `buyWithCrypto` or `buyWithFiat` options to `false`.
 *
 * ```tsx
 * <PayEmbed
 *   client={client}
 *   payOptions={{
 *     buyWithFiat: false,
 *   }}
 *  />
 * ```
 *
 * ### Customize the UI
 *
 * You can customize the UI of the `PayEmbed` component by passing a custom theme object to the `theme` prop.
 *
 * ```tsx
 * <PayEmbed
 *   client={client}
 *   theme={darkTheme({
 *     colors: {
 *       modalBg: "red",
 *     },
 *   })}
 * />
 * ```
 *
 * Refer to the [`Theme`](https://portal.thirdweb.com/references/typescript/v5/Theme) type for more details.
 *
 * ### Configure the wallet connection
 *
 * You can customize the wallet connection flow by passing a `connectOptions` object to the `PayEmbed` component.
 *
 * ```tsx
 * <PayEmbed
 *   client={client}
 *   connectOptions={{
 *     connectModal: {
 *       size: 'compact',
 *       title: "Sign in",
 *     }
 *   }}
 * />
 * ```
 *
 * Refer to the [`PayEmbedConnectOptions`](https://portal.thirdweb.com/references/typescript/v5/PayEmbedConnectOptions) type for more details.
 *
 * @deprecated Use `BuyWidget`, `CheckoutWidget` or `TransactionWidget` instead.
 */
function PayEmbed(props) {
    const theme = props.theme || "dark";
    const connectionManager = (0, connection_manager_js_1.useConnectionManager)();
    // Add props.chain and props.chains to defined chains store
    (0, react_1.useEffect)(() => {
        if (props.connectOptions?.chain) {
            connectionManager.defineChains([props.connectOptions?.chain]);
        }
    }, [props.connectOptions?.chain, connectionManager]);
    (0, react_1.useEffect)(() => {
        if (props.connectOptions?.chains) {
            connectionManager.defineChains(props.connectOptions?.chains);
        }
    }, [props.connectOptions?.chains, connectionManager]);
    (0, react_1.useEffect)(() => {
        if (props.activeWallet) {
            connectionManager.setActiveWallet(props.activeWallet);
        }
    }, [props.activeWallet, connectionManager]);
    const content = null;
    const metadata = props.payOptions && "metadata" in props.payOptions
        ? props.payOptions.metadata
        : null;
    if (!props.payOptions?.mode || props.payOptions?.mode === "fund_wallet") {
        return ((0, jsx_runtime_1.jsx)(BuyWidget_js_1.BuyWidget, { amount: props.payOptions?.prefillBuy?.amount || "0.01", chain: props.payOptions?.prefillBuy?.chain || ethereum_js_1.ethereum, client: props.client, onSuccess: () => props.payOptions?.onPurchaseSuccess?.(), paymentMethods: props.payOptions?.buyWithFiat === false
                ? ["crypto"]
                : props.payOptions?.buyWithCrypto === false
                    ? ["card"]
                    : ["crypto", "card"], purchaseData: props.payOptions?.purchaseData, theme: theme, title: metadata?.name || "Buy", tokenAddress: props.payOptions?.prefillBuy?.token?.address }));
    }
    if (props.payOptions?.mode === "direct_payment") {
        return ((0, jsx_runtime_1.jsx)(CheckoutWidget_js_1.CheckoutWidget, { amount: props.payOptions.paymentInfo.amount, chain: props.payOptions.paymentInfo.chain, client: props.client, description: metadata?.description, feePayer: props.payOptions.paymentInfo.feePayer === "sender" ? "user" : "seller", image: metadata?.image, name: metadata?.name || "Checkout", onSuccess: () => props.payOptions?.onPurchaseSuccess?.(), paymentMethods: props.payOptions?.buyWithFiat === false
                ? ["crypto"]
                : ["crypto", "card"], purchaseData: props.payOptions?.purchaseData, seller: props.payOptions.paymentInfo.sellerAddress, theme: theme, tokenAddress: props.payOptions.paymentInfo.token?.address }));
    }
    if (props.payOptions?.mode === "transaction") {
        return ((0, jsx_runtime_1.jsx)(TransactionWidget_js_1.TransactionWidget, { client: props.client, description: metadata?.description, image: metadata?.image, onSuccess: () => props.payOptions?.onPurchaseSuccess?.(), paymentMethods: props.payOptions?.buyWithFiat === false
                ? ["crypto"]
                : ["crypto", "card"], purchaseData: props.payOptions?.purchaseData, theme: theme, title: metadata?.name, transaction: props.payOptions.transaction }));
    }
    return ((0, jsx_runtime_1.jsx)(CustomThemeProvider_js_1.CustomThemeProvider, { theme: theme, children: (0, jsx_runtime_1.jsx)(ConnectEmbed_js_1.EmbedContainer, { className: props.className, modalSize: "compact", style: props.style, children: (0, jsx_runtime_1.jsx)(DynamicHeight_js_1.DynamicHeight, { children: content }) }) }));
}
//# sourceMappingURL=PayEmbed.js.map