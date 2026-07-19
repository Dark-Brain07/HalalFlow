"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentOverview = PaymentOverview;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_js_1 = require("../../../../../chains/utils.js");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const useTransactionDetails_js_1 = require("../../../../core/hooks/useTransactionDetails.js");
const currencies_js_1 = require("../../ConnectWallet/screens/Buy/fiat/currencies.js");
const FiatValue_js_1 = require("../../ConnectWallet/screens/Buy/swap/FiatValue.js");
const StepConnector_js_1 = require("../../ConnectWallet/screens/Buy/swap/StepConnector.js");
const WalletRow_js_1 = require("../../ConnectWallet/screens/Buy/swap/WalletRow.js");
const basic_js_1 = require("../../components/basic.js");
const text_js_1 = require("../../components/text.js");
const TokenBalanceRow_js_1 = require("../common/TokenBalanceRow.js");
function PaymentOverview(props) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    const sender = props.sender ||
        (props.paymentMethod.type === "wallet"
            ? props.paymentMethod.payerWallet.getAccount()?.address
            : undefined);
    const isDifferentRecipient = props.receiver.toLowerCase() !== sender?.toLowerCase();
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { bg: "tertiaryBg", flex: "column", style: {
                    border: `1px solid ${theme.colors.borderColor}`,
                    borderRadius: index_js_1.radius.xl,
                }, children: [sender && ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "row", gap: "sm", px: "md", py: "md", style: {
                            borderBottom: `1px dashed ${theme.colors.borderColor}`,
                        }, children: (0, jsx_runtime_1.jsx)(WalletRow_js_1.WalletRow, { address: sender, client: props.client, iconSize: "lg", textSize: "sm" }) })), props.paymentMethod.type === "wallet" && ((0, jsx_runtime_1.jsx)(TokenBalanceRow_js_1.TokenBalanceRow, { currency: props.currency, amount: props.fromAmount, client: props.client, onClick: () => { }, style: {
                            background: "transparent",
                            border: "none",
                            borderRadius: 0,
                        }, token: props.paymentMethod.originToken })), props.paymentMethod.type === "fiat" && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", gap: "sm", px: "md", py: "md", style: { justifyContent: "space-between" }, children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", gap: "sm", children: [(0, currencies_js_1.getFiatCurrencyIcon)({
                                        currency: props.paymentMethod.currency,
                                        size: "lg",
                                    }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "column", gap: "3xs", children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", weight: 500, children: props.paymentMethod.currency }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "xs", children: props.paymentMethod.onramp.charAt(0).toUpperCase() +
                                                    props.paymentMethod.onramp.slice(1) })] })] }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", children: props.fromAmount })] }))] }), (0, jsx_runtime_1.jsx)(StepConnector_js_1.StepConnectorArrow, {}), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { bg: "tertiaryBg", flex: "column", style: {
                    border: `1px solid ${theme.colors.borderColor}`,
                    borderRadius: index_js_1.radius.xl,
                }, children: [isDifferentRecipient && ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "row", gap: "sm", px: "md", py: "md", style: {
                            borderBottom: `1px dashed ${theme.colors.borderColor}`,
                        }, children: (0, jsx_runtime_1.jsx)(WalletRow_js_1.WalletRow, { address: props.receiver, client: props.client, iconSize: "lg", textSize: "sm" }) })), props.modeInfo.mode === "direct_payment" && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", gap: "sm", p: "md", style: { justifyContent: "space-between" }, children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "column", gap: "3xs", style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", weight: 500, children: props.metadata.title || "Payment" }), props.metadata.description && ((0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "xs", children: props.metadata.description }))] }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "column", gap: "3xs", style: { alignItems: "flex-end" }, children: [(0, jsx_runtime_1.jsx)(FiatValue_js_1.FiatValue, { currency: props.currency, chain: (0, utils_js_1.defineChain)(props.toToken.chainId), client: props.client, color: "primaryText", size: "sm", token: props.toToken, tokenAmount: props.modeInfo.paymentInfo.amount }), (0, jsx_runtime_1.jsxs)(text_js_1.Text, { color: "secondaryText", size: "xs", children: [props.modeInfo.paymentInfo.amount, " ", props.toToken.symbol] })] })] })), props.modeInfo.mode === "fund_wallet" && ((0, jsx_runtime_1.jsx)(TokenBalanceRow_js_1.TokenBalanceRow, { currency: props.currency, amount: props.toAmount, client: props.client, onClick: () => { }, style: {
                            background: "transparent",
                            border: "none",
                            borderRadius: 0,
                        }, token: props.toToken })), props.modeInfo.mode === "transaction" && ((0, jsx_runtime_1.jsx)(TransactionOverViewCompact, { client: props.client, paymentMethod: props.paymentMethod, transaction: props.modeInfo.transaction, metadata: props.metadata }))] })] }));
}
const TransactionOverViewCompact = (props) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    const txInfo = (0, useTransactionDetails_js_1.useTransactionDetails)({
        client: props.client,
        transaction: props.transaction,
        wallet: props.paymentMethod.payerWallet,
    });
    if (!txInfo.data) {
        // Skeleton loading state
        return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", gap: "sm", p: "md", style: { justifyContent: "space-between" }, children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "column", gap: "3xs", style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                backgroundColor: theme.colors.skeletonBg,
                                borderRadius: index_js_1.spacing.xs,
                                height: "16px",
                                width: "120px",
                            } }), props.metadata.description && ((0, jsx_runtime_1.jsx)("div", { style: {
                                backgroundColor: theme.colors.skeletonBg,
                                borderRadius: index_js_1.spacing.xs,
                                height: "12px",
                                width: "80px",
                            } }))] }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "y", flex: "column", gap: "3xs", style: { alignItems: "flex-end" }, children: (0, jsx_runtime_1.jsx)("div", { style: {
                            backgroundColor: theme.colors.skeletonBg,
                            borderRadius: index_js_1.spacing.sm,
                            height: "24px",
                            width: "100px",
                        } }) })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", gap: "sm", p: "md", style: { justifyContent: "space-between" }, children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "column", gap: "3xs", style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", weight: 500, children: props.metadata.title || "Transaction" }), props.metadata.description && ((0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "xs", children: props.metadata.description }))] }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "y", flex: "column", gap: "3xs", style: { alignItems: "flex-end" }, children: (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "xs", style: {
                        backgroundColor: theme.colors.secondaryButtonBg,
                        borderRadius: index_js_1.spacing.sm,
                        fontFamily: "monospace",
                        padding: `${index_js_1.spacing.xs} ${index_js_1.spacing.sm}`,
                        textAlign: "right",
                    }, children: txInfo.data.functionInfo.functionName }) })] }));
};
//# sourceMappingURL=PaymentOverview.js.map