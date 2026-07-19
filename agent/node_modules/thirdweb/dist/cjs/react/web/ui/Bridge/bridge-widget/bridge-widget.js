"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgeWidget = BridgeWidget;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const pay_js_1 = require("../../../../../analytics/track/pay.js");
const utils_js_1 = require("../../../../../chains/utils.js");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const ConnectEmbed_js_1 = require("../../ConnectWallet/Modal/ConnectEmbed.js");
const basic_js_1 = require("../../components/basic.js");
const buttons_js_1 = require("../../components/buttons.js");
const BuyWidget_js_1 = require("../BuyWidget.js");
const SwapWidget_js_1 = require("../swap-widget/SwapWidget.js");
/**
 * A combined widget for swapping or buying tokens with cross-chain support.
 *
 * This component renders two tabs – "Swap" and "Buy" – and orchestrates the appropriate flow
 * by composing {@link SwapWidget} and {@link BuyWidget} under the hood.
 *
 * - The Swap tab enables token-to-token swaps (including cross-chain).
 * - The Buy tab enables purchasing a specific token; by default, it uses card onramp in this widget.
 *
 * @param props - Props of type {@link BridgeWidgetProps} to configure the BridgeWidget component.
 *
 * @example
 * ### Basic usage
 * ```tsx
 * <BridgeWidget
 *   client={client}
 *   currency="USD"
 *   theme="dark"
 * />
 * ```
 *
 * ### Prefill swap tokens and configure buy
 * ```tsx
 * <BridgeWidget
 *   client={client}
 *   swap={{
 *     prefill: {
 *       buyToken: {
 *         // Base USDC
 *         chainId: 8453,
 *         tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
 *       },
 *       sellToken: {
 *         // Polygon native token (MATIC)
 *         chainId: 137,
 *       },
 *     },
 *   }}
 *   buy={{
 *     amount: "100",
 *     chainId: 8453,
 *     tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
 *     buttonLabel: "Buy USDC",
 *   }}
 * />
 * ```
 *
 * @bridge
 */
function BridgeWidget(props) {
    const [tab, setTab] = (0, react_1.useState)("swap");
    const hasFiredRenderEvent = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        if (hasFiredRenderEvent.current)
            return;
        hasFiredRenderEvent.current = true;
        (0, pay_js_1.trackPayEvent)({
            client: props.client,
            event: "ub:ui:bridge_widget:render",
        });
    }, [props.client]);
    return ((0, jsx_runtime_1.jsx)(CustomThemeProvider_js_1.CustomThemeProvider, { theme: props.theme, children: (0, jsx_runtime_1.jsxs)(ConnectEmbed_js_1.EmbedContainer, { modalSize: "compact", className: props.className, style: {
                borderRadius: index_js_1.radius.xl,
                ...props.style,
            }, children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { px: "md", py: "md", flex: "row", gap: "xs", borderColor: "borderColor", style: {
                        borderBottomWidth: 1,
                        borderBottomStyle: "dashed",
                    }, children: [(0, jsx_runtime_1.jsx)(TabButton, { isActive: tab === "swap", onClick: () => setTab("swap"), children: "Swap" }), (0, jsx_runtime_1.jsx)(TabButton, { isActive: tab === "buy", onClick: () => setTab("buy"), children: "Buy" })] }), tab === "swap" && ((0, jsx_runtime_1.jsx)(SwapWidget_js_1.SwapWidget, { client: props.client, prefill: props.swap?.prefill, className: props.swap?.className, showThirdwebBranding: props.showThirdwebBranding, currency: props.currency, theme: props.theme, onSuccess: props.swap?.onSuccess, onError: props.swap?.onError, onCancel: props.swap?.onCancel, onDisconnect: props.swap?.onDisconnect, persistTokenSelections: props.swap?.persistTokenSelections, connectOptions: props.connectOptions, style: {
                        border: "none",
                        ...props.swap?.style,
                    } })), tab === "buy" && ((0, jsx_runtime_1.jsx)(BuyWidget_js_1.BuyWidget, { client: props.client, amount: props.buy?.amount, showThirdwebBranding: props.showThirdwebBranding, chain: props.buy?.chainId ? (0, utils_js_1.defineChain)(props.buy.chainId) : undefined, currency: props.currency, theme: props.theme, title: "" // Keep it empty string to hide the title
                    , tokenAddress: props.buy?.tokenAddress, buttonLabel: props.buy?.buttonLabel, className: props.buy?.className, country: props.buy?.country, onCancel: props.buy?.onCancel, onError: props.buy?.onError, onSuccess: props.buy?.onSuccess, presetOptions: props.buy?.presetOptions, purchaseData: props.buy?.purchaseData, paymentMethods: ["card"], connectOptions: props.connectOptions, style: {
                        border: "none",
                    } }))] }) }));
}
function TabButton(props) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return ((0, jsx_runtime_1.jsx)(buttons_js_1.Button, { variant: "secondary", onClick: props.onClick, style: {
            borderRadius: index_js_1.radius.full,
            fontSize: index_js_1.fontSize.sm,
            fontWeight: 500,
            paddingInline: index_js_1.spacing.md,
            paddingBlock: 0,
            height: "36px",
            color: props.isActive
                ? theme.colors.primaryText
                : theme.colors.secondaryText,
            border: `1px solid ${props.isActive ? theme.colors.secondaryText : theme.colors.borderColor}`,
        }, children: props.children }));
}
//# sourceMappingURL=bridge-widget.js.map