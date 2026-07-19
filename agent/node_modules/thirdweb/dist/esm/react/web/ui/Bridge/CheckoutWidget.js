"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { trackPayEvent } from "../../../../analytics/track/pay.js";
import { NATIVE_TOKEN_ADDRESS } from "../../../../constants/addresses.js";
import { CustomThemeProvider } from "../../../core/design-system/CustomThemeProvider.js";
import { webWindowAdapter } from "../../adapters/WindowAdapter.js";
import { useConnectLocale } from "../ConnectWallet/locale/getConnectLocale.js";
import { EmbedContainer } from "../ConnectWallet/Modal/ConnectEmbed.js";
import { DynamicHeight } from "../components/DynamicHeight.js";
import { Spinner } from "../components/Spinner.js";
import { useTokenQuery } from "./common/token-query.js";
import { DirectPayment } from "./DirectPayment.js";
import { ErrorBanner } from "./ErrorBanner.js";
import { PaymentDetails } from "./payment-details/PaymentDetails.js";
import { PaymentSelection } from "./payment-selection/PaymentSelection.js";
import { SuccessScreen } from "./payment-success/SuccessScreen.js";
import { QuoteLoader } from "./QuoteLoader.js";
import { StepRunner } from "./StepRunner.js";
import { UnsupportedTokenScreen } from "./UnsupportedTokenScreen.js";
/**
 * Widget a prebuilt UI for purchasing a specific token.
 *
 * @param props - Props of type [`CheckoutWidgetProps`](https://portal.thirdweb.com/references/typescript/v5/CheckoutWidgetProps) to configure the CheckoutWidget component.
 *
 * @example
 * ### Default configuration
 *
 * The `CheckoutWidget` component allows user to pay a given wallet for any product or service. You can register webhooks to get notified for every purchase done via the widget.
 *
 * ```tsx
 * <CheckoutWidget
 *   client={client}
 *   chain={base}
 *   amount="0.01" // in native tokens (ETH), pass tokenAddress to charge in a specific token (USDC, USDT, etc.)
 *   seller="0x123...abc" // the wallet address that will receive the payment
 *   name="Premium Course"
 *   description="Complete guide to web3 development"
 *   image="/course-thumbnail.jpg"
 *   onSuccess={() => {
 *     alert("Purchase successful!");
 *   }}
 *  />
 * ```
 *
 * ### Customize the supported tokens
 *
 * You can customize the supported tokens that users can pay with by passing a `supportedTokens` object to the `CheckoutWidget` component.
 *
 * ```tsx
 * <CheckoutWidget
 *   client={client}
 *   chain={arbitrum}
 *   amount="0.01"
 *   seller="0x123...abc"
 *   // user will only be able to pay with these tokens
 *   supportedTokens={{
 *     [8453]: [
 *       {
 *         address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
 *         name: "USDC",
 *         symbol: "USDC",
 *       },
 *     ],
 *   }}
 *  />
 * ```
 *
 * ### Customize the UI
 *
 * You can customize the UI of the `CheckoutWidget` component by passing a custom theme object to the `theme` prop.
 *
 * ```tsx
 * <CheckoutWidget
 *   client={client}
 *   chain={arbitrum}
 *   amount="0.01"
 *   seller="0x123...abc"
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
 * You can update the title of the widget by passing a `title` prop to the `CheckoutWidget` component.
 *
 * ```tsx
 * <CheckoutWidget
 *   client={client}
 *   title="Checkout ETH"
 * />
 * ```
 *
 * ### Configure the wallet connection
 *
 * You can customize the wallet connection flow by passing a `connectOptions` object to the `CheckoutWidget` component.
 *
 * ```tsx
 * <CheckoutWidget
 *   client={client}
 *   chain={arbitrum}
 *   amount="0.01"
 *   seller="0x123...abc"
 *   connectOptions={{
 *     connectModal: {
 *       size: 'compact',
 *       title: "Sign in",
 *     }
 *   }}
 * />
 * ```
 *
 * Refer to the [`CheckoutWidgetConnectOptions`](https://portal.thirdweb.com/references/typescript/v5/CheckoutWidgetConnectOptions) type for more details.
 *
 * @bridge
 */
