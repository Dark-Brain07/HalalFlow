"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo } from "react";
import { defineChain } from "../../../../../chains/utils.js";
import { useCustomTheme } from "../../../../core/design-system/CustomThemeProvider.js";
import { iconSize, radius, spacing, } from "../../../../core/design-system/index.js";
import { useChainsQuery } from "../../../../core/hooks/others/useChainQuery.js";
import { formatCurrencyAmount, formatTokenAmount, } from "../../ConnectWallet/screens/formatTokenBalance.js";
import { Container, ModalHeader } from "../../components/basic.js";
import { Button } from "../../components/buttons.js";
import { Spacer } from "../../components/Spacer.js";
import { Text } from "../../components/text.js";
import { PaymentOverview } from "./PaymentOverview.js";
export function PaymentDetails({ metadata, confirmButtonLabel, client, paymentMethod, preparedQuote, onConfirm, onBack, onError, currency, modeInfo, }) {
    const theme = useCustomTheme();
    const handleConfirm = () => {
        try {
            onConfirm();
        }
        catch (error) {
            onError(error);
        }
    };
    const chainsQuery = useChainsQuery(preparedQuote.steps.flatMap((s) => [
        defineChain(s.originToken.chainId),
        defineChain(s.destinationToken.chainId),
    ]), 10);
    const chainsMetadata = useMemo(() => chainsQuery.map((c) => c.data), [chainsQuery]).filter((c) => !!c);
    // Extract common data based on quote type
    const getDisplayData = () => {
        switch (preparedQuote.type) {
            case "transfer": {
                const token = paymentMethod.type === "wallet"
                    ? paymentMethod.originToken
                    : undefined;
                if (!token) {
                    // can never happen
                    onError(new Error("Invalid payment method"));
                    return {
                        destinationAmount: "0",
                        destinationToken: undefined,
                        estimatedTime: 0,
                        originAmount: "0",
                        originToken: undefined,
                    };
                }
                return {
                    destinationAmount: formatTokenAmount(preparedQuote.destinationAmount, token.decimals),
                    destinationToken: token,
                    estimatedTime: preparedQuote.estimatedExecutionTimeMs,
                    originAmount: formatTokenAmount(preparedQuote.originAmount, token.decimals),
                    originToken: token,
                };
            }
            case "buy": {
                const method = paymentMethod.type === "wallet" ? paymentMethod : undefined;
                if (!method) {
                    // can never happen
                    onError(new Error("Invalid payment method"));
                    return {
                        destinationAmount: "0",
                        destinationToken: undefined,
                        estimatedTime: 0,
                        originAmount: "0",
                        originToken: undefined,
                    };
                }
                return {
                    destinationAmount: formatTokenAmount(preparedQuote.destinationAmount, preparedQuote.steps[preparedQuote.steps.length - 1]
                        ?.destinationToken?.decimals ?? 18),
                    destinationToken: preparedQuote.steps[preparedQuote.steps.length - 1]
                        ?.destinationToken,
                    estimatedTime: preparedQuote.estimatedExecutionTimeMs,
                    originAmount: formatTokenAmount(preparedQuote.originAmount, method.originToken.decimals),
                    originToken: paymentMethod.type === "wallet"
                        ? paymentMethod.originToken
                        : undefined,
                };
            }
            case "sell": {
                const method = paymentMethod.type === "wallet" ? paymentMethod : undefined;
                if (!method) {
                    // can never happen
                    onError(new Error("Invalid payment method"));
                    return {
                        destinationAmount: "0",
                        destinationToken: undefined,
                        estimatedTime: 0,
                        originAmount: "0",
                        originToken: undefined,
                    };
                }
                return {
                    destinationAmount: formatTokenAmount(preparedQuote.destinationAmount, preparedQuote.steps[preparedQuote.steps.length - 1]
                        ?.destinationToken?.decimals ?? 18),
                    destinationToken: preparedQuote.steps[preparedQuote.steps.length - 1]
                        ?.destinationToken,
                    estimatedTime: preparedQuote.estimatedExecutionTimeMs,
                    originAmount: formatTokenAmount(preparedQuote.originAmount, method.originToken.decimals),
                    originToken: paymentMethod.type === "wallet"
                        ? paymentMethod.originToken
                        : undefined,
                };
            }
            case "onramp": {
                const method = paymentMethod.type === "fiat" ? paymentMethod : undefined;
                if (!method) {
                    // can never happen
                    onError(new Error("Invalid payment method"));
                    return {
                        destinationAmount: "0",
                        destinationToken: undefined,
                        estimatedTime: 0,
                        originAmount: "0",
                        originToken: undefined,
                    };
                }
                return {
                    destinationAmount: formatTokenAmount(preparedQuote.destinationAmount, preparedQuote.destinationToken.decimals), // Onramp starts with fiat
                    destinationToken: preparedQuote.destinationToken,
                    estimatedTime: undefined,
                    originAmount: formatCurrencyAmount(method.currency, Number(preparedQuote.currencyAmount)),
                    originToken: undefined,
                };
            }
            default: {
                throw new Error(`Unsupported bridge prepare type: ${preparedQuote.type}`);
            }
        }
    };
    const displayData = getDisplayData();
    return (_jsxs(Container, { flex: "column", fullHeight: true, px: "md", pb: "md", pt: "md+", children: [_jsx(ModalHeader, { onBack: onBack, title: metadata.title || "Payment Details" }), _jsx(Spacer, { y: "lg" }), _jsxs(Container, { flex: "column", children: [_jsxs(Container, { flex: "column", children: [displayData.destinationToken && (_jsx(PaymentOverview, { currency: currency, metadata: metadata, modeInfo: modeInfo, client: client, fromAmount: displayData.originAmount, paymentMethod: paymentMethod, receiver: preparedQuote.intent.receiver, sender: preparedQuote.intent.sender ||
                                    paymentMethod.payerWallet?.getAccount()?.address, toAmount: displayData.destinationAmount, toToken: displayData.destinationToken })), _jsx(Spacer, { y: "md" }), _jsxs(Container, { flex: "row", gap: "sm", children: [_jsxs(Container, { flex: "row", gap: "xs", style: { flex: 1, justifyContent: "center" }, children: [_jsx(Text, { color: "secondaryText", size: "sm", children: "Estimated Time" }), _jsx(Text, { color: "primaryText", size: "sm", children: displayData.estimatedTime
                                                    ? `~${Math.ceil(displayData.estimatedTime / 60000)} min`
                                                    : "~2 min" })] }), preparedQuote.steps.length > 1 ? (_jsxs(Container, { flex: "row", gap: "xs", style: { flex: 1, justifyContent: "center" }, children: [_jsx(Text, { color: "secondaryText", size: "sm", children: "Route Length" }), _jsxs(Text, { color: "primaryText", size: "sm", children: [preparedQuote.steps.length, " step", preparedQuote.steps.length !== 1 ? "s" : ""] })] })) : null] })] }), preparedQuote.steps.length > 1 && (_jsxs(Container, { flex: "column", children: [_jsx(Spacer, { y: "sm" }), _jsx(Container, { flex: "column", gap: "md+", style: {
                                    backgroundColor: theme.colors.tertiaryBg,
                                    border: `1px solid ${theme.colors.borderColor}`,
                                    borderRadius: radius.xl,
                                    padding: `${spacing.md} ${spacing.md}`,
                                }, children: preparedQuote.steps.map((step, stepIndex) => (_jsx(Container, { flex: "column", gap: "sm", children: _jsxs(Container, { flex: "row", gap: "sm", style: { alignItems: "center" }, children: [_jsx(Container, { center: "both", flex: "row", style: {
                                                    backgroundColor: theme.colors.modalBg,
                                                    border: `1px solid ${theme.colors.borderColor}`,
                                                    borderRadius: radius.full,
                                                    color: theme.colors.secondaryText,
                                                    flexShrink: 0,
                                                    fontWeight: "bold",
                                                    height: `${iconSize.lg}px`,
                                                    width: `${iconSize.lg}px`,
                                                }, children: _jsx(Text, { color: "secondaryText", size: "sm", children: stepIndex + 1 }) }), _jsx(Container, { center: "y", flex: "row", gap: "sm", style: { flex: 1 }, children: _jsxs(Container, { flex: "column", gap: "3xs", style: { flex: 1 }, children: [_jsx(Text, { color: "primaryText", size: "sm", weight: 500, children: step.destinationToken.chainId !==
                                                                step.originToken.chainId ? (_jsxs(_Fragment, { children: ["Bridge", " ", step.originToken.symbol ===
                                                                        step.destinationToken.symbol
                                                                        ? step.originToken.symbol
                                                                        : `${step.originToken.symbol} to ${step.destinationToken.symbol}`] })) : (_jsxs(_Fragment, { children: ["Swap ", step.originToken.symbol, " to", " ", step.destinationToken.symbol] })) }), _jsx(Text, { color: "secondaryText", size: "xs", children: step.originToken.chainId !==
                                                                step.destinationToken.chainId ? (_jsxs(_Fragment, { children: [chainsMetadata.find((c) => c.chainId === step.originToken.chainId)?.name, " ", "to", " ", chainsMetadata.find((c) => c.chainId === step.destinationToken.chainId)?.name] })) : (chainsMetadata.find((c) => c.chainId === step.originToken.chainId)?.name) })] }) })] }) }, `step-${stepIndex}-${step.originToken.address}-${step.destinationToken.address}`))) })] })), _jsx(Spacer, { y: "md" }), _jsx(Container, { flex: "column", gap: "sm", children: _jsx(Button, { fullWidth: true, onClick: handleConfirm, variant: "primary", style: { borderRadius: radius.full }, children: confirmButtonLabel || "Confirm Payment" }) })] })] }));
}
//# sourceMappingURL=PaymentDetails.js.map