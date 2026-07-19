import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyleSheet, View } from "react-native";
import { formatNumber } from "../../../../utils/formatNumber.js";
import { parseTheme } from "../../../core/design-system/CustomThemeProvider.js";
import { useActiveWalletChain } from "../../../core/hooks/wallets/useActiveWalletChain.js";
import { useConnectedWalletDetails } from "../../../core/utils/wallet.js";
import { fontSize, spacing } from "../../design-system/index.js";
import { ThemedButton } from "../components/button.js";
import { Skeleton } from "../components/Skeleton.js";
import { ThemedText } from "../components/text.js";
import { WalletImage } from "../components/WalletImage.js";
export function ConnectedButton(props) {
    const theme = parseTheme(props.theme);
    const { account, wallet, client } = props;
    const walletChain = useActiveWalletChain();
    const { pfp, name, balanceQuery } = useConnectedWalletDetails(props.client, walletChain, account, props.detailsButton?.displayBalanceToken);
    return (_jsx(ThemedButton, { onPress: () => {
            props.openModal();
        }, style: {
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.smd,
        }, theme: theme, children: _jsxs(View, { style: styles.row, children: [_jsx(WalletImage, { avatar: pfp, client: client, size: 40, theme: theme, wallet: wallet }), _jsxs(View, { style: styles.col, children: [_jsx(ThemedText, { style: {
                                color: theme.colors.primaryButtonText,
                            }, theme: theme, type: "defaultSemiBold", children: name }), balanceQuery.data ? (_jsxs(ThemedText, { style: {
                                fontSize: fontSize.sm,
                            }, theme: theme, type: "subtext", children: [formatBalanceOnButton(Number(balanceQuery.data.displayValue)), " ", balanceQuery.data?.symbol] })) : (_jsx(Skeleton, { color: theme.colors.secondaryText, style: { height: 16, width: 80 }, theme: theme }))] })] }) }));
}
function formatBalanceOnButton(num) {
    return formatNumber(num, num < 1 ? 5 : 4);
}
const styles = StyleSheet.create({
    col: {
        flexDirection: "column",
        gap: spacing.xxs,
    },
    row: {
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
        gap: spacing.md,
    },
});
//# sourceMappingURL=ConnectedButton.js.map