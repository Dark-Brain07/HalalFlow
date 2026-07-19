"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense, useState } from "react";
import { isMobile } from "../../../../../utils/web/isMobile.js";
import { isEcosystemWallet } from "../../../../../wallets/ecosystem/is-ecosystem-wallet.js";
import { getInstalledWalletProviders } from "../../../../../wallets/injected/mipdStore.js";
import { iconSize } from "../../../../core/design-system/index.js";
import { useWalletInfo } from "../../../../core/utils/wallet.js";
import { getInjectedWalletLocale } from "../../../wallets/injected/locale/getInjectedWalletLocale.js";
import { GetStartedScreen } from "../../../wallets/shared/GetStartedScreen.js";
import { LoadingScreen } from "../../../wallets/shared/LoadingScreen.js";
import { WalletConnectConnection, WalletConnectStandaloneConnection, } from "../../../wallets/shared/WalletConnectConnection.js";
import { Container, ModalHeader } from "../../components/basic.js";
import { Spacer } from "../../components/Spacer.js";
import { Text } from "../../components/text.js";
import { AccentFailIcon } from "../icons/AccentFailIcon.js";
import { DeepLinkConnectUI } from "./DeepLinkConnectUI.js";
import { InjectedConnectUI } from "./InjectedConnectUI.js";
const CoinbaseSDKWalletConnectUI = /* @__PURE__ */ lazy(() => import("../../../wallets/shared/CoinbaseSDKConnection.js"));
const InAppWalletConnectUI = /* @__PURE__ */ lazy(() => import("../../../wallets/in-app/InAppWalletConnectUI.js"));
const EcosystemWalletConnectUI = /* @__PURE__ */ lazy(() => import("../../../wallets/ecosystem/EcosystemWalletConnectUI.js"));
/**
 * @internal
 */
export function AnyWalletConnectUI(props) {
    const [screen, setScreen] = useState("main");
    const { wallet } = props;
    const walletInfo = useWalletInfo(props.wallet.id);
    const localeId = props.connectLocale.id;
    const localeFnQuery = useQuery({
        queryFn: async () => {
            return getInjectedWalletLocale(localeId);
        },
        queryKey: ["injectedWalletLocale", localeId, walletInfo.data?.name],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
    if (walletInfo.isLoading || !localeFnQuery.data) {
        return _jsx(LoadingScreen, {});
    }
    const localeFn = localeFnQuery.data;
    if (!walletInfo.data) {
        const injectedProvider = getInstalledWalletProviders().find((w) => w.info.rdns === wallet.id);
        // Unknown wallet id but it's injected
        if (injectedProvider) {
            return (_jsx(InjectedConnectUI, { chain: props.chain, client: props.client, done: props.done, locale: localeFn(injectedProvider.info.name), onBack: props.onBack, size: props.size, wallet: props.wallet, walletName: injectedProvider.info.name }));
        }
        // This will only happen if developer passes a wallet with unknown id and it's not injected
        // Adding a fallback UI just in case
        return (_jsxs(Container, { animate: "fadein", flex: "column", fullHeight: true, children: [_jsx(Container, { p: "lg", children: _jsx(ModalHeader, { onBack: props.onBack, title: "Not Supported" }) }), _jsxs(Container, { center: "both", expand: true, flex: "column", p: "lg", style: {
                        minHeight: "300px",
                    }, children: [_jsx(AccentFailIcon, { size: iconSize["3xl"] }), _jsx(Spacer, { y: "lg" }), _jsx(Text, { center: true, color: "primaryText", children: "Wallet is not supported" }), _jsx(Spacer, { y: "xxl" })] })] }));
    }
    const locale = localeFn(walletInfo.data.name);
    // if wallet can connect to injected wallet + wallet is injected
    const isInstalled = getInstalledWalletProviders().find((w) => w.info.rdns === walletInfo.data.rdns);
    if (screen === "get-started") {
        return (_jsx(GetStartedScreen, { client: props.client, locale: locale, onBack: () => {
                setScreen("main");
            }, wallet: props.wallet, walletInfo: walletInfo.data }));
    }
    const shouldDeeplink = walletInfo.data.deepLink &&
        !isInstalled &&
        isMobile() &&
        (wallet.getConfig()
            ?.preferDeepLink ||
            wallet.id === "app.phantom"); // always deeplink phantom on mobile, does not support remote connection
    if (walletInfo.data.deepLink?.mobile && shouldDeeplink) {
        return (_jsx(DeepLinkConnectUI, { client: props.client, deepLinkPrefix: walletInfo.data.deepLink.mobile, locale: locale, onBack: props.onBack, onGetStarted: () => {
                setScreen("get-started");
            }, wallet: props.wallet, walletInfo: walletInfo.data }));
    }
    if (walletInfo.data.rdns && isInstalled) {
        return (_jsx(InjectedConnectUI, { chain: props.chain, client: props.client, done: props.done, locale: locale, onBack: props.onBack, onGetStarted: () => {
                setScreen("get-started");
            }, size: props.size, wallet: props.wallet, walletName: walletInfo.data.name }));
    }
    // wallet connect
    if (walletInfo.data.mobile.native || walletInfo.data.mobile.universal) {
        return (_jsx(WalletConnectConnection, { chain: props.chain, chains: props.chains, client: props.client, done: props.done, locale: locale, onBack: props.onBack, onGetStarted: () => {
                setScreen("get-started");
            }, size: props.size, wallet: props.wallet, walletConnect: props.walletConnect, walletInfo: walletInfo.data }));
    }
    // wallet connect
    if (props.wallet.id === "walletConnect") {
        return (_jsx(WalletConnectStandaloneConnection, { chain: props.chain, chains: props.chains, client: props.client, done: props.done, locale: locale, onBack: props.onBack, setModalVisibility: props.setModalVisibility, size: props.size, wallet: props.wallet, walletConnect: props.walletConnect, walletInfo: walletInfo.data }));
    }
    if (props.wallet.id === "inApp" || props.wallet.id === "embedded") {
        return (_jsx(Suspense, { fallback: _jsx(LoadingScreen, {}), children: _jsx(InAppWalletConnectUI, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, done: props.done, goBack: props.onBack, meta: props.meta, size: props.size, wallet: props.wallet, walletConnect: props.walletConnect }) }));
    }
    if (isEcosystemWallet(props.wallet.id)) {
        return (_jsx(Suspense, { fallback: _jsx(LoadingScreen, {}), children: _jsx(EcosystemWalletConnectUI, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, done: props.done, goBack: props.onBack, meta: props.meta, size: props.size, wallet: props.wallet, walletConnect: props.walletConnect }) }));
    }
    // any other known wallet
    if (props.wallet.id) {
        return (_jsx(Suspense, { fallback: _jsx(LoadingScreen, {}), children: _jsx(CoinbaseSDKWalletConnectUI, { chain: props.chain, client: props.client, done: props.done, locale: locale, onBack: props.onBack, onGetStarted: () => {
                    setScreen("get-started");
                }, size: props.size, wallet: props.wallet, walletInfo: walletInfo.data }) }));
    }
    // if can't connect in any way - show get started screen
    return (_jsx(GetStartedScreen, { client: props.client, locale: locale, onBack: props.onBack, wallet: props.wallet, walletInfo: walletInfo.data }));
}
//# sourceMappingURL=AnyWalletConnectUI.js.map