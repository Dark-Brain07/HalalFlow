"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { trackPayEvent } from "../../../../../analytics/track/pay.js";
import { NATIVE_TOKEN_ADDRESS } from "../../../../../constants/addresses.js";
import { getAddress } from "../../../../../utils/address.js";
import { CustomThemeProvider } from "../../../../core/design-system/CustomThemeProvider.js";
import { webWindowAdapter } from "../../../adapters/WindowAdapter.js";
import { EmbedContainer } from "../../ConnectWallet/Modal/ConnectEmbed.js";
import { DynamicHeight } from "../../components/DynamicHeight.js";
import { ErrorBanner } from "../ErrorBanner.js";
import { SuccessScreen } from "../payment-success/SuccessScreen.js";
import { StepRunner } from "../StepRunner.js";
import { useActiveWalletInfo } from "./hooks.js";
import { getLastUsedTokens, setLastUsedTokens } from "./storage.js";
import { SwapUI } from "./swap-ui.js";
import { useBridgeChains } from "./use-bridge-chains.js";
/**
 * A widget for swapping tokens with cross-chain support
 *
 * @param props - Props of type [`SwapWidgetProps`](https://portal.thirdweb.com/references/typescript/v5/SwapWidgetProps) to configure the SwapWidget component.
 *
 * @example
 * ### Basic usage
 *
 * By default, no tokens are selected in the widget UI.
 *
 * You can set specific tokens to buy or sell by default by passing the `prefill` prop. User can change these selections in the widget UI.
 *
 * ```tsx
 * <SwapWidget client={client} />
 * ```
 *
 * ### Set an ERC20 token to Buy by default
 *
 * ```tsx
 * <SwapWidget client={client} prefill={{
 *  buyToken: {
 *    // Base USDC
 *    chainId: 8453,
 *    tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
 *  },
 * }} />
 * ```
 *
 * ### Set a native token to Sell by default
 *
 * By not specifying a `tokenAddress`, the native token will be used.
 *
 * ```tsx
 * <SwapWidget client={client} prefill={{
 *  // Base native token (ETH)
 *  sellToken: {
 *    chainId: 8453,
 *  },
 * }} />
 * ```
 *
 * ### Set amount and token to Buy by default
 *
 * ```tsx
 * <SwapWidget client={client} prefill={{
 *  buyToken: {
 *    // 0.1 Base USDC
 *    chainId: 8453,
 *    amount: "0.1",
 *    tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
 *  },
 * }} />
 * ```
 *
 * ### Set both buy and sell tokens by default
 *
 * ```tsx
 * <SwapWidget client={client} prefill={{
 *  buyToken: {
 *    // Base USDC
 *    chainId: 8453,
 *    tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
 *  },
 *  sellToken: {
 *    // Polygon native token (MATIC)
 *    chainId: 137,
 *  },
 * }} />
 * ```
 *
 * @bridge
 */
export function SwapWidget(props) {
    const hasFiredRenderEvent = useRef(false);
    useEffect(() => {
        if (hasFiredRenderEvent.current)
            return;
        hasFiredRenderEvent.current = true;
        trackPayEvent({
            client: props.client,
            event: "ub:ui:swap_widget:render",
        });
    }, [props.client]);
    return (_jsx(SwapWidgetContainer, { theme: props.theme, style: props.style, className: props.className, children: _jsx(SwapWidgetContent, { ...props, currency: props.currency || "USD" }) }));
}
/**
 * @internal
 */
