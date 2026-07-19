"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicUsage = BasicUsage;
exports.CurrencySet = CurrencySet;
exports.LightMode = LightMode;
exports.NoThirdwebBranding = NoThirdwebBranding;
exports.CustomTheme = CustomTheme;
exports.CustomWallets = CustomWallets;
const jsx_runtime_1 = require("react/jsx-runtime");
const index_js_1 = require("../../../react/core/design-system/index.js");
const SwapWidget_js_1 = require("../../../react/web/ui/Bridge/swap-widget/SwapWidget.js");
const create_wallet_js_1 = require("../../../wallets/create-wallet.js");
const utils_js_1 = require("../../utils.js");
const meta = {
    title: "Bridge/Swap/SwapWidget",
};
exports.default = meta;
function BasicUsage() {
    return (0, jsx_runtime_1.jsx)(SwapWidget_js_1.SwapWidget, { client: utils_js_1.storyClient, persistTokenSelections: false });
}
function CurrencySet() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, currency: "JPY", persistTokenSelections: false }));
}
function LightMode() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, currency: "JPY", theme: "light", persistTokenSelections: false }));
}
function NoThirdwebBranding() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, currency: "JPY", showThirdwebBranding: false, persistTokenSelections: false }));
}
function CustomTheme() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, currency: "JPY", persistTokenSelections: false, theme: (0, index_js_1.lightTheme)({
            colors: {
                modalBg: "#FFFFF0",
                tertiaryBg: "#DBE4C9",
                borderColor: "#8AA624",
                secondaryText: "#3E3F29",
                accentText: "#E43636",
            },
        }) }));
}
function CustomWallets() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, currency: "JPY", persistTokenSelections: false, connectOptions: {
            wallets: [(0, create_wallet_js_1.createWallet)("io.metamask"), (0, create_wallet_js_1.createWallet)("me.rainbow")],
        } }));
}
function Variant(props) {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            alignItems: "center",
        }, children: [(0, jsx_runtime_1.jsx)(SwapWidget_js_1.SwapWidget, { ...props, theme: "dark" }), (0, jsx_runtime_1.jsx)(SwapWidget_js_1.SwapWidget, { ...props, theme: "light" })] }));
}
//# sourceMappingURL=SwapWidget.stories.js.map