"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { PlusIcon } from "@radix-ui/react-icons";
import { useCustomTheme } from "../../../../core/design-system/CustomThemeProvider.js";
import { iconSize, radius, spacing, } from "../../../../core/design-system/index.js";
import { CreditCardIcon } from "../../ConnectWallet/icons/CreditCardIcon.js";
import { WalletRow } from "../../ConnectWallet/screens/Buy/swap/WalletRow.js";
import { Container } from "../../components/basic.js";
import { Button } from "../../components/buttons.js";
import { Text } from "../../components/text.js";
export function WalletFiatSelection({ connectedWallets, client, onWalletSelected, onFiatSelected, onConnectWallet, paymentMethods = ["crypto", "card"], }) {
    const theme = useCustomTheme();
    return (_jsxs(Container, { flex: "column", gap: "xs", children: [paymentMethods.includes("crypto") && (_jsxs(_Fragment, { children: [connectedWallets.length > 0 && (_jsx(Container, { flex: "column", gap: "sm", children: connectedWallets.map((wallet) => {
                            const account = wallet.getAccount();
                            if (!account?.address) {
                                return null;
                            }
                            return (_jsx(Button, { fullWidth: true, onClick: () => onWalletSelected(wallet), style: {
                                    borderRadius: radius.md,
                                    justifyContent: "space-between",
                                    padding: `${spacing.md} ${spacing.md}`,
                                }, variant: "secondary", children: _jsx(WalletRow, { address: account?.address, client: client, iconSize: "lg", textSize: "sm" }) }, `${wallet.id}-${account.address}`));
                        }) })), _jsx(Button, { fullWidth: true, onClick: onConnectWallet, style: {
                            borderRadius: radius.md,
                            height: "auto",
                            padding: `${spacing.md} ${spacing.md}`,
                            textAlign: "left",
                        }, variant: "secondary", children: _jsxs(Container, { flex: "row", gap: "md", style: { alignItems: "center", width: "100%" }, children: [_jsx(Container, { style: {
                                        alignItems: "center",
                                        border: `1px dashed ${theme.colors.secondaryText}`,
                                        borderRadius: radius.full,
                                        display: "flex",
                                        height: `${iconSize.lg}px`,
                                        justifyContent: "center",
                                        width: `${iconSize.lg}px`,
                                    }, children: _jsx(PlusIcon, { color: theme.colors.secondaryText, height: iconSize["sm+"], width: iconSize["sm+"] }) }), _jsxs(Container, { flex: "column", gap: "3xs", style: { flex: 1 }, children: [_jsx(Text, { color: "primaryText", size: "sm", children: "Connect a Wallet" }), _jsx(Text, { color: "secondaryText", size: "xs", children: "Pay with any web3 wallet" })] })] }) })] })), paymentMethods.includes("card") && (_jsx(Button, { fullWidth: true, onClick: onFiatSelected, style: {
                    borderRadius: radius.md,
                    height: "auto",
                    padding: `${spacing.md} ${spacing.md}`,
                    textAlign: "left",
                }, variant: "secondary", children: _jsxs(Container, { flex: "row", gap: "md", style: { alignItems: "center", width: "100%" }, children: [_jsx(CreditCardIcon, { color: theme.colors.secondaryText, size: iconSize.lg }), _jsxs(Container, { flex: "column", gap: "3xs", style: { flex: 1 }, children: [_jsx(Text, { color: "primaryText", size: "sm", children: "Pay with Card" }), _jsx(Text, { color: "secondaryText", size: "xs", children: "Onramp and pay in one step" })] })] }) }))] }));
}
//# sourceMappingURL=WalletFiatSelection.js.map