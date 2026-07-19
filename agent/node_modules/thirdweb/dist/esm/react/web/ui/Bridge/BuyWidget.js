"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { trackPayEvent } from "../../../../analytics/track/pay.js";
import { NATIVE_TOKEN_ADDRESS } from "../../../../constants/addresses.js";
import { CustomThemeProvider } from "../../../core/design-system/CustomThemeProvider.js";
import { webWindowAdapter } from "../../adapters/WindowAdapter.js";
import { AutoConnect } from "../AutoConnect/AutoConnect.js";
import connectLocaleEn from "../ConnectWallet/locale/en.js";
import { EmbedContainer } from "../ConnectWallet/Modal/ConnectEmbed.js";
import { DynamicHeight } from "../components/DynamicHeight.js";
import { ErrorBanner } from "./ErrorBanner.js";
import { FundWallet, } from "./FundWallet.js";
import { PaymentDetails } from "./payment-details/PaymentDetails.js";
import { PaymentSelection } from "./payment-selection/PaymentSelection.js";
import { SuccessScreen } from "./payment-success/SuccessScreen.js";
import { QuoteLoader } from "./QuoteLoader.js";
import { StepRunner } from "./StepRunner.js";
/**
 * Widget is a prebuilt UI for purchasing a specific token.
 *
 * @param props - Props of type [`BuyWidgetProps`](https://portal.thirdweb.com/references/typescript/v5/BuyWidgetProps) to configure the BuyWidget component.
 *
 * @example
 * ### Basic usage
 *
 * The `BuyWidget` component requires `client`, `chain`, and `amount` props to function.
 *
 * ```tsx
 * import { ethereum } from "thirdweb/chains";
 *
 * <BuyWidget
 *   client={client}
 *   chain={ethereum}
 *   amount="0.1" // in native tokens (ie. ETH)
 * />
 * ```
 *
 * ### Buy a specific token
 *
 * You can specify a token to purchase by passing the `tokenAddress` prop.
 *
 * ```tsx
 * <BuyWidget
 *   client={client}
 *   chain={ethereum}
 *   amount="100" // 100 USDC on mainnet
 *   tokenAddress="0xA0b86a33E6417E4df2057B2d3C6d9F7cc11b0a70"
 * />
 * ```
 *
 * ### Customize the supported tokens
 *
 * You can customize the supported tokens that users can pay with by passing a `supportedTokens` object to the `BuyWidget` component.
 *
 * ```tsx
 * <BuyWidget
 *   client={client}
 *   chain={ethereum}
 *   amount="0.1"
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
 * />
 * ```
 *
 *
 * ### Customize the UI
 *
 * You can customize the UI of the `BuyWidget` component by passing a custom theme object to the `theme` prop.
 *
 * ```tsx
 * <BuyWidget
 *   client={client}
 *   chain={ethereum}
 *   amount="0.1"
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
 * You can update the title of the widget by passing a `title` prop to the `BuyWidget` component.
 *
 * ```tsx
 * <BuyWidget
 *   client={client}
 *   chain={ethereum}
 *   amount="0.1"
 *   title="Buy ETH"
 * />
 * ```
 *
 * ### Configure the wallet connection
 *
 * You can customize the wallet connection flow by passing a `connectOptions` object to the `BuyWidget` component.
 *
 * ```tsx
 * <BuyWidget
 *   client={client}
 *   chain={ethereum}
 *   amount="0.1"
 *   connectOptions={{
 *     connectModal: {
 *       size: 'compact',
 *       title: "Sign in",
 *     }
 *   }}
 * />
 * ```
 *
 * Refer to the [`BuyWidgetConnectOptions`](https://portal.thirdweb.com/references/typescript/v5/BuyWidgetConnectOptions) type for more details.
 *
 * @bridge
 */
