"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InAppWalletUI = InAppWalletUI;
exports.OtpLogin = OtpLogin;
exports.PasskeyView = PasskeyView;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
const react_native_1 = require("react-native");
const nativeStorage_js_1 = require("../../../../utils/storage/nativeStorage.js");
const index_js_1 = require("../../../../wallets/in-app/native/auth/index.js");
const passkeys_js_1 = require("../../../../wallets/in-app/native/auth/passkeys.js");
const types_js_1 = require("../../../../wallets/types.js");
const storage_js_1 = require("../../../core/utils/storage.js");
const index_js_2 = require("../../design-system/index.js");
const button_js_1 = require("../components/button.js");
const input_js_1 = require("../components/input.js");
const RNImage_js_1 = require("../components/RNImage.js");
const spacer_js_1 = require("../components/spacer.js");
const text_js_1 = require("../components/text.js");
const WalletImage_js_1 = require("../components/WalletImage.js");
const svgs_js_1 = require("../icons/svgs.js");
const LoadingView_js_1 = require("./LoadingView.js");
const defaultAuthOptions = [
    "email",
    "phone",
    "passkey",
    "google",
    "facebook",
    "apple",
];
const socialIcons = {
    apple: svgs_js_1.APPLE_ICON,
    coinbase: svgs_js_1.COINBASE_ICON,
    discord: svgs_js_1.DISCORD_ICON,
    facebook: svgs_js_1.FACEBOOK_ICON,
    farcaster: svgs_js_1.FARCASTER_ICON,
    github: svgs_js_1.GITHUB_ICON,
    google: svgs_js_1.GOOGLE_ICON,
    line: svgs_js_1.LINE_ICON,
    steam: svgs_js_1.STEAM_ICON,
    telegram: svgs_js_1.TELEGRAM_ICON,
    twitch: svgs_js_1.TWITCH_ICON,
    x: svgs_js_1.X_ICON,
    tiktok: svgs_js_1.TIKTOK_ICON,
    epic: svgs_js_1.EPIC_ICON,
};
function InAppWalletUI(props) {
    const { wallet, theme } = props;
    const config = wallet.getConfig();
    const authOptions = config?.auth?.options || defaultAuthOptions;
    const socialLogins = authOptions.filter((x) => types_js_1.socialAuthOptions.includes(x));
    const [inputMode, setInputMode] = (0, react_1.useState)("email");
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.row, children: socialLogins.map((auth) => ((0, jsx_runtime_1.jsx)(SocialLogin, { auth: auth, ...props }, auth))) }), authOptions.includes("email") ? (inputMode === "email" ? ((0, jsx_runtime_1.jsx)(PreOtpLogin, { auth: "email", ...props })) : ((0, jsx_runtime_1.jsx)(button_js_1.ThemedButtonWithIcon, { icon: (0, WalletImage_js_1.getAuthProviderImage)("email"), onPress: () => setInputMode("email"), theme: theme, title: "Email address" }))) : null, authOptions.includes("phone") ? (inputMode === "phone" ? ((0, jsx_runtime_1.jsx)(PreOtpLogin, { auth: "phone", ...props })) : ((0, jsx_runtime_1.jsx)(button_js_1.ThemedButtonWithIcon, { icon: (0, WalletImage_js_1.getAuthProviderImage)("phone"), onPress: () => setInputMode("phone"), theme: theme, title: "Phone number" }))) : null, authOptions.includes("passkey") ? ((0, jsx_runtime_1.jsx)(button_js_1.ThemedButtonWithIcon, { icon: (0, WalletImage_js_1.getAuthProviderImage)("passkey"), onPress: () => {
                    props.setScreen({ screen: "passkey", wallet });
                }, theme: theme, title: "Passkey" })) : null, authOptions.includes("guest") ? (0, jsx_runtime_1.jsx)(GuestLogin, { ...props }) : null] }));
}
function GuestLogin(props) {
    const { theme, wallet, client, connector } = props;
    const connectInAppWallet = (0, react_1.useCallback)(() => {
        connector({
            authMethod: "guest",
            connectFn: async () => {
                await wallet.connect({
                    client,
                    strategy: "guest",
                });
                await (0, storage_js_1.setLastAuthProvider)("guest", nativeStorage_js_1.nativeLocalStorage);
                return wallet;
            },
            wallet,
        });
    }, [connector, wallet, client]);
    return ((0, jsx_runtime_1.jsx)(button_js_1.ThemedButtonWithIcon, { icon: (0, WalletImage_js_1.getAuthProviderImage)("guest"), onPress: () => {
            connectInAppWallet();
        }, theme: theme, title: "Continue as guest" }));
}
function SocialLogin(props) {
    const { theme, wallet, auth, client, connector } = props;
    // TODO (rn) - move this onPress and state up
    const strategy = props.auth;
    const connectInAppWallet = (0, react_1.useCallback)(() => {
        connector({
            authMethod: auth,
            connectFn: async (chain) => {
                await wallet.connect({
                    chain,
                    client,
                    strategy: auth,
                });
                await (0, storage_js_1.setLastAuthProvider)(auth, nativeStorage_js_1.nativeLocalStorage);
                return wallet;
            },
            wallet,
        });
    }, [connector, auth, wallet, client]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { onPress: connectInAppWallet, style: [
            styles.socialIconContainer,
            { borderColor: theme.colors.borderColor },
        ], children: (0, jsx_runtime_1.jsx)(RNImage_js_1.RNImage, { data: socialIcons[auth], size: 38, theme: theme }) }, strategy));
}
function PreOtpLogin(props) {
    const { theme, auth, client, setScreen, wallet } = props;
    const [phoneOrEmail, setPhoneNumberOrEmail] = (0, react_1.useState)("");
    const sendCode = (0, react_query_1.useMutation)({
        mutationFn: async (options) => {
            const { auth, phoneOrEmail } = options;
            if (auth === "phone") {
                if (phoneOrEmail.slice(0, 1) !== "+") {
                    throw new Error("Invalid phone number. Please include a country code.");
                }
                await (0, index_js_1.preAuthenticate)({
                    client,
                    phoneNumber: phoneOrEmail,
                    strategy: auth,
                });
            }
            else {
                await (0, index_js_1.preAuthenticate)({
                    client,
                    email: phoneOrEmail,
                    strategy: auth,
                });
            }
        },
    });
    return ((0, jsx_runtime_1.jsx)(input_js_1.ThemedInputWithSubmit, { isSubmitting: sendCode.isPending, keyboardType: auth === "phone" ? "phone-pad" : "email-address", onChangeText: setPhoneNumberOrEmail, onSubmit: () => sendCode.mutate({
            auth,
            phoneOrEmail,
        }, {
            onError: (error) => {
                // TODO (rn) - handle error toast or input error border/label
                react_native_1.Alert.alert("Error", error.message);
            },
            onSuccess: (_, vars) => {
                if (vars.auth === "phone") {
                    setScreen({
                        auth: {
                            phoneNumber: vars.phoneOrEmail,
                            strategy: vars.auth,
                        },
                        screen: "otp",
                        wallet,
                    });
                }
                else {
                    setScreen({
                        auth: { email: vars.phoneOrEmail, strategy: vars.auth },
                        screen: "otp",
                        wallet,
                    });
                }
            },
        }), placeholder: auth === "phone" ? "Phone number" : "Email address", theme: theme, value: phoneOrEmail }));
}
function OtpLogin(props) {
    const { theme, auth, wallet, client, connector } = props;
    const [verificationCode, setVerificationCode] = (0, react_1.useState)("");
    const connectInAppWallet = async () => {
        if (!verificationCode || !verificationCode)
            return;
        await connector({
            authMethod: auth.strategy,
            connectFn: async (chain) => {
                if (auth.strategy === "phone") {
                    await wallet.connect({
                        chain,
                        client,
                        phoneNumber: auth.phoneNumber,
                        strategy: auth.strategy,
                        verificationCode,
                    });
                }
                else {
                    await wallet.connect({
                        chain,
                        client,
                        email: auth.email,
                        strategy: auth.strategy,
                        verificationCode,
                    });
                }
                await (0, storage_js_1.setLastAuthProvider)(auth.strategy, nativeStorage_js_1.nativeLocalStorage);
                return wallet;
            },
            wallet,
        });
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                }, children: [(0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { style: { color: theme.colors.secondaryText }, theme: theme, children: "Enter the verification code sent to" }), (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { theme: theme, type: "defaultSemiBold", children: auth.strategy === "phone" ? auth.phoneNumber : auth.email })] }), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "xs" }), (0, jsx_runtime_1.jsx)(input_js_1.ThemedInput, { keyboardType: "number-pad", onChangeText: setVerificationCode, placeholder: "Verification code", theme: theme, value: verificationCode }), (0, jsx_runtime_1.jsx)(button_js_1.ThemedButton, { onPress: connectInAppWallet, theme: theme, variant: "accent", children: (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { style: { color: theme.colors.accentButtonText }, theme: theme, type: "defaultSemiBold", children: "Verify" }) })] }));
}
function PasskeyView(props) {
    const { theme, wallet, client } = props;
    const [screen, setScreen] = (0, react_1.useState)("loading");
    const triggered = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        if (triggered.current) {
            return;
        }
        triggered.current = true;
        (0, passkeys_js_1.hasStoredPasskey)(client)
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
    }, [client]);
    if (screen === "loading") {
        return (0, jsx_runtime_1.jsx)(LoadingView_js_1.LoadingView, { theme: theme });
    }
    if (screen === "login" || screen === "signup") {
        return ((0, jsx_runtime_1.jsx)(PasskeyLoadingView, { ...props, type: screen === "login" ? "sign-in" : "sign-up" }));
    }
    return (wallet && ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            padding: index_js_2.spacing.xl,
        }, children: [(0, jsx_runtime_1.jsx)(RNImage_js_1.RNImage, { color: theme.colors.accentButtonBg, data: (0, WalletImage_js_1.getAuthProviderImage)("passkey"), size: 90, theme: theme }), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "xxl" }), (0, jsx_runtime_1.jsx)(button_js_1.ThemedButton, { onPress: async () => {
                    setScreen("signup");
                }, style: { width: "100%" }, theme: theme, variant: "accent", children: (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { style: {
                        color: theme.colors.accentButtonText,
                    }, theme: theme, type: "defaultSemiBold", children: "Create a Passkey" }) }), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "md" }), (0, jsx_runtime_1.jsx)(button_js_1.ThemedButton, { onPress: async () => {
                    setScreen("login");
                }, style: { width: "100%" }, theme: theme, variant: "secondary", children: (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { style: {
                        color: theme.colors.secondaryButtonText,
                    }, theme: theme, type: "defaultSemiBold", children: "I have a Passkey" }) })] })));
}
function PasskeyLoadingView(props) {
    const { theme, type, wallet, client, connector } = props;
    const triggered = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        if (triggered.current) {
            return;
        }
        triggered.current = true;
        const connectInAppWallet = async (type) => {
            await connector({
                authMethod: "passkey",
                connectFn: async (chain) => {
                    await wallet.connect({
                        chain,
                        client,
                        strategy: "passkey",
                        type,
                    });
                    await (0, storage_js_1.setLastAuthProvider)("passkey", nativeStorage_js_1.nativeLocalStorage);
                    return wallet;
                },
                wallet,
            });
        };
        connectInAppWallet(type);
    }, [client, type, wallet, connector]);
    return (0, jsx_runtime_1.jsx)(LoadingView_js_1.LoadingView, { theme: theme });
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: index_js_2.spacing.md,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: index_js_2.spacing.md,
        justifyContent: "space-evenly",
    },
    socialIconContainer: {
        alignItems: "center",
        borderRadius: index_js_2.radius.lg,
        borderStyle: "solid",
        borderWidth: 1,
        flex: 1,
        flexDirection: "column",
        height: 60,
        justifyContent: "center",
    },
});
//# sourceMappingURL=InAppWalletUI.js.map