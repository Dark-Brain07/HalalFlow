"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicUsage = BasicUsage;
exports.Header = Header;
exports.WideModal = WideModal;
exports.ClassNameAndStylesAdded = ClassNameAndStylesAdded;
exports.WideModalAndClassNameAndStylesAdded = WideModalAndClassNameAndStylesAdded;
exports.AllInAppWalletAuthMethods = AllInAppWalletAuthMethods;
exports.ConfiguredInAppWalletWideModal = ConfiguredInAppWalletWideModal;
exports.GoogleLoginWideModal = GoogleLoginWideModal;
exports.GithubLoginWideModal = GithubLoginWideModal;
exports.EcosystemWallet = EcosystemWallet;
const jsx_runtime_1 = require("react/jsx-runtime");
const ConnectButton_js_1 = require("../react/web/ui/ConnectWallet/ConnectButton.js");
const ConnectEmbed_js_1 = require("../react/web/ui/ConnectWallet/Modal/ConnectEmbed.js");
const create_wallet_js_1 = require("../wallets/create-wallet.js");
const ecosystem_js_1 = require("../wallets/in-app/web/ecosystem.js");
const in_app_js_1 = require("../wallets/in-app/web/in-app.js");
const utils_js_1 = require("./utils.js");
const meta = {
    title: "Connect/ConnectEmbed",
    decorators: [
        (Story) => {
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Story, {}), (0, jsx_runtime_1.jsx)("div", { style: {
                            position: "absolute",
                            bottom: "20px",
                            right: "20px",
                        }, children: (0, jsx_runtime_1.jsx)(ConnectButton_js_1.ConnectButton, { client: utils_js_1.storyClient }) })] }));
        },
    ],
};
exports.default = meta;
function BasicUsage() {
    return (0, jsx_runtime_1.jsx)(ConnectEmbed_js_1.ConnectEmbed, { client: utils_js_1.storyClient });
}
function Header() {
    return ((0, jsx_runtime_1.jsx)(ConnectEmbed_js_1.ConnectEmbed, { client: utils_js_1.storyClient, header: {
            title: "Foo bar",
            titleIcon: "https://placehold.co/400x400",
        } }));
}
function WideModal() {
    return (0, jsx_runtime_1.jsx)(ConnectEmbed_js_1.ConnectEmbed, { client: utils_js_1.storyClient, modalSize: "wide" });
}
function ClassNameAndStylesAdded() {
    return ((0, jsx_runtime_1.jsx)(ConnectEmbed_js_1.ConnectEmbed, { client: utils_js_1.storyClient, className: "foo-bar", style: {
            outline: "1px solid red",
        } }));
}
function WideModalAndClassNameAndStylesAdded() {
    return ((0, jsx_runtime_1.jsx)(ConnectEmbed_js_1.ConnectEmbed, { client: utils_js_1.storyClient, modalSize: "wide", className: "foo-bar", style: {
            outline: "1px solid red",
        } }));
}
function AllInAppWalletAuthMethods() {
    return ((0, jsx_runtime_1.jsx)(ConnectEmbed_js_1.ConnectEmbed, { client: utils_js_1.storyClient, className: "foo-bar", wallets: [
            (0, in_app_js_1.inAppWallet)({
                auth: {
                    options: [
                        "line",
                        "google",
                        "apple",
                        "facebook",
                        "discord",
                        "x",
                        "tiktok",
                        "epic",
                        "coinbase",
                        "farcaster",
                        "telegram",
                        "github",
                        "twitch",
                        "steam",
                        "guest",
                        "backend",
                        "email",
                        "phone",
                        "passkey",
                        "wallet",
                    ],
                },
            }),
        ] }));
}
function ConfiguredInAppWalletWideModal() {
    return ((0, jsx_runtime_1.jsx)(ConnectEmbed_js_1.ConnectEmbed, { client: utils_js_1.storyClient, className: "foo-bar", modalSize: "wide", wallets: [
            (0, create_wallet_js_1.createWallet)("io.metamask"),
            (0, in_app_js_1.inAppWallet)({
                auth: {
                    options: ["google", "github", "email"],
                },
            }),
        ] }));
}
function GoogleLoginWideModal() {
    return ((0, jsx_runtime_1.jsx)(ConnectEmbed_js_1.ConnectEmbed, { client: utils_js_1.storyClient, className: "foo-bar", modalSize: "wide", wallets: [
            (0, create_wallet_js_1.createWallet)("io.metamask"),
            (0, in_app_js_1.inAppWallet)({
                auth: {
                    options: ["google"],
                },
            }),
        ] }));
}
function GithubLoginWideModal() {
    return ((0, jsx_runtime_1.jsx)(ConnectEmbed_js_1.ConnectEmbed, { client: utils_js_1.storyClient, className: "foo-bar", modalSize: "wide", wallets: [
            (0, create_wallet_js_1.createWallet)("io.metamask"),
            (0, in_app_js_1.inAppWallet)({
                auth: {
                    options: ["github"],
                },
            }),
        ] }));
}
function EcosystemWallet() {
    return ((0, jsx_runtime_1.jsx)(ConnectEmbed_js_1.ConnectEmbed, { showThirdwebBranding: false, client: utils_js_1.storyClient, wallets: [
            (0, ecosystem_js_1.ecosystemWallet)("ecosystem.b3-open-gaming", {
                partnerId: "dbcd5e9b-564e-4ba0-91a0-becf0edabb61",
            }),
        ], theme: "light" }));
}
//# sourceMappingURL=ConnectEmbed.stories.js.map