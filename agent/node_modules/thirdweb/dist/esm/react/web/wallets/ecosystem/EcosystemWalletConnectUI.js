"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useSelectionData, useSetSelectionData, } from "../../providers/wallet-ui-states-provider.js";
import { useInAppWalletLocale } from "../in-app/useInAppWalletLocale.js";
import { WalletAuth } from "../in-app/WalletAuth.js";
import { GuestLogin } from "../shared/GuestLogin.js";
import { LoadingScreen } from "../shared/LoadingScreen.js";
import { OTPLoginUI } from "../shared/OTPLoginUI.js";
import { PassKeyLogin } from "../shared/PassKeyLogin.js";
import { SocialLogin } from "../shared/SocialLogin.js";
import { EcosystemWalletFormUIScreen } from "./EcosystemWalletFormUI.js";
/**
 *
 * @internal
 */
function EcosystemWalletConnectUI(props) {
    const data = useSelectionData();
    const setSelectionData = useSetSelectionData();
    const state = data;
    const localeId = props.connectLocale.id;
    const locale = useInAppWalletLocale(localeId);
    if (!locale) {
        return _jsx(LoadingScreen, {});
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
        return (_jsx(OTPLoginUI, { chain: props.chain, client: props.client, done: done, goBack: goBackToMain, isLinking: props.isLinking, locale: locale, size: props.size, userInfo: otpUserInfo, wallet: props.wallet }));
    }
    if (state?.passkeyLogin) {
        return (_jsx(PassKeyLogin, { chain: props.chain, client: props.client, done: done, isLinking: props.isLinking, locale: props.connectLocale, onBack: goBackToMain, size: props.size, wallet: props.wallet }));
    }
    if (state?.socialLogin) {
        return (_jsx(SocialLogin, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, done: done, goBack: goBackToMain, isLinking: props.isLinking, locale: locale, size: props.size, socialAuth: state.socialLogin.type, state: state, wallet: props.wallet }));
    }
    if (state?.walletLogin) {
        return (_jsx(WalletAuth, { chain: props.chain, client: props.client, done: done, inAppLocale: locale, isLinking: state.walletLogin.linking, locale: props.connectLocale, meta: props.meta, onBack: goBackToMain || (() => setSelectionData({})), size: props.size, wallet: props.wallet, walletConnect: props.walletConnect }));
    }
    if (state?.guestLogin) {
        return (_jsx(GuestLogin, { client: props.client, connectLocale: props.connectLocale, done: done, goBack: goBackToMain, locale: locale, size: props.size, state: state, wallet: props.wallet }));
    }
    return (_jsx(EcosystemWalletFormUIScreen, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, done: done, goBack: props.goBack, isLinking: props.isLinking, locale: locale, meta: props.meta, select: () => { }, size: props.size, wallet: props.wallet }));
}
export default EcosystemWalletConnectUI;
//# sourceMappingURL=EcosystemWalletConnectUI.js.map