"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicUsage = BasicUsage;
exports.DisableLinkingProfiles = DisableLinkingProfiles;
exports.HideSwitchWallet = HideSwitchWallet;
exports.HideDisconnect = HideDisconnect;
exports.HideSendFunds = HideSendFunds;
exports.HideReceiveFunds = HideReceiveFunds;
exports.HideBuyFunds = HideBuyFunds;
exports.HideAllTopButtons = HideAllTopButtons;
exports.Chains = Chains;
exports.Locale = Locale;
exports.ConnectedAccountAvatarUrl = ConnectedAccountAvatarUrl;
exports.ConnectedAccountName = ConnectedAccountName;
exports.ShowBalanceInFiat = ShowBalanceInFiat;
exports.AssetTabs = AssetTabs;
exports.OnClose = OnClose;
exports.Footer = Footer;
exports.ConnectOptions = ConnectOptions;
exports.LightTheme = LightTheme;
exports.CustomLightTheme = CustomLightTheme;
const jsx_runtime_1 = require("react/jsx-runtime");
const base_js_1 = require("../../chains/chain-definitions/base.js");
const ethereum_js_1 = require("../../chains/chain-definitions/ethereum.js");
const polygon_js_1 = require("../../chains/chain-definitions/polygon.js");
const index_js_1 = require("../../react/core/design-system/index.js");
const useActiveAccount_js_1 = require("../../react/core/hooks/wallets/useActiveAccount.js");
const ConnectButton_js_1 = require("../../react/web/ui/ConnectWallet/ConnectButton.js");
const Details_js_1 = require("../../react/web/ui/ConnectWallet/Details.js");
const utils_js_1 = require("../utils.js");
const meta = {
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    title: "Hooks/useWalletDetailsModal",
    decorators: [
        (Story) => {
            return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "10px" }, children: [(0, jsx_runtime_1.jsx)(ConnectButton_js_1.ConnectButton, { client: utils_js_1.storyClient, autoConnect: true }), (0, jsx_runtime_1.jsx)(Story, {})] }));
        },
    ],
};
exports.default = meta;
function BasicUsage() {
    return (0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient });
}
function DisableLinkingProfiles() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, manageWallet: { allowLinkingProfiles: false } }));
}
function HideSwitchWallet() {
    return (0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, hideSwitchWallet: true });
}
function HideDisconnect() {
    return (0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, hideDisconnect: true });
}
function HideSendFunds() {
    return (0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, hideSendFunds: true });
}
function HideReceiveFunds() {
    return (0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, hideReceiveFunds: true });
}
function HideBuyFunds() {
    return (0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, hideBuyFunds: true });
}
function HideAllTopButtons() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, hideSendFunds: true, hideReceiveFunds: true, hideBuyFunds: true }));
}
function Chains() {
    return (0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, chains: [ethereum_js_1.ethereum, polygon_js_1.polygon, base_js_1.base] });
}
function Locale() {
    return (0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, locale: "ja_JP" });
}
function ConnectedAccountAvatarUrl() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, connectedAccountAvatarUrl: "https://thirdweb.com/favicon.ico" }));
}
function ConnectedAccountName() {
    return (0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, connectedAccountName: "test" });
}
function ShowBalanceInFiat() {
    return (0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, showBalanceInFiat: "USD" });
}
function AssetTabs() {
    return (0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, assetTabs: ["nft", "token"] });
}
function OnClose() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, onClose: () => {
            alert("onClose");
        } }));
}
function Footer() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, footer: (props) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                outline: "1px solid red",
                padding: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
            }, children: ["custom footer", (0, jsx_runtime_1.jsx)("button", { onClick: props.close, type: "button", children: "close" })] })) }));
}
function ConnectOptions() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, connectOptions: {
            showAllWallets: false,
        } }));
}
function LightTheme() {
    return (0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, theme: "light" });
}
function CustomLightTheme() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, theme: (0, index_js_1.lightTheme)({
            colors: {
                modalBg: "#FFFFF0",
                tertiaryBg: "#DBE4C9",
                borderColor: "#8AA624",
                secondaryText: "#3E3F29",
                accentText: "#E43636",
            },
        }) }));
}
function Variant(params) {
    const account = (0, useActiveAccount_js_1.useActiveAccount)();
    const detailsModal = (0, Details_js_1.useWalletDetailsModal)();
    if (!account) {
        return (0, jsx_runtime_1.jsx)("p", { children: " no account " });
    }
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
            detailsModal.open(params);
        }, children: "test" }));
}
//# sourceMappingURL=useWalletDetailsModal.stories.js.map