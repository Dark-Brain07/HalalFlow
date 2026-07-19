"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const wallet_ui_states_provider_js_1 = require("../../providers/wallet-ui-states-provider.js");
const useInAppWalletLocale_js_1 = require("../in-app/useInAppWalletLocale.js");
const WalletAuth_js_1 = require("../in-app/WalletAuth.js");
const GuestLogin_js_1 = require("../shared/GuestLogin.js");
const LoadingScreen_js_1 = require("../shared/LoadingScreen.js");
const OTPLoginUI_js_1 = require("../shared/OTPLoginUI.js");
const PassKeyLogin_js_1 = require("../shared/PassKeyLogin.js");
const SocialLogin_js_1 = require("../shared/SocialLogin.js");
const EcosystemWalletFormUI_js_1 = require("./EcosystemWalletFormUI.js");
/**
 *
 * @internal
 */
function EcosystemWalletConnectUI(props) {
    const data = (0, wallet_ui_states_provider_js_1.useSelectionData)();
    const setSelectionData = (0, wallet_ui_states_provider_js_1.useSetSelectionData)();
    const state = data;
    const localeId = props.connectLocale.id;
    const locale = (0, useInAppWalletLocale_js_1.useInAppWalletLocale)(localeId);
    if (!locale) {
        return (0, jsx_runtime_1.jsx)(LoadingScreen_js_1.LoadingScreen, {});
    }
    const goBackToMain = () => {
        if (props.size === "compact") {
            props.goBack?.();
        }
        setSelectionData({});
    };
    const done = () => {
        props.done();
        setSelectionData({});
    };
    const otpUserInfo = state?.emailLogin
        ? { email: state.emailLogin }
        : state?.phoneLogin
            ? { phone: state.phoneLogin }
            : undefined;
    if (otpUserInfo) {
        return ((0, jsx_runtime_1.jsx)(OTPLoginUI_js_1.OTPLoginUI, { chain: props.chain, client: props.client, done: done, goBack: goBackToMain, isLinking: props.isLinking, locale: locale, size: props.size, userInfo: otpUserInfo, wallet: props.wallet }));
    }
    if (state?.passkeyLogin) {
        return ((0, jsx_runtime_1.jsx)(PassKeyLogin_js_1.PassKeyLogin, { chain: props.chain, client: props.client, done: done, isLinking: props.isLinking, locale: props.connectLocale, onBack: goBackToMain, size: props.size, wallet: props.wallet }));
    }
    if (state?.socialLogin) {
        return ((0, jsx_runtime_1.jsx)(SocialLogin_js_1.SocialLogin, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, done: done, goBack: goBackToMain, isLinking: props.isLinking, locale: locale, size: props.size, socialAuth: state.socialLogin.type, state: state, wallet: props.wallet }));
    }
    if (state?.walletLogin) {
        return ((0, jsx_runtime_1.jsx)(WalletAuth_js_1.WalletAuth, { chain: props.chain, client: props.client, done: done, inAppLocale: locale, isLinking: state.walletLogin.linking, locale: props.connectLocale, meta: props.meta, onBack: goBackToMain || (() => setSelectionData({})), size: props.size, wallet: props.wallet, walletConnect: props.walletConnect }));
    }
    if (state?.guestLogin) {
        return ((0, jsx_runtime_1.jsx)(GuestLogin_js_1.GuestLogin, { client: props.client, connectLocale: props.connectLocale, done: done, goBack: goBackToMain, locale: locale, size: props.size, state: state, wallet: props.wallet }));
    }
    return ((0, jsx_runtime_1.jsx)(EcosystemWalletFormUI_js_1.EcosystemWalletFormUIScreen, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, done: done, goBack: props.goBack, isLinking: props.isLinking, locale: locale, meta: props.meta, select: () => { }, size: props.size, wallet: props.wallet }));
}
exports.default = EcosystemWalletConnectUI;
//# sourceMappingURL=EcosystemWalletConnectUI.js.map