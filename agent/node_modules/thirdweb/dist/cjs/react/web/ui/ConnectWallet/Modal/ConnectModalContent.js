"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectModalContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useSiweAuth_js_1 = require("../../../../core/hooks/auth/useSiweAuth.js");
const useActiveAccount_js_1 = require("../../../../core/hooks/wallets/useActiveAccount.js");
const useActiveWallet_js_1 = require("../../../../core/hooks/wallets/useActiveWallet.js");
const useSetActiveWallet_js_1 = require("../../../../core/hooks/wallets/useSetActiveWallet.js");
const connection_manager_js_1 = require("../../../../core/providers/connection-manager.js");
const wallet_ui_states_provider_js_1 = require("../../../providers/wallet-ui-states-provider.js");
const LoadingScreen_js_1 = require("../../../wallets/shared/LoadingScreen.js");
const constants_js_1 = require("../constants.js");
const SignatureScreen_js_1 = require("../screens/SignatureScreen.js");
const StartScreen_js_1 = require("../screens/StartScreen.js");
const WalletSelector_js_1 = require("../WalletSelector.js");
const AnyWalletConnectUI_js_1 = require("./AnyWalletConnectUI.js");
const ConnectModalSkeleton_js_1 = require("./ConnectModalSkeleton.js");
const SmartWalletConnectUI_js_1 = require("./SmartWalletConnectUI.js");
const screen_js_1 = require("./screen.js");
const AllWalletsUI = /* @__PURE__ */ (0, react_1.lazy)(() => Promise.resolve().then(() => require("./AllWalletsUI.js")));
/**
 * @internal
 */
