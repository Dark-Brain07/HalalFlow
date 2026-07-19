"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCustomTheme } from "../../../../core/design-system/CustomThemeProvider.js";
import { radius, spacing } from "../../../../core/design-system/index.js";
import { formatCurrencyAmount, formatTokenAmount, } from "../../ConnectWallet/screens/formatTokenBalance.js";
import { Container } from "../../components/basic.js";
import { Button } from "../../components/buttons.js";
import { Skeleton } from "../../components/Skeleton.js";
import { Spacer } from "../../components/Spacer.js";
import { Text } from "../../components/text.js";
import { TokenAndChain } from "../common/TokenAndChain.js";
function PaymentMethodTokenRow({ paymentMethod, client, onPaymentMethodSelected, currency, }) {
    const theme = useCustomTheme();
    const hasEnoughBalance = paymentMethod.hasEnoughBalance;
    const currencyPrice = paymentMethod.originToken.prices[currency || "USD"];
    return (_jsx(Button, { disabled: !hasEnoughBalance, fullWidth: true, onClick: () => onPaymentMethodSelected(paymentMethod), style: {
            backgroundColor: theme.colors.tertiaryBg,
            borderRadius: radius.lg,
            padding: `${spacing.md} ${spacing.md}`,
            textAlign: "left",
        }, variant: "secondary", children: _jsxs(Container, { flex: "row", gap: "md", style: { alignItems: "center", width: "100%" }, children: [_jsx(TokenAndChain, { client: client, size: "lg", style: {
                        maxWidth: "50%",
                    }, token: paymentMethod.originToken }), _jsxs(Container, { flex: "column", gap: "3xs", style: { alignItems: "flex-end", flex: 1 }, children: [currencyPrice && (_jsx(Text, { color: "primaryText", size: "sm", style: { fontWeight: 500, textWrap: "nowrap" }, children: formatCurrencyAmount(currency || "USD", Number(formatTokenAmount(paymentMethod.balance, paymentMethod.originToken.decimals)) * currencyPrice) })), _jsx(Container, { flex: "row", gap: "3xs", children: _jsxs(Text, { color: hasEnoughBalance ? "success" : "danger", size: "xs", children: [formatTokenAmount(paymentMethod.balance, paymentMethod.originToken.decimals), " ", paymentMethod.originToken.symbol] }) })] })] }) }, `${paymentMethod.originToken.address}-${paymentMethod.originToken.chainId}`));
}
export function TokenSelection({ paymentMethods, paymentMethodsLoading, client, onPaymentMethodSelected, onBack, destinationToken, destinationAmount, feePayer, currency, }) {
    const theme = useCustomTheme();
    if (paymentMethodsLoading) {
        return (_jsx(Container, { flex: "column", gap: "xs", pb: "lg", style: {
                maxHeight: "400px",
                overflowY: "auto",
                scrollbarWidth: "none",
            }, children: new Array(10).fill(0).map((_, i) => (_jsx(Container
            // biome-ignore lint/suspicious/noArrayIndexKey: ok
            , { style: {
                    backgroundColor: theme.colors.tertiaryBg,
                    borderRadius: radius.lg,
                    padding: `${spacing.md} ${spacing.md}`,
                }, children: _jsxs(Container, { flex: "row", gap: "md", style: { alignItems: "center", width: "100%" }, children: [_jsxs(Container, { center: "y", flex: "row", gap: "sm", style: { maxWidth: "50%" }, children: [_jsx("div", { style: {
                                        backgroundColor: theme.colors.skeletonBg,
                                        borderRadius: "50%",
                                        height: "32px",
                                        width: "32px",
                                    } }), _jsxs(Container, { flex: "column", gap: "3xs", children: [_jsx(Skeleton, { height: "14px", width: "60px" }), _jsx(Skeleton, { height: "12px", width: "40px" })] })] }), _jsxs(Container, { flex: "column", gap: "3xs", style: { alignItems: "flex-end", flex: 1 }, children: [_jsx(Skeleton, { height: "16px", width: "80px" }), _jsxs(Container, { flex: "row", gap: "3xs", children: [_jsx(Skeleton, { height: "12px", width: "50px" }), _jsx(Skeleton, { height: "12px", width: "40px" })] })] })] }) }, i))) }));
    }
    if (paymentMethods.length === 0) {
        return (_jsxs(Container, { center: "both", flex: "column", style: { minHeight: "250px" }, children: [_jsx(Text, { center: true, color: "primaryText", size: "md", children: "No available tokens found for this wallet" }), _jsx(Spacer, { y: "sm" }), _jsx(Text, { center: true, color: "secondaryText", size: "sm", children: "Try connecting a different wallet or pay with card" }), _jsx(Spacer, { y: "lg" }), _jsx(Button, { onClick: onBack, variant: "primary", children: "Select another payment method" })] }));
    }
    return (_jsx(Container, { flex: "column", gap: "xs", pb: "lg", style: {
            maxHeight: "400px",
            overflowY: "auto",
            scrollbarWidth: "none",
        }, children: paymentMethods
            .filter((method) => method.type === "wallet")
            .map((method) => (_jsx(PaymentMethodTokenRow, { client: client, destinationAmount: destinationAmount, destinationToken: destinationToken, feePayer: feePayer, onPaymentMethodSelected: onPaymentMethodSelected, paymentMethod: method, currency: currency }, `${method.originToken.address}-${method.originToken.chainId}`))) }));
}
//# sourceMappingURL=TokenSelection.js.map