import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { nativeLocalStorage } from "../../../../utils/storage/nativeStorage.js";
import { preAuthenticate } from "../../../../wallets/in-app/native/auth/index.js";
import { hasStoredPasskey } from "../../../../wallets/in-app/native/auth/passkeys.js";
import { socialAuthOptions, } from "../../../../wallets/types.js";
import { setLastAuthProvider } from "../../../core/utils/storage.js";
import { radius, spacing } from "../../design-system/index.js";
import { ThemedButton, ThemedButtonWithIcon } from "../components/button.js";
import { ThemedInput, ThemedInputWithSubmit } from "../components/input.js";
import { RNImage } from "../components/RNImage.js";
import { Spacer } from "../components/spacer.js";
import { ThemedText } from "../components/text.js";
import { getAuthProviderImage } from "../components/WalletImage.js";
import { APPLE_ICON, COINBASE_ICON, DISCORD_ICON, EPIC_ICON, FACEBOOK_ICON, FARCASTER_ICON, GITHUB_ICON, GOOGLE_ICON, LINE_ICON, STEAM_ICON, TELEGRAM_ICON, TIKTOK_ICON, TWITCH_ICON, X_ICON, } from "../icons/svgs.js";
import { LoadingView } from "./LoadingView.js";
const defaultAuthOptions = [
    "email",
    "phone",
    "passkey",
    "google",
    "facebook",
    "apple",
];
const socialIcons = {
    apple: APPLE_ICON,
    coinbase: COINBASE_ICON,
    discord: DISCORD_ICON,
    facebook: FACEBOOK_ICON,
    farcaster: FARCASTER_ICON,
    github: GITHUB_ICON,
    google: GOOGLE_ICON,
    line: LINE_ICON,
    steam: STEAM_ICON,
    telegram: TELEGRAM_ICON,
    twitch: TWITCH_ICON,
    x: X_ICON,
    tiktok: TIKTOK_ICON,
    epic: EPIC_ICON,
};
export function InAppWalletUI(props) {
    const { wallet, theme } = props;
    const config = wallet.getConfig();
    const authOptions = config?.auth?.options || defaultAuthOptions;
    const socialLogins = authOptions.filter((x) => socialAuthOptions.includes(x));
    const [inputMode, setInputMode] = useState("email");
    return (_jsxs(View, { style: styles.container, children: [_jsx(View, { style: styles.row, children: socialLogins.map((auth) => (_jsx(SocialLogin, { auth: auth, ...props }, auth))) }), authOptions.includes("email") ? (inputMode === "email" ? (_jsx(PreOtpLogin, { auth: "email", ...props })) : (_jsx(ThemedButtonWithIcon, { icon: getAuthProviderImage("email"), onPress: () => setInputMode("email"), theme: theme, title: "Email address" }))) : null, authOptions.includes("phone") ? (inputMode === "phone" ? (_jsx(PreOtpLogin, { auth: "phone", ...props })) : (_jsx(ThemedButtonWithIcon, { icon: getAuthProviderImage("phone"), onPress: () => setInputMode("phone"), theme: theme, title: "Phone number" }))) : null, authOptions.includes("passkey") ? (_jsx(ThemedButtonWithIcon, { icon: getAuthProviderImage("passkey"), onPress: () => {
                    props.setScreen({ screen: "passkey", wallet });
                }, theme: theme, title: "Passkey" })) : null, authOptions.includes("guest") ? _jsx(GuestLogin, { ...props }) : null] }));
}
function GuestLogin(props) {
    const { theme, wallet, client, connector } = props;
    const connectInAppWallet = useCallback(() => {
        connector({
            authMethod: "guest",
            connectFn: async () => {
                await wallet.connect({
                    client,
                    strategy: "guest",
                });
                await setLastAuthProvider("guest", nativeLocalStorage);
                return wallet;
            },
            wallet,
        });
    }, [connector, wallet, client]);
    return (_jsx(ThemedButtonWithIcon, { icon: getAuthProviderImage("guest"), onPress: () => {
            connectInAppWallet();
        }, theme: theme, title: "Continue as guest" }));
}
function SocialLogin(props) {
    const { theme, wallet, auth, client, connector } = props;
    // TODO (rn) - move this onPress and state up
    const strategy = props.auth;
    const connectInAppWallet = useCallback(() => {
        connector({
            authMethod: auth,
            connectFn: async (chain) => {
                await wallet.connect({
                    chain,
                    client,
                    strategy: auth,
                });
                await setLastAuthProvider(auth, nativeLocalStorage);
                return wallet;
            },
            wallet,
        });
    }, [connector, auth, wallet, client]);
    return (_jsx(TouchableOpacity, { onPress: connectInAppWallet, style: [
            styles.socialIconContainer,
            { borderColor: theme.colors.borderColor },
        ], children: _jsx(RNImage, { data: socialIcons[auth], size: 38, theme: theme }) }, strategy));
}
function PreOtpLogin(props) {
    const { theme, auth, client, setScreen, wallet } = props;
    const [phoneOrEmail, setPhoneNumberOrEmail] = useState("");
    const sendCode = useMutation({
        mutationFn: async (options) => {
            const { auth, phoneOrEmail } = options;
            if (auth === "phone") {
                if (phoneOrEmail.slice(0, 1) !== "+") {
                    throw new Error("Invalid phone number. Please include a country code.");
                }
                await preAuthenticate({
                    client,
                    phoneNumber: phoneOrEmail,
                    strategy: auth,
                });
            }
            else {
                await preAuthenticate({
                    client,
                    email: phoneOrEmail,
                    strategy: auth,
                });
            }
        },
    });
    return (_jsx(ThemedInputWithSubmit, { isSubmitting: sendCode.isPending, keyboardType: auth === "phone" ? "phone-pad" : "email-address", onChangeText: setPhoneNumberOrEmail, onSubmit: () => sendCode.mutate({
            auth,
            phoneOrEmail,
        }, {
            onError: (error) => {
                // TODO (rn) - handle error toast or input error border/label
                Alert.alert("Error", error.message);
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
export function OtpLogin(props) {
    const { theme, auth, wallet, client, connector } = props;
    const [verificationCode, setVerificationCode] = useState("");
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
                await setLastAuthProvider(auth.strategy, nativeLocalStorage);
                return wallet;
            },
            wallet,
        });
    };
    return (_jsxs(_Fragment, { children: [_jsxs(View, { style: {
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                }, children: [_jsx(ThemedText, { style: { color: theme.colors.secondaryText }, theme: theme, children: "Enter the verification code sent to" }), _jsx(ThemedText, { theme: theme, type: "defaultSemiBold", children: auth.strategy === "phone" ? auth.phoneNumber : auth.email })] }), _jsx(Spacer, { size: "xs" }), _jsx(ThemedInput, { keyboardType: "number-pad", onChangeText: setVerificationCode, placeholder: "Verification code", theme: theme, value: verificationCode }), _jsx(ThemedButton, { onPress: connectInAppWallet, theme: theme, variant: "accent", children: _jsx(ThemedText, { style: { color: theme.colors.accentButtonText }, theme: theme, type: "defaultSemiBold", children: "Verify" }) })] }));
}
export function PasskeyView(props) {
    const { theme, wallet, client } = props;
    const [screen, setScreen] = useState("loading");
    const triggered = useRef(false);
    useEffect(() => {
        if (triggered.current) {
            return;
        }
        triggered.current = true;
        hasStoredPasskey(client)
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
        return _jsx(LoadingView, { theme: theme });
    }
    if (screen === "login" || screen === "signup") {
        return (_jsx(PasskeyLoadingView, { ...props, type: screen === "login" ? "sign-in" : "sign-up" }));
    }
    return (wallet && (_jsxs(View, { style: {
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            padding: spacing.xl,
        }, children: [_jsx(RNImage, { color: theme.colors.accentButtonBg, data: getAuthProviderImage("passkey"), size: 90, theme: theme }), _jsx(Spacer, { size: "xxl" }), _jsx(ThemedButton, { onPress: async () => {
                    setScreen("signup");
                }, style: { width: "100%" }, theme: theme, variant: "accent", children: _jsx(ThemedText, { style: {
                        color: theme.colors.accentButtonText,
                    }, theme: theme, type: "defaultSemiBold", children: "Create a Passkey" }) }), _jsx(Spacer, { size: "md" }), _jsx(ThemedButton, { onPress: async () => {
                    setScreen("login");
                }, style: { width: "100%" }, theme: theme, variant: "secondary", children: _jsx(ThemedText, { style: {
                        color: theme.colors.secondaryButtonText,
                    }, theme: theme, type: "defaultSemiBold", children: "I have a Passkey" }) })] })));
}
function PasskeyLoadingView(props) {
    const { theme, type, wallet, client, connector } = props;
    const triggered = useRef(false);
    useEffect(() => {
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
                    await setLastAuthProvider("passkey", nativeLocalStorage);
                    return wallet;
                },
                wallet,
            });
        };
        connectInAppWallet(type);
    }, [client, type, wallet, connector]);
    return _jsx(LoadingView, { theme: theme });
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: spacing.md,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.md,
        justifyContent: "space-evenly",
    },
    socialIconContainer: {
        alignItems: "center",
        borderRadius: radius.lg,
        borderStyle: "solid",
        borderWidth: 1,
        flex: 1,
        flexDirection: "column",
        height: 60,
        justifyContent: "center",
    },
});
//# sourceMappingURL=InAppWalletUI.js.map