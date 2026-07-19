import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BridgeWidgetScript, } from "../../../script-exports/bridge-widget-script.js";
import { storyClient } from "../../utils.js";
const meta = {
    title: "Bridge/BridgeWidgetScript",
};
export default meta;
export function BasicUsage() {
    return (_jsx(Variant, { clientId: storyClient.clientId, buy: { chainId: 8453, amount: "0.1" } }));
}
export function CurrencySet() {
    return (_jsx(Variant, { clientId: storyClient.clientId, currency: "JPY", buy: { chainId: 8453, amount: "0.1" } }));
}
export function NoThirdwebBranding() {
    return (_jsx(Variant, { clientId: storyClient.clientId, theme: "light", buy: { chainId: 8453, amount: "0.1" }, showThirdwebBranding: false }));
}
export function CustomTheme() {
    return (_jsx("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            alignItems: "center",
        }, children: _jsx(BridgeWidgetScript, { clientId: storyClient.clientId, buy: { chainId: 8453, amount: "0.1" }, theme: {
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
    return (_jsxs("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            alignItems: "center",
        }, children: [_jsx(BridgeWidgetScript, { ...props, theme: "dark" }), _jsx(BridgeWidgetScript, { ...props, theme: "light" })] }));
}
//# sourceMappingURL=bridge-widget-script.stories.js.map