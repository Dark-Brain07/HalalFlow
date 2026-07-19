import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { isMobile } from "../../../../utils/web/isMobile.js";
import { openWindow } from "../../../../utils/web/openWindow.js";
import { useCustomTheme } from "../../../core/design-system/CustomThemeProvider.js";
import { iconSize, radius, spacing, } from "../../../core/design-system/index.js";
import { AppleIcon } from "../../ui/ConnectWallet/icons/AppleIcon.js";
import { ChromeIcon } from "../../ui/ConnectWallet/icons/ChromeIcon.js";
import { PlayStoreIcon } from "../../ui/ConnectWallet/icons/PlayStoreIcon.js";
import { Container, ModalHeader } from "../../ui/components/basic.js";
import { QRCode } from "../../ui/components/QRCode.js";
import { Spacer } from "../../ui/components/Spacer.js";
import { Text } from "../../ui/components/text.js";
import { WalletImage } from "../../ui/components/WalletImage.js";
import { StyledButton } from "../../ui/design-system/elements.js";
/**
 * @internal
 */
export const GetStartedScreen = ({ wallet, walletInfo, header, footer, onBack, locale, client }) => {
    const [showScreen, setShowScreen] = useState("base");
    const isScanScreen = showScreen === "android-scan" || showScreen === "ios-scan";
    const handleBack = onBack
        ? () => {
            if (showScreen === "base") {
                onBack();
            }
            else {
                setShowScreen("base");
            }
        }
        : undefined;
    return (_jsx(Container, { animate: "fadein", flex: "column", fullHeight: true, children: _jsxs(Container, { expand: true, flex: "column", p: "lg", children: [showScreen === "android-scan" && walletInfo.app.android && (_jsx(InstallScanScreen, { client: client, locale: {
                        scanToDownload: locale.getStartedScreen.instruction,
                    }, onBack: handleBack, platform: "Google Play", platformIcon: _jsx(PlayStoreIcon, { size: iconSize.md }), url: walletInfo.app.android, walletId: wallet.id, walletName: walletInfo.name })), showScreen === "ios-scan" && walletInfo.app.ios && (_jsx(InstallScanScreen, { client: client, locale: {
                        scanToDownload: locale.getStartedScreen.instruction,
                    }, onBack: handleBack, platform: "App Store", platformIcon: _jsx(AppleIcon, { size: iconSize.md }), url: walletInfo.app.ios, walletId: wallet.id, walletName: walletInfo.name })), showScreen === "base" && (_jsxs(Container, { expand: true, flex: "column", children: [header || (_jsx(ModalHeader, { onBack: handleBack, title: walletInfo.name })), _jsx(Spacer, { y: "xl" }), _jsx(Container, { animate: "fadein", center: "y", expand: true, flex: "column", style: {
                                minHeight: "250px",
                            }, children: _jsxs(Container, { flex: "column", gap: "xs", children: [walletInfo.app.chrome && (_jsxs(ButtonLink, { onClick: () => {
                                            openWindow(walletInfo.app.chrome || "");
                                        }, children: [_jsx(ChromeIcon, { size: iconSize.lg }), _jsx("span", { children: locale.download.chrome })] })), walletInfo.app.android && (_jsxs(ButtonLink, { as: "button", onClick: () => {
                                            if (isMobile()) {
                                                openWindow(walletInfo.app.android || "");
                                            }
                                            else {
                                                setShowScreen("android-scan");
                                            }
                                        }, children: [_jsx(PlayStoreIcon, { size: iconSize.lg }), _jsx("span", { children: locale.download.android })] })), walletInfo.app.ios && (_jsxs(ButtonLink, { as: "button", onClick: () => {
                                            if (isMobile()) {
                                                openWindow(walletInfo.app.ios || "");
                                            }
                                            else {
                                                setShowScreen("ios-scan");
                                            }
                                        }, children: [_jsx(AppleIcon, { size: iconSize.lg }), _jsx("span", { children: locale.download.iOS })] }))] }) })] })), !isScanScreen && footer] }) }));
};
/**
 * @internal
 */
const InstallScanScreen = (props) => {
    return (_jsxs(Container, { animate: "fadein", expand: true, children: [_jsx(ModalHeader, { onBack: props.onBack, title: props.walletName }), _jsx(Spacer, { y: "xl" }), _jsxs(Container, { center: "both", expand: true, flex: "column", style: {
                    textAlign: "center",
                }, children: [_jsx(QRCode, { QRIcon: _jsx(WalletImage, { client: props.client, id: props.walletId, size: iconSize.xxl }), qrCodeUri: props.url }), _jsx(Spacer, { y: "xl" }), _jsx(Text, { balance: true, center: true, multiline: true, children: props.locale.scanToDownload }), _jsx(Spacer, { y: "xs" })] })] }));
};
const ButtonLink = /* @__PURE__ */ StyledButton((_) => {
    const theme = useCustomTheme();
    return {
        all: "unset",
        "&:hover": {
            background: theme.colors.secondaryButtonHoverBg,
            color: theme.colors.primaryText,
            textDecoration: "none",
        },
        alignItems: "center",
        background: theme.colors.secondaryButtonBg,
        borderRadius: radius.sm,
        boxSizing: "border-box",
        color: theme.colors.secondaryButtonText,
        cursor: "pointer",
        display: "flex",
        fontWeight: 500,
        gap: spacing.md,
        padding: `${spacing.sm} ${spacing.md}`,
        textDecoration: "none",
        transition: "100ms ease",
        width: "100%",
    };
});
//# sourceMappingURL=GetStartedScreen.js.map