"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectedModal = ConnectedModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const contract_js_1 = require("../../../../contract/contract.js");
const is_contract_deployed_js_1 = require("../../../../utils/bytecode/is-contract-deployed.js");
const formatNumber_js_1 = require("../../../../utils/formatNumber.js");
const is_smart_wallet_js_1 = require("../../../../wallets/smart/is-smart-wallet.js");
const useSiweAuth_js_1 = require("../../../core/hooks/auth/useSiweAuth.js");
const useChainQuery_js_1 = require("../../../core/hooks/others/useChainQuery.js");
const useActiveAccount_js_1 = require("../../../core/hooks/wallets/useActiveAccount.js");
const useActiveWallet_js_1 = require("../../../core/hooks/wallets/useActiveWallet.js");
const useActiveWalletChain_js_1 = require("../../../core/hooks/wallets/useActiveWalletChain.js");
const useDisconnect_js_1 = require("../../../core/hooks/wallets/useDisconnect.js");
const wallet_js_1 = require("../../../core/utils/wallet.js");
const index_js_1 = require("../../design-system/index.js");
const Address_js_1 = require("../components/Address.js");
const button_js_1 = require("../components/button.js");
const ChainIcon_js_1 = require("../components/ChainIcon.js");
const Header_js_1 = require("../components/Header.js");
const RNImage_js_1 = require("../components/RNImage.js");
const Skeleton_js_1 = require("../components/Skeleton.js");
const spacer_js_1 = require("../components/spacer.js");
const text_js_1 = require("../components/text.js");
const view_js_1 = require("../components/view.js");
const WalletImage_js_1 = require("../components/WalletImage.js");
const svgs_js_1 = require("../icons/svgs.js");
const ReceiveScreen_js_1 = require("./ReceiveScreen.js");
const SendScreen_js_1 = require("./SendScreen.js");
const TokenListScreen_js_1 = require("./TokenListScreen.js");
function ConnectedModal(props) {
    const { theme, containerType, client } = props;
    const [modalState, setModalState] = (0, react_1.useState)({
        screen: "account",
    });
    let content;
    switch (modalState.screen) {
        case "send": {
            content = ((0, jsx_runtime_1.jsx)(SendScreen_js_1.SendScreen, { client: client, containerType: containerType, onBack: () => setModalState({ screen: "account" }), onClose: props.onClose, supportedTokens: props.supportedTokens, theme: theme }));
            break;
        }
        case "receive": {
            content = ((0, jsx_runtime_1.jsx)(ReceiveScreen_js_1.ReceiveScreen, { account: props.account, client: props.client, containerType: props.containerType, onBack: () => setModalState({ screen: "account" }), onClose: props.onClose, theme: theme, wallet: props.wallet }));
            break;
        }
        case "view_funds": {
            content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Header_js_1.Header, { containerType: containerType, onBack: () => setModalState({ screen: "account" }), onClose: props.onClose, theme: theme, title: "View Funds" }), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "xl" }), (0, jsx_runtime_1.jsx)(TokenListScreen_js_1.TokenListScreen, { client: client, supportedTokens: props.supportedTokens, theme: theme })] }));
            break;
        }
        default: {
            content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [props.onClose && ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { onPress: props.onClose, style: {
                            padding: index_js_1.spacing.lg,
                            position: "absolute",
                            right: 0,
                            top: 0,
                            zIndex: 1,
                        }, children: (0, jsx_runtime_1.jsx)(RNImage_js_1.RNImage, { color: theme.colors.secondaryIconColor, data: svgs_js_1.CLOSE_ICON, size: 24, theme: theme }) })), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "xl" }), (0, jsx_runtime_1.jsx)(AccountHeader, { ...props }), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "lg" }), (0, jsx_runtime_1.jsx)(WalletActionsRow, { ...props, setModalState: setModalState }), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "lg" }), (0, jsx_runtime_1.jsx)(WalletMenu, { ...props, setModalState: setModalState })] }));
        }
    }
    return ((0, jsx_runtime_1.jsx)(view_js_1.ThemedView, { style: containerType === "modal"
            ? styles.modalContainer
            : styles.embedContainer, theme: theme, children: content }));
}
const AccountHeader = (props) => {
    const { account, wallet, theme, client } = props;
    const walletChain = (0, useActiveWalletChain_js_1.useActiveWalletChain)();
    const { pfp, name, balanceQuery } = (0, wallet_js_1.useConnectedWalletDetails)(props.client, walletChain, account, props.detailsButton?.displayBalanceToken);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.accountHeaderContainer, children: [(0, jsx_runtime_1.jsx)(WalletImage_js_1.WalletImage, { avatar: pfp, client: client, size: 70, theme: theme, wallet: wallet }), (0, jsx_runtime_1.jsx)(SmartAccountBadge, { client: props.client, theme: theme }), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "smd" }), (0, jsx_runtime_1.jsx)(Address_js_1.Address, { account: account, addressOrENS: name, theme: theme }), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "xxs" }), balanceQuery.data ? ((0, jsx_runtime_1.jsxs)(text_js_1.ThemedText, { style: {
                    fontSize: index_js_1.fontSize.sm,
                }, theme: theme, type: "subtext", children: [(0, formatNumber_js_1.formatNumber)(Number(balanceQuery.data.displayValue), 5), " ", balanceQuery.data?.symbol] })) : ((0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { style: { height: 16, width: 80 }, theme: theme }))] }));
};
const WalletActionsRow = (props) => {
    const { theme, setModalState } = props;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.walletActionRowContainer, children: [(0, jsx_runtime_1.jsxs)(button_js_1.ThemedButton, { onPress: () => setModalState({ screen: "send" }), style: styles.walletActionButton, theme: theme, variant: "secondary", children: [(0, jsx_runtime_1.jsx)(RNImage_js_1.RNImage, { color: theme.colors.secondaryIconColor, data: svgs_js_1.SEND_ICON, size: 24, theme: theme }), (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { theme: theme, type: "defaultSemiBold", children: "Send" })] }), (0, jsx_runtime_1.jsxs)(button_js_1.ThemedButton, { onPress: () => setModalState({ screen: "receive" }), style: styles.walletActionButton, theme: theme, variant: "secondary", children: [(0, jsx_runtime_1.jsx)(RNImage_js_1.RNImage, { color: theme.colors.secondaryIconColor, data: svgs_js_1.RECEIVE_ICON, size: 24, theme: theme }), (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { theme: theme, type: "defaultSemiBold", children: "Receive" })] })] }));
};
const WalletMenu = (props) => {
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.walletMenuContainer, children: [(0, jsx_runtime_1.jsx)(ChainSwitcher, { ...props }), (0, jsx_runtime_1.jsx)(ViewFunds, { ...props }), (0, jsx_runtime_1.jsx)(DisconnectWallet, { ...props })] }));
};
const ChainSwitcher = (props) => {
    const { client, wallet, theme } = props;
    const chain = wallet.getChain();
    const { name } = (0, useChainQuery_js_1.useChainName)(chain);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.TouchableOpacity, { style: styles.walletMenuRow, children: [(0, jsx_runtime_1.jsx)(ChainIcon_js_1.ChainIcon, { chain: chain, client: client, size: 32, theme: theme }), name ? ((0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { theme: theme, type: "defaultSemiBold", children: name })) : ((0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { style: { height: 16, width: 80 }, theme: theme }))] }));
};
const ViewFunds = (props) => {
    const { theme, setModalState } = props;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.TouchableOpacity, { onPress: () => setModalState({ screen: "view_funds" }), style: styles.walletMenuRow, children: [(0, jsx_runtime_1.jsx)(RNImage_js_1.RNImage, { color: theme.colors.secondaryIconColor, data: svgs_js_1.COINS_ICON, size: 32, theme: theme }), (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { theme: theme, type: "defaultSemiBold", children: "View Funds" })] }));
};
const DisconnectWallet = (props) => {
    const { wallet, account, theme, onClose, onDisconnect } = props;
    const { disconnect } = (0, useDisconnect_js_1.useDisconnect)();
    const siweAuth = (0, useSiweAuth_js_1.useSiweAuth)(wallet, account, props.auth);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.TouchableOpacity, { onPress: () => {
            onClose?.();
            disconnect(wallet);
            if (siweAuth.isLoggedIn) {
                siweAuth.doLogout();
            }
            onDisconnect?.({
                wallet,
                account,
            });
        }, style: styles.walletMenuRow, children: [(0, jsx_runtime_1.jsx)(RNImage_js_1.RNImage, { color: theme.colors.secondaryIconColor, data: svgs_js_1.EXIT_ICON, size: 32, theme: theme }), (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { theme: theme, type: "defaultSemiBold", children: "Disconnect Wallet" })] }));
};
function SmartAccountBadge(props) {
    const activeAccount = (0, useActiveAccount_js_1.useActiveAccount)();
    const activeWallet = (0, useActiveWallet_js_1.useActiveWallet)();
    const isSW = (0, is_smart_wallet_js_1.isSmartWallet)(activeWallet);
    const chain = (0, useActiveWalletChain_js_1.useActiveWalletChain)();
    const { client, theme } = props;
    const [isSmartWalletDeployed, setIsSmartWalletDeployed] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (activeAccount && isSW && activeAccount.address && chain) {
            const contract = (0, contract_js_1.getContract)({
                address: activeAccount.address,
                chain,
                client,
            });
            (0, is_contract_deployed_js_1.isContractDeployed)(contract).then((isDeployed) => {
                setIsSmartWalletDeployed(isDeployed);
            });
        }
        else {
            setIsSmartWalletDeployed(false);
        }
    }, [activeAccount, chain, client, isSW]);
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            alignItems: "center",
            backgroundColor: theme.colors.secondaryButtonBg,
            borderRadius: index_js_1.radius.md,
            flexDirection: "row",
            gap: index_js_1.spacing.xs,
            justifyContent: "center",
            paddingLeft: index_js_1.spacing.sm,
            paddingRight: index_js_1.spacing.smd,
            paddingVertical: index_js_1.spacing.xs,
        }, children: [(0, jsx_runtime_1.jsx)(RNImage_js_1.RNImage, { color: theme.colors.accentButtonBg, data: svgs_js_1.SMART_WALLET_ICON, size: 14, theme: theme }), (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { style: { color: theme.colors.primaryText, fontSize: index_js_1.fontSize.xs }, theme: theme, children: "Smart Account" })] }));
    if (chain && activeAccount && isSW) {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "smd" }), isSmartWalletDeployed ? ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { onPress: () => react_native_1.Linking.openURL(`https://thirdweb.com/${chain.id}/${activeAccount.address}/account`), children: content })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { children: content }))] }));
    }
    return null;
}
const styles = react_native_1.StyleSheet.create({
    accountHeaderContainer: {
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        paddingHorizontal: index_js_1.spacing.lg,
    },
    embedContainer: {
        backgroundColor: "transparent",
        flex: 1,
        flexDirection: "column",
        width: "100%",
    },
    modalContainer: {
        borderTopLeftRadius: index_js_1.radius.lg,
        borderTopRightRadius: index_js_1.radius.lg,
        flex: 1,
        flexDirection: "column",
        width: "100%",
    },
    walletActionButton: { flex: 1, gap: index_js_1.spacing.smd, padding: index_js_1.spacing.smd },
    walletActionRowContainer: {
        alignItems: "center",
        flexDirection: "row",
        gap: index_js_1.spacing.md,
        justifyContent: "space-evenly",
        paddingHorizontal: index_js_1.spacing.lg,
    },
    walletMenuContainer: {
        flexDirection: "column",
        gap: index_js_1.spacing.lg,
        paddingHorizontal: index_js_1.spacing.lg,
    },
    walletMenuRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: index_js_1.spacing.md,
        justifyContent: "flex-start",
    },
});
//# sourceMappingURL=ConnectedModal.js.map