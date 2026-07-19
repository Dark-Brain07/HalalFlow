import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { getContract } from "../../../../contract/contract.js";
import { isContractDeployed } from "../../../../utils/bytecode/is-contract-deployed.js";
import { formatNumber } from "../../../../utils/formatNumber.js";
import { isSmartWallet } from "../../../../wallets/smart/is-smart-wallet.js";
import { useSiweAuth } from "../../../core/hooks/auth/useSiweAuth.js";
import { useChainName } from "../../../core/hooks/others/useChainQuery.js";
import { useActiveAccount } from "../../../core/hooks/wallets/useActiveAccount.js";
import { useActiveWallet } from "../../../core/hooks/wallets/useActiveWallet.js";
import { useActiveWalletChain } from "../../../core/hooks/wallets/useActiveWalletChain.js";
import { useDisconnect } from "../../../core/hooks/wallets/useDisconnect.js";
import { useConnectedWalletDetails } from "../../../core/utils/wallet.js";
import { fontSize, radius, spacing } from "../../design-system/index.js";
import { Address } from "../components/Address.js";
import { ThemedButton } from "../components/button.js";
import { ChainIcon } from "../components/ChainIcon.js";
import { Header } from "../components/Header.js";
import { RNImage } from "../components/RNImage.js";
import { Skeleton } from "../components/Skeleton.js";
import { Spacer } from "../components/spacer.js";
import { ThemedText } from "../components/text.js";
import { ThemedView } from "../components/view.js";
import { WalletImage } from "../components/WalletImage.js";
import { CLOSE_ICON, COINS_ICON, EXIT_ICON, RECEIVE_ICON, SEND_ICON, SMART_WALLET_ICON, } from "../icons/svgs.js";
import { ReceiveScreen } from "./ReceiveScreen.js";
import { SendScreen } from "./SendScreen.js";
import { TokenListScreen } from "./TokenListScreen.js";
export function ConnectedModal(props) {
    const { theme, containerType, client } = props;
    const [modalState, setModalState] = useState({
        screen: "account",
    });
    let content;
    switch (modalState.screen) {
        case "send": {
            content = (_jsx(SendScreen, { client: client, containerType: containerType, onBack: () => setModalState({ screen: "account" }), onClose: props.onClose, supportedTokens: props.supportedTokens, theme: theme }));
            break;
        }
        case "receive": {
            content = (_jsx(ReceiveScreen, { account: props.account, client: props.client, containerType: props.containerType, onBack: () => setModalState({ screen: "account" }), onClose: props.onClose, theme: theme, wallet: props.wallet }));
            break;
        }
        case "view_funds": {
            content = (_jsxs(_Fragment, { children: [_jsx(Header, { containerType: containerType, onBack: () => setModalState({ screen: "account" }), onClose: props.onClose, theme: theme, title: "View Funds" }), _jsx(Spacer, { size: "xl" }), _jsx(TokenListScreen, { client: client, supportedTokens: props.supportedTokens, theme: theme })] }));
            break;
        }
        default: {
            content = (_jsxs(_Fragment, { children: [props.onClose && (_jsx(TouchableOpacity, { onPress: props.onClose, style: {
                            padding: spacing.lg,
                            position: "absolute",
                            right: 0,
                            top: 0,
                            zIndex: 1,
                        }, children: _jsx(RNImage, { color: theme.colors.secondaryIconColor, data: CLOSE_ICON, size: 24, theme: theme }) })), _jsx(Spacer, { size: "xl" }), _jsx(AccountHeader, { ...props }), _jsx(Spacer, { size: "lg" }), _jsx(WalletActionsRow, { ...props, setModalState: setModalState }), _jsx(Spacer, { size: "lg" }), _jsx(WalletMenu, { ...props, setModalState: setModalState })] }));
        }
    }
    return (_jsx(ThemedView, { style: containerType === "modal"
            ? styles.modalContainer
            : styles.embedContainer, theme: theme, children: content }));
}
const AccountHeader = (props) => {
    const { account, wallet, theme, client } = props;
    const walletChain = useActiveWalletChain();
    const { pfp, name, balanceQuery } = useConnectedWalletDetails(props.client, walletChain, account, props.detailsButton?.displayBalanceToken);
    return (_jsxs(View, { style: styles.accountHeaderContainer, children: [_jsx(WalletImage, { avatar: pfp, client: client, size: 70, theme: theme, wallet: wallet }), _jsx(SmartAccountBadge, { client: props.client, theme: theme }), _jsx(Spacer, { size: "smd" }), _jsx(Address, { account: account, addressOrENS: name, theme: theme }), _jsx(Spacer, { size: "xxs" }), balanceQuery.data ? (_jsxs(ThemedText, { style: {
                    fontSize: fontSize.sm,
                }, theme: theme, type: "subtext", children: [formatNumber(Number(balanceQuery.data.displayValue), 5), " ", balanceQuery.data?.symbol] })) : (_jsx(Skeleton, { style: { height: 16, width: 80 }, theme: theme }))] }));
};
const WalletActionsRow = (props) => {
    const { theme, setModalState } = props;
    return (_jsxs(View, { style: styles.walletActionRowContainer, children: [_jsxs(ThemedButton, { onPress: () => setModalState({ screen: "send" }), style: styles.walletActionButton, theme: theme, variant: "secondary", children: [_jsx(RNImage, { color: theme.colors.secondaryIconColor, data: SEND_ICON, size: 24, theme: theme }), _jsx(ThemedText, { theme: theme, type: "defaultSemiBold", children: "Send" })] }), _jsxs(ThemedButton, { onPress: () => setModalState({ screen: "receive" }), style: styles.walletActionButton, theme: theme, variant: "secondary", children: [_jsx(RNImage, { color: theme.colors.secondaryIconColor, data: RECEIVE_ICON, size: 24, theme: theme }), _jsx(ThemedText, { theme: theme, type: "defaultSemiBold", children: "Receive" })] })] }));
};
const WalletMenu = (props) => {
    return (_jsxs(View, { style: styles.walletMenuContainer, children: [_jsx(ChainSwitcher, { ...props }), _jsx(ViewFunds, { ...props }), _jsx(DisconnectWallet, { ...props })] }));
};
const ChainSwitcher = (props) => {
    const { client, wallet, theme } = props;
    const chain = wallet.getChain();
    const { name } = useChainName(chain);
    return (_jsxs(TouchableOpacity, { style: styles.walletMenuRow, children: [_jsx(ChainIcon, { chain: chain, client: client, size: 32, theme: theme }), name ? (_jsx(ThemedText, { theme: theme, type: "defaultSemiBold", children: name })) : (_jsx(Skeleton, { style: { height: 16, width: 80 }, theme: theme }))] }));
};
const ViewFunds = (props) => {
    const { theme, setModalState } = props;
    return (_jsxs(TouchableOpacity, { onPress: () => setModalState({ screen: "view_funds" }), style: styles.walletMenuRow, children: [_jsx(RNImage, { color: theme.colors.secondaryIconColor, data: COINS_ICON, size: 32, theme: theme }), _jsx(ThemedText, { theme: theme, type: "defaultSemiBold", children: "View Funds" })] }));
};
const DisconnectWallet = (props) => {
    const { wallet, account, theme, onClose, onDisconnect } = props;
    const { disconnect } = useDisconnect();
    const siweAuth = useSiweAuth(wallet, account, props.auth);
    return (_jsxs(TouchableOpacity, { onPress: () => {
            onClose?.();
            disconnect(wallet);
            if (siweAuth.isLoggedIn) {
                siweAuth.doLogout();
            }
            onDisconnect?.({
                wallet,
                account,
            });
        }, style: styles.walletMenuRow, children: [_jsx(RNImage, { color: theme.colors.secondaryIconColor, data: EXIT_ICON, size: 32, theme: theme }), _jsx(ThemedText, { theme: theme, type: "defaultSemiBold", children: "Disconnect Wallet" })] }));
};
function SmartAccountBadge(props) {
    const activeAccount = useActiveAccount();
    const activeWallet = useActiveWallet();
    const isSW = isSmartWallet(activeWallet);
    const chain = useActiveWalletChain();
    const { client, theme } = props;
    const [isSmartWalletDeployed, setIsSmartWalletDeployed] = useState(false);
    useEffect(() => {
        if (activeAccount && isSW && activeAccount.address && chain) {
            const contract = getContract({
                address: activeAccount.address,
                chain,
                client,
            });
            isContractDeployed(contract).then((isDeployed) => {
                setIsSmartWalletDeployed(isDeployed);
            });
        }
        else {
            setIsSmartWalletDeployed(false);
        }
    }, [activeAccount, chain, client, isSW]);
    const content = (_jsxs(View, { style: {
            alignItems: "center",
            backgroundColor: theme.colors.secondaryButtonBg,
            borderRadius: radius.md,
            flexDirection: "row",
            gap: spacing.xs,
            justifyContent: "center",
            paddingLeft: spacing.sm,
            paddingRight: spacing.smd,
            paddingVertical: spacing.xs,
        }, children: [_jsx(RNImage, { color: theme.colors.accentButtonBg, data: SMART_WALLET_ICON, size: 14, theme: theme }), _jsx(ThemedText, { style: { color: theme.colors.primaryText, fontSize: fontSize.xs }, theme: theme, children: "Smart Account" })] }));
    if (chain && activeAccount && isSW) {
        return (_jsxs(_Fragment, { children: [_jsx(Spacer, { size: "smd" }), isSmartWalletDeployed ? (_jsx(TouchableOpacity, { onPress: () => Linking.openURL(`https://thirdweb.com/${chain.id}/${activeAccount.address}/account`), children: content })) : (_jsx(View, { children: content }))] }));
    }
    return null;
}
const styles = StyleSheet.create({
    accountHeaderContainer: {
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        paddingHorizontal: spacing.lg,
    },
    embedContainer: {
        backgroundColor: "transparent",
        flex: 1,
        flexDirection: "column",
        width: "100%",
    },
    modalContainer: {
        borderTopLeftRadius: radius.lg,
        borderTopRightRadius: radius.lg,
        flex: 1,
        flexDirection: "column",
        width: "100%",
    },
    walletActionButton: { flex: 1, gap: spacing.smd, padding: spacing.smd },
    walletActionRowContainer: {
        alignItems: "center",
        flexDirection: "row",
        gap: spacing.md,
        justifyContent: "space-evenly",
        paddingHorizontal: spacing.lg,
    },
    walletMenuContainer: {
        flexDirection: "column",
        gap: spacing.lg,
        paddingHorizontal: spacing.lg,
    },
    walletMenuRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: spacing.md,
        justifyContent: "flex-start",
    },
});
//# sourceMappingURL=ConnectedModal.js.map