"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useSetSelectionData } from "../../providers/wallet-ui-states-provider.js";
import { reservedScreens } from "../../ui/ConnectWallet/constants.js";
import { useScreenContext } from "../../ui/ConnectWallet/Modal/screen.js";
import { WalletEntryButton } from "../../ui/ConnectWallet/WalletEntryButton.js";
import { ConnectWalletSocialOptions } from "../shared/ConnectWalletSocialOptions.js";
import { LoadingScreen } from "../shared/LoadingScreen.js";
import { useInAppWalletLocale } from "./useInAppWalletLocale.js";
/**
 *
 * @internal
 */
function InAppWalletSelectionUI(props) {
    const { screen } = useScreenContext();
    const setData = useSetSelectionData();
    const locale = useInAppWalletLocale(props.connectLocale.id);
    // do not show the "selectUI" if
    // modal is compact or
    // it is being rendered in Safe wallet
    if (props.size === "wide" ||
        (screen !== reservedScreens.main && props.size === "compact")) {
        return (_jsx(WalletEntryButton, { badge: undefined, client: props.client, connectLocale: props.connectLocale, isActive: screen === props.wallet, recommendedWallets: props.recommendedWallets, selectWallet: () => {
                setData({});
                props.select();
            }, wallet: props.wallet }));
    }
    if (!locale) {
        return _jsx(LoadingScreen, { height: "195px" });
    }
    return (_jsx(ConnectWalletSocialOptions, { chain: props.chain, client: props.client, disabled: props.disabled, done: props.done, goBack: props.goBack, locale: locale, select: props.select, size: props.size, wallet: props.wallet }));
}
export default InAppWalletSelectionUI;
//# sourceMappingURL=InAppWalletSelectionUI.js.map