export function CheckoutWidget(props) {
    return (_jsx(CheckoutWidgetContainer, { theme: props.theme, className: props.className, style: props.style, children: _jsx(CheckoutWidgetContentWrapper, { ...props }) }));
}
function CheckoutWidgetContentWrapper(props) {
    const localQuery = useConnectLocale(props.locale || "en_US");
    const tokenQuery = useTokenQuery({
        tokenAddress: props.tokenAddress,
        chainId: props.chain.id,
        client: props.client,
    });
    const hasFiredRenderEvent = useRef(false);
    useEffect(() => {
        if (hasFiredRenderEvent.current)
            return;
        hasFiredRenderEvent.current = true;
        trackPayEvent({
            client: props.client,
            event: "ub:ui:checkout_widget:render",
            toChainId: props.chain.id,
            toToken: props.tokenAddress,
        });
    }, [props.client, props.chain.id, props.tokenAddress]);
    // if branding is disabled for widget, disable it for connect options too
    const connectOptions = useMemo(() => {
        if (props.showThirdwebBranding === false) {
            return {
                ...props.connectOptions,
                connectModal: {
                    ...props.connectOptions?.connectModal,
                    showThirdwebBranding: false,
                },
            };
        }
        return props.connectOptions;
    }, [props.connectOptions, props.showThirdwebBranding]);
    if (tokenQuery.isPending || !localQuery.data) {
        return (_jsx("div", { style: {
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                minHeight: "350px",
            }, children: _jsx(Spinner, { color: "secondaryText", size: "xl" }) }));
    }
    else if (tokenQuery.data?.type === "unsupported_token") {
        return (_jsx(UnsupportedTokenScreen, { chain: props.chain, client: props.client, tokenAddress: props.tokenAddress || NATIVE_TOKEN_ADDRESS }));
    }
    else if (tokenQuery.data?.type === "success") {
        return (_jsx(CheckoutWidgetContent, { ...props, connectLocale: localQuery.data, destinationToken: tokenQuery.data.token, currency: props.currency || "USD", paymentMethods: props.paymentMethods || ["crypto", "card"], connectOptions: connectOptions, showThirdwebBranding: props.showThirdwebBranding === undefined
                ? true
                : props.showThirdwebBranding }));
    }
    else if (tokenQuery.error) {
        return (_jsx(ErrorBanner, { client: props.client, error: tokenQuery.error, onRetry: () => {
                tokenQuery.refetch();
            }, onCancel: () => {
                props.onCancel?.(undefined);
            } }));
    }
    return null;
}
function CheckoutWidgetContent(props) {
    const [screen, setScreen] = useState({
        id: "1:init-ui",
    });
    const mappedFeePayer = props.feePayer === "seller" ? "receiver" : "sender";
    const handleError = useCallback((error, quote) => {
        console.error(error);
        props.onError?.(error, quote);
        setScreen({
            id: "error",
            preparedQuote: quote,
            error,
        });
    }, [props.onError]);
    const handleCancel = useCallback((preparedQuote) => {
        props.onCancel?.(preparedQuote);
    }, [props.onCancel]);
    if (screen.id === "1:init-ui") {
        return (_jsx(DirectPayment
        // from props
        , { 
            // from props
            client: props.client, paymentInfo: {
                amount: props.amount,
                feePayer: props.feePayer === "seller" ? "receiver" : "sender",
                sellerAddress: props.seller,
                token: props.destinationToken,
            }, showThirdwebBranding: props.showThirdwebBranding, metadata: {
                title: props.name,
                description: props.description,
                image: props.image,
            }, currency: props.currency, buttonLabel: props.buttonLabel, 
            // others
            onContinue: (destinationAmount, destinationToken, receiverAddress) => {
                trackPayEvent({
                    client: props.client,
                    event: "payment_selection",
                    toChainId: destinationToken.chainId,
                    toToken: destinationToken.address,
                });
                setScreen({
                    id: "2:methodSelection",
                    destinationAmount,
                    destinationToken,
                    receiverAddress,
                });
            } }));
    }
    if (screen.id === "2:methodSelection") {
        return (_jsx(PaymentSelection
        // from props
        , { 
            // from props
            client: props.client, feePayer: mappedFeePayer, connectLocale: props.connectLocale, connectOptions: props.connectOptions, paymentMethods: props.paymentMethods, currency: props.currency, supportedTokens: props.supportedTokens, country: props.country, 
            // others
            destinationAmount: screen.destinationAmount, destinationToken: screen.destinationToken, receiverAddress: screen.receiverAddress, onBack: () => {
                setScreen({ id: "1:init-ui" });
            }, onError: (error) => {
                handleError(error, undefined);
            }, onPaymentMethodSelected: (paymentMethod) => {
                trackPayEvent({
                    chainId: paymentMethod.type === "wallet"
                        ? paymentMethod.originToken.chainId
                        : undefined,
                    client: props.client,
                    event: "ub:ui:loading_quote:direct_payment",
                    fromToken: paymentMethod.type === "wallet"
                        ? paymentMethod.originToken.address
                        : undefined,
                    toChainId: screen.destinationToken.chainId,
                    toToken: screen.destinationToken.address,
                });
                setScreen({
                    ...screen,
                    id: "3:load-quote",
                    paymentMethod,
                });
            } }));
    }
    if (screen.id === "3:load-quote") {
        return (_jsx(QuoteLoader
        // from props
        , { 
            // from props
            paymentLinkId: props.paymentLinkId, purchaseData: props.purchaseData, client: props.client, feePayer: mappedFeePayer, 
            // others
            sender: undefined, mode: "direct_payment", amount: screen.destinationAmount, destinationToken: screen.destinationToken, onBack: () => {
                setScreen({
                    ...screen,
                    id: "2:methodSelection",
                });
            }, onError: (error) => {
                handleError(error, undefined);
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
                    id: "4:preview",
                    preparedQuote,
                    request,
                });
            }, paymentMethod: screen.paymentMethod, receiver: screen.receiverAddress }));
    }
    if (screen.id === "4:preview") {
        return (_jsx(PaymentDetails
        // from props
        , { 
            // from props
            client: props.client, currency: props.currency, metadata: {
                title: props.name,
                description: props.description,
            }, 
            // others
            confirmButtonLabel: undefined, onBack: () => {
                setScreen({
                    ...screen,
                    id: "2:methodSelection",
                });
            }, onConfirm: () => {
                setScreen({
                    ...screen,
                    id: "5:execute",
                });
            }, onError: (error) => {
                handleError(error, screen.preparedQuote);
            }, paymentMethod: screen.paymentMethod, preparedQuote: screen.preparedQuote, modeInfo: {
                mode: "direct_payment",
                paymentInfo: {
                    amount: screen.destinationAmount,
                    feePayer: mappedFeePayer,
                    sellerAddress: props.seller,
                    token: screen.destinationToken,
                },
            } }));
    }
    if (screen.id === "5:execute") {
        return (_jsx(StepRunner
        // from props
        , { 
            // from props
            client: props.client, 
            // others
            title: undefined, preparedQuote: screen.preparedQuote, autoStart: true, onBack: () => {
                setScreen({
                    ...screen,
                    id: "4:preview",
                });
            }, onCancel: () => {
                handleCancel(screen.preparedQuote);
            }, onComplete: (completedStatuses) => {
                props.onSuccess?.({
                    quote: screen.preparedQuote,
                    statuses: completedStatuses,
                });
                setScreen({
                    id: "6:success",
                    preparedQuote: screen.preparedQuote,
                    completedStatuses,
                });
            }, request: screen.request, wallet: screen.paymentMethod.payerWallet, windowAdapter: webWindowAdapter }));
    }
    if (screen.id === "6:success") {
        return (_jsx(SuccessScreen, { type: "payment-success", 
            // from props
            client: props.client, hasPaymentId: !!props.paymentLinkId, completedStatuses: screen.completedStatuses, 
            // others
            onDone: () => {
                setScreen({ id: "1:init-ui" });
            }, preparedQuote: screen.preparedQuote, showContinueWithTx: false, windowAdapter: webWindowAdapter }));
    }
    if (screen.id === "error") {
        return (_jsx(ErrorBanner, { client: props.client, error: screen.error, onCancel: () => {
                setScreen({ id: "1:init-ui" });
                handleCancel(screen.preparedQuote);
            }, onRetry: () => {
                setScreen({ id: "1:init-ui" });
            } }));
    }
    return null;
}
/**
 * @internal
 */
function CheckoutWidgetContainer(props) {
    return (_jsx(CustomThemeProvider, { theme: props.theme || "dark", children: _jsx(EmbedContainer, { className: props.className, modalSize: "compact", style: props.style, children: _jsx(DynamicHeight, { children: props.children }) }) }));
}
//# sourceMappingURL=CheckoutWidget.js.map