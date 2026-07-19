"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectedButton = ConnectedButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const formatNumber_js_1 = require("../../../../utils/formatNumber.js");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const useActiveWalletChain_js_1 = require("../../../core/hooks/wallets/useActiveWalletChain.js");
const wallet_js_1 = require("../../../core/utils/wallet.js");
const index_js_1 = require("../../design-system/index.js");
const button_js_1 = require("../components/button.js");
const Skeleton_js_1 = require("../components/Skeleton.js");
const text_js_1 = require("../components/text.js");
const WalletImage_js_1 = require("../components/WalletImage.js");
function ConnectedButton(props) {
    const theme = (0, CustomThemeProvider_js_1.parseTheme)(props.theme);
    const { account, wallet, client } = props;
    const walletChain = (0, useActiveWalletChain_js_1.useActiveWalletChain)();
    const { pfp, name, balanceQuery } = (0, wallet_js_1.useConnectedWalletDetails)(props.client, walletChain, account, props.detailsButton?.displayBalanceToken);
    return ((0, jsx_runtime_1.jsx)(button_js_1.ThemedButton, { onPress: () => {
            props.openModal();
        }, style: {
            paddingHorizontal: index_js_1.spacing.md,
            paddingVertical: index_js_1.spacing.smd,
        }, theme: theme, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.row, children: [(0, jsx_runtime_1.jsx)(WalletImage_js_1.WalletImage, { avatar: pfp, client: client, size: 40, theme: theme, wallet: wallet }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.col, children: [(0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { style: {
                                color: theme.colors.primaryButtonText,
                            }, theme: theme, type: "defaultSemiBold", children: name }), balanceQuery.data ? ((0, jsx_runtime_1.jsxs)(text_js_1.ThemedText, { style: {
                                fontSize: index_js_1.fontSize.sm,
                            }, theme: theme, type: "subtext", children: [formatBalanceOnButton(Number(balanceQuery.data.displayValue)), " ", balanceQuery.data?.symbol] })) : ((0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { color: theme.colors.secondaryText, style: { height: 16, width: 80 }, theme: theme }))] })] }) }));
}
function formatBalanceOnButton(num) {
    return (0, formatNumber_js_1.formatNumber)(num, num < 1 ? 5 : 4);
}
const styles = react_native_1.StyleSheet.create({
    col: {
        flexDirection: "column",
        gap: index_js_1.spacing.xxs,
    },
    row: {
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
        gap: index_js_1.spacing.md,
    },
});
//# sourceMappingURL=ConnectedButton.js.map