"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositScreen = DepositScreen;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@emotion/react");
const address_js_1 = require("../../../../utils/address.js");
const formatNumber_js_1 = require("../../../../utils/formatNumber.js");
const units_js_1 = require("../../../../utils/units.js");
const is_smart_wallet_js_1 = require("../../../../wallets/smart/is-smart-wallet.js");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const useActiveAccount_js_1 = require("../../../core/hooks/wallets/useActiveAccount.js");
const useActiveWallet_js_1 = require("../../../core/hooks/wallets/useActiveWallet.js");
const ErrorState_js_1 = require("../../wallets/shared/ErrorState.js");
const LoadingScreen_js_1 = require("../../wallets/shared/LoadingScreen.js");
const CoinsIcon_js_1 = require("../ConnectWallet/icons/CoinsIcon.js");
const useBuyTxStates_js_1 = require("../ConnectWallet/screens/Buy/main/useBuyTxStates.js");
const WalletRow_js_1 = require("../ConnectWallet/screens/Buy/swap/WalletRow.js");
const formatTokenBalance_js_1 = require("../ConnectWallet/screens/formatTokenBalance.js");
const nativeToken_js_1 = require("../ConnectWallet/screens/nativeToken.js");
const basic_js_1 = require("../components/basic.js");
const buttons_js_1 = require("../components/buttons.js");
const CopyIcon_js_1 = require("../components/CopyIcon.js");
const QRCode_js_1 = require("../components/QRCode.js");
const Skeleton_js_1 = require("../components/Skeleton.js");
const Spacer_js_1 = require("../components/Spacer.js");
const text_js_1 = require("../components/text.js");
const TokenSymbol_js_1 = require("../components/token/TokenSymbol.js");
const WalletImage_js_1 = require("../components/WalletImage.js");
const elements_js_1 = require("../design-system/elements.js");
const useCopyClipboard_js_1 = require("../hooks/useCopyClipboard.js");
const pulseAnimation = (0, react_1.keyframes) `
0% {
  opacity: 1;
  transform: scale(0.5);
}
100% {
  opacity: 0;
  transform: scale(1.5);
}
`;
const WaitingBadge = /* @__PURE__ */ (0, elements_js_1.StyledDiv)(() => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        "&::before": {
            animation: `${pulseAnimation} 1s infinite`,
            backgroundColor: theme.colors.accentText,
            borderRadius: "50%",
            content: '""',
            height: "8px",
            width: "8px",
        },
        alignItems: "center",
        backgroundColor: theme.colors.tertiaryBg,
        border: `1px solid ${theme.colors.borderColor}`,
        borderRadius: index_js_1.radius.lg,
        color: theme.colors.secondaryText,
        display: "flex",
        fontSize: index_js_1.fontSize.sm,
        fontWeight: 500,
        gap: index_js_1.spacing.sm,
        padding: `${index_js_1.spacing.md} ${index_js_1.spacing.sm}`,
        position: "relative",
    };
});
/**
 *
 * @internal
 */
