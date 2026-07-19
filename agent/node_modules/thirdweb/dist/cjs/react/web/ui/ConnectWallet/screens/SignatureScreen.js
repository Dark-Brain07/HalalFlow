"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureScreen = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@emotion/react");
const react_icons_1 = require("@radix-ui/react-icons");
const react_2 = require("react");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const useSiweAuth_js_1 = require("../../../../core/hooks/auth/useSiweAuth.js");
const useActiveAccount_js_1 = require("../../../../core/hooks/wallets/useActiveAccount.js");
const useActiveWallet_js_1 = require("../../../../core/hooks/wallets/useActiveWallet.js");
const useAdminWallet_js_1 = require("../../../../core/hooks/wallets/useAdminWallet.js");
const useDisconnect_js_1 = require("../../../../core/hooks/wallets/useDisconnect.js");
const wait_js_1 = require("../../../../core/utils/wait.js");
const LoadingScreen_js_1 = require("../../../wallets/shared/LoadingScreen.js");
const basic_js_1 = require("../../components/basic.js");
const buttons_js_1 = require("../../components/buttons.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const Spinner_js_1 = require("../../components/Spinner.js");
const text_js_1 = require("../../components/text.js");
const WalletImage_js_1 = require("../../components/WalletImage.js");
const elements_js_1 = require("../../design-system/elements.js");
const TOS_js_1 = require("../Modal/TOS.js");
const WalletLogoSpinner_js_1 = require("./WalletLogoSpinner.js");
const SignatureScreen = (props) => {
    const { onDone, modalSize, onClose, termsOfServiceUrl, privacyPolicyUrl, connectLocale, } = props;
    const wallet = (0, useActiveWallet_js_1.useActiveWallet)();
    const adminWallet = (0, useAdminWallet_js_1.useAdminWallet)();
    const activeAccount = (0, useActiveAccount_js_1.useActiveAccount)();
    const siweAuth = (0, useSiweAuth_js_1.useSiweAuth)(wallet, activeAccount, props.auth);
    const [error, setError] = (0, react_2.useState)(undefined);
    const [status, setStatus] = (0, react_2.useState)(error ? "failed" : "idle");
    const { disconnect } = (0, useDisconnect_js_1.useDisconnect)();
    const locale = connectLocale.signatureScreen;
    const signIn = (0, react_2.useCallback)(async () => {
        try {
            setError(undefined);
            setStatus("signing");
            await siweAuth.doLogin();
            onDone?.();
        }
        catch (err) {
            await (0, wait_js_1.wait)(1000);
            setError(err.message);
            setStatus("failed");
        }
    }, [onDone, siweAuth]);
    if (!wallet || siweAuth.isPending) {
        return (0, jsx_runtime_1.jsx)(LoadingScreen_js_1.LoadingScreen, { "data-testid": "loading-screen" });
    }
    if (isHeadlessSignSupported(wallet.id) ||
        (wallet.id === "smart" &&
            adminWallet &&
            isHeadlessSignSupported(adminWallet.id))) {
        return ((0, jsx_runtime_1.jsx)(HeadlessSignIn, { connectLocale: connectLocale, error: error, signIn: signIn, status: status, wallet: wallet }));
    }
    const handleRetry = () => {
        signIn();
    };
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", flex: "column", fullHeight: true, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { p: "lg", style: {
                    paddingBottom: 0,
                }, children: (0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { title: locale.instructionScreen.title }) }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "y", expand: true, flex: "column", px: modalSize === "compact" ? "lg" : "xxl", style: {
                    paddingBottom: index_js_1.spacing.xl,
                    paddingTop: 0,
                }, children: status === "idle" ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { animate: "fadein", center: "x", flex: "row", py: "3xl", children: (0, jsx_runtime_1.jsx)(PulsatingContainer, { children: (0, jsx_runtime_1.jsx)(WalletImage_js_1.WalletImage, { client: props.client, id: wallet.id, size: "80" }) }) }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { balance: true, center: true, multiline: true, children: locale.instructionScreen.instruction }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsx)(buttons_js_1.Button, { "data-testid": "sign-in-button", fullWidth: true, onClick: signIn, style: {
                                alignItems: "center",
                                padding: index_js_1.spacing.md,
                            }, variant: "accent", children: connectLocale.signatureScreen.instructionScreen.signInButton }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "sm" }), (0, jsx_runtime_1.jsx)(buttons_js_1.Button, { "data-testid": "disconnect-button", fullWidth: true, onClick: () => {
                                onClose?.();
                                disconnect(wallet);
                            }, style: {
                                alignItems: "center",
                                padding: index_js_1.spacing.md,
                            }, variant: "secondary", children: connectLocale.signatureScreen.instructionScreen.disconnectWallet })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { py: "3xl", children: (0, jsx_runtime_1.jsx)(WalletLogoSpinner_js_1.WalletLogoSpinner, { client: props.client, error: status === "failed", id: wallet.id }) }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", flex: "column", gap: "md", children: [(0, jsx_runtime_1.jsxs)(text_js_1.Text, { center: true, color: "primaryText", size: "lg", className: "tw-screen-title", children: [status === "failed"
                                            ? error || locale.signingScreen.failedToSignIn
                                            : locale.signingScreen.inProgress, " "] }), status === "signing" && ((0, jsx_runtime_1.jsx)(text_js_1.Text, { balance: true, center: true, multiline: true, className: "tw-screen-description", children: connectLocale.signatureScreen.signingScreen.prompt })), status === "failed" && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "sm" }), (0, jsx_runtime_1.jsxs)(buttons_js_1.Button, { fullWidth: true, onClick: handleRetry, style: {
                                                alignItems: "center",
                                                gap: index_js_1.spacing.xs,
                                                padding: index_js_1.spacing.md,
                                            }, variant: "accent", children: [(0, jsx_runtime_1.jsx)(react_icons_1.ReloadIcon, { height: index_js_1.iconSize.sm, width: index_js_1.iconSize.sm }), locale.signingScreen.tryAgain] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "sm" }), (0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, onClick: () => {
                                                disconnect(wallet);
                                            }, style: {
                                                alignItems: "center",
                                                padding: index_js_1.spacing.md,
                                            }, variant: "secondary", children: locale.instructionScreen.disconnectWallet })] }))] }, status)] })) }), (termsOfServiceUrl || privacyPolicyUrl) && ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { animate: "fadein", p: "md", children: (0, jsx_runtime_1.jsx)(TOS_js_1.TOS, { locale: connectLocale.agreement, privacyPolicyUrl: privacyPolicyUrl, termsOfServiceUrl: termsOfServiceUrl }) }))] }));
};
exports.SignatureScreen = SignatureScreen;
function isHeadlessSignSupported(walletId) {
    return (walletId === "inApp" ||
        walletId === "embedded" ||
        walletId.startsWith("ecosystem"));
}
function HeadlessSignIn({ signIn, error, status, connectLocale, wallet, }) {
    const locale = connectLocale.signatureScreen;
    const mounted = (0, react_2.useRef)(false);
    const { disconnect } = (0, useDisconnect_js_1.useDisconnect)();
    (0, react_2.useEffect)(() => {
        if (mounted.current) {
            return;
        }
        mounted.current = true;
        signIn();
    }, [signIn]);
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", flex: "column", fullHeight: true, p: "lg", children: [(0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { title: locale.signingScreen.title }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "both", expand: true, flex: "row", style: {
                    minHeight: "250px",
                }, children: [status === "signing" && (0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { color: "accentText", size: "xl" }), status === "failed" && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "danger", size: "lg", children: error || locale.signingScreen.failedToSignIn }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsxs)(buttons_js_1.Button, { fullWidth: true, onClick: () => {
                                    signIn();
                                }, style: {
                                    alignItems: "center",
                                    gap: index_js_1.spacing.xs,
                                    padding: index_js_1.spacing.md,
                                }, variant: "accent", children: [(0, jsx_runtime_1.jsx)(react_icons_1.ReloadIcon, { height: index_js_1.iconSize.sm, width: index_js_1.iconSize.sm }), locale.signingScreen.tryAgain] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "sm" }), (0, jsx_runtime_1.jsx)(buttons_js_1.Button, { "data-testid": "disconnect-button", fullWidth: true, onClick: () => {
                                    disconnect(wallet);
                                }, style: {
                                    alignItems: "center",
                                    padding: index_js_1.spacing.md,
                                }, variant: "secondary", children: locale.instructionScreen.disconnectWallet })] }))] })] }));
}
const pulseAnimation = (0, react_1.keyframes) `
0% {
  transform: scale(0.9);
}
100% {
  opacity: 0;
  transform: scale(1.4);
}
`;
const PulsatingContainer = /* @__PURE__ */ (0, elements_js_1.StyledDiv)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        "&::before": {
            animation: `${pulseAnimation} 2s cubic-bezier(0.175, 0.885, 0.32, 1.1) infinite`,
            background: theme.colors.accentText,
            borderRadius: index_js_1.radius.xl,
            bottom: 0,
            content: '""',
            display: "block",
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: -1,
        },
        position: "relative",
    };
});
//# sourceMappingURL=SignatureScreen.js.map