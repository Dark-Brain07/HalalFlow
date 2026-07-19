"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useActiveAccount_js_1 = require("../../../../core/hooks/wallets/useActiveAccount.js");
const wallet_ui_states_provider_js_1 = require("../../../providers/wallet-ui-states-provider.js");
const Modal_js_1 = require("../../components/Modal.js");
const constants_js_1 = require("../constants.js");
const ConnectModalContent_js_1 = require("./ConnectModalContent.js");
const screen_js_1 = require("./screen.js");
/**
 * @internal
 */
const ConnectModal = (props) => {
    const screenSetup = (0, screen_js_1.useSetupScreen)({
        size: props.size,
        wallets: props.wallets,
        welcomeScreen: props.welcomeScreen,
    });
    const setSelectionData = (0, wallet_ui_states_provider_js_1.useSetSelectionData)();
    const { screen, setScreen, initialScreen } = screenSetup;
    const isWalletModalOpen = (0, wallet_ui_states_provider_js_1.useIsWalletModalOpen)();
    const setIsWalletModalOpen = (0, wallet_ui_states_provider_js_1.useSetIsWalletModalOpen)();
    const [hideModal, setHideModal] = (0, react_1.useState)(false);
    const closeModal = (0, react_1.useCallback)(() => {
        props.onClose?.();
        setIsWalletModalOpen(false);
        (0, constants_js_1.onModalUnmount)(() => {
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
    const activeAccount = (0, useActiveAccount_js_1.useActiveAccount)();
    (0, react_1.useEffect)(() => {
        if (!isWalletModalOpen) {
            (0, constants_js_1.onModalUnmount)(() => {
                setHideModal(false);
            });
        }
    }, [isWalletModalOpen]);
    const setModalVisibility = (0, react_1.useCallback)((value) => setHideModal(!value), []);
    // if wallet is suddenly disconnected when showing the sign in screen, close the modal and reset the screen
    (0, react_1.useEffect)(() => {
        if (isWalletModalOpen &&
            screen === constants_js_1.reservedScreens.signIn &&
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
    return ((0, jsx_runtime_1.jsx)(Modal_js_1.Modal, { className: "tw-modal__connect-wallet", title: "Connect Wallet", hide: hideModal, open: isWalletModalOpen, setOpen: (value) => {
            if (hideModal) {
                return;
            }
            if (!value) {
                closeModal();
            }
        }, size: props.size, children: (0, jsx_runtime_1.jsx)(ConnectModalContent_js_1.ConnectModalContent, { accountAbstraction: props.accountAbstraction, auth: props.auth, chain: props.chain, chains: props.chains, client: props.client, connectLocale: props.connectLocale, hideHeader: false, isOpen: isWalletModalOpen, meta: props.meta, modalHeader: undefined, onClose: closeModal, onConnect: props.onConnect, recommendedWallets: props.recommendedWallets, screenSetup: screenSetup, setModalVisibility: setModalVisibility, shouldSetActive: props.shouldSetActive, showAllWallets: props.showAllWallets, size: props.size, walletConnect: props.walletConnect, walletIdsToHide: props.hiddenWallets, wallets: props.wallets, welcomeScreen: props.welcomeScreen }) }));
};
exports.default = ConnectModal;
//# sourceMappingURL=ConnectModal.js.map