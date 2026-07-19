"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectEmbed = ConnectEmbed;
exports.ConnectModal = ConnectModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_svg_1 = require("react-native-svg");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const useSiweAuth_js_1 = require("../../../core/hooks/auth/useSiweAuth.js");
const useActiveAccount_js_1 = require("../../../core/hooks/wallets/useActiveAccount.js");
const useActiveWallet_js_1 = require("../../../core/hooks/wallets/useActiveWallet.js");
const useDisconnect_js_1 = require("../../../core/hooks/wallets/useDisconnect.js");
const useIsAutoConnecting_js_1 = require("../../../core/hooks/wallets/useIsAutoConnecting.js");
const connection_manager_js_1 = require("../../../core/providers/connection-manager.js");
const wallet_js_1 = require("../../../core/utils/wallet.js");
const index_js_1 = require("../../design-system/index.js");
const defaultWallets_js_1 = require("../../wallets/defaultWallets.js");
const AutoConnect_js_1 = require("../AutoConnect/AutoConnect.js");
const button_js_1 = require("../components/button.js");
const Header_js_1 = require("../components/Header.js");
const RNImage_js_1 = require("../components/RNImage.js");
const spacer_js_1 = require("../components/spacer.js");
const text_js_1 = require("../components/text.js");
const view_js_1 = require("../components/view.js");
const WalletImage_js_1 = require("../components/WalletImage.js");
const svgs_js_1 = require("../icons/svgs.js");
const ErrorView_js_1 = require("./ErrorView.js");
const ExternalWalletsList_js_1 = require("./ExternalWalletsList.js");
const InAppWalletUI_js_1 = require("./InAppWalletUI.js");
const LoadingView_js_1 = require("./LoadingView.js");
const WalletLoadingThumbnail_js_1 = require("./WalletLoadingThumbnail.js");
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
function ConnectEmbed(props) {
    const theme = (0, CustomThemeProvider_js_1.parseTheme)(props.theme);
    const wallet = (0, useActiveWallet_js_1.useActiveWallet)();
    const account = (0, useActiveAccount_js_1.useActiveAccount)();
    const siweAuth = (0, useSiweAuth_js_1.useSiweAuth)(wallet, account, props.auth);
    const needsAuth = siweAuth.requiresAuth && !siweAuth.isLoggedIn;
    const isConnected = wallet && !needsAuth;
    const adaptedProps = {
        ...props,
        connectModal: { ...props },
    };
    const isAutoConnecting = (0, useIsAutoConnecting_js_1.useIsAutoConnecting)();
    const wallets = props.wallets || (0, defaultWallets_js_1.getDefaultWallets)(props);
    const autoConnectComp = props.autoConnect !== false && ((0, jsx_runtime_1.jsx)(AutoConnect_js_1.AutoConnect, { accountAbstraction: props.accountAbstraction, appMetadata: props.appMetadata, chain: props.chain, client: props.client, onConnect: props.onConnect, siweAuth: siweAuth, timeout: typeof props.autoConnect === "boolean"
            ? undefined
            : props.autoConnect?.timeout, wallets: wallets }));
    if (isAutoConnecting) {
        return (0, jsx_runtime_1.jsx)(LoadingView_js_1.LoadingView, { theme: theme });
    }
    return isConnected ? (autoConnectComp) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ConnectModal, { ...adaptedProps, containerType: "embed", siweAuth: siweAuth, theme: theme }), autoConnectComp] }));
}
function ConnectModal(props) {
    const { theme, client, containerType, accountAbstraction, onConnect, onClose, siweAuth, } = props;
    const wallet = (0, useActiveWallet_js_1.useActiveWallet)();
    const needsAuth = wallet && siweAuth.requiresAuth && !siweAuth.isLoggedIn;
    const [modalState, setModalState] = (0, react_1.useState)(needsAuth ? { screen: "auth" } : { screen: "base" });
    const wallets = props.wallets || (0, defaultWallets_js_1.getDefaultWallets)(props);
    const inAppWallet = wallets.find((wallet) => wallet.id === "inApp");
    const externalWallets = wallets
        .filter((wallet) => wallet.id !== "inApp")
        .filter((wallet) => !props.hiddenWallets?.includes(wallet.id));
    const showBranding = props.connectModal?.showThirdwebBranding !== false;
    const connectionManager = (0, connection_manager_js_1.useConnectionManager)();
    const connector = (0, react_1.useCallback)(async (args) => {
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
            content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Header_js_1.Header, { containerType: containerType, onBack: () => setModalState({ screen: "base" }), onClose: props.onClose, theme: theme, title: props.connectModal?.title || "Sign in" }), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "xl" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flexDirection: "column",
                            gap: index_js_1.spacing.md,
                            paddingHorizontal: containerType === "modal" ? index_js_1.spacing.lg : 0,
                        }, children: (0, jsx_runtime_1.jsx)(InAppWalletUI_js_1.OtpLogin, { auth: modalState.auth, client: client, connector: connector, setScreen: setModalState, theme: theme, wallet: modalState.wallet }) }), containerType === "modal" ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })) : ((0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "md" }))] }));
            break;
        }
        case "external_wallets": {
            content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Header_js_1.Header, { containerType: containerType, onBack: () => setModalState({ screen: "base" }), onClose: props.onClose, theme: theme, title: props.connectModal?.title || "Sign in" }), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "lg" }), (0, jsx_runtime_1.jsx)(ExternalWalletsList_js_1.ExternalWalletsList, { client: client, connector: connector, containerType: containerType, externalWallets: externalWallets, onShowAllWallets: () => setModalState({ screen: "all_wallets" }), showAllWalletsButton: props.showAllWallets !== false, theme: theme })] }));
            break;
        }
        case "all_wallets": {
            content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Header_js_1.Header, { containerType: containerType, onBack: () => inAppWallet
                            ? setModalState({ screen: "external_wallets" })
                            : setModalState({ screen: "base" }), onClose: props.onClose, theme: theme, title: props.connectModal?.title || "Select Wallet" }), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "lg" }), (0, jsx_runtime_1.jsx)(ExternalWalletsList_js_1.AllWalletsList, { client: client, connector: connector, containerType: containerType, externalWallets: externalWallets, theme: theme })] }));
            break;
        }
        case "connecting": {
            content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Header_js_1.Header, { containerType: containerType, onBack: () => setModalState({ screen: "base" }), onClose: props.onClose, theme: theme, title: props.connectModal?.title || "Sign in" }), containerType === "modal" ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })) : ((0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "lg" })), (0, jsx_runtime_1.jsx)(WalletLoadingView, { authProvider: modalState.authMethod, client: client, theme: theme, wallet: modalState.wallet }), containerType === "modal" ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })) : ((0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "md" }))] }));
            break;
        }
        case "passkey": {
            content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Header_js_1.Header, { containerType: containerType, onBack: () => setModalState({ screen: "base" }), onClose: props.onClose, theme: theme, title: props.connectModal?.title || "Sign in" }), containerType === "modal" ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })) : ((0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "lg" })), (0, jsx_runtime_1.jsx)(InAppWalletUI_js_1.PasskeyView, { client: client, connector: connector, setScreen: setModalState, theme: theme, wallet: modalState.wallet }), containerType === "modal" ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })) : ((0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "md" }))] }));
            break;
        }
        case "auth": {
            content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Header_js_1.Header, { containerType: containerType, onBack: props.onClose, onClose: props.onClose, theme: theme, title: props.connectModal?.title || "Sign in" }), containerType === "modal" ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })) : ((0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "lg" })), (0, jsx_runtime_1.jsx)(SignInView, { client: client, onDisconnect: () => setModalState({ screen: "base" }), onError: (error) => setModalState({ error, screen: "error" }), onSignIn: () => props.onClose?.(), siweAuth: siweAuth, theme: theme }), containerType === "modal" ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })) : ((0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "md" }))] }));
            break;
        }
        case "error": {
            content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Header_js_1.Header, { containerType: containerType, onBack: () => setModalState({ screen: "base" }), onClose: props.onClose, theme: theme, title: props.connectModal?.title || "Sign in" }), containerType === "modal" ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })) : ((0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "lg" })), (0, jsx_runtime_1.jsx)(ErrorView_js_1.ErrorView, { theme: theme, title: modalState.error }), containerType === "modal" ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })) : ((0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "md" }))] }));
            break;
        }
        default: {
            content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Header_js_1.Header, { containerType: containerType, onClose: props.onClose, theme: theme, title: props.connectModal?.title || "Sign in" }), inAppWallet ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [containerType === "modal" ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })) : ((0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "lg" })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                    flexDirection: "column",
                                    gap: index_js_1.spacing.md,
                                    paddingHorizontal: containerType === "modal" ? index_js_1.spacing.lg : 0,
                                }, children: [(0, jsx_runtime_1.jsx)(InAppWalletUI_js_1.InAppWalletUI, { client: client, connector: connector, setScreen: setModalState, theme: theme, wallet: inAppWallet }), externalWallets.length > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(OrDivider, { theme: theme }), (0, jsx_runtime_1.jsx)(button_js_1.ThemedButtonWithIcon, { icon: svgs_js_1.WALLET_ICON, onPress: () => setModalState({ screen: "external_wallets" }), theme: theme, title: "Connect a wallet" })] })) : null] }), containerType === "modal" ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })) : ((0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "md" }))] })) : externalWallets.length > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "xl" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    flex: 1,
                                }, children: (0, jsx_runtime_1.jsx)(ExternalWalletsList_js_1.ExternalWalletsList, { client: client, connector: connector, containerType: containerType, externalWallets: externalWallets, onShowAllWallets: () => setModalState({ screen: "all_wallets" }), showAllWalletsButton: props.showAllWallets !== false, theme: theme }) })] })) : null] }));
        }
    }
    return ((0, jsx_runtime_1.jsxs)(view_js_1.ThemedView, { style: containerType === "modal"
            ? styles.modalContainer
            : styles.embedContainer, theme: theme, children: [content, showBranding && (0, jsx_runtime_1.jsx)(PoweredByThirdweb, { theme: theme })] }));
}
function WalletLoadingView({ theme, wallet, client, authProvider, }) {
    const walletInfo = (0, wallet_js_1.useWalletInfo)(wallet.id);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            alignItems: "center",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            paddingVertical: index_js_1.spacing.xl,
        }, children: [(0, jsx_runtime_1.jsx)(WalletLoadingThumbnail_js_1.default, { animate: true, imageSize: 100, roundLoader: authProvider === "passkey", theme: theme, children: authProvider ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        borderRadius: index_js_1.spacing.md,
                        padding: index_js_1.spacing.sm,
                    }, children: (0, jsx_runtime_1.jsx)(RNImage_js_1.RNImage, { color: theme.colors.accentButtonBg, data: (0, WalletImage_js_1.getAuthProviderImage)(authProvider), size: 80, theme: theme }) })) : ((0, jsx_runtime_1.jsx)(WalletImage_js_1.WalletImage, { client: client, size: 90, theme: theme, wallet: wallet })) }), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "xl" }), (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { theme: theme, type: "subtitle", children: authProvider
                    ? `Connecting with ${capitalizeFirstLetter(authProvider)}`
                    : "Awaiting confirmation" }), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "sm" }), (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { theme: theme, type: "subtext", children: authProvider
                    ? `Signing into your ${capitalizeFirstLetter(authProvider)} account`
                    : `Accept the connection request in ${walletInfo.data?.name}` })] }));
}
function SignInView({ theme, siweAuth, client, onSignIn, onError, onDisconnect, }) {
    const wallet = (0, useActiveWallet_js_1.useActiveWallet)();
    const walletInfo = (0, wallet_js_1.useWalletInfo)(wallet?.id);
    const { disconnect } = (0, useDisconnect_js_1.useDisconnect)();
    const isSigningIn = siweAuth.isLoggingIn || siweAuth.isLoading;
    return (wallet && ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            alignItems: "center",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            padding: index_js_1.spacing.xl,
        }, children: [(0, jsx_runtime_1.jsx)(WalletLoadingThumbnail_js_1.default, { animate: isSigningIn, imageSize: 100, theme: theme, children: (0, jsx_runtime_1.jsx)(WalletImage_js_1.WalletImage, { client: client, size: 90, theme: theme, wallet: wallet }) }), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "xl" }), (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { theme: theme, type: "subtitle", children: "Complete sign in" }), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "xs" }), (0, jsx_runtime_1.jsxs)(text_js_1.ThemedText, { theme: theme, type: "subtext", children: ["Sign login request in ", walletInfo.data?.name, " to continue"] }), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "xl" }), (0, jsx_runtime_1.jsx)(button_js_1.ThemedButton, { disabled: isSigningIn, onPress: async () => {
                    try {
                        await siweAuth.doLogin();
                        onSignIn();
                    }
                    catch (e) {
                        onError(e?.message || "Unknown error");
                    }
                }, style: { width: "100%" }, theme: theme, variant: "accent", children: (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { style: {
                        color: theme.colors.accentButtonText,
                    }, theme: theme, type: "defaultSemiBold", children: "Sign login request" }) }), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "md" }), (0, jsx_runtime_1.jsx)(button_js_1.ThemedButton, { disabled: isSigningIn, onPress: async () => {
                    disconnect(wallet);
                    siweAuth.doLogout();
                    onDisconnect();
                }, style: { width: "100%" }, theme: theme, variant: "secondary", children: (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { style: {
                        color: theme.colors.secondaryButtonText,
                    }, theme: theme, type: "defaultSemiBold", children: "Disconnect" }) })] })));
}
function OrDivider({ theme }) {
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            alignItems: "center",
            flexDirection: "row",
            gap: index_js_1.spacing.lg,
            justifyContent: "center",
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    backgroundColor: theme.colors.borderColor,
                    flex: 1,
                    height: 1,
                } }), (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { style: { color: theme.colors.secondaryText }, theme: theme, children: "OR" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    backgroundColor: theme.colors.borderColor,
                    flex: 1,
                    height: 1,
                } })] }));
}
function PoweredByThirdweb({ theme }) {
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            alignItems: "center",
            flexDirection: "row",
            gap: index_js_1.spacing.xs,
            justifyContent: "center",
            paddingBottom: react_native_1.Platform.OS === "android" ? index_js_1.spacing.md : index_js_1.spacing.lg,
        }, children: [(0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { theme: theme, type: "subtext", children: "Powered by" }), (0, jsx_runtime_1.jsx)(react_native_svg_1.SvgXml, { color: theme.colors.secondaryText, height: 22, style: { marginBottom: -2 }, width: 22, xml: svgs_js_1.TW_ICON }), (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { style: { fontWeight: "600" }, theme: theme, type: "subtext", children: "thirdweb" })] }));
}
function capitalizeFirstLetter(str) {
    if (!str)
        return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const styles = react_native_1.StyleSheet.create({
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
});
//# sourceMappingURL=ConnectModal.js.map