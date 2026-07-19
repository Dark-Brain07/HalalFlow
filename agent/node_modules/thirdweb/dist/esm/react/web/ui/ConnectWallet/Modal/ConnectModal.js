"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from "react";
import { useActiveAccount } from "../../../../core/hooks/wallets/useActiveAccount.js";
import { useIsWalletModalOpen, useSetIsWalletModalOpen, useSetSelectionData, } from "../../../providers/wallet-ui-states-provider.js";
import { Modal } from "../../components/Modal.js";
import { onModalUnmount, reservedScreens } from "../constants.js";
import { ConnectModalContent } from "./ConnectModalContent.js";
import { useSetupScreen } from "./screen.js";
/**
 * @internal
 */
const ConnectModal = (props) => {
    const screenSetup = useSetupScreen({
        size: props.size,
        wallets: props.wallets,
        welcomeScreen: props.welcomeScreen,
    });
    const setSelectionData = useSetSelectionData();
    const { screen, setScreen, initialScreen } = screenSetup;
    const isWalletModalOpen = useIsWalletModalOpen();
    const setIsWalletModalOpen = useSetIsWalletModalOpen();
    const [hideModal, setHideModal] = useState(false);
    const closeModal = useCallback(() => {
        props.onClose?.();
        setIsWalletModalOpen(false);
        onModalUnmount(() => {
            setScreen(initialScreen);
            setSelectionData({});
        });
    }, [
        initialScreen,
        setIsWalletModalOpen,
        setScreen,
        setSelectionData,
        props.onClose,
    ]);
    const activeAccount = useActiveAccount();
    useEffect(() => {
        if (!isWalletModalOpen) {
            onModalUnmount(() => {
                setHideModal(false);
            });
        }
    }, [isWalletModalOpen]);
    const setModalVisibility = useCallback((value) => setHideModal(!value), []);
    // if wallet is suddenly disconnected when showing the sign in screen, close the modal and reset the screen
    useEffect(() => {
        if (isWalletModalOpen &&
            screen === reservedScreens.signIn &&
            !activeAccount) {
            setScreen(initialScreen);
            setIsWalletModalOpen(false);
        }
    }, [
        initialScreen,
        isWalletModalOpen,
        screen,
        setIsWalletModalOpen,
        setScreen,
        activeAccount,
    ]);
    return (_jsx(Modal, { className: "tw-modal__connect-wallet", title: "Connect Wallet", hide: hideModal, open: isWalletModalOpen, setOpen: (value) => {
            if (hideModal) {
                return;
            }
            if (!value) {
                closeModal();
            }
        }, size: props.size, children: _jsx(ConnectModalContent, { accountAbstraction: props.accountAbstraction, auth: props.auth, chain: props.chain, chains: props.chains, client: props.client, connectLocale: props.connectLocale, hideHeader: false, isOpen: isWalletModalOpen, meta: props.meta, modalHeader: undefined, onClose: closeModal, onConnect: props.onConnect, recommendedWallets: props.recommendedWallets, screenSetup: screenSetup, setModalVisibility: setModalVisibility, shouldSetActive: props.shouldSetActive, showAllWallets: props.showAllWallets, size: props.size, walletConnect: props.walletConnect, walletIdsToHide: props.hiddenWallets, wallets: props.wallets, welcomeScreen: props.welcomeScreen }) }));
};
export default ConnectModal;
//# sourceMappingURL=ConnectModal.js.map