export function BuyWidget(props) {
    const hasFiredRenderEvent = useRef(false);
    useEffect(() => {
        if (hasFiredRenderEvent.current)
            return;
        hasFiredRenderEvent.current = true;
        trackPayEvent({
            client: props.client,
            event: "ub:ui:buy_widget:render",
            toChainId: props.chain?.id,
            toToken: props.tokenAddress,
        });
    }, [props.client, props.chain?.id, props.tokenAddress]);
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
    return (_jsxs(BridgeWidgetContainer, { theme: props.theme, className: props.className, style: props.style, children: [props.connectOptions?.autoConnect !== false && (_jsx(AutoConnect, { client: props.client, wallets: props.connectOptions?.wallets, timeout: typeof props.connectOptions?.autoConnect === "object"
                    ? props.connectOptions?.autoConnect?.timeout
                    : undefined, appMetadata: props.connectOptions?.appMetadata, accountAbstraction: props.connectOptions?.accountAbstraction, chain: props.connectOptions?.chain })), _jsx(BridgeWidgetContent, { ...props, theme: props.theme || "dark", currency: props.currency || "USD", paymentMethods: props.paymentMethods || ["crypto", "card"], presetOptions: props.presetOptions || [5, 10, 20], connectOptions: connectOptions, showThirdwebBranding: props.showThirdwebBranding === undefined
                    ? true
                    : props.showThirdwebBranding })] }));
}
function BridgeWidgetContent(props) {
    const [screen, setScreen] = useState({ id: "1:buy-ui" });
    const handleError = useCallback((error, quote) => {
        console.error(error);
        if (quote?.type === "buy" || quote?.type === "onramp") {
            props.onError?.(error, quote);
        }
        else {
            props.onError?.(error, undefined);
        }
        setScreen({
            id: "error",
            preparedQuote: quote,
            error,
        });
    }, [props.onError]);
    const handleCancel = useCallback((preparedQuote) => {
        if (preparedQuote?.type === "buy" || preparedQuote?.type === "onramp") {
            props.onCancel?.(preparedQuote);
        }
        else {
            props.onCancel?.(undefined);
        }
    }, [props.onCancel]);
    const [amountSelection, setAmountSelection] = useState({
        type: "token",
        value: props.amount ?? "",
    });
    const [selectedToken, setSelectedToken] = useState(() => {
        if (!props.chain?.id) {
            return undefined;
        }
        return {
            chainId: props.chain.id,
            tokenAddress: props.tokenAddress || NATIVE_TOKEN_ADDRESS,
        };
    });
    const amountEditable = props.amountEditable === undefined ? true : props.amountEditable;
    const tokenEditable = props.tokenEditable === undefined ? true : props.tokenEditable;
    if (screen.id === "1:buy-ui") {
        return (_jsx(FundWallet, { theme: props.theme, onDisconnect: props.onDisconnect, client: props.client, connectOptions: props.connectOptions, onContinue: (destinationAmount, destinationToken, receiverAddress) => {
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
            }, presetOptions: props.presetOptions, receiverAddress: props.receiverAddress, showThirdwebBranding: props.showThirdwebBranding, metadata: {
                title: props.title,
                description: props.description,
                image: props.image,
            }, buttonLabel: props.buttonLabel, currency: props.currency, selectedToken: selectedToken, setSelectedToken: setSelectedToken, amountSelection: amountSelection, setAmountSelection: setAmountSelection, amountEditable: amountEditable, tokenEditable: tokenEditable }));
    }
    if (screen.id === "2:methodSelection") {
        return (_jsx(PaymentSelection
        // from props
        , { 
            // from props
            client: props.client, connectLocale: connectLocaleEn, connectOptions: props.connectOptions, paymentMethods: props.paymentMethods, currency: props.currency, supportedTokens: props.supportedTokens, country: props.country, 
            // others
            destinationToken: screen.destinationToken, destinationAmount: screen.destinationAmount, receiverAddress: screen.receiverAddress, feePayer: undefined, onBack: () => {
                setScreen({ id: "1:buy-ui" });
            }, onError: (error) => {
                handleError(error, undefined);
            }, onPaymentMethodSelected: (paymentMethod) => {
                trackPayEvent({
                    chainId: paymentMethod.type === "wallet"
                        ? paymentMethod.originToken.chainId
                        : undefined,
                    client: props.client,
                    event: "ub:ui:loading_quote:fund_wallet",
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
            paymentLinkId: props.paymentLinkId, purchaseData: props.purchaseData, client: props.client, 
            // others
            sender: undefined, mode: "fund_wallet", feePayer: undefined, amount: screen.destinationAmount, destinationToken: screen.destinationToken, onBack: () => {
                setScreen({
                    ...screen,
                    id: "2:methodSelection",
                });
            }, onError: (error) => {
                handleError(error, undefined);
            }, onQuoteReceived: (preparedQuote, request) => {
                trackPayEvent({
                    chainId: preparedQuote.type === "transfer"
                        ? preparedQuote.intent.chainId
                        : preparedQuote.type === "onramp"
                            ? preparedQuote.intent.chainId
                            : preparedQuote.intent.originChainId,
                    client: props.client,
                    event: "payment_details",
                    fromToken: preparedQuote.type === "transfer"
                        ? preparedQuote.intent.tokenAddress
                        : preparedQuote.type === "onramp"
                            ? preparedQuote.intent.tokenAddress
                            : preparedQuote.intent.originTokenAddress,
                    toChainId: preparedQuote.type === "transfer"
                        ? preparedQuote.intent.chainId
                        : preparedQuote.type === "onramp"
                            ? preparedQuote.intent.chainId
                            : preparedQuote.intent.destinationChainId,
                    toToken: preparedQuote.type === "transfer"
                        ? preparedQuote.intent.tokenAddress
                        : preparedQuote.type === "onramp"
                            ? preparedQuote.intent.tokenAddress
                            : preparedQuote.intent.destinationTokenAddress,
                    walletAddress: screen.paymentMethod.payerWallet?.getAccount()?.address,
                    walletType: screen.paymentMethod.payerWallet?.id,
                });
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
                title: props.title,
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
                mode: "fund_wallet",
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
                if (screen.preparedQuote.type === "buy" ||
                    screen.preparedQuote.type === "onramp") {
                    props.onSuccess?.({
                        quote: screen.preparedQuote,
                        statuses: completedStatuses,
                    });
                }
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
                setScreen({ id: "1:buy-ui" });
            }, preparedQuote: screen.preparedQuote, showContinueWithTx: false, windowAdapter: webWindowAdapter }));
    }
    if (screen.id === "error") {
        return (_jsx(ErrorBanner, { client: props.client, error: screen.error, onCancel: () => {
                setScreen({ id: "1:buy-ui" });
                handleCancel(screen.preparedQuote);
            }, onRetry: () => {
                setScreen({ id: "1:buy-ui" });
            } }));
    }
    return null;
}
/**
 * @internal
 */
function BridgeWidgetContainer(props) {
    return (_jsx(CustomThemeProvider, { theme: props.theme || "dark", children: _jsx(EmbedContainer, { className: props.className, modalSize: "compact", style: props.style, children: _jsx(DynamicHeight, { children: props.children }) }) }));
}
//# sourceMappingURL=BuyWidget.js.map