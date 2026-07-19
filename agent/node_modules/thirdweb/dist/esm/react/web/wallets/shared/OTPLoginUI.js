"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import { webLocalStorage } from "../../../../utils/storage/webStorage.js";
import { isEcosystemWallet } from "../../../../wallets/ecosystem/is-ecosystem-wallet.js";
import { linkProfile, preAuthenticate, } from "../../../../wallets/in-app/web/lib/auth/index.js";
import { useCustomTheme } from "../../../core/design-system/CustomThemeProvider.js";
import { fontSize } from "../../../core/design-system/index.js";
import { setLastAuthProvider } from "../../../core/utils/storage.js";
import { Container, Line, ModalHeader } from "../../ui/components/basic.js";
import { Button } from "../../ui/components/buttons.js";
import { FadeIn } from "../../ui/components/FadeIn.js";
import { OTPInput } from "../../ui/components/OTPInput.js";
import { Spacer } from "../../ui/components/Spacer.js";
import { Spinner } from "../../ui/components/Spinner.js";
import { Text } from "../../ui/components/text.js";
import { StyledButton } from "../../ui/design-system/elements.js";
/**
 * @internal
 */
export function OTPLoginUI(props) {
    const { wallet, done, goBack, userInfo } = props;
    const isWideModal = props.size === "wide";
    const locale = props.locale;
    const [otpInput, setOtpInput] = useState("");
    const [verifyStatus, setVerifyStatus] = useState("idle");
    const [error, setError] = useState();
    const [accountStatus, setAccountStatus] = useState({
        type: "sending",
    });
    const [countdown, setCountdown] = useState(0);
    const ecosystem = isEcosystemWallet(wallet)
        ? {
            id: wallet.id,
            partnerId: wallet.getConfig()?.partnerId,
        }
        : undefined;
    const [screen] = useState("base");
    const sendEmailOrSms = useCallback(async () => {
        setOtpInput("");
        setVerifyStatus("idle");
        setAccountStatus({ type: "sending" });
        try {
            if ("email" in userInfo) {
                await preAuthenticate({
                    client: props.client,
                    ecosystem,
                    email: userInfo.email,
                    strategy: "email",
                });
                setAccountStatus({ type: "sent" });
                setCountdown(60); // Start 60-second countdown
            }
            else if ("phone" in userInfo) {
                await preAuthenticate({
                    client: props.client,
                    ecosystem,
                    phoneNumber: userInfo.phone,
                    strategy: "phone",
                });
                setAccountStatus({ type: "sent" });
                setCountdown(60); // Start 60-second countdown
            }
            else {
                throw new Error("Invalid userInfo");
            }
        }
        catch (e) {
            console.error(e);
            setVerifyStatus("idle");
            setAccountStatus({
                type: "error",
                message: e instanceof Error ? e.message : undefined,
            });
        }
    }, [props.client, userInfo, ecosystem]);
    async function connect(otp) {
        if ("email" in userInfo) {
            await wallet.connect({
                chain: props.chain,
                client: props.client,
                email: userInfo.email,
                strategy: "email",
                verificationCode: otp,
            });
            await setLastAuthProvider("email", webLocalStorage);
        }
        else if ("phone" in userInfo) {
            await wallet.connect({
                chain: props.chain,
                client: props.client,
                phoneNumber: userInfo.phone,
                strategy: "phone",
                verificationCode: otp,
            });
            await setLastAuthProvider("phone", webLocalStorage);
        }
        else {
            throw new Error("Invalid userInfo");
        }
    }
    async function link(otp) {
        if ("email" in userInfo) {
            await linkProfile({
                client: props.client,
                ecosystem,
                email: userInfo.email,
                strategy: "email",
                verificationCode: otp,
            });
        }
        else if ("phone" in userInfo) {
            await linkProfile({
                client: props.client,
                ecosystem,
                phoneNumber: userInfo.phone,
                strategy: "phone",
                verificationCode: otp,
            });
        }
    }
    const verify = async (otp) => {
        if (otp.length !== 6) {
            return;
        }
        setVerifyStatus("verifying");
        try {
            // verifies otp for UI feedback
            if (props.isLinking) {
                await link(otp);
            }
            else {
                await connect(otp);
            }
            done();
            setVerifyStatus("valid");
        }
        catch (e) {
            // TODO: More robust error handling
            if (e instanceof Error &&
                e?.message?.includes("PAYMENT_METHOD_REQUIRED")) {
                setVerifyStatus("payment_required");
            }
            else if (e instanceof Error &&
                (e.message.toLowerCase().includes("link") ||
                    e.message.toLowerCase().includes("profile"))) {
                setVerifyStatus("linking_error");
                setError(e.message);
            }
            else {
                setVerifyStatus("invalid");
            }
            console.error("Authentication Error", e);
        }
    };
    // send email on mount
    const emailSentOnMount = useRef(false);
    useEffect(() => {
        if (!emailSentOnMount.current) {
            emailSentOnMount.current = true;
            sendEmailOrSms();
        }
    }, [sendEmailOrSms]);
    // Handle countdown timer
    useEffect(() => {
        if (countdown <= 0)
            return;
        const timer = setInterval(() => {
            setCountdown((current) => {
                if (current <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return current - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [countdown]);
    if (screen === "base") {
        return (_jsxs(Container, { animate: "fadein", flex: "column", fullHeight: true, className: "tw-otp-login-screen", children: [_jsx(Container, { p: "lg", children: _jsx(ModalHeader, { onBack: goBack, title: locale.signIn }) }), _jsx(Container, { center: "y", expand: true, flex: "column", children: _jsxs("form", { onSubmit: (e) => {
                            e.preventDefault();
                        }, children: [_jsxs(Container, { center: "x", flex: "column", px: "lg", children: [!isWideModal && _jsx(Spacer, { y: "xl" }), _jsx(Text, { className: "tw-screen-title", children: locale.emailLoginScreen.enterCodeSendTo }), _jsx(Spacer, { y: "sm" }), _jsx(Text, { color: "primaryText", children: "email" in userInfo ? userInfo.email : userInfo.phone }), _jsx(Spacer, { y: "xl" })] }), _jsx(OTPInput, { digits: 6, isInvalid: verifyStatus === "invalid", onEnter: () => {
                                    verify(otpInput);
                                }, setValue: (value) => {
                                    setOtpInput(value);
                                    setVerifyStatus("idle"); // reset error
                                }, value: otpInput }), verifyStatus === "invalid" && (_jsxs(FadeIn, { children: [_jsx(Spacer, { y: "md" }), _jsx(Text, { center: true, color: "danger", size: "sm", className: "tw-invalid-code-text", children: locale.emailLoginScreen.invalidCode })] })), verifyStatus === "linking_error" && (_jsxs(FadeIn, { children: [_jsx(Spacer, { y: "md" }), _jsx(Text, { center: true, color: "danger", size: "sm", className: "tw-screen-error", children: error || "Failed to verify code" })] })), verifyStatus === "payment_required" && (_jsxs(FadeIn, { children: [_jsx(Spacer, { y: "md" }), _jsx(Text, { center: true, color: "danger", size: "sm", className: "tw-screen-error", children: locale.maxAccountsExceeded })] })), _jsx(Spacer, { y: "xl" }), _jsx(Container, { px: isWideModal ? "xxl" : "lg", children: verifyStatus === "verifying" ? (_jsx(Container, { animate: "fadein", center: "x", flex: "row", children: _jsx(Spinner, { color: "accentText", size: "lg" }) })) : (_jsx(Container, { animate: "fadein", children: _jsx(Button, { onClick: () => verify(otpInput), style: {
                                            width: "100%",
                                        }, type: "submit", variant: "accent", className: "tw-verify-button", children: locale.emailLoginScreen.verify }) }, "btn-container")) }), _jsx(Spacer, { y: "xl" }), !isWideModal && _jsx(Line, {}), _jsxs(Container, { gap: "sm", p: isWideModal ? undefined : "lg", flex: "column", children: [accountStatus.type === "error" && (_jsx(Text, { center: true, color: "danger", size: "sm", className: "tw-screen-error", children: accountStatus.message ||
                                            locale.emailLoginScreen.failedToSendCode })), accountStatus.type === "sending" && (_jsxs(Container, { center: "both", flex: "row", gap: "xs", style: {
                                            textAlign: "center",
                                        }, children: [_jsx(Text, { size: "sm", children: locale.emailLoginScreen.sendingCode }), _jsx(Spinner, { color: "secondaryText", size: "xs" })] })), accountStatus.type !== "sending" && (_jsx(LinkButton, { onClick: countdown === 0 ? sendEmailOrSms : undefined, style: {
                                            cursor: countdown > 0 ? "default" : "pointer",
                                            opacity: countdown > 0 ? 0.5 : 1,
                                        }, className: "tw-resend-button", type: "button", children: countdown > 0
                                            ? `Resend code in ${countdown} seconds`
                                            : locale.emailLoginScreen.resendCode }))] })] }) })] }));
    }
    return null;
}
const LinkButton = /* @__PURE__ */ StyledButton((_) => {
    const theme = useCustomTheme();
    return {
        all: "unset",
        "&:hover": {
            color: theme.colors.primaryText,
        },
        color: theme.colors.accentText,
        cursor: "pointer",
        fontSize: fontSize.sm,
        fontWeight: 500,
        textAlign: "center",
        width: "100%",
    };
});
//# sourceMappingURL=OTPLoginUI.js.map