"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { defineChain, getCachedChain, getChainMetadata, } from "../../../../../chains/utils.js";
import { shortenHex } from "../../../../../utils/address.js";
import { useCustomTheme } from "../../../../core/design-system/CustomThemeProvider.js";
import { radius, spacing } from "../../../../core/design-system/index.js";
import { formatTokenAmount } from "../../ConnectWallet/screens/formatTokenBalance.js";
import { Container, Line, ModalHeader } from "../../components/basic.js";
import { shorterChainName } from "../../components/ChainName.js";
import { CopyIcon } from "../../components/CopyIcon.js";
import { Skeleton } from "../../components/Skeleton.js";
import { Spacer } from "../../components/Spacer.js";
import { Link, Text } from "../../components/text.js";
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
    return useQuery({
        enabled: true,
        queryFn: async () => {
            const isOnramp = status.type === "onramp";
            if (isOnramp && preparedQuote.type === "onramp") {
                // For onramp, create a display ID since OnrampStatus doesn't have paymentId
                return {
                    amountPaid: `${preparedQuote.currencyAmount} ${preparedQuote.currency}`,
                    amountReceived: `${formatTokenAmount(preparedQuote.destinationAmount, preparedQuote.destinationToken.decimals)} ${preparedQuote.destinationToken.symbol}`,
                    chain: await getChainMetadata(defineChain(preparedQuote.destinationToken.chainId)),
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
                            getChainMetadata(getCachedChain(status.destinationToken.chainId)),
                            getChainMetadata(getCachedChain(status.originToken.chainId)),
                        ]);
                        return {
                            amountPaid: `${formatTokenAmount(status.originAmount, status.originToken.decimals)} ${status.originToken.symbol}`,
                            amountReceived: `${formatTokenAmount(status.destinationAmount, status.destinationToken.decimals)} ${status.destinationToken.symbol}`,
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
    const theme = useCustomTheme();
    const { data: txInfo, isPending } = useTransactionInfo(status, preparedQuote);
    if (isPending) {
        return _jsx(Skeleton, { height: "200px", style: { borderRadius: radius.lg } });
    }
    if (!txInfo) {
        return null;
    }
    return (_jsxs(Container, { flex: "column", gap: "sm", style: {
            backgroundColor: theme.colors.tertiaryBg,
            border: `1px solid ${theme.colors.borderColor}`,
            borderRadius: radius.lg,
            padding: spacing.md,
        }, children: [_jsxs(Container, { flex: "row", gap: "sm", py: "4xs", style: {
                    alignItems: "center",
                    justifyContent: "space-between",
                }, children: [_jsx(Text, { color: "primaryText", size: "sm", weight: 500, children: txInfo.label }), _jsx(Container, { style: {
                            backgroundColor: theme.colors.modalBg,
                            borderRadius: radius.full,
                            border: `1px solid ${theme.colors.borderColor}`,
                            padding: `${spacing["3xs"]} ${spacing.xs}`,
                        }, children: _jsx(Text, { style: {
                                color: theme.colors.success,
                                fontSize: 10,
                                letterSpacing: "0.025em",
                            }, children: "COMPLETED" }) })] }), _jsx(Line, {}), txInfo.amountPaid && (_jsxs(Container, { center: "y", flex: "row", style: { justifyContent: "space-between" }, children: [_jsx(Text, { color: "secondaryText", size: "sm", children: "Amount Paid" }), _jsx(Text, { color: "primaryText", size: "sm", children: txInfo.amountPaid })] })), txInfo.amountReceived && (_jsxs(Container, { center: "y", flex: "row", style: { justifyContent: "space-between" }, children: [_jsx(Text, { color: "secondaryText", size: "sm", children: "Amount Received" }), _jsx(Text, { color: "primaryText", size: "sm", children: txInfo.amountReceived })] })), txInfo.originChain && (_jsxs(Container, { center: "y", flex: "row", style: { justifyContent: "space-between" }, children: [_jsx(Text, { color: "secondaryText", size: "sm", children: "Origin Chain" }), _jsx(Text, { color: "primaryText", size: "sm", children: shorterChainName(txInfo.originChain.name) })] })), _jsxs(Container, { center: "y", flex: "row", style: { justifyContent: "space-between" }, children: [_jsx(Text, { color: "secondaryText", size: "sm", children: "Destination Chain" }), _jsx(Text, { color: "primaryText", size: "sm", children: shorterChainName(txInfo.chain.name) })] }), txInfo.type === "paymentId" && (_jsxs(Container, { center: "y", flex: "row", style: { justifyContent: "space-between" }, children: [_jsx(Text, { color: "secondaryText", size: "sm", children: "Payment ID" }), _jsxs(Container, { flex: "row", gap: "3xs", center: "y", children: [_jsx(CopyIcon, { text: txInfo.id, iconSize: 12, tip: "Copy Payment ID" }), _jsx(Text, { color: "primaryText", weight: 400, size: "sm", children: shortenHex(txInfo.id) })] })] })), status.transactions.map((tx) => {
                const explorerLink = `https://thirdweb.com/${tx.chainId}/tx/${tx.transactionHash}`;
                return (_jsxs(Container, { center: "y", flex: "row", style: { justifyContent: "space-between" }, children: [_jsx(Text, { color: "secondaryText", size: "sm", children: "Transaction Hash" }), _jsxs(Container, { flex: "row", gap: "3xs", center: "y", children: [_jsx(CopyIcon, { text: tx.transactionHash, iconSize: 12, tip: "Copy Transaction Hash" }), _jsx(Link, { href: explorerLink, target: "_blank", rel: "noreferrer", color: "primaryText", hoverColor: "accentText", weight: 400, size: "sm", children: shortenHex(tx.transactionHash) })] })] }, tx.transactionHash));
            })] }, txInfo.id));
}
export function PaymentReceipt({ preparedQuote, completedStatuses, onBack, windowAdapter, }) {
    return (_jsxs(Container, { flex: "column", fullHeight: true, px: "md", children: [_jsx(Spacer, { y: "md+" }), _jsx(ModalHeader, { onBack: onBack, title: "Payment Receipt" }), _jsx(Spacer, { y: "md+" }), _jsx(Container, { flex: "column", gap: "lg", scrollY: true, style: { maxHeight: "500px", minHeight: "400px" }, children: _jsx(Container, { flex: "column", gap: "sm", children: completedStatuses.map((status, index) => (_jsx(CompletedStepDetailCard, { preparedQuote: preparedQuote, status: status, windowAdapter: windowAdapter }, `${status.type}-${index}`))) }) }), _jsx(Spacer, { y: "md+" })] }));
}
//# sourceMappingURL=PaymentReceipt.js.map