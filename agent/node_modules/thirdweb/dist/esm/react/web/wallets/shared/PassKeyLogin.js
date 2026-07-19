import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { webLocalStorage } from "../../../../utils/storage/webStorage.js";
import { isEcosystemWallet } from "../../../../wallets/ecosystem/is-ecosystem-wallet.js";
import { linkProfile } from "../../../../wallets/in-app/web/lib/auth/index.js";
import { hasStoredPasskey } from "../../../../wallets/in-app/web/lib/auth/passkeys.js";
import { iconSize } from "../../../core/design-system/index.js";
import { setLastAuthProvider } from "../../../core/utils/storage.js";
import { FingerPrintIcon } from "../../ui/ConnectWallet/icons/FingerPrintIcon.js";
import { Container, ModalHeader } from "../../ui/components/basic.js";
import { Button } from "../../ui/components/buttons.js";
import { Spacer } from "../../ui/components/Spacer.js";
import { ErrorState } from "./ErrorState.js";
import { LoadingScreen } from "./LoadingScreen.js";
import { LoadingState } from "./LoadingState.js";
// is passkey stored?
// - login
// else
// - show login or signup options
export function PassKeyLogin(props) {
    const { wallet, done, client, chain, size, locale } = props;
    const [screen, setScreen] = useState("loading");
    const triggered = useRef(false);
    useEffect(() => {
        if (triggered.current) {
            return;
        }
        triggered.current = true;
        hasStoredPasskey(client, isEcosystemWallet(wallet.id) ? wallet.id : undefined)
            .then((isStored) => {
            if (isStored) {
                setScreen("login");
            }
            else {
                setScreen("select");
            }
        })
            .catch(() => {
            setScreen("select");
        });
    }, [client, wallet.id]);
    return (_jsxs(Container, { animate: "fadein", flex: "column", fullHeight: true, children: [_jsx(Container, { p: "lg", children: _jsx(ModalHeader, { onBack: props.onBack, title: props.isLinking
                        ? locale.passkeys.linkPasskey
                        : locale.passkeys.title }) }), _jsx(Container, { center: "y", expand: true, flex: "column", px: size === "wide" ? "xxl" : "lg", children: _jsxs("div", { children: [screen === "loading" && (_jsxs(_Fragment, { children: [_jsx(LoadingScreen, {}), _jsx(Spacer, { y: "xxl" })] })), screen === "select" && (_jsx(SelectLoginMethod, { onSignin: () => {
                                setScreen("login");
                            }, onSignup: () => {
                                setScreen("signup");
                            } })), screen === "login" && (_jsx(LoginScreen, { chain: chain, client: client, done: done, isLinking: props.isLinking, onCreate: () => {
                                setScreen("signup");
                            }, wallet: wallet })), screen === "signup" && (_jsx(SignupScreen, { chain: chain, client: client, done: done, isLinking: props.isLinking, wallet: wallet }))] }) })] }));
}
function LoginScreen(props) {
    const { wallet, done, client, chain } = props;
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState();
    async function login() {
        setStatus("loading");
        try {
            if (props.isLinking) {
                await linkProfile({
                    client,
                    strategy: "passkey",
                    type: "sign-in",
                }).catch((e) => {
                    setError(e.message);
                    throw e;
                });
            }
            else {
                await wallet.connect({
                    chain,
                    client: client,
                    strategy: "passkey",
                    type: "sign-in",
                });
                await setLastAuthProvider("passkey", webLocalStorage);
            }
            done();
        }
        catch (e) {
            console.error("Failed to login with passkey", e);
            setStatus("error");
        }
    }
    const triggered = useRef(false);
    useEffect(() => {
        if (triggered.current) {
            return;
        }
        triggered.current = true;
        login();
    });
    if (status === "loading") {
        return (_jsx(LoadingState, { icon: _jsx(FingerPrintIcon, { size: iconSize.xxl }), subtitle: "A pop-up prompt will appear to sign-in and verify your passkey", title: "Requesting Passkey" }));
    }
    if (status === "error") {
        return (_jsxs(_Fragment, { children: [_jsx(ErrorState, { onTryAgain: login, title: error || "Failed to Login" }), _jsx(Spacer, { y: "sm" }), _jsx(Button, { fullWidth: true, onClick: props.onCreate, variant: "outline", children: "Create a new Passkey" }), _jsx(Spacer, { y: "lg" })] }));
    }
    return null;
}
function SignupScreen(props) {
    const { wallet, done, client, chain } = props;
    const [error, setError] = useState();
    const [status, setStatus] = useState("loading");
    const ecosystem = isEcosystemWallet(wallet)
        ? {
            id: wallet.id,
            partnerId: wallet.getConfig()?.partnerId,
        }
        : undefined;
    async function signup() {
        setStatus("loading");
        try {
            if (props.isLinking) {
                await linkProfile({
                    client,
                    ecosystem,
                    strategy: "passkey",
                    type: "sign-up",
                });
            }
            else {
                await wallet.connect({
                    chain,
                    client: client,
                    strategy: "passkey",
                    type: "sign-up",
                });
                await setLastAuthProvider("passkey", webLocalStorage);
            }
            done();
        }
        catch (e) {
            console.error(e);
            if (e instanceof Error) {
                setError(`Error creating passkey: ${e.message}`);
            }
            setStatus("error");
        }
    }
    const triggered = useRef(false);
    useEffect(() => {
        if (triggered.current) {
            return;
        }
        triggered.current = true;
        signup();
    });
    if (status === "loading") {
        return (_jsx(LoadingState, { icon: _jsx(FingerPrintIcon, { size: iconSize.xxl }), subtitle: "A pop-up prompt will appear to sign-in and verify your passkey", title: "Creating Passkey" }));
    }
    if (status === "error") {
        return (_jsxs(_Fragment, { children: [_jsx(ErrorState, { onTryAgain: signup, title: error || "Failed to create passkey" }), _jsx(Spacer, { y: "lg" })] }));
    }
    return null;
}
function SelectLoginMethod(props) {
    return (_jsxs(Container, { children: [_jsx(Spacer, { y: "xxl" }), _jsx(Container, { center: "x", color: "accentText", flex: "row", children: _jsx(FingerPrintIcon, { size: iconSize["4xl"] }) }), _jsx(Spacer, { y: "xl" }), _jsx(Spacer, { y: "xxl" }), _jsx(Button, { fullWidth: true, onClick: props.onSignup, variant: "accent", children: "Create a Passkey" }), _jsx(Spacer, { y: "sm" }), _jsx(Button, { fullWidth: true, onClick: props.onSignin, variant: "outline", children: "I have a Passkey" }), _jsx(Spacer, { y: "lg" })] }));
}
//# sourceMappingURL=PassKeyLogin.js.map