"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getInstalledWalletProviders } from "../../../../wallets/injected/mipdStore.js";
import { useCustomTheme } from "../../../core/design-system/CustomThemeProvider.js";
import { fontSize, iconSize, radius, spacing, } from "../../../core/design-system/index.js";
import { useWalletInfo } from "../../../core/utils/wallet.js";
import { Container } from "../components/basic.js";
import { Img } from "../components/Img.js";
import { Skeleton } from "../components/Skeleton.js";
import { Text } from "../components/text.js";
import { WalletImage } from "../components/WalletImage.js";
import { StyledButton } from "../design-system/elements.js";
import { InAppWalletIcon } from "./in-app-wallet-icon.js";
/**
 * @internal
 */
export function WalletEntryButton(props) {
    const { selectWallet, wallet } = props;
    const walletId = wallet.id;
    const isRecommended = props.recommendedWallets?.find((w) => w.id === walletId);
    const walletInfo = useWalletInfo(walletId);
    const walletName = getInstalledWalletProviders().find((p) => p.info.rdns === walletId)?.info
        .name || walletInfo.data?.name;
    const isInstalled = getInstalledWalletProviders().find((p) => p.info.rdns === walletId);
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
    return (_jsxs(WalletButtonEl, { className: props.className, "data-active": props.isActive, onClick: selectWallet, type: "button", children: [iconOverride ? (_jsx(Img, { alt: "", client: props.client, height: `${iconSize.xl}`, src: iconOverride, width: `${iconSize.xl}` })) : wallet.id === "inApp" ? (_jsx(InAppWalletIcon, { client: props.client, wallet: wallet })) : (_jsx(WalletImage, { client: props.client, id: walletId, size: iconSize.xl })), _jsxs(Container, { expand: true, flex: "column", gap: "xxs", children: [nameOverride ? (_jsx(Text, { color: "primaryText", weight: 500, children: nameOverride })) : (_jsx(Skeleton, { height: fontSize.md, width: "100px" })), props.badge ? (_jsx(Text, { size: "sm", children: props.badge })) : isRecommended ? (_jsx(Text, { size: "sm", children: props.connectLocale.recommended })) : isInstalled ? (_jsx(Text, { size: "sm", children: props.connectLocale.installed })) : null] })] }));
}
export const WalletButtonEl = /* @__PURE__ */ StyledButton((_) => {
    const theme = useCustomTheme();
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
        borderRadius: radius.md,
        boxSizing: "border-box",
        color: theme.colors.secondaryText,
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        gap: spacing.sm,
        padding: `${spacing.xs} ${spacing.xs}`,
        transition: "background-color 200ms ease, transform 200ms ease",
        width: "100%",
    };
});
function uppercaseFirstLetter(props) {
    return props.text.charAt(0).toUpperCase() + props.text.slice(1);
}
//# sourceMappingURL=WalletEntryButton.js.map