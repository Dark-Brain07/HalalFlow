"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyWalletConnectUI = AnyWalletConnectUI;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
const isMobile_js_1 = require("../../../../../utils/web/isMobile.js");
const is_ecosystem_wallet_js_1 = require("../../../../../wallets/ecosystem/is-ecosystem-wallet.js");
const mipdStore_js_1 = require("../../../../../wallets/injected/mipdStore.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const wallet_js_1 = require("../../../../core/utils/wallet.js");
const getInjectedWalletLocale_js_1 = require("../../../wallets/injected/locale/getInjectedWalletLocale.js");
const GetStartedScreen_js_1 = require("../../../wallets/shared/GetStartedScreen.js");
const LoadingScreen_js_1 = require("../../../wallets/shared/LoadingScreen.js");
const WalletConnectConnection_js_1 = require("../../../wallets/shared/WalletConnectConnection.js");
const basic_js_1 = require("../../components/basic.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const text_js_1 = require("../../components/text.js");
const AccentFailIcon_js_1 = require("../icons/AccentFailIcon.js");
const DeepLinkConnectUI_js_1 = require("./DeepLinkConnectUI.js");
const InjectedConnectUI_js_1 = require("./InjectedConnectUI.js");
const CoinbaseSDKWalletConnectUI = /* @__PURE__ */ (0, react_1.lazy)(() => Promise.resolve().then(() => require("../../../wallets/shared/CoinbaseSDKConnection.js")));
const InAppWalletConnectUI = /* @__PURE__ */ (0, react_1.lazy)(() => Promise.resolve().then(() => require("../../../wallets/in-app/InAppWalletConnectUI.js")));
const EcosystemWalletConnectUI = /* @__PURE__ */ (0, react_1.lazy)(() => Promise.resolve().then(() => require("../../../wallets/ecosystem/EcosystemWalletConnectUI.js")));
/**
 * @internal
 */
function AnyWalletConnectUI(props) {
    const [screen, setScreen] = (0, react_1.useState)("main");
    const { wallet } = props;
    const walletInfo = (0, wallet_js_1.useWalletInfo)(props.wallet.id);
    const localeId = props.connectLocale.id;
    const localeFnQuery = (0, react_query_1.useQuery)({
        queryFn: async () => {
            return (0, getInjectedWalletLocale_js_1.getInjectedWalletLocale)(localeId);
        },
        queryKey: ["injectedWalletLocale", localeId, walletInfo.data?.name],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
    if (walletInfo.isLoading || !localeFnQuery.data) {
        return (0, jsx_runtime_1.jsx)(LoadingScreen_js_1.LoadingScreen, {});
    }
    const localeFn = localeFnQuery.data;
    if (!walletInfo.data) {
        const injectedProvider = (0, mipdStore_js_1.getInstalledWalletProviders)().find((w) => w.info.rdns === wallet.id);
        // Unknown wallet id but it's injected
        if (injectedProvider) {
            return ((0, jsx_runtime_1.jsx)(InjectedConnectUI_js_1.InjectedConnectUI, { chain: props.chain, client: props.client, done: props.done, locale: localeFn(injectedProvider.info.name), onBack: props.onBack, size: props.size, wallet: props.wallet, walletName: injectedProvider.info.name }));
        }
        // This will only happen if developer passes a wallet with unknown id and it's not injected
        // Adding a fallback UI just in case
        return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", flex: "column", fullHeight: true, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { p: "lg", children: (0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: props.onBack, title: "Not Supported" }) }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "both", expand: true, flex: "column", p: "lg", style: {
                        minHeight: "300px",
                    }, children: [(0, jsx_runtime_1.jsx)(AccentFailIcon_js_1.AccentFailIcon, { size: index_js_1.iconSize["3xl"] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "primaryText", children: "Wallet is not supported" }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xxl" })] })] }));
    }
    const locale = localeFn(walletInfo.data.name);
    // if wallet can connect to injected wallet + wallet is injected
    const isInstalled = (0, mipdStore_js_1.getInstalledWalletProviders)().find((w) => w.info.rdns === walletInfo.data.rdns);
    if (screen === "get-started") {
        return ((0, jsx_runtime_1.jsx)(GetStartedScreen_js_1.GetStartedScreen, { client: props.client, locale: locale, onBack: () => {
                setScreen("main");
            }, wallet: props.wallet, walletInfo: walletInfo.data }));
    }
    const shouldDeeplink = walletInfo.data.deepLink &&
        !isInstalled &&
        (0, isMobile_js_1.isMobile)() &&
        (wallet.getConfig()
            ?.preferDeepLink ||
            wallet.id === "app.phantom"); // always deeplink phantom on mobile, does not support remote connection
    if (walletInfo.data.deepLink?.mobile && shouldDeeplink) {
        return ((0, jsx_runtime_1.jsx)(DeepLinkConnectUI_js_1.DeepLinkConnectUI, { client: props.client, deepLinkPrefix: walletInfo.data.deepLink.mobile, locale: locale, onBack: props.onBack, onGetStarted: () => {
                setScreen("get-started");
            }, wallet: props.wallet, walletInfo: walletInfo.data }));
    }
    if (walletInfo.data.rdns && isInstalled) {
        return ((0, jsx_runtime_1.jsx)(InjectedConnectUI_js_1.InjectedConnectUI, { chain: props.chain, client: props.client, done: props.done, locale: locale, onBack: props.onBack, onGetStarted: () => {
                setScreen("get-started");
            }, size: props.size, wallet: props.wallet, walletName: walletInfo.data.name }));
    }
    // wallet connect
    if (walletInfo.data.mobile.native || walletInfo.data.mobile.universal) {
        return ((0, jsx_runtime_1.jsx)(WalletConnectConnection_js_1.WalletConnectConnection, { chain: props.chain, chains: props.chains, client: props.client, done: props.done, locale: locale, onBack: props.onBack, onGetStarted: () => {
                setScreen("get-started");
            }, size: props.size, wallet: props.wallet, walletConnect: props.walletConnect, walletInfo: walletInfo.data }));
    }
    // wallet connect
    if (props.wallet.id === "walletConnect") {
        return ((0, jsx_runtime_1.jsx)(WalletConnectConnection_js_1.WalletConnectStandaloneConnection, { chain: props.chain, chains: props.chains, client: props.client, done: props.done, locale: locale, onBack: props.onBack, setModalVisibility: props.setModalVisibility, size: props.size, wallet: props.wallet, walletConnect: props.walletConnect, walletInfo: walletInfo.data }));
    }
    if (props.wallet.id === "inApp" || props.wallet.id === "embedded") {
        return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)(LoadingScreen_js_1.LoadingScreen, {}), children: (0, jsx_runtime_1.jsx)(InAppWalletConnectUI, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, done: props.done, goBack: props.onBack, meta: props.meta, size: props.size, wallet: props.wallet, walletConnect: props.walletConnect }) }));
    }
    if ((0, is_ecosystem_wallet_js_1.isEcosystemWallet)(props.wallet.id)) {
        return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)(LoadingScreen_js_1.LoadingScreen, {}), children: (0, jsx_runtime_1.jsx)(EcosystemWalletConnectUI, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, done: props.done, goBack: props.onBack, meta: props.meta, size: props.size, wallet: props.wallet, walletConnect: props.walletConnect }) }));
    }
    // any other known wallet
    if (props.wallet.id) {
        return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)(LoadingScreen_js_1.LoadingScreen, {}), children: (0, jsx_runtime_1.jsx)(CoinbaseSDKWalletConnectUI, { chain: props.chain, client: props.client, done: props.done, locale: locale, onBack: props.onBack, onGetStarted: () => {
                    setScreen("get-started");
                }, size: props.size, wallet: props.wallet, walletInfo: walletInfo.data }) }));
    }
    // if can't connect in any way - show get started screen
    return ((0, jsx_runtime_1.jsx)(GetStartedScreen_js_1.GetStartedScreen, { client: props.client, locale: locale, onBack: props.onBack, wallet: props.wallet, walletInfo: walletInfo.data }));
}
//# sourceMappingURL=AnyWalletConnectUI.js.map