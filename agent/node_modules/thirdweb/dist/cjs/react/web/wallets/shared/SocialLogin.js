"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialLogin = SocialLogin;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const webStorage_js_1 = require("../../../../utils/storage/webStorage.js");
const is_ecosystem_wallet_js_1 = require("../../../../wallets/ecosystem/is-ecosystem-wallet.js");
const index_js_1 = require("../../../../wallets/in-app/web/lib/auth/index.js");
const oauth_js_1 = require("../../../../wallets/in-app/web/lib/auth/oauth.js");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const storage_js_1 = require("../../../core/utils/storage.js");
const basic_js_1 = require("../../ui/components/basic.js");
const buttons_js_1 = require("../../ui/components/buttons.js");
const Spacer_js_1 = require("../../ui/components/Spacer.js");
const Spinner_js_1 = require("../../ui/components/Spinner.js");
const text_js_1 = require("../../ui/components/text.js");
const oauthSignIn_js_1 = require("./oauthSignIn.js");
/**
 * @internal
 */
function SocialLogin(props) {
    const ewLocale = props.locale;
    const locale = ewLocale.socialLoginScreen;
    const themeObj = (0, CustomThemeProvider_js_1.useCustomTheme)();
    const ecosystem = (0, is_ecosystem_wallet_js_1.isEcosystemWallet)(props.wallet)
        ? {
            id: props.wallet.id,
            partnerId: props.wallet.getConfig()?.partnerId,
        }
        : undefined;
    const [authError, setAuthError] = (0, react_1.useState)(undefined);
    const { done, wallet } = props;
    const [status, setStatus] = (0, react_1.useState)("connecting");
    const handleSocialLogin = async () => {
        const walletConfig = wallet.getConfig();
        const authMode = walletConfig && "auth" in walletConfig
            ? (walletConfig?.auth?.mode ?? "popup")
            : "popup";
        if (walletConfig &&
            "auth" in walletConfig &&
            authMode !== "popup" &&
            !props.isLinking // Redirect not supported for account linking (we need to maintain the aplication state)
        ) {
            return (0, oauth_js_1.loginWithOauthRedirect)({
                authOption: props.socialAuth,
                client: props.client,
                ecosystem,
                mode: walletConfig?.auth?.mode,
                redirectUrl: walletConfig?.auth?.redirectUrl,
            });
        }
        try {
            const socialWindow = (0, oauthSignIn_js_1.openOauthSignInWindow)({
                authOption: props.socialAuth,
                client: props.client,
                ecosystem,
                themeObj,
            });
            if (!socialWindow) {
                throw new Error(`Failed to open ${props.socialAuth} login window`);
            }
            setStatus("connecting");
            if (props.isLinking) {
                await (0, index_js_1.linkProfile)({
                    client: props.client,
                    closeOpenedWindow: (openedWindow) => {
                        openedWindow.close();
                    },
                    ecosystem,
                    openedWindow: socialWindow,
                    strategy: props.socialAuth,
                }).catch((e) => {
                    setAuthError(e.message);
                    throw e;
                });
            }
            else {
                await wallet.connect({
                    chain: props.chain,
                    client: props.client,
                    closeOpenedWindow: (openedWindow) => {
                        openedWindow.close();
                    },
                    openedWindow: socialWindow,
                    strategy: props.socialAuth,
                });
            }
            await (0, storage_js_1.setLastAuthProvider)(props.socialAuth, webStorage_js_1.webLocalStorage);
            setStatus("connected");
            done();
        }
        catch (e) {
            setStatus("error");
            // TODO this only happens on 'retry' button click, not on initial login
            // should pass auth error message to this component
            if (e instanceof Error &&
                e?.message?.includes("PAYMENT_METHOD_REQUIRED")) {
                setAuthError(ewLocale.maxAccountsExceeded);
            }
            console.error(`Error signing in with ${props.socialAuth}`, e);
        }
    };
    // const { setModalVisibility } = props.connectUIProps.screenConfig;
    const socialLogin = props.state?.socialLogin;
    const socialLoginStarted = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        if (socialLoginStarted.current) {
            return;
        }
        if (socialLogin) {
            socialLoginStarted.current = true;
            setStatus("connecting");
            socialLogin.connectionPromise
                .then(() => {
                done();
                setStatus("connected");
            })
                .catch((e) => {
                setAuthError(e.message);
                setStatus("error");
            });
        }
    }, [done, socialLogin]);
    return ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { animate: "fadein", flex: "column", fullHeight: true, className: "tw-social-login-screen", children: (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { expand: true, flex: "column", p: "lg", style: {
                paddingBottom: 0,
            }, children: [props.goBack && ((0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: props.goBack, title: props.isLinking
                        ? props.connectLocale.manageWallet.linkProfile
                        : locale.title })), props.size === "compact" ? (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }) : null, (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "both", expand: true, flex: "column", style: {
                        minHeight: "250px",
                        textAlign: "center",
                    }, children: [status !== "error" && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "primaryText", multiline: true, style: {
                                        maxWidth: "250px",
                                    }, children: locale.instruction }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "x", flex: "row", children: (0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { color: "accentText", size: "lg" }) }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xxl" })] })), status === "error" && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", children: [authError ? ((0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "danger", children: authError })) : ((0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "danger", children: locale.failed })), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsx)(buttons_js_1.Button, { onClick: handleSocialLogin, variant: "primary", children: locale.retry }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xxl" })] }))] })] }) }));
}
//# sourceMappingURL=SocialLogin.js.map