"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { webLocalStorage } from "../../../../utils/storage/webStorage.js";
import { isEcosystemWallet } from "../../../../wallets/ecosystem/is-ecosystem-wallet.js";
import { setLastAuthProvider } from "../../../core/utils/storage.js";
import { Container, ModalHeader } from "../../ui/components/basic.js";
import { Button } from "../../ui/components/buttons.js";
import { Spacer } from "../../ui/components/Spacer.js";
import { Spinner } from "../../ui/components/Spinner.js";
import { Text } from "../../ui/components/text.js";
/**
 * @internal
 */
export function GuestLogin(props) {
    const ewLocale = props.locale;
    const locale = ewLocale.socialLoginScreen;
    const [authError, setAuthError] = useState(undefined);
    const { done, wallet } = props;
    const [status, setStatus] = useState("connecting");
    const handleGuestLogin = async () => {
        const connectOptions = {
            client: props.client,
            ecosystem: isEcosystemWallet(wallet)
                ? {
                    id: wallet.id,
                    partnerId: wallet.getConfig()?.partnerId,
                }
                : undefined,
            strategy: "guest",
        };
        try {
            await wallet.connect(connectOptions);
            await setLastAuthProvider("guest", webLocalStorage);
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
            console.error("Error generating guest account", e);
        }
    };
    const guestLogin = props.state?.guestLogin;
    const socialLoginStarted = useRef(false);
    useEffect(() => {
        if (socialLoginStarted.current) {
            return;
        }
        if (guestLogin) {
            socialLoginStarted.current = true;
            setStatus("connecting");
            guestLogin.connectionPromise
                .then(() => {
                done();
                setStatus("connected");
            })
                .catch((e) => {
                setAuthError(e.message);
                setStatus("error");
            });
        }
    }, [done, guestLogin]);
    return (_jsx(Container, { animate: "fadein", flex: "column", fullHeight: true, className: "tw-guest-login-screen", children: _jsxs(Container, { expand: true, flex: "column", p: "lg", style: {
                paddingBottom: 0,
            }, children: [props.goBack && (_jsx(ModalHeader, { onBack: props.goBack, title: locale.title })), props.size === "compact" ? _jsx(Spacer, { y: "xl" }) : null, _jsxs(Container, { center: "both", expand: true, flex: "column", style: {
                        minHeight: "250px",
                        textAlign: "center",
                    }, children: [status !== "error" && (_jsxs(Container, { animate: "fadein", children: [_jsx(Text, { center: true, color: "primaryText", multiline: true, style: {
                                        maxWidth: "250px",
                                    }, children: "Generating your guest account" }), _jsx(Spacer, { y: "xl" }), _jsx(Container, { center: "x", flex: "row", children: _jsx(Spinner, { color: "accentText", size: "lg" }) }), _jsx(Spacer, { y: "xxl" })] })), status === "error" && (_jsxs(Container, { animate: "fadein", children: [authError ? (_jsx(Text, { center: true, color: "danger", children: authError })) : (_jsx(Text, { color: "danger", children: locale.failed })), _jsx(Spacer, { y: "lg" }), _jsx(Button, { onClick: handleGuestLogin, variant: "primary", children: locale.retry }), _jsx(Spacer, { y: "xxl" })] }))] })] }) }));
}
//# sourceMappingURL=GuestLogin.js.map