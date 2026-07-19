import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { trackPayEvent } from "../../../../../analytics/track/pay.js";
import { defineChain } from "../../../../../chains/utils.js";
import { CustomThemeProvider, useCustomTheme, } from "../../../../core/design-system/CustomThemeProvider.js";
import { fontSize, radius, spacing, } from "../../../../core/design-system/index.js";
import { EmbedContainer } from "../../ConnectWallet/Modal/ConnectEmbed.js";
import { Container } from "../../components/basic.js";
import { Button } from "../../components/buttons.js";
import { BuyWidget } from "../BuyWidget.js";
import { SwapWidget } from "../swap-widget/SwapWidget.js";
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
export function BridgeWidget(props) {
    const [tab, setTab] = useState("swap");
    const hasFiredRenderEvent = useRef(false);
    useEffect(() => {
        if (hasFiredRenderEvent.current)
            return;
        hasFiredRenderEvent.current = true;
        trackPayEvent({
            client: props.client,
            event: "ub:ui:bridge_widget:render",
        });
    }, [props.client]);
    return (_jsx(CustomThemeProvider, { theme: props.theme, children: _jsxs(EmbedContainer, { modalSize: "compact", className: props.className, style: {
                borderRadius: radius.xl,
                ...props.style,
            }, children: [_jsxs(Container, { px: "md", py: "md", flex: "row", gap: "xs", borderColor: "borderColor", style: {
                        borderBottomWidth: 1,
                        borderBottomStyle: "dashed",
                    }, children: [_jsx(TabButton, { isActive: tab === "swap", onClick: () => setTab("swap"), children: "Swap" }), _jsx(TabButton, { isActive: tab === "buy", onClick: () => setTab("buy"), children: "Buy" })] }), tab === "swap" && (_jsx(SwapWidget, { client: props.client, prefill: props.swap?.prefill, className: props.swap?.className, showThirdwebBranding: props.showThirdwebBranding, currency: props.currency, theme: props.theme, onSuccess: props.swap?.onSuccess, onError: props.swap?.onError, onCancel: props.swap?.onCancel, onDisconnect: props.swap?.onDisconnect, persistTokenSelections: props.swap?.persistTokenSelections, connectOptions: props.connectOptions, style: {
                        border: "none",
                        ...props.swap?.style,
                    } })), tab === "buy" && (_jsx(BuyWidget, { client: props.client, amount: props.buy?.amount, showThirdwebBranding: props.showThirdwebBranding, chain: props.buy?.chainId ? defineChain(props.buy.chainId) : undefined, currency: props.currency, theme: props.theme, title: "" // Keep it empty string to hide the title
                    , tokenAddress: props.buy?.tokenAddress, buttonLabel: props.buy?.buttonLabel, className: props.buy?.className, country: props.buy?.country, onCancel: props.buy?.onCancel, onError: props.buy?.onError, onSuccess: props.buy?.onSuccess, presetOptions: props.buy?.presetOptions, purchaseData: props.buy?.purchaseData, paymentMethods: ["card"], connectOptions: props.connectOptions, style: {
                        border: "none",
                    } }))] }) }));
}
function TabButton(props) {
    const theme = useCustomTheme();
    return (_jsx(Button, { variant: "secondary", onClick: props.onClick, style: {
            borderRadius: radius.full,
            fontSize: fontSize.sm,
            fontWeight: 500,
            paddingInline: spacing.md,
            paddingBlock: 0,
            height: "36px",
            color: props.isActive
                ? theme.colors.primaryText
                : theme.colors.secondaryText,
            border: `1px solid ${props.isActive ? theme.colors.secondaryText : theme.colors.borderColor}`,
        }, children: props.children }));
}
//# sourceMappingURL=bridge-widget.js.map