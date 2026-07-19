"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPLoginUI = OTPLoginUI;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const webStorage_js_1 = require("../../../../utils/storage/webStorage.js");
const is_ecosystem_wallet_js_1 = require("../../../../wallets/ecosystem/is-ecosystem-wallet.js");
const index_js_1 = require("../../../../wallets/in-app/web/lib/auth/index.js");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_2 = require("../../../core/design-system/index.js");
const storage_js_1 = require("../../../core/utils/storage.js");
const basic_js_1 = require("../../ui/components/basic.js");
const buttons_js_1 = require("../../ui/components/buttons.js");
const FadeIn_js_1 = require("../../ui/components/FadeIn.js");
const OTPInput_js_1 = require("../../ui/components/OTPInput.js");
const Spacer_js_1 = require("../../ui/components/Spacer.js");
const Spinner_js_1 = require("../../ui/components/Spinner.js");
const text_js_1 = require("../../ui/components/text.js");
const elements_js_1 = require("../../ui/design-system/elements.js");
/**
 * @internal
 */
function OTPLoginUI(props) {
    const { wallet, done, goBack, userInfo } = props;
    const isWideModal = props.size === "wide";
    const locale = props.locale;
    const [otpInput, setOtpInput] = (0, react_1.useState)("");
    const [verifyStatus, setVerifyStatus] = (0, react_1.useState)("idle");
    const [error, setError] = (0, react_1.useState)();
    const [accountStatus, setAccountStatus] = (0, react_1.useState)({
        type: "sending",
    });
    const [countdown, setCountdown] = (0, react_1.useState)(0);
    const ecosystem = (0, is_ecosystem_wallet_js_1.isEcosystemWallet)(wallet)
        ? {
            id: wallet.id,
            partnerId: wallet.getConfig()?.partnerId,
        }
        : undefined;
    const [screen] = (0, react_1.useState)("base");
    const sendEmailOrSms = (0, react_1.useCallback)(async () => {
        setOtpInput("");
        setVerifyStatus("idle");
        setAccountStatus({ type: "sending" });
        try {
            if ("email" in userInfo) {
                await (0, index_js_1.preAuthenticate)({
                    client: props.client,
                    ecosystem,
                    email: userInfo.email,
                    strategy: "email",
                });
                setAccountStatus({ type: "sent" });
                setCountdown(60); // Start 60-second countdown
            }
            else if ("phone" in userInfo) {
                await (0, index_js_1.preAuthenticate)({
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
            await (0, storage_js_1.setLastAuthProvider)("email", webStorage_js_1.webLocalStorage);
        }
        else if ("phone" in userInfo) {
            await wallet.connect({
                chain: props.chain,
                client: props.client,
                phoneNumber: userInfo.phone,
                strategy: "phone",
                verificationCode: otp,
            });
            await (0, storage_js_1.setLastAuthProvider)("phone", webStorage_js_1.webLocalStorage);
        }
        else {
            throw new Error("Invalid userInfo");
        }
    }
    async function link(otp) {
        if ("email" in userInfo) {
            await (0, index_js_1.linkProfile)({
                client: props.client,
                ecosystem,
                email: userInfo.email,
                strategy: "email",
                verificationCode: otp,
            });
        }
        else if ("phone" in userInfo) {
            await (0, index_js_1.linkProfile)({
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
    const emailSentOnMount = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        if (!emailSentOnMount.current) {
            emailSentOnMount.current = true;
            sendEmailOrSms();
        }
    }, [sendEmailOrSms]);
    // Handle countdown timer
    (0, react_1.useEffect)(() => {
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
        return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", flex: "column", fullHeight: true, className: "tw-otp-login-screen", children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { p: "lg", children: (0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: goBack, title: locale.signIn }) }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "y", expand: true, flex: "column", children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: (e) => {
                            e.preventDefault();
                        }, children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "x", flex: "column", px: "lg", children: [!isWideModal && (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { className: "tw-screen-title", children: locale.emailLoginScreen.enterCodeSendTo }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "sm" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", children: "email" in userInfo ? userInfo.email : userInfo.phone }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" })] }), (0, jsx_runtime_1.jsx)(OTPInput_js_1.OTPInput, { digits: 6, isInvalid: verifyStatus === "invalid", onEnter: () => {
                                    verify(otpInput);
                                }, setValue: (value) => {
                                    setOtpInput(value);
                                    setVerifyStatus("idle"); // reset error
                                }, value: otpInput }), verifyStatus === "invalid" && ((0, jsx_runtime_1.jsxs)(FadeIn_js_1.FadeIn, { children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "danger", size: "sm", className: "tw-invalid-code-text", children: locale.emailLoginScreen.invalidCode })] })), verifyStatus === "linking_error" && ((0, jsx_runtime_1.jsxs)(FadeIn_js_1.FadeIn, { children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "danger", size: "sm", className: "tw-screen-error", children: error || "Failed to verify code" })] })), verifyStatus === "payment_required" && ((0, jsx_runtime_1.jsxs)(FadeIn_js_1.FadeIn, { children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "danger", size: "sm", className: "tw-screen-error", children: locale.maxAccountsExceeded })] })), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { px: isWideModal ? "xxl" : "lg", children: verifyStatus === "verifying" ? ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { animate: "fadein", center: "x", flex: "row", children: (0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { color: "accentText", size: "lg" }) })) : ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { animate: "fadein", children: (0, jsx_runtime_1.jsx)(buttons_js_1.Button, { onClick: () => verify(otpInput), style: {
                                            width: "100%",
                                        }, type: "submit", variant: "accent", className: "tw-verify-button", children: locale.emailLoginScreen.verify }) }, "btn-container")) }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }), !isWideModal && (0, jsx_runtime_1.jsx)(basic_js_1.Line, {}), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { gap: "sm", p: isWideModal ? undefined : "lg", flex: "column", children: [accountStatus.type === "error" && ((0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "danger", size: "sm", className: "tw-screen-error", children: accountStatus.message ||
                                            locale.emailLoginScreen.failedToSendCode })), accountStatus.type === "sending" && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "both", flex: "row", gap: "xs", style: {
                                            textAlign: "center",
                                        }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "sm", children: locale.emailLoginScreen.sendingCode }), (0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { color: "secondaryText", size: "xs" })] })), accountStatus.type !== "sending" && ((0, jsx_runtime_1.jsx)(LinkButton, { onClick: countdown === 0 ? sendEmailOrSms : undefined, style: {
                                            cursor: countdown > 0 ? "default" : "pointer",
                                            opacity: countdown > 0 ? 0.5 : 1,
                                        }, className: "tw-resend-button", type: "button", children: countdown > 0
                                            ? `Resend code in ${countdown} seconds`
                                            : locale.emailLoginScreen.resendCode }))] })] }) })] }));
    }
    return null;
}
const LinkButton = /* @__PURE__ */ (0, elements_js_1.StyledButton)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        all: "unset",
        "&:hover": {
            color: theme.colors.primaryText,
        },
        color: theme.colors.accentText,
        cursor: "pointer",
        fontSize: index_js_2.fontSize.sm,
        fontWeight: 500,
        textAlign: "center",
        width: "100%",
    };
});
//# sourceMappingURL=OTPLoginUI.js.map