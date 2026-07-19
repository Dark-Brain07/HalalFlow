"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletAuth = WalletAuth;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const utils_js_1 = require("../../../../chains/utils.js");
const defaultWallets_js_1 = require("../../../../wallets/defaultWallets.js");
const is_ecosystem_wallet_js_1 = require("../../../../wallets/ecosystem/is-ecosystem-wallet.js");
const index_js_1 = require("../../../../wallets/in-app/web/lib/auth/index.js");
const index_js_2 = require("../../../core/design-system/index.js");
const useAddConnectedWallet_js_1 = require("../../../core/hooks/wallets/useAddConnectedWallet.js");
const AllWalletsUI_js_1 = require("../../ui/ConnectWallet/Modal/AllWalletsUI.js");
const WalletSelector_js_1 = require("../../ui/ConnectWallet/WalletSelector.js");
const basic_js_1 = require("../../ui/components/basic.js");
const Spacer_js_1 = require("../../ui/components/Spacer.js");
const WalletImage_js_1 = require("../../ui/components/WalletImage.js");
const ErrorState_js_1 = require("../shared/ErrorState.js");
const LoadingScreen_js_1 = require("../shared/LoadingScreen.js");
const LoadingState_js_1 = require("../shared/LoadingState.js");
function WalletAuth(props) {
    const { wallet, done } = props;
    const addConnectedWallet = (0, useAddConnectedWallet_js_1.useAddConnectedWallet)();
    const walletToConnect = (0, react_1.useRef)(undefined);
    const [status, setStatus] = (0, react_1.useState)("selecting");
    const [error, setError] = (0, react_1.useState)();
    const [showAll, setShowAll] = (0, react_1.useState)(false);
    const ecosystem = (0, is_ecosystem_wallet_js_1.isEcosystemWallet)(wallet)
        ? {
            id: wallet.id,
            partnerId: wallet.getConfig()?.partnerId,
        }
        : undefined;
    const back = () => {
        setStatus("selecting");
        walletToConnect.current = undefined;
        props.onBack();
    };
    async function login(walletToLink) {
        setStatus("loading");
        setError(undefined);
        walletToConnect.current = walletToLink;
        try {
            if (props.isLinking) {
                await (0, index_js_1.linkProfile)({
                    chain: props.chain || wallet.getChain() || (0, utils_js_1.defineChain)(1),
                    client: props.client,
                    ecosystem,
                    strategy: "wallet",
                    wallet: walletToLink,
                });
            }
            else {
                await wallet.connect({
                    chain: props.chain || walletToLink.getChain() || (0, utils_js_1.defineChain)(1),
                    client: props.client,
                    strategy: "wallet",
                    wallet: walletToLink,
                });
            }
            addConnectedWallet(walletToLink);
            done();
        }
        catch (e) {
            setError(e instanceof Error ? e.message : "Unknown error");
            setStatus("error");
        }
    }
    if (!walletToConnect.current) {
        if (showAll) {
            return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)(LoadingScreen_js_1.LoadingScreen, {}), children: (0, jsx_runtime_1.jsx)(AllWalletsUI_js_1.default, { client: props.client, connectLocale: props.locale, disableSelectionDataReset: true, onBack: () => setShowAll(false), onSelect: async (newWallet) => {
                        login(newWallet);
                        setShowAll(false);
                    }, recommendedWallets: undefined, size: props.size }) }));
        }
        return ((0, jsx_runtime_1.jsx)(WalletSelector_js_1.WalletSelector, { chain: wallet.getChain(), chains: [], client: props.client, connectLocale: props.locale, disableSelectionDataReset: true, done: () => { }, goBack: back, hideHeader: false, meta: props.meta || {}, modalHeader: {
                onBack: back,
                title: props.isLinking
                    ? props.inAppLocale.linkWallet
                    : props.inAppLocale.signInWithWallet,
            }, onShowAll: () => {
                setShowAll(true);
            }, recommendedWallets: undefined, selectWallet: async (newWallet) => {
                login(newWallet);
            }, setModalVisibility: () => { }, showAllWallets: true, size: props.size, title: props.locale.connectAWallet, walletConnect: props.walletConnect, walletIdsToHide: ["inApp"], wallets: (0, defaultWallets_js_1.getDefaultWallets)() }));
    }
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", flex: "column", fullHeight: true, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { p: "lg", children: (0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: back, title: props.isLinking
                        ? props.inAppLocale.linkWallet
                        : props.inAppLocale.signInWithWallet }) }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "y", expand: true, flex: "column", px: props.size === "wide" ? "xxl" : "lg", children: (0, jsx_runtime_1.jsx)("div", { children: status === "error" ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ErrorState_js_1.ErrorState, { onTryAgain: () => {
                                    if (!walletToConnect.current) {
                                        throw new Error("Failed to connect to unknown wallet");
                                    }
                                    login(walletToConnect.current);
                                }, title: error || "Failed to Login" }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" })] })) : ((0, jsx_runtime_1.jsx)(LoadingState_js_1.LoadingState, { icon: (0, jsx_runtime_1.jsx)(WalletImage_js_1.WalletImage, { client: props.client, id: walletToConnect.current.id ?? "", size: index_js_2.iconSize.xl }), subtitle: "A pop-up prompt will appear to sign-in and verify your wallet", title: "Sign in with your wallet" })) }) })] }));
}
//# sourceMappingURL=WalletAuth.js.map