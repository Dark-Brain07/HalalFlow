"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionPayment = TransactionPayment;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_query_1 = require("@tanstack/react-query");
const addresses_js_1 = require("../../../../constants/addresses.js");
const address_js_1 = require("../../../../utils/address.js");
const resolve_promised_value_js_1 = require("../../../../utils/promise/resolve-promised-value.js");
const defaultWallets_js_1 = require("../../../../wallets/defaultWallets.js");
const getWalletBalance_js_1 = require("../../../../wallets/utils/getWalletBalance.js");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const useChainQuery_js_1 = require("../../../core/hooks/others/useChainQuery.js");
const useTransactionDetails_js_1 = require("../../../core/hooks/useTransactionDetails.js");
const useActiveAccount_js_1 = require("../../../core/hooks/wallets/useActiveAccount.js");
const useActiveWallet_js_1 = require("../../../core/hooks/wallets/useActiveWallet.js");
const ConnectButton_js_1 = require("../ConnectWallet/ConnectButton.js");
const PoweredByTW_js_1 = require("../ConnectWallet/PoweredByTW.js");
const formatTokenBalance_js_1 = require("../ConnectWallet/screens/formatTokenBalance.js");
const basic_js_1 = require("../components/basic.js");
const buttons_js_1 = require("../components/buttons.js");
const ChainName_js_1 = require("../components/ChainName.js");
const Skeleton_js_1 = require("../components/Skeleton.js");
const Spacer_js_1 = require("../components/Spacer.js");
const Spinner_js_1 = require("../components/Spinner.js");
const text_js_1 = require("../components/text.js");
const TokenAndChain_js_1 = require("./common/TokenAndChain.js");
const WithHeader_js_1 = require("./common/WithHeader.js");
function TransactionPayment({ transaction, client, onContinue, onExecuteTransaction, connectOptions, currency, showThirdwebBranding = true, buttonLabel: _buttonLabel, metadata, }) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    const activeAccount = (0, useActiveAccount_js_1.useActiveAccount)();
    const wallet = (0, useActiveWallet_js_1.useActiveWallet)();
    // Get chain metadata for native currency symbol
    const chainMetadata = (0, useChainQuery_js_1.useChainMetadata)(transaction.chain);
    // Use the extracted hook for transaction details
    const transactionDataQuery = (0, useTransactionDetails_js_1.useTransactionDetails)({
        client,
        transaction: transaction,
        wallet,
    });
    // We can't use useWalletBalance here because erc20Value is a possibly async value
    const { data: userBalance } = (0, react_query_1.useQuery)({
        enabled: !!activeAccount?.address,
        queryFn: async () => {
            if (!activeAccount?.address) {
                return "0";
            }
            const erc20Value = await (0, resolve_promised_value_js_1.resolvePromisedValue)(transaction.erc20Value);
            const walletBalance = await (0, getWalletBalance_js_1.getWalletBalance)({
                address: activeAccount?.address,
                chain: transaction.chain,
                tokenAddress: erc20Value?.tokenAddress.toLowerCase() !== addresses_js_1.NATIVE_TOKEN_ADDRESS
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
        ? (0, formatTokenBalance_js_1.formatCurrencyAmount)(currency, totalFiatCost)
        : transactionDataQuery.data?.txCostDisplay;
    if (isLoading) {
        return ((0, jsx_runtime_1.jsxs)(WithHeader_js_1.WithHeader, { client: client, title: metadata.title || "Transaction", description: metadata.description, image: metadata.image, children: [(0, jsx_runtime_1.jsx)(SkeletonHeader, { theme: theme }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(basic_js_1.Line, { dashed: true }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "sm", children: [(0, jsx_runtime_1.jsx)(SkeletonRow, { valueWidth: "110px", labelWidth: "60px" }), (0, jsx_runtime_1.jsx)(SkeletonRow, { valueWidth: "40%", labelWidth: "90px" }), (0, jsx_runtime_1.jsx)(SkeletonRow, { valueWidth: "50%", labelWidth: "60px" }), (0, jsx_runtime_1.jsx)(SkeletonRow, { valueWidth: "45%", labelWidth: "90px" })] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsx)(basic_js_1.Line, { dashed: true }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsxs)(buttons_js_1.Button, { fullWidth: true, variant: "primary", gap: "xs", disabled: true, style: { borderRadius: index_js_1.radius.full, fontSize: index_js_1.fontSize.md }, children: [(0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { size: "sm" }), " Loading"] }), showThirdwebBranding ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(PoweredByTW_js_1.PoweredByThirdweb, {}), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" })] })) : null] }));
    }
    return ((0, jsx_runtime_1.jsxs)(WithHeader_js_1.WithHeader, { client: client, title: metadata.title || "Transaction", description: metadata.description, image: metadata.image, children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", gap: "3xs", style: {
                    justifyContent: "space-between",
                }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "xl", weight: 500, children: costToDisplay }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", style: {
                            backgroundColor: theme.colors.tertiaryBg,
                            borderRadius: index_js_1.spacing.sm,
                            fontFamily: "monospace",
                            padding: `${index_js_1.spacing.xs} ${index_js_1.spacing.sm}`,
                            textAlign: "right",
                        }, children: functionName })] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(basic_js_1.Line, { dashed: true }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "sm", children: [contractName !== "UnknownContract" &&
                        contractName !== undefined &&
                        contractName !== "Unknown Contract" && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", style: {
                            alignItems: "center",
                            justifyContent: "space-between",
                        }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", children: "Contract" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", children: contractName })] })), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", style: {
                            alignItems: "center",
                            justifyContent: "space-between",
                        }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", children: "Address" }), (0, jsx_runtime_1.jsx)("a", { href: `https://thirdweb.com/${transaction.chain.id}/${transaction.to}`, rel: "noopener noreferrer", style: {
                                    color: theme.colors.accentText,
                                    fontFamily: "monospace",
                                    fontSize: index_js_1.fontSize.sm,
                                    textDecoration: "none",
                                }, target: "_blank", children: (0, address_js_1.shortenAddress)(transaction.to) })] }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", style: {
                            alignItems: "center",
                            justifyContent: "space-between",
                        }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", children: "Network" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", gap: "3xs", children: [(0, jsx_runtime_1.jsx)(TokenAndChain_js_1.ChainIcon, { chain: transaction.chain, client: client, size: "xs" }), (0, jsx_runtime_1.jsx)(ChainName_js_1.ChainName, { chain: transaction.chain, client: client, color: "primaryText", short: true, size: "sm", style: {
                                            fontFamily: "monospace",
                                        } })] })] }), transactionDataQuery.data?.txCostDisplay && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", style: {
                            alignItems: "center",
                            justifyContent: "space-between",
                        }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", children: "Cost" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", style: {
                                    fontFamily: "monospace",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    maxWidth: "60%",
                                }, children: transactionDataQuery.data?.txCostDisplay })] })), transactionDataQuery.data?.gasCostDisplay && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", style: {
                            alignItems: "center",
                            justifyContent: "space-between",
                        }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", children: "Network fees" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", style: {
                                    fontFamily: "monospace",
                                }, children: transactionDataQuery.data?.gasCostDisplay })] }))] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsx)(basic_js_1.Line, { dashed: true }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), activeAccount ? ((0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, onClick: () => {
                    if (transactionDataQuery.data?.tokenInfo) {
                        if (userBalance &&
                            Number(userBalance) <
                                Number(transactionDataQuery.data.totalCost)) {
                            // if user has funds, but not enough, we need to fund the wallet with the difference
                            onContinue((Number(transactionDataQuery.data.totalCost) -
                                Number(userBalance)).toString(), transactionDataQuery.data.tokenInfo, (0, address_js_1.getAddress)(activeAccount.address));
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
                        onContinue(transactionDataQuery.data.totalCost, transactionDataQuery.data.tokenInfo, (0, address_js_1.getAddress)(activeAccount.address));
                    }
                    else {
                        // if token not supported, can't go into buy flow, so skip to execute transaction
                        onExecuteTransaction();
                    }
                }, style: {
                    fontSize: index_js_1.fontSize.md,
                    borderRadius: index_js_1.radius.full,
                }, variant: "primary", children: buttonLabel })) : ((0, jsx_runtime_1.jsx)(ConnectButton_js_1.ConnectButton, { client: client, connectButton: {
                    label: buttonLabel,
                    style: {
                        borderRadius: index_js_1.radius.full,
                    },
                }, theme: theme, ...connectOptions, wallets: connectOptions?.wallets ||
                    (0, defaultWallets_js_1.getDefaultWalletsForBridgeComponents)({
                        appMetadata: connectOptions?.appMetadata,
                        chains: connectOptions?.chains,
                    }) })), showThirdwebBranding ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(PoweredByTW_js_1.PoweredByThirdweb, {})] })) : null, (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" })] }));
}
const SkeletonHeader = (_props) => ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", gap: "sm", style: {
        justifyContent: "space-between",
    }, children: [(0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: "32px", width: "60px", style: { borderRadius: index_js_1.radius.full } }), (0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: "32px", width: "180px", style: { borderRadius: index_js_1.radius.full } })] }));
function SkeletonRow(props) {
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", style: {
            alignItems: "center",
            justifyContent: "space-between",
        }, children: [(0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: "16px", width: props.labelWidth }), (0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: "16px", width: props.valueWidth })] }));
}
//# sourceMappingURL=TransactionPayment.js.map