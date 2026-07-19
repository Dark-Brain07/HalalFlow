"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapWidget = SwapWidget;
exports.SwapWidgetContainer = SwapWidgetContainer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const pay_js_1 = require("../../../../../analytics/track/pay.js");
const addresses_js_1 = require("../../../../../constants/addresses.js");
const address_js_1 = require("../../../../../utils/address.js");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const WindowAdapter_js_1 = require("../../../adapters/WindowAdapter.js");
const ConnectEmbed_js_1 = require("../../ConnectWallet/Modal/ConnectEmbed.js");
const DynamicHeight_js_1 = require("../../components/DynamicHeight.js");
const ErrorBanner_js_1 = require("../ErrorBanner.js");
const SuccessScreen_js_1 = require("../payment-success/SuccessScreen.js");
const StepRunner_js_1 = require("../StepRunner.js");
const hooks_js_1 = require("./hooks.js");
const storage_js_1 = require("./storage.js");
const swap_ui_js_1 = require("./swap-ui.js");
const use_bridge_chains_js_1 = require("./use-bridge-chains.js");
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
function SwapWidget(props) {
    const hasFiredRenderEvent = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        if (hasFiredRenderEvent.current)
            return;
        hasFiredRenderEvent.current = true;
        (0, pay_js_1.trackPayEvent)({
            client: props.client,
            event: "ub:ui:swap_widget:render",
        });
    }, [props.client]);
    return ((0, jsx_runtime_1.jsx)(SwapWidgetContainer, { theme: props.theme, style: props.style, className: props.className, children: (0, jsx_runtime_1.jsx)(SwapWidgetContent, { ...props, currency: props.currency || "USD" }) }));
}
/**
 * @internal
 */
function SwapWidgetContainer(props) {
    return ((0, jsx_runtime_1.jsx)(CustomThemeProvider_js_1.CustomThemeProvider, { theme: props.theme || "dark", children: (0, jsx_runtime_1.jsx)(ConnectEmbed_js_1.EmbedContainer, { className: props.className, modalSize: "compact", style: {
                ...props.style,
            }, children: (0, jsx_runtime_1.jsx)(DynamicHeight_js_1.DynamicHeight, { children: props.children }) }) }));
}
function SwapWidgetContent(props) {
    const [screen, setScreen] = (0, react_1.useState)({ id: "1:swap-ui" });
    const activeWalletInfo = (0, hooks_js_1.useActiveWalletInfo)(props.activeWallet);
    const isPersistEnabled = props.persistTokenSelections !== false;
    const [amountSelection, setAmountSelection] = (0, react_1.useState)(() => {
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
    const [buyToken, setBuyToken] = (0, react_1.useState)(() => {
        return getInitialTokens(props.prefill, isPersistEnabled).buyToken;
    });
    const [sellToken, setSellToken] = (0, react_1.useState)(() => {
        return getInitialTokens(props.prefill, isPersistEnabled).sellToken;
    });
    // persist selections to localStorage whenever they change
    (0, react_1.useEffect)(() => {
        if (isPersistEnabled) {
            (0, storage_js_1.setLastUsedTokens)({ buyToken, sellToken });
        }
    }, [buyToken, sellToken, isPersistEnabled]);
    // preload requests
    (0, use_bridge_chains_js_1.useBridgeChains)({ client: props.client });
    // if wallet suddenly disconnects, show screen 1
    if (screen.id === "1:swap-ui" || !activeWalletInfo) {
        return ((0, jsx_runtime_1.jsx)(swap_ui_js_1.SwapUI, { onDisconnect: props.onDisconnect, showThirdwebBranding: props.showThirdwebBranding === undefined
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
        return ((0, jsx_runtime_1.jsx)(StepRunner_js_1.StepRunner, { title: "Processing Swap", autoStart: true, preparedQuote: screen.preparedQuote, client: props.client, onBack: () => {
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
            }, request: screen.request, wallet: activeWalletInfo.activeWallet, windowAdapter: WindowAdapter_js_1.webWindowAdapter }));
    }
    if (screen.id === "4:success") {
        return ((0, jsx_runtime_1.jsx)(SuccessScreen_js_1.SuccessScreen, { type: "swap-success", client: props.client, completedStatuses: screen.completedStatuses, onDone: () => {
                setScreen({ id: "1:swap-ui" });
                // clear amounts
                setAmountSelection({
                    type: "buy",
                    amount: "",
                });
            }, preparedQuote: screen.preparedQuote, showContinueWithTx: false, windowAdapter: WindowAdapter_js_1.webWindowAdapter, hasPaymentId: false }));
    }
    if (screen.id === "error") {
        return ((0, jsx_runtime_1.jsx)(ErrorBanner_js_1.ErrorBanner, { client: props.client, error: screen.error, onCancel: () => {
                setScreen({ id: "1:swap-ui" });
                props.onCancel?.(screen.preparedQuote);
            }, onRetry: () => {
                setScreen({ id: "1:swap-ui" });
            } }));
    }
    return null;
}
function getInitialTokens(prefill, isPersistEnabled) {
    const lastUsedTokens = isPersistEnabled ? (0, storage_js_1.getLastUsedTokens)() : undefined;
    const buyToken = prefill?.buyToken
        ? {
            tokenAddress: prefill.buyToken.tokenAddress || (0, address_js_1.getAddress)(addresses_js_1.NATIVE_TOKEN_ADDRESS),
            chainId: prefill.buyToken.chainId,
        }
        : lastUsedTokens?.buyToken;
    const sellToken = prefill?.sellToken
        ? {
            tokenAddress: prefill.sellToken.tokenAddress || (0, address_js_1.getAddress)(addresses_js_1.NATIVE_TOKEN_ADDRESS),
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