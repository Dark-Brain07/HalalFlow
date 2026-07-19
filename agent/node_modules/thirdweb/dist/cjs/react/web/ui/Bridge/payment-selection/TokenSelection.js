"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSelection = TokenSelection;
const jsx_runtime_1 = require("react/jsx-runtime");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const formatTokenBalance_js_1 = require("../../ConnectWallet/screens/formatTokenBalance.js");
const basic_js_1 = require("../../components/basic.js");
const buttons_js_1 = require("../../components/buttons.js");
const Skeleton_js_1 = require("../../components/Skeleton.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const text_js_1 = require("../../components/text.js");
const TokenAndChain_js_1 = require("../common/TokenAndChain.js");
function PaymentMethodTokenRow({ paymentMethod, client, onPaymentMethodSelected, currency, }) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    const hasEnoughBalance = paymentMethod.hasEnoughBalance;
    const currencyPrice = paymentMethod.originToken.prices[currency || "USD"];
    return ((0, jsx_runtime_1.jsx)(buttons_js_1.Button, { disabled: !hasEnoughBalance, fullWidth: true, onClick: () => onPaymentMethodSelected(paymentMethod), style: {
            backgroundColor: theme.colors.tertiaryBg,
            borderRadius: index_js_1.radius.lg,
            padding: `${index_js_1.spacing.md} ${index_js_1.spacing.md}`,
            textAlign: "left",
        }, variant: "secondary", children: (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "md", style: { alignItems: "center", width: "100%" }, children: [(0, jsx_runtime_1.jsx)(TokenAndChain_js_1.TokenAndChain, { client: client, size: "lg", style: {
                        maxWidth: "50%",
                    }, token: paymentMethod.originToken }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "3xs", style: { alignItems: "flex-end", flex: 1 }, children: [currencyPrice && ((0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", style: { fontWeight: 500, textWrap: "nowrap" }, children: (0, formatTokenBalance_js_1.formatCurrencyAmount)(currency || "USD", Number((0, formatTokenBalance_js_1.formatTokenAmount)(paymentMethod.balance, paymentMethod.originToken.decimals)) * currencyPrice) })), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "row", gap: "3xs", children: (0, jsx_runtime_1.jsxs)(text_js_1.Text, { color: hasEnoughBalance ? "success" : "danger", size: "xs", children: [(0, formatTokenBalance_js_1.formatTokenAmount)(paymentMethod.balance, paymentMethod.originToken.decimals), " ", paymentMethod.originToken.symbol] }) })] })] }) }, `${paymentMethod.originToken.address}-${paymentMethod.originToken.chainId}`));
}
function TokenSelection({ paymentMethods, paymentMethodsLoading, client, onPaymentMethodSelected, onBack, destinationToken, destinationAmount, feePayer, currency, }) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    if (paymentMethodsLoading) {
        return ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", gap: "xs", pb: "lg", style: {
                maxHeight: "400px",
                overflowY: "auto",
                scrollbarWidth: "none",
            }, children: new Array(10).fill(0).map((_, i) => ((0, jsx_runtime_1.jsx)(basic_js_1.Container
            // biome-ignore lint/suspicious/noArrayIndexKey: ok
            , { style: {
                    backgroundColor: theme.colors.tertiaryBg,
                    borderRadius: index_js_1.radius.lg,
                    padding: `${index_js_1.spacing.md} ${index_js_1.spacing.md}`,
                }, children: (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "md", style: { alignItems: "center", width: "100%" }, children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", gap: "sm", style: { maxWidth: "50%" }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                        backgroundColor: theme.colors.skeletonBg,
                                        borderRadius: "50%",
                                        height: "32px",
                                        width: "32px",
                                    } }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "3xs", children: [(0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: "14px", width: "60px" }), (0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: "12px", width: "40px" })] })] }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "3xs", style: { alignItems: "flex-end", flex: 1 }, children: [(0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: "16px", width: "80px" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "3xs", children: [(0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: "12px", width: "50px" }), (0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: "12px", width: "40px" })] })] })] }) }, i))) }));
    }
    if (paymentMethods.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "both", flex: "column", style: { minHeight: "250px" }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "primaryText", size: "md", children: "No available tokens found for this wallet" }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "sm" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "secondaryText", size: "sm", children: "Try connecting a different wallet or pay with card" }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsx)(buttons_js_1.Button, { onClick: onBack, variant: "primary", children: "Select another payment method" })] }));
    }
    return ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", gap: "xs", pb: "lg", style: {
            maxHeight: "400px",
            overflowY: "auto",
            scrollbarWidth: "none",
        }, children: paymentMethods
            .filter((method) => method.type === "wallet")
            .map((method) => ((0, jsx_runtime_1.jsx)(PaymentMethodTokenRow, { client: client, destinationAmount: destinationAmount, destinationToken: destinationToken, feePayer: feePayer, onPaymentMethodSelected: onPaymentMethodSelected, paymentMethod: method, currency: currency }, `${method.originToken.address}-${method.originToken.chainId}`))) }));
}
//# sourceMappingURL=TokenSelection.js.map