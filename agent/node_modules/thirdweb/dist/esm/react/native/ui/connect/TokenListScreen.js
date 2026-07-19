import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { formatNumber } from "../../../../utils/formatNumber.js";
import { useWalletBalance } from "../../../core/hooks/others/useWalletBalance.js";
import { useActiveAccount } from "../../../core/hooks/wallets/useActiveAccount.js";
import { useActiveWalletChain } from "../../../core/hooks/wallets/useActiveWalletChain.js";
import { defaultTokens, } from "../../../core/utils/defaultTokens.js";
import { spacing } from "../../design-system/index.js";
import { RNImage } from "../components/RNImage.js";
import { Skeleton } from "../components/Skeleton.js";
import { TokenIcon } from "../components/TokenIcon.js";
import { ThemedText } from "../components/text.js";
import { RIGHT_CHEVRON } from "../icons/svgs.js";
export const TokenListScreen = (props) => {
    const supportedTokens = props.supportedTokens || defaultTokens;
    const chain = useActiveWalletChain();
    const account = useActiveAccount();
    const tokens = chain ? supportedTokens[chain.id] || [] : [];
    return (_jsx(ScrollView, { style: { flex: 1 }, children: _jsxs(View, { style: styles.listContainer, children: [_jsx(TokenRow, { address: account?.address, chain: chain, client: props.client, onTokenSelected: props.onTokenSelected, theme: props.theme }), tokens.map((t) => {
                    return (_jsx(TokenRow, { address: account?.address, chain: chain, client: props.client, onTokenSelected: props.onTokenSelected, theme: props.theme, token: t }, t.address));
                })] }) }));
};
export const TokenRow = (props) => {
    const { token, theme, address, chain, client, onTokenSelected } = props;
    const balanceQuery = useWalletBalance({
        address,
        chain,
        client,
        tokenAddress: token?.address,
    });
    const tokenName = props.token ? props.token.name : balanceQuery.data?.name;
    const inner = (_jsxs(_Fragment, { children: [_jsx(TokenIcon, { chain: chain, client: client, size: 40, theme: theme, token: token }), _jsxs(View, { style: { flexDirection: "column", gap: spacing.xxs }, children: [_jsx(ThemedText, { theme: theme, type: "defaultSemiBold", children: tokenName }), address &&
                        (balanceQuery.data ? (_jsxs(ThemedText, { theme: theme, type: "subtext", children: [formatBalanceOnButton(Number(balanceQuery.data.displayValue)), " ", balanceQuery.data?.symbol] })) : (_jsx(Skeleton, { style: { height: 14, width: 80 }, theme: theme })))] }), props.onTokenSelected && (_jsxs(_Fragment, { children: [_jsx(View, { style: { flex: 1 } }), _jsx(RNImage, { color: theme.colors.secondaryIconColor, data: RIGHT_CHEVRON, size: 24, theme: theme })] }))] }));
    return onTokenSelected ? (_jsx(TouchableOpacity, { onPress: () => onTokenSelected(token), style: styles.tokenRowContainer, children: inner })) : (_jsx(View, { style: styles.tokenRowContainer, children: inner }));
};
function formatBalanceOnButton(num) {
    return formatNumber(num, num < 1 ? 5 : 4);
}
const styles = StyleSheet.create({
    emptyContainer: {
        alignItems: "center",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        padding: spacing.lg,
    },
    listContainer: {
        flex: 1,
        flexDirection: "column",
        gap: spacing.md,
        paddingHorizontal: spacing.lg,
    },
    tokenRowContainer: {
        alignItems: "center",
        flexDirection: "row",
        gap: spacing.md,
    },
});
//# sourceMappingURL=TokenListScreen.js.map