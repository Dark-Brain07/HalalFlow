"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { lazy, Suspense, useCallback } from "react";
import { useSiweAuth, } from "../../../../core/hooks/auth/useSiweAuth.js";
import { useActiveAccount } from "../../../../core/hooks/wallets/useActiveAccount.js";
import { useActiveWallet } from "../../../../core/hooks/wallets/useActiveWallet.js";
import { useSetActiveWallet } from "../../../../core/hooks/wallets/useSetActiveWallet.js";
import { useConnectionManager } from "../../../../core/providers/connection-manager.js";
import { useSetSelectionData } from "../../../providers/wallet-ui-states-provider.js";
import { LoadingScreen } from "../../../wallets/shared/LoadingScreen.js";
import { onModalUnmount, reservedScreens } from "../constants.js";
import { SignatureScreen } from "../screens/SignatureScreen.js";
import { StartScreen } from "../screens/StartScreen.js";
import { WalletSelector } from "../WalletSelector.js";
import { AnyWalletConnectUI } from "./AnyWalletConnectUI.js";
import { ConnectModalCompactLayout, ConnectModalWideLayout, } from "./ConnectModalSkeleton.js";
import { SmartConnectUI } from "./SmartWalletConnectUI.js";
import { ScreenSetupContext } from "./screen.js";
const AllWalletsUI = /* @__PURE__ */ lazy(() => import("./AllWalletsUI.js"));
/**
 * @internal
 */
export const ConnectModalContent = (props) => {
    const { setModalVisibility, onClose, shouldSetActive } = props;
    const { screen, setScreen, initialScreen } = props.screenSetup;
    const setActiveWallet = useSetActiveWallet();
    const setSelectionData = useSetSelectionData();
    const activeWallet = useActiveWallet();
    const activeAccount = useActiveAccount();
    const siweAuth = useSiweAuth(activeWallet, activeAccount, props.auth);
    const showSignatureScreen = siweAuth.requiresAuth && !siweAuth.isLoggedIn;
    const connectionManager = useConnectionManager();
    const handleConnected = useCallback((wallet) => {
        if (shouldSetActive) {
            setActiveWallet(wallet);
        }
        else {
            connectionManager.addConnectedWallet(wallet);
        }
        if (props.onConnect) {
            props.onConnect(wallet, connectionManager.connectedWallets.getValue());
        }
        onModalUnmount(() => {
            setSelectionData({});
            setModalVisibility(true);
        });
        // show sign in screen if required
        if (showSignatureScreen) {
            setScreen(reservedScreens.signIn);
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
    const handleBack = useCallback(() => {
        setSelectionData({});
        setScreen(initialScreen);
    }, [setScreen, initialScreen, setSelectionData]);
    const walletList = (_jsx(WalletSelector, { accountAbstraction: props.accountAbstraction, chain: props.chain, chains: props.chains, client: props.client, connectLocale: props.connectLocale, done: handleConnected, goBack: props.wallets.length > 1 ? handleBack : undefined, hideHeader: props.hideHeader, meta: props.meta, modalHeader: props.modalHeader, onShowAll: () => {
            setScreen(reservedScreens.showAll);
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
    const showAll = (_jsx(Suspense, { fallback: _jsx(LoadingScreen, {}), children: _jsx(AllWalletsUI, { client: props.client, connectLocale: props.connectLocale, onBack: handleBack, onSelect: setScreen, recommendedWallets: props.recommendedWallets, walletIdsToHide: props.walletIdsToHide, size: props.size }) }));
    const getStarted = (_jsx(StartScreen, { client: props.client, connectLocale: props.connectLocale, meta: props.meta, welcomeScreen: props.welcomeScreen }));
    const goBack = props.wallets.length > 1 ? handleBack : undefined;
    const getWalletUI = (wallet) => {
        if (props.accountAbstraction) {
            return (_jsx(SmartConnectUI, { accountAbstraction: props.accountAbstraction, chain: props.chain, chains: props.chains, client: props.client, connectLocale: props.connectLocale, done: (smartWallet) => {
                    handleConnected(smartWallet);
                }, meta: props.meta, onBack: goBack, personalWallet: wallet, setModalVisibility: props.setModalVisibility, size: props.size, walletConnect: props.walletConnect }, wallet.id));
        }
        return (_jsx(AnyWalletConnectUI, { chain: props.chain, chains: props.chains, client: props.client, connectLocale: props.connectLocale, done: () => {
                handleConnected(wallet);
            }, meta: props.meta, onBack: goBack, setModalVisibility: props.setModalVisibility, size: props.size, wallet: wallet, walletConnect: props.walletConnect }, wallet.id));
    };
    const signatureScreen = (_jsx(SignatureScreen, { auth: props.auth, client: props.client, connectLocale: props.connectLocale, modalSize: props.size, onClose: onClose, onDone: onClose, privacyPolicyUrl: props.meta.privacyPolicyUrl, termsOfServiceUrl: props.meta.termsOfServiceUrl }));
    return (_jsx(ScreenSetupContext.Provider, { value: props.screenSetup, children: props.size === "wide" ? (_jsx(ConnectModalWideLayout, { left: walletList, right: _jsxs(_Fragment, { children: [screen === reservedScreens.signIn && signatureScreen, screen === reservedScreens.main && getStarted, screen === reservedScreens.getStarted && getStarted, screen === reservedScreens.showAll && showAll, typeof screen !== "string" && getWalletUI(screen)] }) })) : (_jsxs(ConnectModalCompactLayout, { children: [screen === reservedScreens.signIn && signatureScreen, screen === reservedScreens.main && walletList, screen === reservedScreens.getStarted && getStarted, screen === reservedScreens.showAll && showAll, typeof screen !== "string" && getWalletUI(screen)] })) }));
};
//# sourceMappingURL=ConnectModalContent.js.map