function DepositScreen(props) {
    const activeWallet = (0, useActiveWallet_js_1.useActiveWallet)();
    const activeAccount = (0, useActiveAccount_js_1.useActiveAccount)();
    const address = activeAccount?.address;
    const { hasCopied, onCopy } = (0, useCopyClipboard_js_1.useClipboard)(address || "");
    const { connectLocale, client } = props;
    const locale = connectLocale.receiveFundsScreen;
    const isTestnet = props.tx.chain.testnet === true;
    const { data: transactionCostAndData, error: transactionCostAndDataError, isFetching: transactionCostAndDataFetching, refetch: transactionCostAndDataRefetch, } = (0, useBuyTxStates_js_1.useTransactionCostAndData)({
        account: activeAccount,
        refetchIntervalMs: 10_000,
        supportedDestinations: [],
        transaction: props.tx,
    });
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    const sponsoredTransactionsEnabled = (0, is_smart_wallet_js_1.hasSponsoredTransactionsEnabled)(activeWallet);
    if (transactionCostAndDataError) {
        return ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "both", flex: "row", fullHeight: true, style: {
                minHeight: "350px",
            }, children: (0, jsx_runtime_1.jsx)(ErrorState_js_1.ErrorState, { onTryAgain: transactionCostAndDataRefetch, title: transactionCostAndDataError?.message || "Something went wrong" }) }));
    }
    if (!transactionCostAndData) {
        return (0, jsx_runtime_1.jsx)(LoadingScreen_js_1.LoadingScreen, {});
    }
    const totalCost = (0, nativeToken_js_1.isNativeToken)(transactionCostAndData.token) && !sponsoredTransactionsEnabled
        ? transactionCostAndData.transactionValueWei +
            transactionCostAndData.gasCostWei
        : transactionCostAndData.transactionValueWei;
    const insufficientFunds = transactionCostAndData.walletBalance.value < totalCost;
    const requiredFunds = transactionCostAndData.walletBalance.value
        ? totalCost - transactionCostAndData.walletBalance.value
        : totalCost;
    const openFaucetLink = () => {
        window.open(`https://thirdweb.com/${props.tx.chain.id}?utm_source=ub_deposit`);
    };
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { p: "lg", children: [(0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { title: "Insufficient funds" }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "sm", children: [insufficientFunds && ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(text_js_1.Text, { center: true, color: "danger", multiline: true, size: "xs", children: ["You need", " ", (0, formatNumber_js_1.formatNumber)(Number.parseFloat((0, units_js_1.toTokens)(requiredFunds, transactionCostAndData.decimals)), 5), " ", transactionCostAndData.token.symbol, " to continue"] }) })), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", style: {
                            border: `1px solid ${theme.colors.borderColor}`,
                            borderBottom: "none",
                            borderRadius: `${index_js_1.radius.md} ${index_js_1.radius.md} 0 0`,
                            justifyContent: "space-between",
                            padding: index_js_1.spacing.sm,
                        }, children: [activeAccount && ((0, jsx_runtime_1.jsx)(WalletRow_js_1.WalletRow, { address: activeAccount?.address, client: client, iconSize: "md" })), transactionCostAndData.walletBalance.value !== undefined &&
                                !transactionCostAndDataFetching ? ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", gap: "3xs", children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "xs", weight: 500, children: (0, formatTokenBalance_js_1.formatTokenBalance)(transactionCostAndData.walletBalance, false) }), (0, jsx_runtime_1.jsx)(TokenSymbol_js_1.TokenSymbol, { chain: props.tx.chain, color: "secondaryText", size: "xs", token: transactionCostAndData.token })] })) : ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "y", flex: "row", gap: "3xs", children: (0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: index_js_1.fontSize.xs, width: "70px" }) }))] })] }), (0, jsx_runtime_1.jsx)(WalletAddressContainer, { onClick: onCopy, children: (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "both", expand: true, flex: "column", gap: "md", children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "x", flex: "row", children: (0, jsx_runtime_1.jsx)(QRCode_js_1.QRCode, { QRIcon: activeWallet && ((0, jsx_runtime_1.jsx)(WalletImage_js_1.WalletImage, { client: client, id: activeWallet.id, size: index_js_1.iconSize.xl })), qrCodeUri: address, size: 250 }) }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "x", flex: "row", gap: "xs", children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "md", style: {
                                        fontFamily: "monospace",
                                    }, children: address ? (0, address_js_1.shortenAddress)(address) : "" }), (0, jsx_runtime_1.jsx)(CopyIcon_js_1.CopyIcon, { hasCopied: hasCopied, text: address || "", tip: "Copy address" })] })] }) }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { balance: true, center: true, className: "receive_fund_screen_instruction", multiline: true, size: "sm", children: locale.instruction }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), insufficientFunds ? ((0, jsx_runtime_1.jsxs)(WaitingBadge, { children: ["Waiting for funds on ", transactionCostAndData.chainMetadata.name, "..."] })) : ((0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, onClick: props.onDone, variant: "accent", children: "Continue" })), insufficientFunds && isTestnet && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, onClick: openFaucetLink, variant: "link", children: (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "x", color: "accentText", flex: "row", gap: "xs", children: [(0, jsx_runtime_1.jsx)(CoinsIcon_js_1.CoinsIcon, { size: index_js_1.iconSize.sm }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "accentText", size: "xs", weight: 500, children: "Get testnet funds" })] }) })] }))] }));
}
const WalletAddressContainer = /* @__PURE__ */ (0, elements_js_1.StyledButton)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        all: "unset",
        "&:hover": {
            borderColor: theme.colors.accentText,
        },
        border: `1px solid ${theme.colors.borderColor}`,
        borderRadius: `0 0 ${index_js_1.radius.md} ${index_js_1.radius.md}`,
        boxSizing: "border-box",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        padding: index_js_1.spacing.md,
        transition: "border-color 200ms ease",
        width: "100%",
    };
});
//# sourceMappingURL=DepositScreen.js.map