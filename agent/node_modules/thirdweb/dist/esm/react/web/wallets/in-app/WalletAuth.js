import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, useRef, useState } from "react";
import { defineChain } from "../../../../chains/utils.js";
import { getDefaultWallets } from "../../../../wallets/defaultWallets.js";
import { isEcosystemWallet } from "../../../../wallets/ecosystem/is-ecosystem-wallet.js";
import { linkProfile } from "../../../../wallets/in-app/web/lib/auth/index.js";
import { iconSize } from "../../../core/design-system/index.js";
import { useAddConnectedWallet } from "../../../core/hooks/wallets/useAddConnectedWallet.js";
import AllWalletsUI from "../../ui/ConnectWallet/Modal/AllWalletsUI.js";
import { WalletSelector } from "../../ui/ConnectWallet/WalletSelector.js";
import { Container, ModalHeader } from "../../ui/components/basic.js";
import { Spacer } from "../../ui/components/Spacer.js";
import { WalletImage } from "../../ui/components/WalletImage.js";
import { ErrorState } from "../shared/ErrorState.js";
import { LoadingScreen } from "../shared/LoadingScreen.js";
import { LoadingState } from "../shared/LoadingState.js";
export function WalletAuth(props) {
    const { wallet, done } = props;
    const addConnectedWallet = useAddConnectedWallet();
    const walletToConnect = useRef(undefined);
    const [status, setStatus] = useState("selecting");
    const [error, setError] = useState();
    const [showAll, setShowAll] = useState(false);
    const ecosystem = isEcosystemWallet(wallet)
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
                await linkProfile({
                    chain: props.chain || wallet.getChain() || defineChain(1),
                    client: props.client,
                    ecosystem,
                    strategy: "wallet",
                    wallet: walletToLink,
                });
            }
            else {
                await wallet.connect({
                    chain: props.chain || walletToLink.getChain() || defineChain(1),
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
            return (_jsx(Suspense, { fallback: _jsx(LoadingScreen, {}), children: _jsx(AllWalletsUI, { client: props.client, connectLocale: props.locale, disableSelectionDataReset: true, onBack: () => setShowAll(false), onSelect: async (newWallet) => {
                        login(newWallet);
                        setShowAll(false);
                    }, recommendedWallets: undefined, size: props.size }) }));
        }
        return (_jsx(WalletSelector, { chain: wallet.getChain(), chains: [], client: props.client, connectLocale: props.locale, disableSelectionDataReset: true, done: () => { }, goBack: back, hideHeader: false, meta: props.meta || {}, modalHeader: {
                onBack: back,
                title: props.isLinking
                    ? props.inAppLocale.linkWallet
                    : props.inAppLocale.signInWithWallet,
            }, onShowAll: () => {
                setShowAll(true);
            }, recommendedWallets: undefined, selectWallet: async (newWallet) => {
                login(newWallet);
            }, setModalVisibility: () => { }, showAllWallets: true, size: props.size, title: props.locale.connectAWallet, walletConnect: props.walletConnect, walletIdsToHide: ["inApp"], wallets: getDefaultWallets() }));
    }
    return (_jsxs(Container, { animate: "fadein", flex: "column", fullHeight: true, children: [_jsx(Container, { p: "lg", children: _jsx(ModalHeader, { onBack: back, title: props.isLinking
                        ? props.inAppLocale.linkWallet
                        : props.inAppLocale.signInWithWallet }) }), _jsx(Container, { center: "y", expand: true, flex: "column", px: props.size === "wide" ? "xxl" : "lg", children: _jsx("div", { children: status === "error" ? (_jsxs(_Fragment, { children: [_jsx(ErrorState, { onTryAgain: () => {
                                    if (!walletToConnect.current) {
                                        throw new Error("Failed to connect to unknown wallet");
                                    }
                                    login(walletToConnect.current);
                                }, title: error || "Failed to Login" }), _jsx(Spacer, { y: "lg" })] })) : (_jsx(LoadingState, { icon: _jsx(WalletImage, { client: props.client, id: walletToConnect.current.id ?? "", size: iconSize.xl }), subtitle: "A pop-up prompt will appear to sign-in and verify your wallet", title: "Sign in with your wallet" })) }) })] }));
}
//# sourceMappingURL=WalletAuth.js.map