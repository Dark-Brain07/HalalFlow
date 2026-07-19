"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveWalletDetails = ActiveWalletDetails;
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_1 = require("@emotion/styled");
const address_js_1 = require("../../../../../utils/address.js");
const provider_js_1 = require("../../../../core/account/provider.js");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const provider_js_2 = require("../../../../core/wallet/provider.js");
const basic_js_1 = require("../../components/basic.js");
const buttons_js_1 = require("../../components/buttons.js");
const avatar_js_1 = require("../../prebuilt/Account/avatar.js");
const blobbie_js_1 = require("../../prebuilt/Account/blobbie.js");
const name_js_1 = require("../../prebuilt/Account/name.js");
const icon_js_1 = require("../../prebuilt/Wallet/icon.js");
function ActiveWalletDetails(props) {
    const wallet = props.activeWalletInfo.activeWallet;
    const account = props.activeWalletInfo.activeAccount;
    const accountBlobbie = ((0, jsx_runtime_1.jsx)(blobbie_js_1.AccountBlobbie, { style: {
            width: `${index_js_1.iconSize.xs}px`,
            height: `${index_js_1.iconSize.xs}px`,
            borderRadius: index_js_1.radius.full,
        } }));
    const accountAvatarFallback = ((0, jsx_runtime_1.jsx)(icon_js_1.WalletIcon, { style: {
            width: `${index_js_1.iconSize.xs}px`,
            height: `${index_js_1.iconSize.xs}px`,
        }, fallbackComponent: accountBlobbie, loadingComponent: accountBlobbie }));
    return ((0, jsx_runtime_1.jsx)(WalletButton, { variant: "ghost-solid", style: {
            paddingInline: index_js_1.spacing.xxs,
            paddingBlock: "2px",
        }, onClick: props.onClick, children: (0, jsx_runtime_1.jsx)(provider_js_1.AccountProvider, { address: account.address, client: props.client, children: (0, jsx_runtime_1.jsx)(provider_js_2.WalletProvider, { id: wallet.id, children: (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "xxs", center: "y", children: [(0, jsx_runtime_1.jsx)(avatar_js_1.AccountAvatar, { style: {
                                width: `${index_js_1.iconSize.xs}px`,
                                height: `${index_js_1.iconSize.xs}px`,
                                borderRadius: index_js_1.radius.full,
                                objectFit: "cover",
                            }, fallbackComponent: accountAvatarFallback, loadingComponent: accountAvatarFallback }), (0, jsx_runtime_1.jsx)("span", { style: {
                                fontSize: index_js_1.fontSize.xs,
                                letterSpacing: "0.025em",
                            }, children: (0, jsx_runtime_1.jsx)(name_js_1.AccountName, { fallbackComponent: (0, jsx_runtime_1.jsx)("span", { children: (0, address_js_1.shortenAddress)(account.address) }), loadingComponent: (0, jsx_runtime_1.jsx)("span", { children: (0, address_js_1.shortenAddress)(account.address) }) }) })] }) }) }) }));
}
const WalletButton = /* @__PURE__ */ (0, styled_1.default)(buttons_js_1.Button)(() => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        color: theme.colors.secondaryText,
        transition: "color 200ms ease",
        "&:hover": {
            color: theme.colors.primaryText,
        },
    };
});
//# sourceMappingURL=active-wallet-details.js.map