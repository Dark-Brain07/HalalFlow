"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const wallet_ui_states_provider_js_1 = require("../../providers/wallet-ui-states-provider.js");
const constants_js_1 = require("../../ui/ConnectWallet/constants.js");
const screen_js_1 = require("../../ui/ConnectWallet/Modal/screen.js");
const WalletEntryButton_js_1 = require("../../ui/ConnectWallet/WalletEntryButton.js");
const ConnectWalletSocialOptions_js_1 = require("../shared/ConnectWalletSocialOptions.js");
const LoadingScreen_js_1 = require("../shared/LoadingScreen.js");
const useInAppWalletLocale_js_1 = require("./useInAppWalletLocale.js");
/**
 *
 * @internal
 */
function InAppWalletSelectionUI(props) {
    const { screen } = (0, screen_js_1.useScreenContext)();
    const setData = (0, wallet_ui_states_provider_js_1.useSetSelectionData)();
    const locale = (0, useInAppWalletLocale_js_1.useInAppWalletLocale)(props.connectLocale.id);
    // do not show the "selectUI" if
    // modal is compact or
    // it is being rendered in Safe wallet
    if (props.size === "wide" ||
        (screen !== constants_js_1.reservedScreens.main && props.size === "compact")) {
        return ((0, jsx_runtime_1.jsx)(WalletEntryButton_js_1.WalletEntryButton, { badge: undefined, client: props.client, connectLocale: props.connectLocale, isActive: screen === props.wallet, recommendedWallets: props.recommendedWallets, selectWallet: () => {
                setData({});
                props.select();
            }, wallet: props.wallet }));
    }
    if (!locale) {
        return (0, jsx_runtime_1.jsx)(LoadingScreen_js_1.LoadingScreen, { height: "195px" });
    }
    return ((0, jsx_runtime_1.jsx)(ConnectWalletSocialOptions_js_1.ConnectWalletSocialOptions, { chain: props.chain, client: props.client, disabled: props.disabled, done: props.done, goBack: props.goBack, locale: locale, select: props.select, size: props.size, wallet: props.wallet }));
}
exports.default = InAppWalletSelectionUI;
//# sourceMappingURL=InAppWalletSelectionUI.js.map