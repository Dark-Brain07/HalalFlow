import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ConnectButton } from "../react/web/ui/ConnectWallet/ConnectButton.js";
import { ConnectEmbed } from "../react/web/ui/ConnectWallet/Modal/ConnectEmbed.js";
import { createWallet } from "../wallets/create-wallet.js";
import { ecosystemWallet } from "../wallets/in-app/web/ecosystem.js";
import { inAppWallet } from "../wallets/in-app/web/in-app.js";
import { storyClient } from "./utils.js";
const meta = {
    title: "Connect/ConnectEmbed",
    decorators: [
        (Story) => {
            return (_jsxs("div", { children: [_jsx(Story, {}), _jsx("div", { style: {
                            position: "absolute",
                            bottom: "20px",
                            right: "20px",
                        }, children: _jsx(ConnectButton, { client: storyClient }) })] }));
        },
    ],
};
export default meta;
export function BasicUsage() {
    return _jsx(ConnectEmbed, { client: storyClient });
}
export function Header() {
    return (_jsx(ConnectEmbed, { client: storyClient, header: {
            title: "Foo bar",
            titleIcon: "https://placehold.co/400x400",
        } }));
}
export function WideModal() {
    return _jsx(ConnectEmbed, { client: storyClient, modalSize: "wide" });
}
export function ClassNameAndStylesAdded() {
    return (_jsx(ConnectEmbed, { client: storyClient, className: "foo-bar", style: {
            outline: "1px solid red",
        } }));
}
export function WideModalAndClassNameAndStylesAdded() {
    return (_jsx(ConnectEmbed, { client: storyClient, modalSize: "wide", className: "foo-bar", style: {
            outline: "1px solid red",
        } }));
}
export function AllInAppWalletAuthMethods() {
    return (_jsx(ConnectEmbed, { client: storyClient, className: "foo-bar", wallets: [
            inAppWallet({
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
export function ConfiguredInAppWalletWideModal() {
    return (_jsx(ConnectEmbed, { client: storyClient, className: "foo-bar", modalSize: "wide", wallets: [
            createWallet("io.metamask"),
            inAppWallet({
                auth: {
                    options: ["google", "github", "email"],
                },
            }),
        ] }));
}
export function GoogleLoginWideModal() {
    return (_jsx(ConnectEmbed, { client: storyClient, className: "foo-bar", modalSize: "wide", wallets: [
            createWallet("io.metamask"),
            inAppWallet({
                auth: {
                    options: ["google"],
                },
            }),
        ] }));
}
export function GithubLoginWideModal() {
    return (_jsx(ConnectEmbed, { client: storyClient, className: "foo-bar", modalSize: "wide", wallets: [
            createWallet("io.metamask"),
            inAppWallet({
                auth: {
                    options: ["github"],
                },
            }),
        ] }));
}
export function EcosystemWallet() {
    return (_jsx(ConnectEmbed, { showThirdwebBranding: false, client: storyClient, wallets: [
            ecosystemWallet("ecosystem.b3-open-gaming", {
                partnerId: "dbcd5e9b-564e-4ba0-91a0-becf0edabb61",
            }),
        ], theme: "light" }));
}
//# sourceMappingURL=ConnectEmbed.stories.js.map