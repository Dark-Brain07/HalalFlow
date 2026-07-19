import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { lightTheme } from "../../../react/core/design-system/index.js";
import { SwapWidget, } from "../../../react/web/ui/Bridge/swap-widget/SwapWidget.js";
import { createWallet } from "../../../wallets/create-wallet.js";
import { storyClient } from "../../utils.js";
const meta = {
    title: "Bridge/Swap/SwapWidget",
};
export default meta;
export function BasicUsage() {
    return _jsx(SwapWidget, { client: storyClient, persistTokenSelections: false });
}
export function CurrencySet() {
    return (_jsx(Variant, { client: storyClient, currency: "JPY", persistTokenSelections: false }));
}
export function LightMode() {
    return (_jsx(Variant, { client: storyClient, currency: "JPY", theme: "light", persistTokenSelections: false }));
}
export function NoThirdwebBranding() {
    return (_jsx(Variant, { client: storyClient, currency: "JPY", showThirdwebBranding: false, persistTokenSelections: false }));
}
export function CustomTheme() {
    return (_jsx(Variant, { client: storyClient, currency: "JPY", persistTokenSelections: false, theme: lightTheme({
            colors: {
                modalBg: "#FFFFF0",
                tertiaryBg: "#DBE4C9",
                borderColor: "#8AA624",
                secondaryText: "#3E3F29",
                accentText: "#E43636",
            },
        }) }));
}
export function CustomWallets() {
    return (_jsx(Variant, { client: storyClient, currency: "JPY", persistTokenSelections: false, connectOptions: {
            wallets: [createWallet("io.metamask"), createWallet("me.rainbow")],
        } }));
}
function Variant(props) {
    return (_jsxs("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            alignItems: "center",
        }, children: [_jsx(SwapWidget, { ...props, theme: "dark" }), _jsx(SwapWidget, { ...props, theme: "light" })] }));
}
//# sourceMappingURL=SwapWidget.stories.js.map