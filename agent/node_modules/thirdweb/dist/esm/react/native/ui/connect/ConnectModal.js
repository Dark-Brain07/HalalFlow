import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { parseTheme } from "../../../core/design-system/CustomThemeProvider.js";
import { useSiweAuth } from "../../../core/hooks/auth/useSiweAuth.js";
import { useActiveAccount } from "../../../core/hooks/wallets/useActiveAccount.js";
import { useActiveWallet } from "../../../core/hooks/wallets/useActiveWallet.js";
import { useDisconnect } from "../../../core/hooks/wallets/useDisconnect.js";
import { useIsAutoConnecting } from "../../../core/hooks/wallets/useIsAutoConnecting.js";
import { useConnectionManager } from "../../../core/providers/connection-manager.js";
import { useWalletInfo } from "../../../core/utils/wallet.js";
import { radius, spacing } from "../../design-system/index.js";
import { getDefaultWallets } from "../../wallets/defaultWallets.js";
import { AutoConnect } from "../AutoConnect/AutoConnect.js";
import { ThemedButton, ThemedButtonWithIcon } from "../components/button.js";
import { Header } from "../components/Header.js";
import { RNImage } from "../components/RNImage.js";
import { Spacer } from "../components/spacer.js";
import { ThemedText } from "../components/text.js";
import { ThemedView } from "../components/view.js";
import { getAuthProviderImage, WalletImage, } from "../components/WalletImage.js";
import { TW_ICON, WALLET_ICON } from "../icons/svgs.js";
import { ErrorView } from "./ErrorView.js";
import { AllWalletsList, ExternalWalletsList } from "./ExternalWalletsList.js";
import { InAppWalletUI, OtpLogin, PasskeyView } from "./InAppWalletUI.js";
import { LoadingView } from "./LoadingView.js";
import WalletLoadingThumbnail from "./WalletLoadingThumbnail.js";
/**
 * A component that allows the user to connect their wallet.
 *
 * it renders the same UI as the [`ConnectButton`](https://portal.thirdweb.com/react/v4/components/ConnectButton) component's modal - but directly on the page instead of being in a modal.
 *
 * It only renders UI if wallet is not connected
 * @example
 * ```tsx
 * <ConnectEmbed
 *    client={client}
 * />
 * ```
 * @param props -
 * The props for the `ConnectEmbed` component.
 *
 * Refer to the [`ConnectEmbedProps`](https://portal.thirdweb.com/references/typescript/v5/ConnectEmbedProps) type for more details
 * @component
 * @walletConnection
 */
