"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletFiatSelection = WalletFiatSelection;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const CreditCardIcon_js_1 = require("../../ConnectWallet/icons/CreditCardIcon.js");
const WalletRow_js_1 = require("../../ConnectWallet/screens/Buy/swap/WalletRow.js");
const basic_js_1 = require("../../components/basic.js");
const buttons_js_1 = require("../../components/buttons.js");
const text_js_1 = require("../../components/text.js");
function WalletFiatSelection({ connectedWallets, client, onWalletSelected, onFiatSelected, onConnectWallet, paymentMethods = ["crypto", "card"], }) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "xs", children: [paymentMethods.includes("crypto") && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [connectedWallets.length > 0 && ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", gap: "sm", children: connectedWallets.map((wallet) => {
                            const account = wallet.getAccount();
                            if (!account?.address) {
                                return null;
                            }
                            return ((0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, onClick: () => onWalletSelected(wallet), style: {
                                    borderRadius: index_js_1.radius.md,
                                    justifyContent: "space-between",
                                    padding: `${index_js_1.spacing.md} ${index_js_1.spacing.md}`,
                                }, variant: "secondary", children: (0, jsx_runtime_1.jsx)(WalletRow_js_1.WalletRow, { address: account?.address, client: client, iconSize: "lg", textSize: "sm" }) }, `${wallet.id}-${account.address}`));
                        }) })), (0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, onClick: onConnectWallet, style: {
                            borderRadius: index_js_1.radius.md,
                            height: "auto",
                            padding: `${index_js_1.spacing.md} ${index_js_1.spacing.md}`,
                            textAlign: "left",
                        }, variant: "secondary", children: (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "md", style: { alignItems: "center", width: "100%" }, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { style: {
                                        alignItems: "center",
                                        border: `1px dashed ${theme.colors.secondaryText}`,
                                        borderRadius: index_js_1.radius.full,
                                        display: "flex",
                                        height: `${index_js_1.iconSize.lg}px`,
                                        justifyContent: "center",
                                        width: `${index_js_1.iconSize.lg}px`,
                                    }, children: (0, jsx_runtime_1.jsx)(react_icons_1.PlusIcon, { color: theme.colors.secondaryText, height: index_js_1.iconSize["sm+"], width: index_js_1.iconSize["sm+"] }) }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "3xs", style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", children: "Connect a Wallet" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "xs", children: "Pay with any web3 wallet" })] })] }) })] })), paymentMethods.includes("card") && ((0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, onClick: onFiatSelected, style: {
                    borderRadius: index_js_1.radius.md,
                    height: "auto",
                    padding: `${index_js_1.spacing.md} ${index_js_1.spacing.md}`,
                    textAlign: "left",
                }, variant: "secondary", children: (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "md", style: { alignItems: "center", width: "100%" }, children: [(0, jsx_runtime_1.jsx)(CreditCardIcon_js_1.CreditCardIcon, { color: theme.colors.secondaryText, size: index_js_1.iconSize.lg }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "3xs", style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", children: "Pay with Card" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "xs", children: "Onramp and pay in one step" })] })] }) }))] }));
}
//# sourceMappingURL=WalletFiatSelection.js.map