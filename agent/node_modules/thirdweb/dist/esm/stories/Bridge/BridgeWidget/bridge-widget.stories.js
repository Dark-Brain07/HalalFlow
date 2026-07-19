import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { lightTheme } from "../../../react/core/design-system/index.js";
import { BridgeWidget, } from "../../../react/web/ui/Bridge/bridge-widget/bridge-widget.js";
import { createWallet } from "../../../wallets/create-wallet.js";
import { storyClient } from "../../utils.js";
const meta = {
    title: "Bridge/BridgeWidget",
};
export default meta;
export function BasicUsage() {
    return (_jsx(Variant, { client: storyClient, buy: { chainId: 8453, amount: "0.1" } }));
}
export function CurrencySet() {
    return (_jsx(Variant, { client: storyClient, currency: "JPY", buy: { chainId: 8453, amount: "0.1" } }));
}
export function NoThirdwebBranding() {
    return (_jsx(Variant, { client: storyClient, theme: "light", buy: { chainId: 8453, amount: "0.1" }, showThirdwebBranding: false }));
}
export function CustomTheme() {
    return (_jsx("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            alignItems: "center",
        }, children: _jsx(BridgeWidget, { client: storyClient, currency: "JPY", buy: { chainId: 8453, amount: "0.1" }, showThirdwebBranding: false, theme: lightTheme({
                colors: {
                    modalBg: "#FFFFF0",
                    tertiaryBg: "#DBE4C9",
                    borderColor: "#8AA624",
                    secondaryText: "#3E3F29",
                    accentText: "#E43636",
                },
            }) }) }));
}
export function CustomWallets() {
    return (_jsx(Variant, { client: storyClient, currency: "JPY", buy: { chainId: 8453, amount: "0.1" }, connectOptions: {
            wallets: [createWallet("io.metamask"), createWallet("me.rainbow")],
        } }));
}
function Variant(props) {
    return (_jsxs("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            alignItems: "center",
        }, children: [_jsx(BridgeWidget, { ...props, theme: "dark" }), _jsx(BridgeWidget, { ...props, theme: "light" })] }));
}
//# sourceMappingURL=bridge-widget.stories.js.map