export function ConnectEmbed(props) {
    const theme = parseTheme(props.theme);
    const wallet = useActiveWallet();
    const account = useActiveAccount();
    const siweAuth = useSiweAuth(wallet, account, props.auth);
    const needsAuth = siweAuth.requiresAuth && !siweAuth.isLoggedIn;
    const isConnected = wallet && !needsAuth;
    const adaptedProps = {
        ...props,
        connectModal: { ...props },
    };
    const isAutoConnecting = useIsAutoConnecting();
    const wallets = props.wallets || getDefaultWallets(props);
    const autoConnectComp = props.autoConnect !== false && (_jsx(AutoConnect, { accountAbstraction: props.accountAbstraction, appMetadata: props.appMetadata, chain: props.chain, client: props.client, onConnect: props.onConnect, siweAuth: siweAuth, timeout: typeof props.autoConnect === "boolean"
            ? undefined
            : props.autoConnect?.timeout, wallets: wallets }));
    if (isAutoConnecting) {
        return _jsx(LoadingView, { theme: theme });
    }
    return isConnected ? (autoConnectComp) : (_jsxs(_Fragment, { children: [_jsx(ConnectModal, { ...adaptedProps, containerType: "embed", siweAuth: siweAuth, theme: theme }), autoConnectComp] }));
}
export function ConnectModal(props) {
    const { theme, client, containerType, accountAbstraction, onConnect, onClose, siweAuth, } = props;
    const wallet = useActiveWallet();
    const needsAuth = wallet && siweAuth.requiresAuth && !siweAuth.isLoggedIn;
    const [modalState, setModalState] = useState(needsAuth ? { screen: "auth" } : { screen: "base" });
    const wallets = props.wallets || getDefaultWallets(props);
    const inAppWallet = wallets.find((wallet) => wallet.id === "inApp");
    const externalWallets = wallets
        .filter((wallet) => wallet.id !== "inApp")
        .filter((wallet) => !props.hiddenWallets?.includes(wallet.id));
    const showBranding = props.connectModal?.showThirdwebBranding !== false;
    const connectionManager = useConnectionManager();
    const connector = useCallback(async (args) => {
        setModalState({
            authMethod: args.authMethod,
            screen: "connecting",
            wallet: args.wallet,
        });
        try {
            const w = await args.connectFn(props.chain);
            await connectionManager.connect(w, {
                accountAbstraction,
                client,
                onConnect,
            });
            if (siweAuth.requiresAuth && !siweAuth.isLoggedIn) {
                // if in-app wallet, signin headlessly
                // TODO (rn) handle signless smart wallets as well
                if (w.id === "inApp") {
                    await siweAuth.doLogin();
                    onClose?.();
                }
                else {
                    setModalState({
                        screen: "auth",
                    });
                }
            }
            else {
                onClose?.();
            }
        }
        catch (error) {
            setModalState({
                error: error?.message || "Unknown error",
                screen: "error",
            });
        }
    }, [
        client,
        accountAbstraction,
        onConnect,
        onClose,
        siweAuth,
        connectionManager,
        props.chain,
    ]);
    let content;
    switch (modalState.screen) {
        case "otp": {
            content = (_jsxs(_Fragment, { children: [_jsx(Header, { containerType: containerType, onBack: () => setModalState({ screen: "base" }), onClose: props.onClose, theme: theme, title: props.connectModal?.title || "Sign in" }), _jsx(Spacer, { size: "xl" }), _jsx(View, { style: {
                            flexDirection: "column",
                            gap: spacing.md,
                            paddingHorizontal: containerType === "modal" ? spacing.lg : 0,
                        }, children: _jsx(OtpLogin, { auth: modalState.auth, client: client, connector: connector, setScreen: setModalState, theme: theme, wallet: modalState.wallet }) }), containerType === "modal" ? (_jsx(View, { style: { flex: 1 } })) : (_jsx(Spacer, { size: "md" }))] }));
            break;
        }
        case "external_wallets": {
            content = (_jsxs(_Fragment, { children: [_jsx(Header, { containerType: containerType, onBack: () => setModalState({ screen: "base" }), onClose: props.onClose, theme: theme, title: props.connectModal?.title || "Sign in" }), _jsx(Spacer, { size: "lg" }), _jsx(ExternalWalletsList, { client: client, connector: connector, containerType: containerType, externalWallets: externalWallets, onShowAllWallets: () => setModalState({ screen: "all_wallets" }), showAllWalletsButton: props.showAllWallets !== false, theme: theme })] }));
            break;
        }
        case "all_wallets": {
            content = (_jsxs(_Fragment, { children: [_jsx(Header, { containerType: containerType, onBack: () => inAppWallet
                            ? setModalState({ screen: "external_wallets" })
                            : setModalState({ screen: "base" }), onClose: props.onClose, theme: theme, title: props.connectModal?.title || "Select Wallet" }), _jsx(Spacer, { size: "lg" }), _jsx(AllWalletsList, { client: client, connector: connector, containerType: containerType, externalWallets: externalWallets, theme: theme })] }));
            break;
        }
        case "connecting": {
            content = (_jsxs(_Fragment, { children: [_jsx(Header, { containerType: containerType, onBack: () => setModalState({ screen: "base" }), onClose: props.onClose, theme: theme, title: props.connectModal?.title || "Sign in" }), containerType === "modal" ? (_jsx(View, { style: { flex: 1 } })) : (_jsx(Spacer, { size: "lg" })), _jsx(WalletLoadingView, { authProvider: modalState.authMethod, client: client, theme: theme, wallet: modalState.wallet }), containerType === "modal" ? (_jsx(View, { style: { flex: 1 } })) : (_jsx(Spacer, { size: "md" }))] }));
            break;
        }
        case "passkey": {
            content = (_jsxs(_Fragment, { children: [_jsx(Header, { containerType: containerType, onBack: () => setModalState({ screen: "base" }), onClose: props.onClose, theme: theme, title: props.connectModal?.title || "Sign in" }), containerType === "modal" ? (_jsx(View, { style: { flex: 1 } })) : (_jsx(Spacer, { size: "lg" })), _jsx(PasskeyView, { client: client, connector: connector, setScreen: setModalState, theme: theme, wallet: modalState.wallet }), containerType === "modal" ? (_jsx(View, { style: { flex: 1 } })) : (_jsx(Spacer, { size: "md" }))] }));
            break;
        }
        case "auth": {
            content = (_jsxs(_Fragment, { children: [_jsx(Header, { containerType: containerType, onBack: props.onClose, onClose: props.onClose, theme: theme, title: props.connectModal?.title || "Sign in" }), containerType === "modal" ? (_jsx(View, { style: { flex: 1 } })) : (_jsx(Spacer, { size: "lg" })), _jsx(SignInView, { client: client, onDisconnect: () => setModalState({ screen: "base" }), onError: (error) => setModalState({ error, screen: "error" }), onSignIn: () => props.onClose?.(), siweAuth: siweAuth, theme: theme }), containerType === "modal" ? (_jsx(View, { style: { flex: 1 } })) : (_jsx(Spacer, { size: "md" }))] }));
            break;
        }
        case "error": {
            content = (_jsxs(_Fragment, { children: [_jsx(Header, { containerType: containerType, onBack: () => setModalState({ screen: "base" }), onClose: props.onClose, theme: theme, title: props.connectModal?.title || "Sign in" }), containerType === "modal" ? (_jsx(View, { style: { flex: 1 } })) : (_jsx(Spacer, { size: "lg" })), _jsx(ErrorView, { theme: theme, title: modalState.error }), containerType === "modal" ? (_jsx(View, { style: { flex: 1 } })) : (_jsx(Spacer, { size: "md" }))] }));
            break;
        }
        default: {
            content = (_jsxs(_Fragment, { children: [_jsx(Header, { containerType: containerType, onClose: props.onClose, theme: theme, title: props.connectModal?.title || "Sign in" }), inAppWallet ? (_jsxs(_Fragment, { children: [containerType === "modal" ? (_jsx(View, { style: { flex: 1 } })) : (_jsx(Spacer, { size: "lg" })), _jsxs(View, { style: {
                                    flexDirection: "column",
                                    gap: spacing.md,
                                    paddingHorizontal: containerType === "modal" ? spacing.lg : 0,
                                }, children: [_jsx(InAppWalletUI, { client: client, connector: connector, setScreen: setModalState, theme: theme, wallet: inAppWallet }), externalWallets.length > 0 ? (_jsxs(_Fragment, { children: [_jsx(OrDivider, { theme: theme }), _jsx(ThemedButtonWithIcon, { icon: WALLET_ICON, onPress: () => setModalState({ screen: "external_wallets" }), theme: theme, title: "Connect a wallet" })] })) : null] }), containerType === "modal" ? (_jsx(View, { style: { flex: 1 } })) : (_jsx(Spacer, { size: "md" }))] })) : externalWallets.length > 0 ? (_jsxs(_Fragment, { children: [_jsx(Spacer, { size: "xl" }), _jsx(View, { style: {
                                    flex: 1,
                                }, children: _jsx(ExternalWalletsList, { client: client, connector: connector, containerType: containerType, externalWallets: externalWallets, onShowAllWallets: () => setModalState({ screen: "all_wallets" }), showAllWalletsButton: props.showAllWallets !== false, theme: theme }) })] })) : null] }));
        }
    }
    return (_jsxs(ThemedView, { style: containerType === "modal"
            ? styles.modalContainer
            : styles.embedContainer, theme: theme, children: [content, showBranding && _jsx(PoweredByThirdweb, { theme: theme })] }));
}
function WalletLoadingView({ theme, wallet, client, authProvider, }) {
    const walletInfo = useWalletInfo(wallet.id);
    return (_jsxs(View, { style: {
            alignItems: "center",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            paddingVertical: spacing.xl,
        }, children: [_jsx(WalletLoadingThumbnail, { animate: true, imageSize: 100, roundLoader: authProvider === "passkey", theme: theme, children: authProvider ? (_jsx(View, { style: {
                        borderRadius: spacing.md,
                        padding: spacing.sm,
                    }, children: _jsx(RNImage, { color: theme.colors.accentButtonBg, data: getAuthProviderImage(authProvider), size: 80, theme: theme }) })) : (_jsx(WalletImage, { client: client, size: 90, theme: theme, wallet: wallet })) }), _jsx(Spacer, { size: "xl" }), _jsx(ThemedText, { theme: theme, type: "subtitle", children: authProvider
                    ? `Connecting with ${capitalizeFirstLetter(authProvider)}`
                    : "Awaiting confirmation" }), _jsx(Spacer, { size: "sm" }), _jsx(ThemedText, { theme: theme, type: "subtext", children: authProvider
                    ? `Signing into your ${capitalizeFirstLetter(authProvider)} account`
                    : `Accept the connection request in ${walletInfo.data?.name}` })] }));
}
function SignInView({ theme, siweAuth, client, onSignIn, onError, onDisconnect, }) {
    const wallet = useActiveWallet();
    const walletInfo = useWalletInfo(wallet?.id);
    const { disconnect } = useDisconnect();
    const isSigningIn = siweAuth.isLoggingIn || siweAuth.isLoading;
    return (wallet && (_jsxs(View, { style: {
            alignItems: "center",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            padding: spacing.xl,
        }, children: [_jsx(WalletLoadingThumbnail, { animate: isSigningIn, imageSize: 100, theme: theme, children: _jsx(WalletImage, { client: client, size: 90, theme: theme, wallet: wallet }) }), _jsx(Spacer, { size: "xl" }), _jsx(ThemedText, { theme: theme, type: "subtitle", children: "Complete sign in" }), _jsx(Spacer, { size: "xs" }), _jsxs(ThemedText, { theme: theme, type: "subtext", children: ["Sign login request in ", walletInfo.data?.name, " to continue"] }), _jsx(Spacer, { size: "xl" }), _jsx(ThemedButton, { disabled: isSigningIn, onPress: async () => {
                    try {
                        await siweAuth.doLogin();
                        onSignIn();
                    }
                    catch (e) {
                        onError(e?.message || "Unknown error");
                    }
                }, style: { width: "100%" }, theme: theme, variant: "accent", children: _jsx(ThemedText, { style: {
                        color: theme.colors.accentButtonText,
                    }, theme: theme, type: "defaultSemiBold", children: "Sign login request" }) }), _jsx(Spacer, { size: "md" }), _jsx(ThemedButton, { disabled: isSigningIn, onPress: async () => {
                    disconnect(wallet);
                    siweAuth.doLogout();
                    onDisconnect();
                }, style: { width: "100%" }, theme: theme, variant: "secondary", children: _jsx(ThemedText, { style: {
                        color: theme.colors.secondaryButtonText,
                    }, theme: theme, type: "defaultSemiBold", children: "Disconnect" }) })] })));
}
function OrDivider({ theme }) {
    return (_jsxs(View, { style: {
            alignItems: "center",
            flexDirection: "row",
            gap: spacing.lg,
            justifyContent: "center",
        }, children: [_jsx(View, { style: {
                    backgroundColor: theme.colors.borderColor,
                    flex: 1,
                    height: 1,
                } }), _jsx(ThemedText, { style: { color: theme.colors.secondaryText }, theme: theme, children: "OR" }), _jsx(View, { style: {
                    backgroundColor: theme.colors.borderColor,
                    flex: 1,
                    height: 1,
                } })] }));
}
function PoweredByThirdweb({ theme }) {
    return (_jsxs(View, { style: {
            alignItems: "center",
            flexDirection: "row",
            gap: spacing.xs,
            justifyContent: "center",
            paddingBottom: Platform.OS === "android" ? spacing.md : spacing.lg,
        }, children: [_jsx(ThemedText, { theme: theme, type: "subtext", children: "Powered by" }), _jsx(SvgXml, { color: theme.colors.secondaryText, height: 22, style: { marginBottom: -2 }, width: 22, xml: TW_ICON }), _jsx(ThemedText, { style: { fontWeight: "600" }, theme: theme, type: "subtext", children: "thirdweb" })] }));
}
function capitalizeFirstLetter(str) {
    if (!str)
        return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const styles = StyleSheet.create({
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
});
//# sourceMappingURL=ConnectModal.js.map