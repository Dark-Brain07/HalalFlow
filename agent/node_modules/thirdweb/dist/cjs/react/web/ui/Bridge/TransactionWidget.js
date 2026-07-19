"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionWidget = TransactionWidget;
exports.TransactionWidgetContentWrapper = TransactionWidgetContentWrapper;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
const pay_js_1 = require("../../../../analytics/track/pay.js");
const addresses_js_1 = require("../../../../constants/addresses.js");
const get_token_js_1 = require("../../../../pay/convert/get-token.js");
const prepare_transaction_js_1 = require("../../../../transaction/prepare-transaction.js");
const address_js_1 = require("../../../../utils/address.js");
const json_js_1 = require("../../../../utils/json.js");
const units_js_1 = require("../../../../utils/units.js");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const WindowAdapter_js_1 = require("../../adapters/WindowAdapter.js");
const AccentFailIcon_js_1 = require("../ConnectWallet/icons/AccentFailIcon.js");
const getConnectLocale_js_1 = require("../ConnectWallet/locale/getConnectLocale.js");
const ConnectEmbed_js_1 = require("../ConnectWallet/Modal/ConnectEmbed.js");
const DynamicHeight_js_1 = require("../components/DynamicHeight.js");
const Spacer_js_1 = require("../components/Spacer.js");
const Spinner_js_1 = require("../components/Spinner.js");
const text_js_1 = require("../components/text.js");
const ExecutingScreen_js_1 = require("../TransactionButton/ExecutingScreen.js");
const ErrorBanner_js_1 = require("./ErrorBanner.js");
const PaymentDetails_js_1 = require("./payment-details/PaymentDetails.js");
const PaymentSelection_js_1 = require("./payment-selection/PaymentSelection.js");
const SuccessScreen_js_1 = require("./payment-success/SuccessScreen.js");
const QuoteLoader_js_1 = require("./QuoteLoader.js");
const StepRunner_js_1 = require("./StepRunner.js");
const TransactionPayment_js_1 = require("./TransactionPayment.js");
const UnsupportedTokenScreen_js_1 = require("./UnsupportedTokenScreen.js");
/**
 * Widget a prebuilt UI for purchasing a specific token.
 *
 * @param props - Props of type [`TransactionWidgetProps`](https://portal.thirdweb.com/references/typescript/v5/TransactionWidgetProps) to configure the TransactionWidget component.
 *
 * @example
 * ### Default configuration
 *
 * By default, the `TransactionWidget` component allows users to fund their wallets with crypto or fiat on any of the supported chains.
 *
 * ```tsx
 * <TransactionWidget
 *   client={client}
 *   transaction={prepareTransaction({
 *     to: "0x...",
 *     chain: ethereum,
 *     client: client,
 *   })}
 *   amount="0.1"
 *  />
 * ```
 *
 * ### Customize the supported tokens
 *
 * You can customize the supported tokens that users can pay with by passing a `supportedTokens` object to the `TransactionWidget` component.
 *
 * ```tsx
 * <TransactionWidget
 *   client={client}
 *   transaction={prepareTransaction({
 *     to: "0x...",
 *     chain: ethereum,
 *     client: client,
 *   })}
 *   supportedTokens={{
 *     [8453]: [
 *       {
 *         address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
 *         name: "USDC",
 *         symbol: "USDC",
 *       },
 *     ],
 *   }}
 * />
 * ```
 *
 * ### Customize the UI
 *
 * You can customize the UI of the `TransactionWidget` component by passing a custom theme object to the `theme` prop.
 *
 * ```tsx
 * <TransactionWidget
 *   client={client}
 *   transaction={prepareTransaction({
 *     to: "0x...",
 *     chain: ethereum,
 *     client: client,
 *     value: toUnits("0.001", 18),
 *   })}
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
 * ### Update the Title
 *
 * You can update the title of the widget by passing a `title` prop to the `TransactionWidget` component.
 *
 * ```tsx
 * <TransactionWidget
 *   transaction={prepareTransaction({
 *     to: "0x...",
 *     chain: ethereum,
 *     client: client,
 *     value: toUnits("0.001", 18),
 *   })}
 *   client={client}
 *   title="Transaction ETH"
 * />
 * ```
 *
 * ### Configure the wallet connection
 *
 * You can customize the wallet connection flow by passing a `connectOptions` object to the `TransactionWidget` component.
 *
 * ```tsx
 * <TransactionWidget
 *   client={client}
 *   transaction={prepareTransaction({
 *     to: "0x...",
 *     chain: ethereum,
 *     client: client,
 *     value: toUnits("0.001", 18),
 *   })}
 *   connectOptions={{
 *     connectModal: {
 *       size: 'compact',
 *       title: "Sign in",
 *     }
 *   }}
 * />
 * ```
 *
 * Refer to the [`TransactionWidgetConnectOptions`](https://portal.thirdweb.com/references/typescript/v5/TransactionWidgetConnectOptions) type for more details.
 *
 * @bridge
 */
