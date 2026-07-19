import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "@emotion/styled";
import { shortenAddress } from "../../../../../utils/address.js";
import { AccountProvider } from "../../../../core/account/provider.js";
import { useCustomTheme } from "../../../../core/design-system/CustomThemeProvider.js";
import { fontSize, iconSize, radius, spacing, } from "../../../../core/design-system/index.js";
import { WalletProvider } from "../../../../core/wallet/provider.js";
import { Container } from "../../components/basic.js";
import { Button } from "../../components/buttons.js";
import { AccountAvatar } from "../../prebuilt/Account/avatar.js";
import { AccountBlobbie } from "../../prebuilt/Account/blobbie.js";
import { AccountName } from "../../prebuilt/Account/name.js";
import { WalletIcon } from "../../prebuilt/Wallet/icon.js";
export function ActiveWalletDetails(props) {
    const wallet = props.activeWalletInfo.activeWallet;
    const account = props.activeWalletInfo.activeAccount;
    const accountBlobbie = (_jsx(AccountBlobbie, { style: {
            width: `${iconSize.xs}px`,
            height: `${iconSize.xs}px`,
            borderRadius: radius.full,
        } }));
    const accountAvatarFallback = (_jsx(WalletIcon, { style: {
            width: `${iconSize.xs}px`,
            height: `${iconSize.xs}px`,
        }, fallbackComponent: accountBlobbie, loadingComponent: accountBlobbie }));
    return (_jsx(WalletButton, { variant: "ghost-solid", style: {
            paddingInline: spacing.xxs,
            paddingBlock: "2px",
        }, onClick: props.onClick, children: _jsx(AccountProvider, { address: account.address, client: props.client, children: _jsx(WalletProvider, { id: wallet.id, children: _jsxs(Container, { flex: "row", gap: "xxs", center: "y", children: [_jsx(AccountAvatar, { style: {
                                width: `${iconSize.xs}px`,
                                height: `${iconSize.xs}px`,
                                borderRadius: radius.full,
                                objectFit: "cover",
                            }, fallbackComponent: accountAvatarFallback, loadingComponent: accountAvatarFallback }), _jsx("span", { style: {
                                fontSize: fontSize.xs,
                                letterSpacing: "0.025em",
                            }, children: _jsx(AccountName, { fallbackComponent: _jsx("span", { children: shortenAddress(account.address) }), loadingComponent: _jsx("span", { children: shortenAddress(account.address) }) }) })] }) }) }) }));
}
const WalletButton = /* @__PURE__ */ styled(Button)(() => {
    const theme = useCustomTheme();
    return {
        color: theme.colors.secondaryText,
        transition: "color 200ms ease",
        "&:hover": {
            color: theme.colors.primaryText,
        },
    };
});
//# sourceMappingURL=active-wallet-details.js.map