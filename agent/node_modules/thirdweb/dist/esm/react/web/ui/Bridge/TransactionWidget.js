"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { trackPayEvent } from "../../../../analytics/track/pay.js";
import { NATIVE_TOKEN_ADDRESS } from "../../../../constants/addresses.js";
import { getToken } from "../../../../pay/convert/get-token.js";
import { prepareTransaction, } from "../../../../transaction/prepare-transaction.js";
import { checksumAddress } from "../../../../utils/address.js";
import { stringify } from "../../../../utils/json.js";
import { toUnits } from "../../../../utils/units.js";
import { CustomThemeProvider } from "../../../core/design-system/CustomThemeProvider.js";
import { iconSize } from "../../../core/design-system/index.js";
import { webWindowAdapter } from "../../adapters/WindowAdapter.js";
import { AccentFailIcon } from "../ConnectWallet/icons/AccentFailIcon.js";
import { useConnectLocale } from "../ConnectWallet/locale/getConnectLocale.js";
import { EmbedContainer } from "../ConnectWallet/Modal/ConnectEmbed.js";
import { DynamicHeight } from "../components/DynamicHeight.js";
import { Spacer } from "../components/Spacer.js";
import { Spinner } from "../components/Spinner.js";
import { Text } from "../components/text.js";
import { ExecutingTxScreen } from "../TransactionButton/ExecutingScreen.js";
import { ErrorBanner } from "./ErrorBanner.js";
import { PaymentDetails } from "./payment-details/PaymentDetails.js";
import { PaymentSelection } from "./payment-selection/PaymentSelection.js";
import { SuccessScreen } from "./payment-success/SuccessScreen.js";
import { QuoteLoader } from "./QuoteLoader.js";
import { StepRunner } from "./StepRunner.js";
import { TransactionPayment } from "./TransactionPayment.js";
import { UnsupportedTokenScreen } from "./UnsupportedTokenScreen.js";
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
export function TransactionWidget(props) {
    return (_jsx(TransactionWidgetContainer, { theme: props.theme, className: props.className, style: props.style, children: _jsx(TransactionWidgetContentWrapper, { ...props }) }));
}
export function TransactionWidgetContentWrapper(props) {
    const hasFiredRenderEvent = useRef(false);
    useEffect(() => {
        if (hasFiredRenderEvent.current)
            return;
        hasFiredRenderEvent.current = true;
        trackPayEvent({
            chainId: props.transaction.chain.id,
            client: props.client,
            event: "ub:ui:transaction_widget:render",
            toToken: props.tokenAddress,
        });
    }, [props.client, props.transaction.chain.id, props.tokenAddress]);
    const localQuery = useConnectLocale(props.locale || "en_US");
    const txQuery = useQuery({
        queryFn: async () => {
            let erc20Value = props.transaction.erc20Value;
            if (props.amount) {
                // Get token decimals for conversion
                const tokenAddress = props.tokenAddress || NATIVE_TOKEN_ADDRESS;
                const token = await getToken(props.client, checksumAddress(tokenAddress), props.transaction.chain.id).catch((e) => {
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
                    amountWei: toUnits(props.amount, token.decimals),
                    tokenAddress: checksumAddress(tokenAddress),
                };
            }
            const transaction = prepareTransaction({
                ...props.transaction,
                erc20Value,
            });
            return {
                transaction,
                type: "success",
            };
        },
        queryKey: ["transaction-query", stringify(props)],
        retry: 1,
    });
    // if branding is disabled for widget, disable it for connect options too
    const connectOptions = useMemo(() => {
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
        return (_jsx("div", { style: {
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                minHeight: "350px",
            }, children: _jsx(Spinner, { color: "secondaryText", size: "xl" }) }));
    }
    else if (txQuery.error) {
        return (_jsxs("div", { style: {
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                minHeight: "350px",
            }, children: [_jsx(AccentFailIcon, { size: iconSize["3xl"] }), _jsx(Spacer, { y: "lg" }), _jsx(Text, { color: "secondaryText", size: "md", children: txQuery.error.message })] }));
    }
    else if (txQuery.data?.type === "unsupported_token") {
        return (_jsx(UnsupportedTokenScreen, { chain: props.transaction.chain, client: props.client, tokenAddress: props.tokenAddress || NATIVE_TOKEN_ADDRESS }));
    }
    else if (txQuery.data?.type === "success") {
        return (_jsx(TransactionWidgetContent, { ...props, connectOptions: connectOptions, connectLocale: localQuery.data, transaction: txQuery.data.transaction, currency: props.currency || "USD", paymentMethods: props.paymentMethods || ["crypto", "card"], showThirdwebBranding: props.showThirdwebBranding === undefined
                ? true
                : props.showThirdwebBranding }));
    }
    return null;
}
function TransactionWidgetContent(props) {
    const [screen, setScreen] = useState({
        id: "init-ui",
    });
    const handleError = useCallback((error) => {
        console.error(error);
        props.onError?.(error);
        setScreen({
            id: "error",
            error,
        });
    }, [props.onError]);
    if (screen.id === "init-ui") {
        return (_jsx(TransactionPayment, { client: props.client, metadata: {
                title: props.title,
                description: props.description,
                image: props.image,
            }, connectOptions: props.connectOptions, onContinue: (destinationAmount, destinationToken, receiverAddress) => {
                trackPayEvent({
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
        return (_jsx(PaymentSelection
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
                trackPayEvent({
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
        return (_jsx(QuoteLoader
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
                    trackPayEvent({
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
        return (_jsx(PaymentDetails
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
        return (_jsx(StepRunner
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
            }, request: screen.request, wallet: screen.paymentMethod.payerWallet, windowAdapter: webWindowAdapter }));
    }
    if (screen.id === "buy:5.success") {
        return (_jsx(SuccessScreen
        // from props
        , { 
            // from props
            client: props.client, type: "payment-success", hasPaymentId: !!props.paymentLinkId, 
            // others
            completedStatuses: screen.completedStatuses, onDone: () => {
                setScreen({ id: "execute-tx", transaction: screen.transaction });
            }, preparedQuote: screen.preparedQuote, showContinueWithTx: true, windowAdapter: webWindowAdapter }));
    }
    if (screen.id === "error") {
        return (_jsx(ErrorBanner, { client: props.client, error: screen.error, onCancel: () => {
                setScreen({ id: "init-ui" });
                props.onCancel?.();
            }, onRetry: () => {
                setScreen({ id: "init-ui" });
            } }));
    }
    if (screen.id === "execute-tx") {
        return (_jsx(ExecutingTxScreen, { onBack: () => {
                setScreen({ id: "init-ui" });
            }, closeModal: () => {
                setScreen({ id: "init-ui" });
            }, onTxSent: (data) => {
                props.onSuccess?.(data);
            }, tx: screen.transaction, windowAdapter: webWindowAdapter }));
    }
    return null;
}
/**
 * @internal
 */
function TransactionWidgetContainer(props) {
    return (_jsx(CustomThemeProvider, { theme: props.theme || "dark", children: _jsx(EmbedContainer, { className: props.className, modalSize: "compact", style: props.style, children: _jsx(DynamicHeight, { children: props.children }) }) }));
}
//# sourceMappingURL=TransactionWidget.js.map