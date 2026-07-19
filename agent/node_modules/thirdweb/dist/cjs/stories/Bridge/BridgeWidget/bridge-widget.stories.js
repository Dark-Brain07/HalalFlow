"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicUsage = BasicUsage;
exports.CurrencySet = CurrencySet;
exports.NoThirdwebBranding = NoThirdwebBranding;
exports.CustomTheme = CustomTheme;
exports.CustomWallets = CustomWallets;
const jsx_runtime_1 = require("react/jsx-runtime");
const index_js_1 = require("../../../react/core/design-system/index.js");
const bridge_widget_js_1 = require("../../../react/web/ui/Bridge/bridge-widget/bridge-widget.js");
const create_wallet_js_1 = require("../../../wallets/create-wallet.js");
const utils_js_1 = require("../../utils.js");
const meta = {
    title: "Bridge/BridgeWidget",
};
exports.default = meta;
function BasicUsage() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, buy: { chainId: 8453, amount: "0.1" } }));
}
function CurrencySet() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, currency: "JPY", buy: { chainId: 8453, amount: "0.1" } }));
}
function NoThirdwebBranding() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, theme: "light", buy: { chainId: 8453, amount: "0.1" }, showThirdwebBranding: false }));
}
function CustomTheme() {
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            alignItems: "center",
        }, children: (0, jsx_runtime_1.jsx)(bridge_widget_js_1.BridgeWidget, { client: utils_js_1.storyClient, currency: "JPY", buy: { chainId: 8453, amount: "0.1" }, showThirdwebBranding: false, theme: (0, index_js_1.lightTheme)({
                colors: {
                    modalBg: "#FFFFF0",
                    tertiaryBg: "#DBE4C9",
                    borderColor: "#8AA624",
                    secondaryText: "#3E3F29",
                    accentText: "#E43636",
                },
            }) }) }));
}
function CustomWallets() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, currency: "JPY", buy: { chainId: 8453, amount: "0.1" }, connectOptions: {
            wallets: [(0, create_wallet_js_1.createWallet)("io.metamask"), (0, create_wallet_js_1.createWallet)("me.rainbow")],
        } }));
}
function Variant(props) {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            alignItems: "center",
        }, children: [(0, jsx_runtime_1.jsx)(bridge_widget_js_1.BridgeWidget, { ...props, theme: "dark" }), (0, jsx_runtime_1.jsx)(bridge_widget_js_1.BridgeWidget, { ...props, theme: "light" })] }));
}
//# sourceMappingURL=bridge-widget.stories.js.map