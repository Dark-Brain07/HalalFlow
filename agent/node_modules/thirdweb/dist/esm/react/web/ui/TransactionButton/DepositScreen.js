import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { keyframes } from "@emotion/react";
import { shortenAddress } from "../../../../utils/address.js";
import { formatNumber } from "../../../../utils/formatNumber.js";
import { toTokens } from "../../../../utils/units.js";
import { hasSponsoredTransactionsEnabled } from "../../../../wallets/smart/is-smart-wallet.js";
import { useCustomTheme } from "../../../core/design-system/CustomThemeProvider.js";
import { fontSize, iconSize, radius, spacing, } from "../../../core/design-system/index.js";
import { useActiveAccount } from "../../../core/hooks/wallets/useActiveAccount.js";
import { useActiveWallet } from "../../../core/hooks/wallets/useActiveWallet.js";
import { ErrorState } from "../../wallets/shared/ErrorState.js";
import { LoadingScreen } from "../../wallets/shared/LoadingScreen.js";
import { CoinsIcon } from "../ConnectWallet/icons/CoinsIcon.js";
import { useTransactionCostAndData } from "../ConnectWallet/screens/Buy/main/useBuyTxStates.js";
import { WalletRow } from "../ConnectWallet/screens/Buy/swap/WalletRow.js";
import { formatTokenBalance } from "../ConnectWallet/screens/formatTokenBalance.js";
import { isNativeToken } from "../ConnectWallet/screens/nativeToken.js";
import { Container, ModalHeader } from "../components/basic.js";
import { Button } from "../components/buttons.js";
import { CopyIcon } from "../components/CopyIcon.js";
import { QRCode } from "../components/QRCode.js";
import { Skeleton } from "../components/Skeleton.js";
import { Spacer } from "../components/Spacer.js";
import { Text } from "../components/text.js";
import { TokenSymbol } from "../components/token/TokenSymbol.js";
import { WalletImage } from "../components/WalletImage.js";
import { StyledButton, StyledDiv } from "../design-system/elements.js";
import { useClipboard } from "../hooks/useCopyClipboard.js";
const pulseAnimation = keyframes `
0% {
  opacity: 1;
  transform: scale(0.5);
}
100% {
  opacity: 0;
  transform: scale(1.5);
}
`;
const WaitingBadge = /* @__PURE__ */ StyledDiv(() => {
    const theme = useCustomTheme();
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
        borderRadius: radius.lg,
        color: theme.colors.secondaryText,
        display: "flex",
        fontSize: fontSize.sm,
        fontWeight: 500,
        gap: spacing.sm,
        padding: `${spacing.md} ${spacing.sm}`,
        position: "relative",
    };
});
/**
 *
 * @internal
 */
