"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentReceipt = PaymentReceipt;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_query_1 = require("@tanstack/react-query");
const utils_js_1 = require("../../../../../chains/utils.js");
const address_js_1 = require("../../../../../utils/address.js");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const formatTokenBalance_js_1 = require("../../ConnectWallet/screens/formatTokenBalance.js");
const basic_js_1 = require("../../components/basic.js");
const ChainName_js_1 = require("../../components/ChainName.js");
const CopyIcon_js_1 = require("../../components/CopyIcon.js");
const Skeleton_js_1 = require("../../components/Skeleton.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const text_js_1 = require("../../components/text.js");
function getPaymentId(preparedQuote, status) {
    if (preparedQuote.type === "onramp") {
        return preparedQuote.id;
    }
    return status.transactions[status.transactions.length - 1]?.transactionHash;
}
/**
 * Hook to fetch transaction info for a completed status
 */
function useTransactionInfo(status, preparedQuote) {
    return (0, react_query_1.useQuery)({
        enabled: true,
        queryFn: async () => {
            const isOnramp = status.type === "onramp";
            if (isOnramp && preparedQuote.type === "onramp") {
                // For onramp, create a display ID since OnrampStatus doesn't have paymentId
                return {
                    amountPaid: `${preparedQuote.currencyAmount} ${preparedQuote.currency}`,
                    amountReceived: `${(0, formatTokenBalance_js_1.formatTokenAmount)(preparedQuote.destinationAmount, preparedQuote.destinationToken.decimals)} ${preparedQuote.destinationToken.symbol}`,
                    chain: await (0, utils_js_1.getChainMetadata)((0, utils_js_1.defineChain)(preparedQuote.destinationToken.chainId)),
                    destinationToken: preparedQuote.destinationToken,
                    id: preparedQuote.id,
                    label: "Onramp Payment",
                    type: "paymentId",
                };
            }
            else if (status.type === "buy" ||
                status.type === "sell" ||
                status.type === "transfer") {
                if (status.transactions.length > 0) {
                    // get the last transaction hash
                    const tx = status.transactions[status.transactions.length - 1];
                    if (tx) {
                        const [destinationChain, originChain] = await Promise.all([
                            (0, utils_js_1.getChainMetadata)((0, utils_js_1.getCachedChain)(status.destinationToken.chainId)),
                            (0, utils_js_1.getChainMetadata)((0, utils_js_1.getCachedChain)(status.originToken.chainId)),
                        ]);
                        return {
                            amountPaid: `${(0, formatTokenBalance_js_1.formatTokenAmount)(status.originAmount, status.originToken.decimals)} ${status.originToken.symbol}`,
                            amountReceived: `${(0, formatTokenBalance_js_1.formatTokenAmount)(status.destinationAmount, status.destinationToken.decimals)} ${status.destinationToken.symbol}`,
                            chain: destinationChain,
                            destinationChain,
                            destinationToken: status.destinationToken,
                            id: tx.transactionHash,
                            label: "Transaction",
                            originChain,
                            originToken: status.originToken,
                            type: "transactionHash",
                        };
                    }
                }
            }
            return null;
        },
        queryKey: [
            "transaction-info",
            status.type,
            getPaymentId(preparedQuote, status),
        ],
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}
/**
 * Component to display details for a completed transaction step
 */
function CompletedStepDetailCard({ status, preparedQuote, }) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    const { data: txInfo, isPending } = useTransactionInfo(status, preparedQuote);
    if (isPending) {
        return (0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: "200px", style: { borderRadius: index_js_1.radius.lg } });
    }
    if (!txInfo) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "sm", style: {
            backgroundColor: theme.colors.tertiaryBg,
            border: `1px solid ${theme.colors.borderColor}`,
            borderRadius: index_js_1.radius.lg,
            padding: index_js_1.spacing.md,
        }, children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "sm", py: "4xs", style: {
                    alignItems: "center",
                    justifyContent: "space-between",
                }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", weight: 500, children: txInfo.label }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { style: {
                            backgroundColor: theme.colors.modalBg,
                            borderRadius: index_js_1.radius.full,
                            border: `1px solid ${theme.colors.borderColor}`,
                            padding: `${index_js_1.spacing["3xs"]} ${index_js_1.spacing.xs}`,
                        }, children: (0, jsx_runtime_1.jsx)(text_js_1.Text, { style: {
                                color: theme.colors.success,
                                fontSize: 10,
                                letterSpacing: "0.025em",
                            }, children: "COMPLETED" }) })] }), (0, jsx_runtime_1.jsx)(basic_js_1.Line, {}), txInfo.amountPaid && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", style: { justifyContent: "space-between" }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", children: "Amount Paid" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", children: txInfo.amountPaid })] })), txInfo.amountReceived && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", style: { justifyContent: "space-between" }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", children: "Amount Received" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", children: txInfo.amountReceived })] })), txInfo.originChain && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", style: { justifyContent: "space-between" }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", children: "Origin Chain" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", children: (0, ChainName_js_1.shorterChainName)(txInfo.originChain.name) })] })), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", style: { justifyContent: "space-between" }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", children: "Destination Chain" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", children: (0, ChainName_js_1.shorterChainName)(txInfo.chain.name) })] }), txInfo.type === "paymentId" && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", style: { justifyContent: "space-between" }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", children: "Payment ID" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "3xs", center: "y", children: [(0, jsx_runtime_1.jsx)(CopyIcon_js_1.CopyIcon, { text: txInfo.id, iconSize: 12, tip: "Copy Payment ID" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", weight: 400, size: "sm", children: (0, address_js_1.shortenHex)(txInfo.id) })] })] })), status.transactions.map((tx) => {
                const explorerLink = `https://thirdweb.com/${tx.chainId}/tx/${tx.transactionHash}`;
                return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", style: { justifyContent: "space-between" }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", children: "Transaction Hash" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "3xs", center: "y", children: [(0, jsx_runtime_1.jsx)(CopyIcon_js_1.CopyIcon, { text: tx.transactionHash, iconSize: 12, tip: "Copy Transaction Hash" }), (0, jsx_runtime_1.jsx)(text_js_1.Link, { href: explorerLink, target: "_blank", rel: "noreferrer", color: "primaryText", hoverColor: "accentText", weight: 400, size: "sm", children: (0, address_js_1.shortenHex)(tx.transactionHash) })] })] }, tx.transactionHash));
            })] }, txInfo.id));
}
function PaymentReceipt({ preparedQuote, completedStatuses, onBack, windowAdapter, }) {
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", fullHeight: true, px: "md", children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md+" }), (0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: onBack, title: "Payment Receipt" }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md+" }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", gap: "lg", scrollY: true, style: { maxHeight: "500px", minHeight: "400px" }, children: (0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", gap: "sm", children: completedStatuses.map((status, index) => ((0, jsx_runtime_1.jsx)(CompletedStepDetailCard, { preparedQuote: preparedQuote, status: status, windowAdapter: windowAdapter }, `${status.type}-${index}`))) }) }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md+" })] }));
}
//# sourceMappingURL=PaymentReceipt.js.map