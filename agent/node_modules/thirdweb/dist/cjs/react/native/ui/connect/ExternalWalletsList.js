"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalWalletsList = ExternalWalletsList;
exports.AllWalletsList = AllWalletsList;
const jsx_runtime_1 = require("react/jsx-runtime");
const fuse_js_1 = require("fuse.js");
const react_1 = require("react");
const react_native_1 = require("react-native");
const wallet_infos_js_1 = require("../../../../wallets/__generated__/wallet-infos.js");
const constants_js_1 = require("../../../../wallets/constants.js");
const create_wallet_js_1 = require("../../../../wallets/native/create-wallet.js");
const wallet_js_1 = require("../../../core/utils/wallet.js");
const index_js_1 = require("../../design-system/index.js");
const input_js_1 = require("../components/input.js");
const RNImage_js_1 = require("../components/RNImage.js");
const Skeleton_js_1 = require("../components/Skeleton.js");
const spacer_js_1 = require("../components/spacer.js");
const text_js_1 = require("../components/text.js");
const svgs_js_1 = require("../icons/svgs.js");
function ExternalWalletsList(props) {
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.container, children: [(0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { style: {
                    flex: 1,
                    paddingHorizontal: props.containerType === "modal" ? index_js_1.spacing.lg : 0,
                }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: "column",
                        gap: index_js_1.spacing.md,
                        paddingBottom: index_js_1.spacing.md,
                    }, children: [externalWallets.map((wallet) => ((0, jsx_runtime_1.jsx)(ExternalWalletRow, { connectWallet: connectWallet, theme: theme, wallet: wallet }, wallet.id))), props.showAllWalletsButton && ((0, jsx_runtime_1.jsx)(ShowAllWalletsRow, { onPress: onShowAllWallets, theme: theme }))] }) }), (0, jsx_runtime_1.jsx)(NewToWallets, { containerType: props.containerType, theme: props.theme })] }));
}
function AllWalletsList(props) {
    const { connector, client, theme, externalWallets } = props;
    const [searchQuery, setSearchQuery] = (0, react_1.useState)("");
    const walletsToShow = (0, react_1.useMemo)(() => {
        const filteredWallets = wallet_infos_js_1.default
            .filter((info) => !externalWallets.find((wallet) => wallet.id === info.id))
            .filter((info) => !constants_js_1.NON_SEARCHABLE_WALLETS.includes(info.id))
            .filter((info) => info.hasMobileSupport);
        const fuse = new fuse_js_1.default(filteredWallets, {
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.searchContainer, children: (0, jsx_runtime_1.jsx)(input_js_1.ThemedInput, { leftView: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flexDirection: "row",
                            justifyContent: "center",
                            padding: index_js_1.spacing.sm,
                            width: 48,
                        }, children: (0, jsx_runtime_1.jsx)(RNImage_js_1.RNImage, { color: theme.colors.secondaryIconColor, data: svgs_js_1.SEARCH_ICON, size: 24, theme: theme }) }), onChangeText: setSearchQuery, placeholder: "Search Wallet", theme: theme, value: searchQuery }) }), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "md" }), (0, jsx_runtime_1.jsx)(react_native_1.FlatList, { data: walletsToShow, ItemSeparatorComponent: () => (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: index_js_1.spacing.md } }), keyExtractor: (walletId) => walletId, renderItem: ({ item: walletId }) => ((0, jsx_runtime_1.jsx)(ExternalWalletRow, { connectWallet: connectWallet, theme: theme, wallet: (0, create_wallet_js_1.createWallet)(walletId) }, walletId)), style: {
                    flex: 1,
                    paddingBottom: index_js_1.spacing.md,
                    paddingHorizontal: props.containerType === "modal" ? index_js_1.spacing.lg : 0,
                } })] }));
}
function ExternalWalletRow(props) {
    const { wallet, theme, connectWallet } = props;
    const imageQuery = (0, wallet_js_1.useWalletImage)(wallet.id);
    const infoQuery = (0, wallet_js_1.useWalletInfo)(wallet.id);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.TouchableOpacity, { onPress: () => connectWallet(wallet), style: styles.row, children: [imageQuery.data ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageQuery.data ?? "" }, style: { borderRadius: 6, height: 52, width: 52 } })) : ((0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { style: {
                    height: 52,
                    width: 52,
                }, theme: theme })), (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { theme: theme, type: "subtitle", children: infoQuery.data?.name || "" })] }));
}
function ShowAllWalletsRow(props) {
    const { theme, onPress } = props;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.TouchableOpacity, { onPress: onPress, style: styles.row, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
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
                }, children: [...Array(4)].map((_, index) => ((0, jsx_runtime_1.jsx)(react_native_1.View
                // biome-ignore lint/suspicious/noArrayIndexKey: only have index as key
                , { style: {
                        backgroundColor: theme.colors.secondaryIconColor,
                        borderRadius: 7,
                        height: 14,
                        width: 14,
                    } }, index))) }), (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { theme: theme, type: "subtitle", children: "Show all wallets" })] }));
}
function NewToWallets({ theme, containerType, }) {
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            styles.row,
            {
                borderColor: theme.colors.borderColor,
                borderTopWidth: 1,
                paddingHorizontal: containerType === "modal" ? index_js_1.spacing.lg : 0,
                paddingVertical: index_js_1.spacing.md,
            },
        ], children: [(0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { theme: theme, type: "subtext", children: "New to wallets?" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { onPress: () => react_native_1.Linking.openURL("https://blog.thirdweb.com/web3-wallet/"), style: { color: theme.colors.primaryText }, theme: theme, type: "subtext", children: "Get started" })] }));
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    row: {
        alignItems: "center",
        flexDirection: "row",
        gap: index_js_1.spacing.md,
        justifyContent: "flex-start",
    },
    searchContainer: {
        alignItems: "center",
        flexDirection: "row",
        gap: index_js_1.spacing.md,
        justifyContent: "flex-start",
        paddingHorizontal: index_js_1.spacing.lg,
    },
});
//# sourceMappingURL=ExternalWalletsList.js.map