export function DepositScreen(props) {
    const activeWallet = useActiveWallet();
    const activeAccount = useActiveAccount();
    const address = activeAccount?.address;
    const { hasCopied, onCopy } = useClipboard(address || "");
    const { connectLocale, client } = props;
    const locale = connectLocale.receiveFundsScreen;
    const isTestnet = props.tx.chain.testnet === true;
    const { data: transactionCostAndData, error: transactionCostAndDataError, isFetching: transactionCostAndDataFetching, refetch: transactionCostAndDataRefetch, } = useTransactionCostAndData({
        account: activeAccount,
        refetchIntervalMs: 10_000,
        supportedDestinations: [],
        transaction: props.tx,
    });
    const theme = useCustomTheme();
    const sponsoredTransactionsEnabled = hasSponsoredTransactionsEnabled(activeWallet);
    if (transactionCostAndDataError) {
        return (_jsx(Container, { center: "both", flex: "row", fullHeight: true, style: {
                minHeight: "350px",
            }, children: _jsx(ErrorState, { onTryAgain: transactionCostAndDataRefetch, title: transactionCostAndDataError?.message || "Something went wrong" }) }));
    }
    if (!transactionCostAndData) {
        return _jsx(LoadingScreen, {});
    }
    const totalCost = isNativeToken(transactionCostAndData.token) && !sponsoredTransactionsEnabled
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
    return (_jsxs(Container, { p: "lg", children: [_jsx(ModalHeader, { title: "Insufficient funds" }), _jsx(Spacer, { y: "lg" }), _jsxs(Container, { flex: "column", gap: "sm", children: [insufficientFunds && (_jsx("div", { children: _jsxs(Text, { center: true, color: "danger", multiline: true, size: "xs", children: ["You need", " ", formatNumber(Number.parseFloat(toTokens(requiredFunds, transactionCostAndData.decimals)), 5), " ", transactionCostAndData.token.symbol, " to continue"] }) })), _jsxs(Container, { flex: "row", style: {
                            border: `1px solid ${theme.colors.borderColor}`,
                            borderBottom: "none",
                            borderRadius: `${radius.md} ${radius.md} 0 0`,
                            justifyContent: "space-between",
                            padding: spacing.sm,
                        }, children: [activeAccount && (_jsx(WalletRow, { address: activeAccount?.address, client: client, iconSize: "md" })), transactionCostAndData.walletBalance.value !== undefined &&
                                !transactionCostAndDataFetching ? (_jsxs(Container, { center: "y", flex: "row", gap: "3xs", children: [_jsx(Text, { color: "secondaryText", size: "xs", weight: 500, children: formatTokenBalance(transactionCostAndData.walletBalance, false) }), _jsx(TokenSymbol, { chain: props.tx.chain, color: "secondaryText", size: "xs", token: transactionCostAndData.token })] })) : (_jsx(Container, { center: "y", flex: "row", gap: "3xs", children: _jsx(Skeleton, { height: fontSize.xs, width: "70px" }) }))] })] }), _jsx(WalletAddressContainer, { onClick: onCopy, children: _jsxs(Container, { center: "both", expand: true, flex: "column", gap: "md", children: [_jsx(Container, { center: "x", flex: "row", children: _jsx(QRCode, { QRIcon: activeWallet && (_jsx(WalletImage, { client: client, id: activeWallet.id, size: iconSize.xl })), qrCodeUri: address, size: 250 }) }), _jsxs(Container, { center: "x", flex: "row", gap: "xs", children: [_jsx(Text, { color: "primaryText", size: "md", style: {
                                        fontFamily: "monospace",
                                    }, children: address ? shortenAddress(address) : "" }), _jsx(CopyIcon, { hasCopied: hasCopied, text: address || "", tip: "Copy address" })] })] }) }), _jsx(Spacer, { y: "md" }), _jsx(Text, { balance: true, center: true, className: "receive_fund_screen_instruction", multiline: true, size: "sm", children: locale.instruction }), _jsx(Spacer, { y: "md" }), insufficientFunds ? (_jsxs(WaitingBadge, { children: ["Waiting for funds on ", transactionCostAndData.chainMetadata.name, "..."] })) : (_jsx(Button, { fullWidth: true, onClick: props.onDone, variant: "accent", children: "Continue" })), insufficientFunds && isTestnet && (_jsxs(_Fragment, { children: [_jsx(Spacer, { y: "md" }), _jsx(Button, { fullWidth: true, onClick: openFaucetLink, variant: "link", children: _jsxs(Container, { center: "x", color: "accentText", flex: "row", gap: "xs", children: [_jsx(CoinsIcon, { size: iconSize.sm }), _jsx(Text, { center: true, color: "accentText", size: "xs", weight: 500, children: "Get testnet funds" })] }) })] }))] }));
}
const WalletAddressContainer = /* @__PURE__ */ StyledButton((_) => {
    const theme = useCustomTheme();
    return {
        all: "unset",
        "&:hover": {
            borderColor: theme.colors.accentText,
        },
        border: `1px solid ${theme.colors.borderColor}`,
        borderRadius: `0 0 ${radius.md} ${radius.md}`,
        boxSizing: "border-box",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        padding: spacing.md,
        transition: "border-color 200ms ease",
        width: "100%",
    };
});
//# sourceMappingURL=DepositScreen.js.map