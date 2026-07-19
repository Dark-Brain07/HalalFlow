import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CustomThemeProvider, useCustomTheme, } from "../react/core/design-system/CustomThemeProvider.js";
import { InAppWalletIcon } from "../react/web/ui/ConnectWallet/in-app-wallet-icon.js";
import { defaultAuthOptions } from "../react/web/wallets/shared/ConnectWalletSocialOptions.js";
import { inAppWallet } from "../wallets/in-app/web/in-app.js";
import { storyClient } from "./utils.js";
const meta = {
    title: "Components/in-app-wallet-icon",
    decorators: [
        (Story) => {
            return (_jsx(CustomThemeProvider, { theme: "dark", children: _jsx(Story, {}) }));
        },
    ],
};
export default meta;
function Variants() {
    const theme = useCustomTheme();
    return (_jsxs("div", { style: {
            backgroundColor: theme.colors.modalBg,
            padding: "14px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
        }, children: [_jsxs("div", { children: [_jsx(SectionTitle, { title: "Default" }), _jsx(Variant, { authOptions: defaultAuthOptions })] }), _jsxs("div", { children: [_jsx(SectionTitle, { title: "Single method enabled" }), _jsxs("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [_jsx(Variant, { authOptions: ["email"] }), _jsx(Variant, { authOptions: ["phone"] }), _jsx(Variant, { authOptions: ["passkey"] }), _jsx(Variant, { authOptions: ["guest"] }), _jsx(Variant, { authOptions: ["google"] }), _jsx(Variant, { authOptions: ["apple"] }), _jsx(Variant, { authOptions: ["facebook"] }), _jsx(Variant, { authOptions: ["discord"] }), _jsx(Variant, { authOptions: ["github"] }), _jsx(Variant, { authOptions: ["twitch"] }), _jsx(Variant, { authOptions: ["x"] }), _jsx(Variant, { authOptions: ["telegram"] }), _jsx(Variant, { authOptions: ["line"] }), _jsx(Variant, { authOptions: ["coinbase"] }), _jsx(Variant, { authOptions: ["epic"] }), _jsx(Variant, { authOptions: ["farcaster"] }), _jsx(Variant, { authOptions: ["tiktok"] }), _jsx(Variant, { authOptions: ["steam"] })] })] }), _jsxs("div", { children: [_jsx(SectionTitle, { title: "Two methods enabled" }), _jsxs("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [_jsx(Variant, { authOptions: ["email", "phone"] }), _jsx(Variant, { authOptions: ["email", "passkey"] }), _jsx(Variant, { authOptions: ["email", "guest"] }), _jsx(Variant, { authOptions: ["email", "google"] }), _jsx(Variant, { authOptions: ["email", "apple"] }), _jsx(Variant, { authOptions: ["email", "facebook"] }), _jsx(Variant, { authOptions: ["google", "discord"] }), _jsx(Variant, { authOptions: ["google", "github"] }), _jsx(Variant, { authOptions: ["google", "twitch"] }), _jsx(Variant, { authOptions: ["google", "x"] }), _jsx(Variant, { authOptions: ["google", "telegram"] }), _jsx(Variant, { authOptions: ["google", "line"] }), _jsx(Variant, { authOptions: ["google", "coinbase"] }), _jsx(Variant, { authOptions: ["google", "epic"] })] })] }), _jsxs("div", { children: [_jsx(SectionTitle, { title: "Three methods enabled" }), _jsxs("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [_jsx(Variant, { authOptions: ["google", "apple", "github"] }), _jsx(Variant, { authOptions: ["email", "phone", "guest"] }), _jsx(Variant, { authOptions: ["email", "phone", "google"] }), _jsx(Variant, { authOptions: ["email", "phone", "apple"] }), _jsx(Variant, { authOptions: ["email", "phone", "facebook"] })] })] }), _jsxs("div", { children: [_jsx(SectionTitle, { title: "Four or more methods enabled" }), _jsxs("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [_jsx(Variant, { authOptions: ["email", "phone", "google", "apple", "facebook"] }), _jsx(Variant, { authOptions: ["epic", "tiktok", "github", "email"] }), _jsx(Variant, { authOptions: ["twitch", "tiktok", "epic", "email", "phone"] }), _jsx(Variant, { authOptions: ["email", "phone", "passkey", "guest"] }), _jsx(Variant, { authOptions: [
                                    "google",
                                    "apple",
                                    "facebook",
                                    "github",
                                    "discord",
                                    "twitch",
                                    "x",
                                ] })] })] })] }));
}
export function LightTheme() {
    return _jsx(ThemeSetup, { theme: "light" });
}
export function DarkTheme() {
    return _jsx(ThemeSetup, { theme: "dark" });
}
function ThemeSetup(props) {
    return (_jsx(CustomThemeProvider, { theme: props.theme, children: _jsx(Variants, {}) }));
}
function Variant(props) {
    return (_jsx(InAppWalletIcon, { client: storyClient, wallet: inAppWallet({
            auth: {
                options: props.authOptions,
            },
        }) }));
}
function SectionTitle(props) {
    const theme = useCustomTheme();
    return (_jsx("p", { style: { color: theme.colors.secondaryText, fontSize: "14px" }, children: props.title }));
}
//# sourceMappingURL=in-app-wallet-icon.stories.js.map