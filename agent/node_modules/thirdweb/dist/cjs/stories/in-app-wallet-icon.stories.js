"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightTheme = LightTheme;
exports.DarkTheme = DarkTheme;
const jsx_runtime_1 = require("react/jsx-runtime");
const CustomThemeProvider_js_1 = require("../react/core/design-system/CustomThemeProvider.js");
const in_app_wallet_icon_js_1 = require("../react/web/ui/ConnectWallet/in-app-wallet-icon.js");
const ConnectWalletSocialOptions_js_1 = require("../react/web/wallets/shared/ConnectWalletSocialOptions.js");
const in_app_js_1 = require("../wallets/in-app/web/in-app.js");
const utils_js_1 = require("./utils.js");
const meta = {
    title: "Components/in-app-wallet-icon",
    decorators: [
        (Story) => {
            return ((0, jsx_runtime_1.jsx)(CustomThemeProvider_js_1.CustomThemeProvider, { theme: "dark", children: (0, jsx_runtime_1.jsx)(Story, {}) }));
        },
    ],
};
exports.default = meta;
function Variants() {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            backgroundColor: theme.colors.modalBg,
            padding: "14px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
        }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(SectionTitle, { title: "Default" }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ConnectWalletSocialOptions_js_1.defaultAuthOptions })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(SectionTitle, { title: "Single method enabled" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)(Variant, { authOptions: ["email"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["phone"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["passkey"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["guest"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["google"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["apple"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["facebook"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["discord"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["github"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["twitch"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["x"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["telegram"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["line"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["coinbase"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["epic"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["farcaster"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["tiktok"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["steam"] })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(SectionTitle, { title: "Two methods enabled" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)(Variant, { authOptions: ["email", "phone"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["email", "passkey"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["email", "guest"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["email", "google"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["email", "apple"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["email", "facebook"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["google", "discord"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["google", "github"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["google", "twitch"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["google", "x"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["google", "telegram"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["google", "line"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["google", "coinbase"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["google", "epic"] })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(SectionTitle, { title: "Three methods enabled" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)(Variant, { authOptions: ["google", "apple", "github"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["email", "phone", "guest"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["email", "phone", "google"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["email", "phone", "apple"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["email", "phone", "facebook"] })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(SectionTitle, { title: "Four or more methods enabled" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)(Variant, { authOptions: ["email", "phone", "google", "apple", "facebook"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["epic", "tiktok", "github", "email"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["twitch", "tiktok", "epic", "email", "phone"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: ["email", "phone", "passkey", "guest"] }), (0, jsx_runtime_1.jsx)(Variant, { authOptions: [
                                    "google",
                                    "apple",
                                    "facebook",
                                    "github",
                                    "discord",
                                    "twitch",
                                    "x",
                                ] })] })] })] }));
}
function LightTheme() {
    return (0, jsx_runtime_1.jsx)(ThemeSetup, { theme: "light" });
}
function DarkTheme() {
    return (0, jsx_runtime_1.jsx)(ThemeSetup, { theme: "dark" });
}
function ThemeSetup(props) {
    return ((0, jsx_runtime_1.jsx)(CustomThemeProvider_js_1.CustomThemeProvider, { theme: props.theme, children: (0, jsx_runtime_1.jsx)(Variants, {}) }));
}
function Variant(props) {
    return ((0, jsx_runtime_1.jsx)(in_app_wallet_icon_js_1.InAppWalletIcon, { client: utils_js_1.storyClient, wallet: (0, in_app_js_1.inAppWallet)({
            auth: {
                options: props.authOptions,
            },
        }) }));
}
function SectionTitle(props) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return ((0, jsx_runtime_1.jsx)("p", { style: { color: theme.colors.secondaryText, fontSize: "14px" }, children: props.title }));
}
//# sourceMappingURL=in-app-wallet-icon.stories.js.map