const ConnectModalContent = (props) => {
    const { setModalVisibility, onClose, shouldSetActive } = props;
    const { screen, setScreen, initialScreen } = props.screenSetup;
    const setActiveWallet = (0, useSetActiveWallet_js_1.useSetActiveWallet)();
    const setSelectionData = (0, wallet_ui_states_provider_js_1.useSetSelectionData)();
    const activeWallet = (0, useActiveWallet_js_1.useActiveWallet)();
    const activeAccount = (0, useActiveAccount_js_1.useActiveAccount)();
    const siweAuth = (0, useSiweAuth_js_1.useSiweAuth)(activeWallet, activeAccount, props.auth);
    const showSignatureScreen = siweAuth.requiresAuth && !siweAuth.isLoggedIn;
    const connectionManager = (0, connection_manager_js_1.useConnectionManager)();
    const handleConnected = (0, react_1.useCallback)((wallet) => {
        if (shouldSetActive) {
            setActiveWallet(wallet);
        }
        else {
            connectionManager.addConnectedWallet(wallet);
        }
        if (props.onConnect) {
            props.onConnect(wallet, connectionManager.connectedWallets.getValue());
        }
        (0, constants_js_1.onModalUnmount)(() => {
            setSelectionData({});
            setModalVisibility(true);
        });
        // show sign in screen if required
        if (showSignatureScreen) {
            setScreen(constants_js_1.reservedScreens.signIn);
        }
        else {
            setScreen(initialScreen);
            onClose?.();
        }
    }, [
        setModalVisibility,
        onClose,
        props.onConnect,
        setActiveWallet,
        showSignatureScreen,
        setScreen,
        setSelectionData,
        shouldSetActive,
        initialScreen,
        connectionManager,
    ]);
    const handleBack = (0, react_1.useCallback)(() => {
        setSelectionData({});
        setScreen(initialScreen);
    }, [setScreen, initialScreen, setSelectionData]);
    const walletList = ((0, jsx_runtime_1.jsx)(WalletSelector_js_1.WalletSelector, { accountAbstraction: props.accountAbstraction, chain: props.chain, chains: props.chains, client: props.client, connectLocale: props.connectLocale, done: handleConnected, goBack: props.wallets.length > 1 ? handleBack : undefined, hideHeader: props.hideHeader, meta: props.meta, modalHeader: props.modalHeader, onShowAll: () => {
            setScreen(constants_js_1.reservedScreens.showAll);
        }, recommendedWallets: props.recommendedWallets, selectWallet: (newWallet) => {
            if (newWallet.onConnectRequested) {
                newWallet
                    .onConnectRequested()
                    .then(() => setScreen(newWallet))
                    .catch(console.error); // TODO propagate error down
            }
            else {
                setScreen(newWallet);
            }
        }, setModalVisibility: setModalVisibility, showAllWallets: props.showAllWallets, size: props.size, title: props.meta.title || props.connectLocale.defaultModalTitle, walletConnect: props.walletConnect, walletIdsToHide: props.walletIdsToHide, wallets: props.wallets }));
    const showAll = ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)(LoadingScreen_js_1.LoadingScreen, {}), children: (0, jsx_runtime_1.jsx)(AllWalletsUI, { client: props.client, connectLocale: props.connectLocale, onBack: handleBack, onSelect: setScreen, recommendedWallets: props.recommendedWallets, walletIdsToHide: props.walletIdsToHide, size: props.size }) }));
    const getStarted = ((0, jsx_runtime_1.jsx)(StartScreen_js_1.StartScreen, { client: props.client, connectLocale: props.connectLocale, meta: props.meta, welcomeScreen: props.welcomeScreen }));
    const goBack = props.wallets.length > 1 ? handleBack : undefined;
    const getWalletUI = (wallet) => {
        if (props.accountAbstraction) {
            return ((0, jsx_runtime_1.jsx)(SmartWalletConnectUI_js_1.SmartConnectUI, { accountAbstraction: props.accountAbstraction, chain: props.chain, chains: props.chains, client: props.client, connectLocale: props.connectLocale, done: (smartWallet) => {
                    handleConnected(smartWallet);
                }, meta: props.meta, onBack: goBack, personalWallet: wallet, setModalVisibility: props.setModalVisibility, size: props.size, walletConnect: props.walletConnect }, wallet.id));
        }
        return ((0, jsx_runtime_1.jsx)(AnyWalletConnectUI_js_1.AnyWalletConnectUI, { chain: props.chain, chains: props.chains, client: props.client, connectLocale: props.connectLocale, done: () => {
                handleConnected(wallet);
            }, meta: props.meta, onBack: goBack, setModalVisibility: props.setModalVisibility, size: props.size, wallet: wallet, walletConnect: props.walletConnect }, wallet.id));
    };
    const signatureScreen = ((0, jsx_runtime_1.jsx)(SignatureScreen_js_1.SignatureScreen, { auth: props.auth, client: props.client, connectLocale: props.connectLocale, modalSize: props.size, onClose: onClose, onDone: onClose, privacyPolicyUrl: props.meta.privacyPolicyUrl, termsOfServiceUrl: props.meta.termsOfServiceUrl }));
    return ((0, jsx_runtime_1.jsx)(screen_js_1.ScreenSetupContext.Provider, { value: props.screenSetup, children: props.size === "wide" ? ((0, jsx_runtime_1.jsx)(ConnectModalSkeleton_js_1.ConnectModalWideLayout, { left: walletList, right: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [screen === constants_js_1.reservedScreens.signIn && signatureScreen, screen === constants_js_1.reservedScreens.main && getStarted, screen === constants_js_1.reservedScreens.getStarted && getStarted, screen === constants_js_1.reservedScreens.showAll && showAll, typeof screen !== "string" && getWalletUI(screen)] }) })) : ((0, jsx_runtime_1.jsxs)(ConnectModalSkeleton_js_1.ConnectModalCompactLayout, { children: [screen === constants_js_1.reservedScreens.signIn && signatureScreen, screen === constants_js_1.reservedScreens.main && walletList, screen === constants_js_1.reservedScreens.getStarted && getStarted, screen === constants_js_1.reservedScreens.showAll && showAll, typeof screen !== "string" && getWalletUI(screen)] })) }));
};
exports.ConnectModalContent = ConnectModalContent;
//# sourceMappingURL=ConnectModalContent.js.map