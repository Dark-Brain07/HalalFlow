"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletButtonEl = void 0;
exports.WalletEntryButton = WalletEntryButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const mipdStore_js_1 = require("../../../../wallets/injected/mipdStore.js");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const wallet_js_1 = require("../../../core/utils/wallet.js");
const basic_js_1 = require("../components/basic.js");
const Img_js_1 = require("../components/Img.js");
const Skeleton_js_1 = require("../components/Skeleton.js");
const text_js_1 = require("../components/text.js");
const WalletImage_js_1 = require("../components/WalletImage.js");
const elements_js_1 = require("../design-system/elements.js");
const in_app_wallet_icon_js_1 = require("./in-app-wallet-icon.js");
/**
 * @internal
 */
function WalletEntryButton(props) {
    const { selectWallet, wallet } = props;
    const walletId = wallet.id;
    const isRecommended = props.recommendedWallets?.find((w) => w.id === walletId);
    const walletInfo = (0, wallet_js_1.useWalletInfo)(walletId);
    const walletName = (0, mipdStore_js_1.getInstalledWalletProviders)().find((p) => p.info.rdns === walletId)?.info
        .name || walletInfo.data?.name;
    const isInstalled = (0, mipdStore_js_1.getInstalledWalletProviders)().find((p) => p.info.rdns === walletId);
    const customMeta = wallet && walletId === "inApp"
        ? wallet.getConfig()?.metadata
        : undefined;
    let nameOverride = customMeta?.name || walletName;
    const iconOverride = customMeta?.icon;
    // change "Social Login" to name of the login method if only 1 method is enabled
    if (wallet.id === "inApp") {
        const config = wallet.getConfig();
        if (config?.auth?.options.length === 1) {
            const name = config.auth?.options[0];
            if (name) {
                nameOverride = uppercaseFirstLetter({ text: name });
            }
        }
    }
    return ((0, jsx_runtime_1.jsxs)(exports.WalletButtonEl, { className: props.className, "data-active": props.isActive, onClick: selectWallet, type: "button", children: [iconOverride ? ((0, jsx_runtime_1.jsx)(Img_js_1.Img, { alt: "", client: props.client, height: `${index_js_1.iconSize.xl}`, src: iconOverride, width: `${index_js_1.iconSize.xl}` })) : wallet.id === "inApp" ? ((0, jsx_runtime_1.jsx)(in_app_wallet_icon_js_1.InAppWalletIcon, { client: props.client, wallet: wallet })) : ((0, jsx_runtime_1.jsx)(WalletImage_js_1.WalletImage, { client: props.client, id: walletId, size: index_js_1.iconSize.xl })), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { expand: true, flex: "column", gap: "xxs", children: [nameOverride ? ((0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", weight: 500, children: nameOverride })) : ((0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: index_js_1.fontSize.md, width: "100px" })), props.badge ? ((0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "sm", children: props.badge })) : isRecommended ? ((0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "sm", children: props.connectLocale.recommended })) : isInstalled ? ((0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "sm", children: props.connectLocale.installed })) : null] })] }));
}
exports.WalletButtonEl = (0, elements_js_1.StyledButton)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        all: "unset",
        "&:hover": {
            backgroundColor: theme.colors.tertiaryBg,
            transform: "scale(1.01)",
        },
        '&[data-active="true"]': {
            backgroundColor: theme.colors.tertiaryBg,
        },
        alignItems: "center",
        borderRadius: index_js_1.radius.md,
        boxSizing: "border-box",
        color: theme.colors.secondaryText,
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        gap: index_js_1.spacing.sm,
        padding: `${index_js_1.spacing.xs} ${index_js_1.spacing.xs}`,
        transition: "background-color 200ms ease, transform 200ms ease",
        width: "100%",
    };
});
function uppercaseFirstLetter(props) {
    return props.text.charAt(0).toUpperCase() + props.text.slice(1);
}
//# sourceMappingURL=WalletEntryButton.js.map