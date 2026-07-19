"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicUsage = BasicUsage;
exports.CurrencySet = CurrencySet;
exports.NoThirdwebBranding = NoThirdwebBranding;
exports.CustomTheme = CustomTheme;
const jsx_runtime_1 = require("react/jsx-runtime");
const bridge_widget_script_js_1 = require("../../../script-exports/bridge-widget-script.js");
const utils_js_1 = require("../../utils.js");
const meta = {
    title: "Bridge/BridgeWidgetScript",
};
exports.default = meta;
function BasicUsage() {
    return ((0, jsx_runtime_1.jsx)(Variant, { clientId: utils_js_1.storyClient.clientId, buy: { chainId: 8453, amount: "0.1" } }));
}
function CurrencySet() {
    return ((0, jsx_runtime_1.jsx)(Variant, { clientId: utils_js_1.storyClient.clientId, currency: "JPY", buy: { chainId: 8453, amount: "0.1" } }));
}
function NoThirdwebBranding() {
    return ((0, jsx_runtime_1.jsx)(Variant, { clientId: utils_js_1.storyClient.clientId, theme: "light", buy: { chainId: 8453, amount: "0.1" }, showThirdwebBranding: false }));
}
function CustomTheme() {
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            alignItems: "center",
        }, children: (0, jsx_runtime_1.jsx)(bridge_widget_script_js_1.BridgeWidgetScript, { clientId: utils_js_1.storyClient.clientId, buy: { chainId: 8453, amount: "0.1" }, theme: {
                type: "light",
                colors: {
                    modalBg: "#FFFFF0",
                    tertiaryBg: "#DBE4C9",
                    borderColor: "#8AA624",
                    secondaryText: "#3E3F29",
                    accentText: "#E43636",
                },
            } }) }));
}
function Variant(props) {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            alignItems: "center",
        }, children: [(0, jsx_runtime_1.jsx)(bridge_widget_script_js_1.BridgeWidgetScript, { ...props, theme: "dark" }), (0, jsx_runtime_1.jsx)(bridge_widget_script_js_1.BridgeWidgetScript, { ...props, theme: "light" })] }));
}
//# sourceMappingURL=bridge-widget-script.stories.js.map