import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import { FlatList, Image, Linking, ScrollView, StyleSheet, TouchableOpacity, View, } from "react-native";
import walletInfos from "../../../../wallets/__generated__/wallet-infos.js";
import { NON_SEARCHABLE_WALLETS } from "../../../../wallets/constants.js";
import { createWallet } from "../../../../wallets/native/create-wallet.js";
import { useWalletImage, useWalletInfo } from "../../../core/utils/wallet.js";
import { spacing } from "../../design-system/index.js";
import { ThemedInput } from "../components/input.js";
import { RNImage } from "../components/RNImage.js";
import { Skeleton } from "../components/Skeleton.js";
import { Spacer } from "../components/spacer.js";
import { ThemedText } from "../components/text.js";
import { SEARCH_ICON } from "../icons/svgs.js";
export function ExternalWalletsList(props) {
    const { connector, client, theme, externalWallets, onShowAllWallets } = props;
    const connectWallet = (wallet) => {
        connector({
            connectFn: async (chain) => {
                await wallet.connect({
                    chain,
                    client,
                });
                return wallet;
            },
            wallet,
        });
    };
    return (_jsxs(View, { style: styles.container, children: [_jsx(ScrollView, { style: {
                    flex: 1,
                    paddingHorizontal: props.containerType === "modal" ? spacing.lg : 0,
                }, children: _jsxs(View, { style: {
                        flexDirection: "column",
                        gap: spacing.md,
                        paddingBottom: spacing.md,
                    }, children: [externalWallets.map((wallet) => (_jsx(ExternalWalletRow, { connectWallet: connectWallet, theme: theme, wallet: wallet }, wallet.id))), props.showAllWalletsButton && (_jsx(ShowAllWalletsRow, { onPress: onShowAllWallets, theme: theme }))] }) }), _jsx(NewToWallets, { containerType: props.containerType, theme: props.theme })] }));
}
export function AllWalletsList(props) {
    const { connector, client, theme, externalWallets } = props;
    const [searchQuery, setSearchQuery] = useState("");
    const walletsToShow = useMemo(() => {
        const filteredWallets = walletInfos
            .filter((info) => !externalWallets.find((wallet) => wallet.id === info.id))
            .filter((info) => !NON_SEARCHABLE_WALLETS.includes(info.id))
            .filter((info) => info.hasMobileSupport);
        const fuse = new Fuse(filteredWallets, {
            keys: ["name"],
            threshold: 0.3,
        });
        return searchQuery
            ? fuse.search(searchQuery).map((result) => result.item.id)
            : filteredWallets.map((info) => info.id);
    }, [externalWallets, searchQuery]);
    const connectWallet = (wallet) => {
        connector({
            connectFn: async (chain) => {
                await wallet.connect({
                    chain,
                    client,
                });
                return wallet;
            },
            wallet,
        });
    };
    return (_jsxs(View, { style: styles.container, children: [_jsx(View, { style: styles.searchContainer, children: _jsx(ThemedInput, { leftView: _jsx(View, { style: {
                            flexDirection: "row",
                            justifyContent: "center",
                            padding: spacing.sm,
                            width: 48,
                        }, children: _jsx(RNImage, { color: theme.colors.secondaryIconColor, data: SEARCH_ICON, size: 24, theme: theme }) }), onChangeText: setSearchQuery, placeholder: "Search Wallet", theme: theme, value: searchQuery }) }), _jsx(Spacer, { size: "md" }), _jsx(FlatList, { data: walletsToShow, ItemSeparatorComponent: () => _jsx(View, { style: { height: spacing.md } }), keyExtractor: (walletId) => walletId, renderItem: ({ item: walletId }) => (_jsx(ExternalWalletRow, { connectWallet: connectWallet, theme: theme, wallet: createWallet(walletId) }, walletId)), style: {
                    flex: 1,
                    paddingBottom: spacing.md,
                    paddingHorizontal: props.containerType === "modal" ? spacing.lg : 0,
                } })] }));
}
function ExternalWalletRow(props) {
    const { wallet, theme, connectWallet } = props;
    const imageQuery = useWalletImage(wallet.id);
    const infoQuery = useWalletInfo(wallet.id);
    return (_jsxs(TouchableOpacity, { onPress: () => connectWallet(wallet), style: styles.row, children: [imageQuery.data ? (_jsx(Image, { source: { uri: imageQuery.data ?? "" }, style: { borderRadius: 6, height: 52, width: 52 } })) : (_jsx(Skeleton, { style: {
                    height: 52,
                    width: 52,
                }, theme: theme })), _jsx(ThemedText, { theme: theme, type: "subtitle", children: infoQuery.data?.name || "" })] }));
}
function ShowAllWalletsRow(props) {
    const { theme, onPress } = props;
    return (_jsxs(TouchableOpacity, { onPress: onPress, style: styles.row, children: [_jsx(View, { style: {
                    alignContent: "space-between",
                    backgroundColor: theme.colors.secondaryButtonBg,
                    borderColor: theme.colors.borderColor,
                    borderRadius: 6,
                    borderWidth: 1,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    height: 52,
                    justifyContent: "space-between",
                    padding: 8,
                    width: 52,
                }, children: [...Array(4)].map((_, index) => (_jsx(View
                // biome-ignore lint/suspicious/noArrayIndexKey: only have index as key
                , { style: {
                        backgroundColor: theme.colors.secondaryIconColor,
                        borderRadius: 7,
                        height: 14,
                        width: 14,
                    } }, index))) }), _jsx(ThemedText, { theme: theme, type: "subtitle", children: "Show all wallets" })] }));
}
function NewToWallets({ theme, containerType, }) {
    return (_jsxs(View, { style: [
            styles.row,
            {
                borderColor: theme.colors.borderColor,
                borderTopWidth: 1,
                paddingHorizontal: containerType === "modal" ? spacing.lg : 0,
                paddingVertical: spacing.md,
            },
        ], children: [_jsx(ThemedText, { theme: theme, type: "subtext", children: "New to wallets?" }), _jsx(View, { style: { flex: 1 } }), _jsx(ThemedText, { onPress: () => Linking.openURL("https://blog.thirdweb.com/web3-wallet/"), style: { color: theme.colors.primaryText }, theme: theme, type: "subtext", children: "Get started" })] }));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    row: {
        alignItems: "center",
        flexDirection: "row",
        gap: spacing.md,
        justifyContent: "flex-start",
    },
    searchContainer: {
        alignItems: "center",
        flexDirection: "row",
        gap: spacing.md,
        justifyContent: "flex-start",
        paddingHorizontal: spacing.lg,
    },
});
//# sourceMappingURL=ExternalWalletsList.js.map