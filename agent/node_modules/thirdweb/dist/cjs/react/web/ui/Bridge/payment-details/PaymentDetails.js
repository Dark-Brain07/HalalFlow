"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentDetails = PaymentDetails;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const utils_js_1 = require("../../../../../chains/utils.js");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const useChainQuery_js_1 = require("../../../../core/hooks/others/useChainQuery.js");
const formatTokenBalance_js_1 = require("../../ConnectWallet/screens/formatTokenBalance.js");
const basic_js_1 = require("../../components/basic.js");
const buttons_js_1 = require("../../components/buttons.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const text_js_1 = require("../../components/text.js");
const PaymentOverview_js_1 = require("./PaymentOverview.js");
function PaymentDetails({ metadata, confirmButtonLabel, client, paymentMethod, preparedQuote, onConfirm, onBack, onError, currency, modeInfo, }) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    const handleConfirm = () => {
        try {
            onConfirm();
        }
        catch (error) {
            onError(error);
        }
    };
    const chainsQuery = (0, useChainQuery_js_1.useChainsQuery)(preparedQuote.steps.flatMap((s) => [
        (0, utils_js_1.defineChain)(s.originToken.chainId),
        (0, utils_js_1.defineChain)(s.destinationToken.chainId),
    ]), 10);
    const chainsMetadata = (0, react_1.useMemo)(() => chainsQuery.map((c) => c.data), [chainsQuery]).filter((c) => !!c);
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
                    destinationAmount: (0, formatTokenBalance_js_1.formatTokenAmount)(preparedQuote.destinationAmount, token.decimals),
                    destinationToken: token,
                    estimatedTime: preparedQuote.estimatedExecutionTimeMs,
                    originAmount: (0, formatTokenBalance_js_1.formatTokenAmount)(preparedQuote.originAmount, token.decimals),
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
                    destinationAmount: (0, formatTokenBalance_js_1.formatTokenAmount)(preparedQuote.destinationAmount, preparedQuote.steps[preparedQuote.steps.length - 1]
                        ?.destinationToken?.decimals ?? 18),
                    destinationToken: preparedQuote.steps[preparedQuote.steps.length - 1]
                        ?.destinationToken,
                    estimatedTime: preparedQuote.estimatedExecutionTimeMs,
                    originAmount: (0, formatTokenBalance_js_1.formatTokenAmount)(preparedQuote.originAmount, method.originToken.decimals),
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
                    destinationAmount: (0, formatTokenBalance_js_1.formatTokenAmount)(preparedQuote.destinationAmount, preparedQuote.steps[preparedQuote.steps.length - 1]
                        ?.destinationToken?.decimals ?? 18),
                    destinationToken: preparedQuote.steps[preparedQuote.steps.length - 1]
                        ?.destinationToken,
                    estimatedTime: preparedQuote.estimatedExecutionTimeMs,
                    originAmount: (0, formatTokenBalance_js_1.formatTokenAmount)(preparedQuote.originAmount, method.originToken.decimals),
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
                    destinationAmount: (0, formatTokenBalance_js_1.formatTokenAmount)(preparedQuote.destinationAmount, preparedQuote.destinationToken.decimals), // Onramp starts with fiat
                    destinationToken: preparedQuote.destinationToken,
                    estimatedTime: undefined,
                    originAmount: (0, formatTokenBalance_js_1.formatCurrencyAmount)(method.currency, Number(preparedQuote.currencyAmount)),
                    originToken: undefined,
                };
            }
            default: {
                throw new Error(`Unsupported bridge prepare type: ${preparedQuote.type}`);
            }
        }
    };
    const displayData = getDisplayData();
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", fullHeight: true, px: "md", pb: "md", pt: "md+", children: [(0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: onBack, title: metadata.title || "Payment Details" }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", children: [displayData.destinationToken && ((0, jsx_runtime_1.jsx)(PaymentOverview_js_1.PaymentOverview, { currency: currency, metadata: metadata, modeInfo: modeInfo, client: client, fromAmount: displayData.originAmount, paymentMethod: paymentMethod, receiver: preparedQuote.intent.receiver, sender: preparedQuote.intent.sender ||
                                    paymentMethod.payerWallet?.getAccount()?.address, toAmount: displayData.destinationAmount, toToken: displayData.destinationToken })), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "sm", children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "xs", style: { flex: 1, justifyContent: "center" }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", children: "Estimated Time" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", children: displayData.estimatedTime
                                                    ? `~${Math.ceil(displayData.estimatedTime / 60000)} min`
                                                    : "~2 min" })] }), preparedQuote.steps.length > 1 ? ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "xs", style: { flex: 1, justifyContent: "center" }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", children: "Route Length" }), (0, jsx_runtime_1.jsxs)(text_js_1.Text, { color: "primaryText", size: "sm", children: [preparedQuote.steps.length, " step", preparedQuote.steps.length !== 1 ? "s" : ""] })] })) : null] })] }), preparedQuote.steps.length > 1 && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "sm" }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", gap: "md+", style: {
                                    backgroundColor: theme.colors.tertiaryBg,
                                    border: `1px solid ${theme.colors.borderColor}`,
                                    borderRadius: index_js_1.radius.xl,
                                    padding: `${index_js_1.spacing.md} ${index_js_1.spacing.md}`,
                                }, children: preparedQuote.steps.map((step, stepIndex) => ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", gap: "sm", children: (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "sm", style: { alignItems: "center" }, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "both", flex: "row", style: {
                                                    backgroundColor: theme.colors.modalBg,
                                                    border: `1px solid ${theme.colors.borderColor}`,
                                                    borderRadius: index_js_1.radius.full,
                                                    color: theme.colors.secondaryText,
                                                    flexShrink: 0,
                                                    fontWeight: "bold",
                                                    height: `${index_js_1.iconSize.lg}px`,
                                                    width: `${index_js_1.iconSize.lg}px`,
                                                }, children: (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", children: stepIndex + 1 }) }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "y", flex: "row", gap: "sm", style: { flex: 1 }, children: (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "3xs", style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", weight: 500, children: step.destinationToken.chainId !==
                                                                step.originToken.chainId ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Bridge", " ", step.originToken.symbol ===
                                                                        step.destinationToken.symbol
                                                                        ? step.originToken.symbol
                                                                        : `${step.originToken.symbol} to ${step.destinationToken.symbol}`] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Swap ", step.originToken.symbol, " to", " ", step.destinationToken.symbol] })) }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "xs", children: step.originToken.chainId !==
                                                                step.destinationToken.chainId ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [chainsMetadata.find((c) => c.chainId === step.originToken.chainId)?.name, " ", "to", " ", chainsMetadata.find((c) => c.chainId === step.destinationToken.chainId)?.name] })) : (chainsMetadata.find((c) => c.chainId === step.originToken.chainId)?.name) })] }) })] }) }, `step-${stepIndex}-${step.originToken.address}-${step.destinationToken.address}`))) })] })), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", gap: "sm", children: (0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, onClick: handleConfirm, variant: "primary", style: { borderRadius: index_js_1.radius.full }, children: confirmButtonLabel || "Confirm Payment" }) })] })] }));
}
//# sourceMappingURL=PaymentDetails.js.map