export function SwapWidgetContainer(props) {
    return (_jsx(CustomThemeProvider, { theme: props.theme || "dark", children: _jsx(EmbedContainer, { className: props.className, modalSize: "compact", style: {
                ...props.style,
            }, children: _jsx(DynamicHeight, { children: props.children }) }) }));
}
function SwapWidgetContent(props) {
    const [screen, setScreen] = useState({ id: "1:swap-ui" });
    const activeWalletInfo = useActiveWalletInfo(props.activeWallet);
    const isPersistEnabled = props.persistTokenSelections !== false;
    const [amountSelection, setAmountSelection] = useState(() => {
        if (props.prefill?.buyToken?.amount) {
            return {
                type: "buy",
                amount: props.prefill.buyToken.amount,
            };
        }
        if (props.prefill?.sellToken?.amount) {
            return {
                type: "sell",
                amount: props.prefill.sellToken.amount,
            };
        }
        return {
            type: "buy",
            amount: "",
        };
    });
    const [buyToken, setBuyToken] = useState(() => {
        return getInitialTokens(props.prefill, isPersistEnabled).buyToken;
    });
    const [sellToken, setSellToken] = useState(() => {
        return getInitialTokens(props.prefill, isPersistEnabled).sellToken;
    });
    // persist selections to localStorage whenever they change
    useEffect(() => {
        if (isPersistEnabled) {
            setLastUsedTokens({ buyToken, sellToken });
        }
    }, [buyToken, sellToken, isPersistEnabled]);
    // preload requests
    useBridgeChains({ client: props.client });
    // if wallet suddenly disconnects, show screen 1
    if (screen.id === "1:swap-ui" || !activeWalletInfo) {
        return (_jsx(SwapUI, { onDisconnect: props.onDisconnect, showThirdwebBranding: props.showThirdwebBranding === undefined
                ? true
                : props.showThirdwebBranding, client: props.client, theme: props.theme || "dark", connectOptions: props.connectOptions, currency: props.currency, activeWalletInfo: activeWalletInfo, buyToken: buyToken, sellToken: sellToken, setBuyToken: setBuyToken, setSellToken: setSellToken, amountSelection: amountSelection, setAmountSelection: setAmountSelection, onSwap: (data) => {
                setScreen({
                    id: "3:execute",
                    buyToken: data.buyToken,
                    sellToken: data.sellToken,
                    sellTokenBalance: data.sellTokenBalance,
                    mode: data.mode,
                    preparedQuote: data.result,
                    request: data.request,
                    quote: data.result,
                });
            } }));
    }
    if (screen.id === "3:execute") {
        return (_jsx(StepRunner, { title: "Processing Swap", autoStart: true, preparedQuote: screen.preparedQuote, client: props.client, onBack: () => {
                setScreen({
                    ...screen,
                    id: "1:swap-ui",
                });
            }, onCancel: () => props.onCancel?.(screen.preparedQuote), onComplete: (completedStatuses) => {
                props.onSuccess?.({
                    quote: screen.preparedQuote,
                    statuses: completedStatuses,
                });
                setScreen({
                    ...screen,
                    id: "4:success",
                    completedStatuses,
                });
            }, request: screen.request, wallet: activeWalletInfo.activeWallet, windowAdapter: webWindowAdapter }));
    }
    if (screen.id === "4:success") {
        return (_jsx(SuccessScreen, { type: "swap-success", client: props.client, completedStatuses: screen.completedStatuses, onDone: () => {
                setScreen({ id: "1:swap-ui" });
                // clear amounts
                setAmountSelection({
                    type: "buy",
                    amount: "",
                });
            }, preparedQuote: screen.preparedQuote, showContinueWithTx: false, windowAdapter: webWindowAdapter, hasPaymentId: false }));
    }
    if (screen.id === "error") {
        return (_jsx(ErrorBanner, { client: props.client, error: screen.error, onCancel: () => {
                setScreen({ id: "1:swap-ui" });
                props.onCancel?.(screen.preparedQuote);
            }, onRetry: () => {
                setScreen({ id: "1:swap-ui" });
            } }));
    }
    return null;
}
function getInitialTokens(prefill, isPersistEnabled) {
    const lastUsedTokens = isPersistEnabled ? getLastUsedTokens() : undefined;
    const buyToken = prefill?.buyToken
        ? {
            tokenAddress: prefill.buyToken.tokenAddress || getAddress(NATIVE_TOKEN_ADDRESS),
            chainId: prefill.buyToken.chainId,
        }
        : lastUsedTokens?.buyToken;
    const sellToken = prefill?.sellToken
        ? {
            tokenAddress: prefill.sellToken.tokenAddress || getAddress(NATIVE_TOKEN_ADDRESS),
            chainId: prefill.sellToken.chainId,
        }
        : lastUsedTokens?.sellToken;
    // if both tokens are same
    if (buyToken &&
        sellToken &&
        buyToken.tokenAddress?.toLowerCase() ===
            sellToken.tokenAddress?.toLowerCase() &&
        buyToken.chainId === sellToken.chainId) {
        // if sell token prefill is specified, ignore buy token
        if (prefill?.sellToken) {
            return {
                buyToken: undefined,
                sellToken: sellToken,
            };
        }
        // if buy token prefill is specified, ignore sell token
        if (prefill?.buyToken) {
            return {
                buyToken: buyToken,
                sellToken: undefined,
            };
        }
        // if none of the two are specified via prefill, keep buy token
        return {
            buyToken: buyToken,
            sellToken: undefined,
        };
    }
    return {
        buyToken: buyToken,
        sellToken: sellToken,
    };
}
//# sourceMappingURL=SwapWidget.js.map