function TransactionWidget(props) {
    return ((0, jsx_runtime_1.jsx)(TransactionWidgetContainer, { theme: props.theme, className: props.className, style: props.style, children: (0, jsx_runtime_1.jsx)(TransactionWidgetContentWrapper, { ...props }) }));
}
function TransactionWidgetContentWrapper(props) {
    const hasFiredRenderEvent = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        if (hasFiredRenderEvent.current)
            return;
        hasFiredRenderEvent.current = true;
        (0, pay_js_1.trackPayEvent)({
            chainId: props.transaction.chain.id,
            client: props.client,
            event: "ub:ui:transaction_widget:render",
            toToken: props.tokenAddress,
        });
    }, [props.client, props.transaction.chain.id, props.tokenAddress]);
    const localQuery = (0, getConnectLocale_js_1.useConnectLocale)(props.locale || "en_US");
    const txQuery = (0, react_query_1.useQuery)({
        queryFn: async () => {
            let erc20Value = props.transaction.erc20Value;
            if (props.amount) {
                // Get token decimals for conversion
                const tokenAddress = props.tokenAddress || addresses_js_1.NATIVE_TOKEN_ADDRESS;
                const token = await (0, get_token_js_1.getToken)(props.client, (0, address_js_1.checksumAddress)(tokenAddress), props.transaction.chain.id).catch((e) => {
                    if (e instanceof Error && e.message.includes("not supported")) {
                        return null;
                    }
                    throw e;
                });
                if (!token) {
                    return {
                        type: "unsupported_token",
                    };
                }
                erc20Value = {
                    amountWei: (0, units_js_1.toUnits)(props.amount, token.decimals),
                    tokenAddress: (0, address_js_1.checksumAddress)(tokenAddress),
                };
            }
            const transaction = (0, prepare_transaction_js_1.prepareTransaction)({
                ...props.transaction,
                erc20Value,
            });
            return {
                transaction,
                type: "success",
            };
        },
        queryKey: ["transaction-query", (0, json_js_1.stringify)(props)],
        retry: 1,
    });
    // if branding is disabled for widget, disable it for connect options too
    const connectOptions = (0, react_1.useMemo)(() => {
        if (props.showThirdwebBranding === false) {
            return {
                ...props.connectOptions,
                connectModal: {
                    ...props.connectOptions?.connectModal,
                    showThirdwebBranding: props.showThirdwebBranding,
                },
            };
        }
        return props.connectOptions;
    }, [props.connectOptions, props.showThirdwebBranding]);
    if (txQuery.isPending || !localQuery.data) {
        return ((0, jsx_runtime_1.jsx)("div", { style: {
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                minHeight: "350px",
            }, children: (0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { color: "secondaryText", size: "xl" }) }));
    }
    else if (txQuery.error) {
        return ((0, jsx_runtime_1.jsxs)("div", { style: {
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                minHeight: "350px",
            }, children: [(0, jsx_runtime_1.jsx)(AccentFailIcon_js_1.AccentFailIcon, { size: index_js_1.iconSize["3xl"] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "md", children: txQuery.error.message })] }));
    }
    else if (txQuery.data?.type === "unsupported_token") {
        return ((0, jsx_runtime_1.jsx)(UnsupportedTokenScreen_js_1.UnsupportedTokenScreen, { chain: props.transaction.chain, client: props.client, tokenAddress: props.tokenAddress || addresses_js_1.NATIVE_TOKEN_ADDRESS }));
    }
    else if (txQuery.data?.type === "success") {
        return ((0, jsx_runtime_1.jsx)(TransactionWidgetContent, { ...props, connectOptions: connectOptions, connectLocale: localQuery.data, transaction: txQuery.data.transaction, currency: props.currency || "USD", paymentMethods: props.paymentMethods || ["crypto", "card"], showThirdwebBranding: props.showThirdwebBranding === undefined
                ? true
                : props.showThirdwebBranding }));
    }
    return null;
}
function TransactionWidgetContent(props) {
    const [screen, setScreen] = (0, react_1.useState)({
        id: "init-ui",
    });
    const handleError = (0, react_1.useCallback)((error) => {
        console.error(error);
        props.onError?.(error);
        setScreen({
            id: "error",
            error,
        });
    }, [props.onError]);
    if (screen.id === "init-ui") {
        return ((0, jsx_runtime_1.jsx)(TransactionPayment_js_1.TransactionPayment, { client: props.client, metadata: {
                title: props.title,
                description: props.description,
                image: props.image,
            }, connectOptions: props.connectOptions, onContinue: (destinationAmount, destinationToken, receiverAddress) => {
                (0, pay_js_1.trackPayEvent)({
                    client: props.client,
                    event: "payment_selection",
                    toChainId: destinationToken.chainId,
                    toToken: destinationToken.address,
                });
                setScreen({
                    id: "buy:1.methodSelection",
                    destinationAmount,
                    destinationToken,
                    transaction: props.transaction,
                    receiverAddress,
                });
            }, onExecuteTransaction: () => {
                setScreen({
                    id: "execute-tx",
                    transaction: props.transaction,
                });
            }, showThirdwebBranding: props.showThirdwebBranding, currency: props.currency, buttonLabel: props.buttonLabel, transaction: props.transaction }));
    }
    if (screen.id === "buy:1.methodSelection") {
        return ((0, jsx_runtime_1.jsx)(PaymentSelection_js_1.PaymentSelection
        // from props
        , { 
            // from props
            client: props.client, connectLocale: props.connectLocale, connectOptions: props.connectOptions, paymentMethods: props.paymentMethods, currency: props.currency, supportedTokens: props.supportedTokens, country: props.country, 
            // others
            feePayer: undefined, destinationToken: screen.destinationToken, destinationAmount: screen.destinationAmount, receiverAddress: screen.receiverAddress, onBack: () => {
                setScreen({ id: "init-ui" });
            }, onError: (error) => {
                handleError(error);
            }, onPaymentMethodSelected: (paymentMethod) => {
                (0, pay_js_1.trackPayEvent)({
                    chainId: paymentMethod.type === "wallet"
                        ? paymentMethod.originToken.chainId
                        : undefined,
                    client: props.client,
                    event: "ub:ui:loading_quote:transaction",
                    fromToken: paymentMethod.type === "wallet"
                        ? paymentMethod.originToken.address
                        : undefined,
                    toChainId: screen.destinationToken.chainId,
                    toToken: screen.destinationToken.address,
                });
                setScreen({
                    ...screen,
                    id: "buy:2.load-quote",
                    paymentMethod,
                });
            } }));
    }
    if (screen.id === "buy:2.load-quote") {
        return ((0, jsx_runtime_1.jsx)(QuoteLoader_js_1.QuoteLoader
        // from props
        , { 
            // from props
            paymentLinkId: props.paymentLinkId, purchaseData: props.purchaseData, client: props.client, 
            // others
            feePayer: undefined, sender: undefined, mode: "transaction", amount: screen.destinationAmount, destinationToken: screen.destinationToken, onBack: () => {
                setScreen({
                    ...screen,
                    id: "buy:1.methodSelection",
                });
            }, onError: (error) => {
                handleError(error);
            }, onQuoteReceived: (preparedQuote, request) => {
                if (preparedQuote.type === "buy" ||
                    preparedQuote.type === "sell" ||
                    preparedQuote.type === "transfer") {
                    (0, pay_js_1.trackPayEvent)({
                        chainId: preparedQuote.type === "transfer"
                            ? preparedQuote.intent.chainId
                            : preparedQuote.intent.originChainId,
                        client: props.client,
                        event: "payment_details",
                        fromToken: preparedQuote.type === "transfer"
                            ? preparedQuote.intent.tokenAddress
                            : preparedQuote.intent.originTokenAddress,
                        toChainId: preparedQuote.type === "transfer"
                            ? preparedQuote.intent.chainId
                            : preparedQuote.intent.destinationChainId,
                        toToken: preparedQuote.type === "transfer"
                            ? preparedQuote.intent.tokenAddress
                            : preparedQuote.intent.destinationTokenAddress,
                        walletAddress: screen.paymentMethod.payerWallet?.getAccount()?.address,
                        walletType: screen.paymentMethod.payerWallet?.id,
                    });
                }
                setScreen({
                    ...screen,
                    id: "buy:3.preview",
                    preparedQuote,
                    request,
                });
            }, paymentMethod: screen.paymentMethod, receiver: screen.receiverAddress }));
    }
    if (screen.id === "buy:3.preview") {
        return ((0, jsx_runtime_1.jsx)(PaymentDetails_js_1.PaymentDetails
        // from props
        , { 
            // from props
            client: props.client, currency: props.currency, metadata: {
                title: props.title,
                description: props.description,
            }, 
            // others
            confirmButtonLabel: undefined, onBack: () => {
                setScreen({
                    ...screen,
                    id: "buy:1.methodSelection",
                });
            }, onConfirm: () => {
                setScreen({
                    ...screen,
                    id: "buy:4.execute-buy",
                });
            }, onError: (error) => {
                handleError(error);
            }, paymentMethod: screen.paymentMethod, preparedQuote: screen.preparedQuote, modeInfo: {
                mode: "transaction",
                transaction: screen.transaction,
            } }));
    }
    if (screen.id === "buy:4.execute-buy") {
        return ((0, jsx_runtime_1.jsx)(StepRunner_js_1.StepRunner
        // from props
        , { 
            // from props
            client: props.client, 
            // others
            title: undefined, preparedQuote: screen.preparedQuote, autoStart: true, onBack: () => {
                setScreen({
                    ...screen,
                    id: "buy:3.preview",
                });
            }, onCancel: () => {
                props.onCancel?.();
            }, onComplete: (completedStatuses) => {
                setScreen({
                    ...screen,
                    id: "buy:5.success",
                    completedStatuses,
                });
            }, request: screen.request, wallet: screen.paymentMethod.payerWallet, windowAdapter: WindowAdapter_js_1.webWindowAdapter }));
    }
    if (screen.id === "buy:5.success") {
        return ((0, jsx_runtime_1.jsx)(SuccessScreen_js_1.SuccessScreen
        // from props
        , { 
            // from props
            client: props.client, type: "payment-success", hasPaymentId: !!props.paymentLinkId, 
            // others
            completedStatuses: screen.completedStatuses, onDone: () => {
                setScreen({ id: "execute-tx", transaction: screen.transaction });
            }, preparedQuote: screen.preparedQuote, showContinueWithTx: true, windowAdapter: WindowAdapter_js_1.webWindowAdapter }));
    }
    if (screen.id === "error") {
        return ((0, jsx_runtime_1.jsx)(ErrorBanner_js_1.ErrorBanner, { client: props.client, error: screen.error, onCancel: () => {
                setScreen({ id: "init-ui" });
                props.onCancel?.();
            }, onRetry: () => {
                setScreen({ id: "init-ui" });
            } }));
    }
    if (screen.id === "execute-tx") {
        return ((0, jsx_runtime_1.jsx)(ExecutingScreen_js_1.ExecutingTxScreen, { onBack: () => {
                setScreen({ id: "init-ui" });
            }, closeModal: () => {
                setScreen({ id: "init-ui" });
            }, onTxSent: (data) => {
                props.onSuccess?.(data);
            }, tx: screen.transaction, windowAdapter: WindowAdapter_js_1.webWindowAdapter }));
    }
    return null;
}
/**
 * @internal
 */
function TransactionWidgetContainer(props) {
    return ((0, jsx_runtime_1.jsx)(CustomThemeProvider_js_1.CustomThemeProvider, { theme: props.theme || "dark", children: (0, jsx_runtime_1.jsx)(ConnectEmbed_js_1.EmbedContainer, { className: props.className, modalSize: "compact", style: props.style, children: (0, jsx_runtime_1.jsx)(DynamicHeight_js_1.DynamicHeight, { children: props.children }) }) }));
}
//# sourceMappingURL=TransactionWidget.js.map