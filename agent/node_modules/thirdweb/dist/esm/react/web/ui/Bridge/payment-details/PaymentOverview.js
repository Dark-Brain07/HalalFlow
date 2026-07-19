import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { defineChain } from "../../../../../chains/utils.js";
import { useCustomTheme } from "../../../../core/design-system/CustomThemeProvider.js";
import { radius, spacing } from "../../../../core/design-system/index.js";
import { useTransactionDetails } from "../../../../core/hooks/useTransactionDetails.js";
import { getFiatCurrencyIcon } from "../../ConnectWallet/screens/Buy/fiat/currencies.js";
import { FiatValue } from "../../ConnectWallet/screens/Buy/swap/FiatValue.js";
import { StepConnectorArrow } from "../../ConnectWallet/screens/Buy/swap/StepConnector.js";
import { WalletRow } from "../../ConnectWallet/screens/Buy/swap/WalletRow.js";
import { Container } from "../../components/basic.js";
import { Text } from "../../components/text.js";
import { TokenBalanceRow } from "../common/TokenBalanceRow.js";
export function PaymentOverview(props) {
    const theme = useCustomTheme();
    const sender = props.sender ||
        (props.paymentMethod.type === "wallet"
            ? props.paymentMethod.payerWallet.getAccount()?.address
            : undefined);
    const isDifferentRecipient = props.receiver.toLowerCase() !== sender?.toLowerCase();
    return (_jsxs(Container, { children: [_jsxs(Container, { bg: "tertiaryBg", flex: "column", style: {
                    border: `1px solid ${theme.colors.borderColor}`,
                    borderRadius: radius.xl,
                }, children: [sender && (_jsx(Container, { flex: "row", gap: "sm", px: "md", py: "md", style: {
                            borderBottom: `1px dashed ${theme.colors.borderColor}`,
                        }, children: _jsx(WalletRow, { address: sender, client: props.client, iconSize: "lg", textSize: "sm" }) })), props.paymentMethod.type === "wallet" && (_jsx(TokenBalanceRow, { currency: props.currency, amount: props.fromAmount, client: props.client, onClick: () => { }, style: {
                            background: "transparent",
                            border: "none",
                            borderRadius: 0,
                        }, token: props.paymentMethod.originToken })), props.paymentMethod.type === "fiat" && (_jsxs(Container, { center: "y", flex: "row", gap: "sm", px: "md", py: "md", style: { justifyContent: "space-between" }, children: [_jsxs(Container, { center: "y", flex: "row", gap: "sm", children: [getFiatCurrencyIcon({
                                        currency: props.paymentMethod.currency,
                                        size: "lg",
                                    }), _jsxs(Container, { center: "y", flex: "column", gap: "3xs", children: [_jsx(Text, { color: "primaryText", size: "sm", weight: 500, children: props.paymentMethod.currency }), _jsx(Text, { color: "secondaryText", size: "xs", children: props.paymentMethod.onramp.charAt(0).toUpperCase() +
                                                    props.paymentMethod.onramp.slice(1) })] })] }), _jsx(Text, { color: "primaryText", size: "sm", children: props.fromAmount })] }))] }), _jsx(StepConnectorArrow, {}), _jsxs(Container, { bg: "tertiaryBg", flex: "column", style: {
                    border: `1px solid ${theme.colors.borderColor}`,
                    borderRadius: radius.xl,
                }, children: [isDifferentRecipient && (_jsx(Container, { flex: "row", gap: "sm", px: "md", py: "md", style: {
                            borderBottom: `1px dashed ${theme.colors.borderColor}`,
                        }, children: _jsx(WalletRow, { address: props.receiver, client: props.client, iconSize: "lg", textSize: "sm" }) })), props.modeInfo.mode === "direct_payment" && (_jsxs(Container, { center: "y", flex: "row", gap: "sm", p: "md", style: { justifyContent: "space-between" }, children: [_jsxs(Container, { center: "y", flex: "column", gap: "3xs", style: { flex: 1 }, children: [_jsx(Text, { color: "primaryText", size: "sm", weight: 500, children: props.metadata.title || "Payment" }), props.metadata.description && (_jsx(Text, { color: "secondaryText", size: "xs", children: props.metadata.description }))] }), _jsxs(Container, { center: "y", flex: "column", gap: "3xs", style: { alignItems: "flex-end" }, children: [_jsx(FiatValue, { currency: props.currency, chain: defineChain(props.toToken.chainId), client: props.client, color: "primaryText", size: "sm", token: props.toToken, tokenAmount: props.modeInfo.paymentInfo.amount }), _jsxs(Text, { color: "secondaryText", size: "xs", children: [props.modeInfo.paymentInfo.amount, " ", props.toToken.symbol] })] })] })), props.modeInfo.mode === "fund_wallet" && (_jsx(TokenBalanceRow, { currency: props.currency, amount: props.toAmount, client: props.client, onClick: () => { }, style: {
                            background: "transparent",
                            border: "none",
                            borderRadius: 0,
                        }, token: props.toToken })), props.modeInfo.mode === "transaction" && (_jsx(TransactionOverViewCompact, { client: props.client, paymentMethod: props.paymentMethod, transaction: props.modeInfo.transaction, metadata: props.metadata }))] })] }));
}
const TransactionOverViewCompact = (props) => {
    const theme = useCustomTheme();
    const txInfo = useTransactionDetails({
        client: props.client,
        transaction: props.transaction,
        wallet: props.paymentMethod.payerWallet,
    });
    if (!txInfo.data) {
        // Skeleton loading state
        return (_jsxs(Container, { center: "y", flex: "row", gap: "sm", p: "md", style: { justifyContent: "space-between" }, children: [_jsxs(Container, { center: "y", flex: "column", gap: "3xs", style: { flex: 1 }, children: [_jsx("div", { style: {
                                backgroundColor: theme.colors.skeletonBg,
                                borderRadius: spacing.xs,
                                height: "16px",
                                width: "120px",
                            } }), props.metadata.description && (_jsx("div", { style: {
                                backgroundColor: theme.colors.skeletonBg,
                                borderRadius: spacing.xs,
                                height: "12px",
                                width: "80px",
                            } }))] }), _jsx(Container, { center: "y", flex: "column", gap: "3xs", style: { alignItems: "flex-end" }, children: _jsx("div", { style: {
                            backgroundColor: theme.colors.skeletonBg,
                            borderRadius: spacing.sm,
                            height: "24px",
                            width: "100px",
                        } }) })] }));
    }
    return (_jsxs(Container, { center: "y", flex: "row", gap: "sm", p: "md", style: { justifyContent: "space-between" }, children: [_jsxs(Container, { center: "y", flex: "column", gap: "3xs", style: { flex: 1 }, children: [_jsx(Text, { color: "primaryText", size: "sm", weight: 500, children: props.metadata.title || "Transaction" }), props.metadata.description && (_jsx(Text, { color: "secondaryText", size: "xs", children: props.metadata.description }))] }), _jsx(Container, { center: "y", flex: "column", gap: "3xs", style: { alignItems: "flex-end" }, children: _jsx(Text, { color: "secondaryText", size: "xs", style: {
                        backgroundColor: theme.colors.secondaryButtonBg,
                        borderRadius: spacing.sm,
                        fontFamily: "monospace",
                        padding: `${spacing.xs} ${spacing.sm}`,
                        textAlign: "right",
                    }, children: txInfo.data.functionInfo.functionName }) })] }));
};
//# sourceMappingURL=PaymentOverview.js.map