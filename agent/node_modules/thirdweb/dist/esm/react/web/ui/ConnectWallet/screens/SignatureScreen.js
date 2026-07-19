import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { keyframes } from "@emotion/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCustomTheme } from "../../../../core/design-system/CustomThemeProvider.js";
import { iconSize, radius, spacing, } from "../../../../core/design-system/index.js";
import { useSiweAuth } from "../../../../core/hooks/auth/useSiweAuth.js";
import { useActiveAccount } from "../../../../core/hooks/wallets/useActiveAccount.js";
import { useActiveWallet } from "../../../../core/hooks/wallets/useActiveWallet.js";
import { useAdminWallet } from "../../../../core/hooks/wallets/useAdminWallet.js";
import { useDisconnect } from "../../../../core/hooks/wallets/useDisconnect.js";
import { wait } from "../../../../core/utils/wait.js";
import { LoadingScreen } from "../../../wallets/shared/LoadingScreen.js";
import { Container, ModalHeader } from "../../components/basic.js";
import { Button } from "../../components/buttons.js";
import { Spacer } from "../../components/Spacer.js";
import { Spinner } from "../../components/Spinner.js";
import { Text } from "../../components/text.js";
import { WalletImage } from "../../components/WalletImage.js";
import { StyledDiv } from "../../design-system/elements.js";
import { TOS } from "../Modal/TOS.js";
import { WalletLogoSpinner } from "./WalletLogoSpinner.js";
export const SignatureScreen = (props) => {
    const { onDone, modalSize, onClose, termsOfServiceUrl, privacyPolicyUrl, connectLocale, } = props;
    const wallet = useActiveWallet();
    const adminWallet = useAdminWallet();
    const activeAccount = useActiveAccount();
    const siweAuth = useSiweAuth(wallet, activeAccount, props.auth);
    const [error, setError] = useState(undefined);
    const [status, setStatus] = useState(error ? "failed" : "idle");
    const { disconnect } = useDisconnect();
    const locale = connectLocale.signatureScreen;
    const signIn = useCallback(async () => {
        try {
            setError(undefined);
            setStatus("signing");
            await siweAuth.doLogin();
            onDone?.();
        }
        catch (err) {
            await wait(1000);
            setError(err.message);
            setStatus("failed");
        }
    }, [onDone, siweAuth]);
    if (!wallet || siweAuth.isPending) {
        return _jsx(LoadingScreen, { "data-testid": "loading-screen" });
    }
    if (isHeadlessSignSupported(wallet.id) ||
        (wallet.id === "smart" &&
            adminWallet &&
            isHeadlessSignSupported(adminWallet.id))) {
        return (_jsx(HeadlessSignIn, { connectLocale: connectLocale, error: error, signIn: signIn, status: status, wallet: wallet }));
    }
    const handleRetry = () => {
        signIn();
    };
    return (_jsxs(Container, { animate: "fadein", flex: "column", fullHeight: true, children: [_jsx(Container, { p: "lg", style: {
                    paddingBottom: 0,
                }, children: _jsx(ModalHeader, { title: locale.instructionScreen.title }) }), _jsx(Container, { center: "y", expand: true, flex: "column", px: modalSize === "compact" ? "lg" : "xxl", style: {
                    paddingBottom: spacing.xl,
                    paddingTop: 0,
                }, children: status === "idle" ? (_jsxs(_Fragment, { children: [_jsx(Container, { animate: "fadein", center: "x", flex: "row", py: "3xl", children: _jsx(PulsatingContainer, { children: _jsx(WalletImage, { client: props.client, id: wallet.id, size: "80" }) }) }), _jsx(Text, { balance: true, center: true, multiline: true, children: locale.instructionScreen.instruction }), _jsx(Spacer, { y: "lg" }), _jsx(Button, { "data-testid": "sign-in-button", fullWidth: true, onClick: signIn, style: {
                                alignItems: "center",
                                padding: spacing.md,
                            }, variant: "accent", children: connectLocale.signatureScreen.instructionScreen.signInButton }), _jsx(Spacer, { y: "sm" }), _jsx(Button, { "data-testid": "disconnect-button", fullWidth: true, onClick: () => {
                                onClose?.();
                                disconnect(wallet);
                            }, style: {
                                alignItems: "center",
                                padding: spacing.md,
                            }, variant: "secondary", children: connectLocale.signatureScreen.instructionScreen.disconnectWallet })] })) : (_jsxs(_Fragment, { children: [_jsx(Container, { py: "3xl", children: _jsx(WalletLogoSpinner, { client: props.client, error: status === "failed", id: wallet.id }) }), _jsxs(Container, { animate: "fadein", flex: "column", gap: "md", children: [_jsxs(Text, { center: true, color: "primaryText", size: "lg", className: "tw-screen-title", children: [status === "failed"
                                            ? error || locale.signingScreen.failedToSignIn
                                            : locale.signingScreen.inProgress, " "] }), status === "signing" && (_jsx(Text, { balance: true, center: true, multiline: true, className: "tw-screen-description", children: connectLocale.signatureScreen.signingScreen.prompt })), status === "failed" && (_jsxs(Container, { children: [_jsx(Spacer, { y: "sm" }), _jsxs(Button, { fullWidth: true, onClick: handleRetry, style: {
                                                alignItems: "center",
                                                gap: spacing.xs,
                                                padding: spacing.md,
                                            }, variant: "accent", children: [_jsx(ReloadIcon, { height: iconSize.sm, width: iconSize.sm }), locale.signingScreen.tryAgain] }), _jsx(Spacer, { y: "sm" }), _jsx(Button, { fullWidth: true, onClick: () => {
                                                disconnect(wallet);
                                            }, style: {
                                                alignItems: "center",
                                                padding: spacing.md,
                                            }, variant: "secondary", children: locale.instructionScreen.disconnectWallet })] }))] }, status)] })) }), (termsOfServiceUrl || privacyPolicyUrl) && (_jsx(Container, { animate: "fadein", p: "md", children: _jsx(TOS, { locale: connectLocale.agreement, privacyPolicyUrl: privacyPolicyUrl, termsOfServiceUrl: termsOfServiceUrl }) }))] }));
};
function isHeadlessSignSupported(walletId) {
    return (walletId === "inApp" ||
        walletId === "embedded" ||
        walletId.startsWith("ecosystem"));
}
function HeadlessSignIn({ signIn, error, status, connectLocale, wallet, }) {
    const locale = connectLocale.signatureScreen;
    const mounted = useRef(false);
    const { disconnect } = useDisconnect();
    useEffect(() => {
        if (mounted.current) {
            return;
        }
        mounted.current = true;
        signIn();
    }, [signIn]);
    return (_jsxs(Container, { animate: "fadein", flex: "column", fullHeight: true, p: "lg", children: [_jsx(ModalHeader, { title: locale.signingScreen.title }), _jsxs(Container, { center: "both", expand: true, flex: "row", style: {
                    minHeight: "250px",
                }, children: [status === "signing" && _jsx(Spinner, { color: "accentText", size: "xl" }), status === "failed" && (_jsxs(Container, { children: [_jsx(Spacer, { y: "lg" }), _jsx(Text, { center: true, color: "danger", size: "lg", children: error || locale.signingScreen.failedToSignIn }), _jsx(Spacer, { y: "lg" }), _jsxs(Button, { fullWidth: true, onClick: () => {
                                    signIn();
                                }, style: {
                                    alignItems: "center",
                                    gap: spacing.xs,
                                    padding: spacing.md,
                                }, variant: "accent", children: [_jsx(ReloadIcon, { height: iconSize.sm, width: iconSize.sm }), locale.signingScreen.tryAgain] }), _jsx(Spacer, { y: "sm" }), _jsx(Button, { "data-testid": "disconnect-button", fullWidth: true, onClick: () => {
                                    disconnect(wallet);
                                }, style: {
                                    alignItems: "center",
                                    padding: spacing.md,
                                }, variant: "secondary", children: locale.instructionScreen.disconnectWallet })] }))] })] }));
}
const pulseAnimation = keyframes `
0% {
  transform: scale(0.9);
}
100% {
  opacity: 0;
  transform: scale(1.4);
}
`;
const PulsatingContainer = /* @__PURE__ */ StyledDiv((_) => {
    const theme = useCustomTheme();
    return {
        "&::before": {
            animation: `${pulseAnimation} 2s cubic-bezier(0.175, 0.885, 0.32, 1.1) infinite`,
            background: theme.colors.accentText,
            borderRadius: radius.xl,
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