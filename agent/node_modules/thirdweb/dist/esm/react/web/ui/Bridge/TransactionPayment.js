"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { NATIVE_TOKEN_ADDRESS } from "../../../../constants/addresses.js";
import { getAddress, shortenAddress, } from "../../../../utils/address.js";
import { resolvePromisedValue } from "../../../../utils/promise/resolve-promised-value.js";
import { getDefaultWalletsForBridgeComponents } from "../../../../wallets/defaultWallets.js";
import { getWalletBalance } from "../../../../wallets/utils/getWalletBalance.js";
import { useCustomTheme } from "../../../core/design-system/CustomThemeProvider.js";
import { fontSize, radius, spacing, } from "../../../core/design-system/index.js";
import { useChainMetadata } from "../../../core/hooks/others/useChainQuery.js";
import { useTransactionDetails } from "../../../core/hooks/useTransactionDetails.js";
import { useActiveAccount } from "../../../core/hooks/wallets/useActiveAccount.js";
import { useActiveWallet } from "../../../core/hooks/wallets/useActiveWallet.js";
import { ConnectButton } from "../ConnectWallet/ConnectButton.js";
import { PoweredByThirdweb } from "../ConnectWallet/PoweredByTW.js";
import { formatCurrencyAmount } from "../ConnectWallet/screens/formatTokenBalance.js";
import { Container, Line } from "../components/basic.js";
import { Button } from "../components/buttons.js";
import { ChainName } from "../components/ChainName.js";
import { Skeleton } from "../components/Skeleton.js";
import { Spacer } from "../components/Spacer.js";
import { Spinner } from "../components/Spinner.js";
import { Text } from "../components/text.js";
import { ChainIcon } from "./common/TokenAndChain.js";
import { WithHeader } from "./common/WithHeader.js";
export function TransactionPayment({ transaction, client, onContinue, onExecuteTransaction, connectOptions, currency, showThirdwebBranding = true, buttonLabel: _buttonLabel, metadata, }) {
    const theme = useCustomTheme();
    const activeAccount = useActiveAccount();
    const wallet = useActiveWallet();
    // Get chain metadata for native currency symbol
    const chainMetadata = useChainMetadata(transaction.chain);
    // Use the extracted hook for transaction details
    const transactionDataQuery = useTransactionDetails({
        client,
        transaction: transaction,
        wallet,
    });
    // We can't use useWalletBalance here because erc20Value is a possibly async value
    const { data: userBalance } = useQuery({
        enabled: !!activeAccount?.address,
        queryFn: async () => {
            if (!activeAccount?.address) {
                return "0";
            }
            const erc20Value = await resolvePromisedValue(transaction.erc20Value);
            const walletBalance = await getWalletBalance({
                address: activeAccount?.address,
                chain: transaction.chain,
                tokenAddress: erc20Value?.tokenAddress.toLowerCase() !== NATIVE_TOKEN_ADDRESS
                    ? erc20Value?.tokenAddress
                    : undefined,
                client,
            });
            return walletBalance.displayValue;
        },
        queryKey: ["user-balance", activeAccount?.address],
    });
    const contractName = transactionDataQuery.data?.contractMetadata?.name || "Unknown Contract";
    const functionName = transactionDataQuery.data?.functionInfo?.functionName || "Contract Call";
    const isLoading = transactionDataQuery.isLoading || chainMetadata.isLoading;
    const buttonLabel = _buttonLabel || `Execute ${functionName}`;
    const tokenFiatPricePerToken = transactionDataQuery.data?.tokenInfo?.prices[currency] || undefined;
    const totalFiatCost = tokenFiatPricePerToken && transactionDataQuery.data
        ? tokenFiatPricePerToken * Number(transactionDataQuery.data.totalCost)
        : undefined;
    const costToDisplay = totalFiatCost !== undefined
        ? formatCurrencyAmount(currency, totalFiatCost)
        : transactionDataQuery.data?.txCostDisplay;
    if (isLoading) {
        return (_jsxs(WithHeader, { client: client, title: metadata.title || "Transaction", description: metadata.description, image: metadata.image, children: [_jsx(SkeletonHeader, { theme: theme }), _jsx(Spacer, { y: "md" }), _jsx(Line, { dashed: true }), _jsx(Spacer, { y: "lg" }), _jsxs(Container, { flex: "column", gap: "sm", children: [_jsx(SkeletonRow, { valueWidth: "110px", labelWidth: "60px" }), _jsx(SkeletonRow, { valueWidth: "40%", labelWidth: "90px" }), _jsx(SkeletonRow, { valueWidth: "50%", labelWidth: "60px" }), _jsx(SkeletonRow, { valueWidth: "45%", labelWidth: "90px" })] }), _jsx(Spacer, { y: "lg" }), _jsx(Line, { dashed: true }), _jsx(Spacer, { y: "lg" }), _jsxs(Button, { fullWidth: true, variant: "primary", gap: "xs", disabled: true, style: { borderRadius: radius.full, fontSize: fontSize.md }, children: [_jsx(Spinner, { size: "sm" }), " Loading"] }), showThirdwebBranding ? (_jsxs("div", { children: [_jsx(Spacer, { y: "md" }), _jsx(PoweredByThirdweb, {}), _jsx(Spacer, { y: "md" })] })) : null] }));
    }
    return (_jsxs(WithHeader, { client: client, title: metadata.title || "Transaction", description: metadata.description, image: metadata.image, children: [_jsxs(Container, { center: "y", flex: "row", gap: "3xs", style: {
                    justifyContent: "space-between",
                }, children: [_jsx(Text, { color: "primaryText", size: "xl", weight: 500, children: costToDisplay }), _jsx(Text, { color: "secondaryText", size: "sm", style: {
                            backgroundColor: theme.colors.tertiaryBg,
                            borderRadius: spacing.sm,
                            fontFamily: "monospace",
                            padding: `${spacing.xs} ${spacing.sm}`,
                            textAlign: "right",
                        }, children: functionName })] }), _jsx(Spacer, { y: "md" }), _jsx(Line, { dashed: true }), _jsx(Spacer, { y: "lg" }), _jsxs(Container, { flex: "column", gap: "sm", children: [contractName !== "UnknownContract" &&
                        contractName !== undefined &&
                        contractName !== "Unknown Contract" && (_jsxs(Container, { flex: "row", style: {
                            alignItems: "center",
                            justifyContent: "space-between",
                        }, children: [_jsx(Text, { color: "secondaryText", size: "sm", children: "Contract" }), _jsx(Text, { color: "primaryText", size: "sm", children: contractName })] })), _jsxs(Container, { flex: "row", style: {
                            alignItems: "center",
                            justifyContent: "space-between",
                        }, children: [_jsx(Text, { color: "secondaryText", size: "sm", children: "Address" }), _jsx("a", { href: `https://thirdweb.com/${transaction.chain.id}/${transaction.to}`, rel: "noopener noreferrer", style: {
                                    color: theme.colors.accentText,
                                    fontFamily: "monospace",
                                    fontSize: fontSize.sm,
                                    textDecoration: "none",
                                }, target: "_blank", children: shortenAddress(transaction.to) })] }), _jsxs(Container, { flex: "row", style: {
                            alignItems: "center",
                            justifyContent: "space-between",
                        }, children: [_jsx(Text, { color: "secondaryText", size: "sm", children: "Network" }), _jsxs(Container, { center: "y", flex: "row", gap: "3xs", children: [_jsx(ChainIcon, { chain: transaction.chain, client: client, size: "xs" }), _jsx(ChainName, { chain: transaction.chain, client: client, color: "primaryText", short: true, size: "sm", style: {
                                            fontFamily: "monospace",
                                        } })] })] }), transactionDataQuery.data?.txCostDisplay && (_jsxs(Container, { flex: "row", style: {
                            alignItems: "center",
                            justifyContent: "space-between",
                        }, children: [_jsx(Text, { color: "secondaryText", size: "sm", children: "Cost" }), _jsx(Text, { color: "primaryText", size: "sm", style: {
                                    fontFamily: "monospace",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    maxWidth: "60%",
                                }, children: transactionDataQuery.data?.txCostDisplay })] })), transactionDataQuery.data?.gasCostDisplay && (_jsxs(Container, { flex: "row", style: {
                            alignItems: "center",
                            justifyContent: "space-between",
                        }, children: [_jsx(Text, { color: "secondaryText", size: "sm", children: "Network fees" }), _jsx(Text, { color: "primaryText", size: "sm", style: {
                                    fontFamily: "monospace",
                                }, children: transactionDataQuery.data?.gasCostDisplay })] }))] }), _jsx(Spacer, { y: "lg" }), _jsx(Line, { dashed: true }), _jsx(Spacer, { y: "lg" }), activeAccount ? (_jsx(Button, { fullWidth: true, onClick: () => {
                    if (transactionDataQuery.data?.tokenInfo) {
                        if (userBalance &&
                            Number(userBalance) <
                                Number(transactionDataQuery.data.totalCost)) {
                            // if user has funds, but not enough, we need to fund the wallet with the difference
                            onContinue((Number(transactionDataQuery.data.totalCost) -
                                Number(userBalance)).toString(), transactionDataQuery.data.tokenInfo, getAddress(activeAccount.address));
                            return;
                        }
                        // If the user has enough to pay, skip the payment step altogether
                        if (userBalance &&
                            Number(userBalance) >=
                                Number(transactionDataQuery.data.totalCost)) {
                            onExecuteTransaction();
                            return;
                        }
                        // otherwise, use the full transaction cost
                        onContinue(transactionDataQuery.data.totalCost, transactionDataQuery.data.tokenInfo, getAddress(activeAccount.address));
                    }
                    else {
                        // if token not supported, can't go into buy flow, so skip to execute transaction
                        onExecuteTransaction();
                    }
                }, style: {
                    fontSize: fontSize.md,
                    borderRadius: radius.full,
                }, variant: "primary", children: buttonLabel })) : (_jsx(ConnectButton, { client: client, connectButton: {
                    label: buttonLabel,
                    style: {
                        borderRadius: radius.full,
                    },
                }, theme: theme, ...connectOptions, wallets: connectOptions?.wallets ||
                    getDefaultWalletsForBridgeComponents({
                        appMetadata: connectOptions?.appMetadata,
                        chains: connectOptions?.chains,
                    }) })), showThirdwebBranding ? (_jsxs("div", { children: [_jsx(Spacer, { y: "md" }), _jsx(PoweredByThirdweb, {})] })) : null, _jsx(Spacer, { y: "md" })] }));
}
const SkeletonHeader = (_props) => (_jsxs(Container, { center: "y", flex: "row", gap: "sm", style: {
        justifyContent: "space-between",
    }, children: [_jsx(Skeleton, { height: "32px", width: "60px", style: { borderRadius: radius.full } }), _jsx(Skeleton, { height: "32px", width: "180px", style: { borderRadius: radius.full } })] }));
function SkeletonRow(props) {
    return (_jsxs(Container, { flex: "row", style: {
            alignItems: "center",
            justifyContent: "space-between",
        }, children: [_jsx(Skeleton, { height: "16px", width: props.labelWidth }), _jsx(Skeleton, { height: "16px", width: props.valueWidth })] }));
}
//# sourceMappingURL=TransactionPayment.js.map