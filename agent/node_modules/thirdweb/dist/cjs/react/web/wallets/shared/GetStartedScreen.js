"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStartedScreen = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const isMobile_js_1 = require("../../../../utils/web/isMobile.js");
const openWindow_js_1 = require("../../../../utils/web/openWindow.js");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const AppleIcon_js_1 = require("../../ui/ConnectWallet/icons/AppleIcon.js");
const ChromeIcon_js_1 = require("../../ui/ConnectWallet/icons/ChromeIcon.js");
const PlayStoreIcon_js_1 = require("../../ui/ConnectWallet/icons/PlayStoreIcon.js");
const basic_js_1 = require("../../ui/components/basic.js");
const QRCode_js_1 = require("../../ui/components/QRCode.js");
const Spacer_js_1 = require("../../ui/components/Spacer.js");
const text_js_1 = require("../../ui/components/text.js");
const WalletImage_js_1 = require("../../ui/components/WalletImage.js");
const elements_js_1 = require("../../ui/design-system/elements.js");
/**
 * @internal
 */
const GetStartedScreen = ({ wallet, walletInfo, header, footer, onBack, locale, client }) => {
    const [showScreen, setShowScreen] = (0, react_1.useState)("base");
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
    return ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { animate: "fadein", flex: "column", fullHeight: true, children: (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { expand: true, flex: "column", p: "lg", children: [showScreen === "android-scan" && walletInfo.app.android && ((0, jsx_runtime_1.jsx)(InstallScanScreen, { client: client, locale: {
                        scanToDownload: locale.getStartedScreen.instruction,
                    }, onBack: handleBack, platform: "Google Play", platformIcon: (0, jsx_runtime_1.jsx)(PlayStoreIcon_js_1.PlayStoreIcon, { size: index_js_1.iconSize.md }), url: walletInfo.app.android, walletId: wallet.id, walletName: walletInfo.name })), showScreen === "ios-scan" && walletInfo.app.ios && ((0, jsx_runtime_1.jsx)(InstallScanScreen, { client: client, locale: {
                        scanToDownload: locale.getStartedScreen.instruction,
                    }, onBack: handleBack, platform: "App Store", platformIcon: (0, jsx_runtime_1.jsx)(AppleIcon_js_1.AppleIcon, { size: index_js_1.iconSize.md }), url: walletInfo.app.ios, walletId: wallet.id, walletName: walletInfo.name })), showScreen === "base" && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { expand: true, flex: "column", children: [header || ((0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: handleBack, title: walletInfo.name })), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { animate: "fadein", center: "y", expand: true, flex: "column", style: {
                                minHeight: "250px",
                            }, children: (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "xs", children: [walletInfo.app.chrome && ((0, jsx_runtime_1.jsxs)(ButtonLink, { onClick: () => {
                                            (0, openWindow_js_1.openWindow)(walletInfo.app.chrome || "");
                                        }, children: [(0, jsx_runtime_1.jsx)(ChromeIcon_js_1.ChromeIcon, { size: index_js_1.iconSize.lg }), (0, jsx_runtime_1.jsx)("span", { children: locale.download.chrome })] })), walletInfo.app.android && ((0, jsx_runtime_1.jsxs)(ButtonLink, { as: "button", onClick: () => {
                                            if ((0, isMobile_js_1.isMobile)()) {
                                                (0, openWindow_js_1.openWindow)(walletInfo.app.android || "");
                                            }
                                            else {
                                                setShowScreen("android-scan");
                                            }
                                        }, children: [(0, jsx_runtime_1.jsx)(PlayStoreIcon_js_1.PlayStoreIcon, { size: index_js_1.iconSize.lg }), (0, jsx_runtime_1.jsx)("span", { children: locale.download.android })] })), walletInfo.app.ios && ((0, jsx_runtime_1.jsxs)(ButtonLink, { as: "button", onClick: () => {
                                            if ((0, isMobile_js_1.isMobile)()) {
                                                (0, openWindow_js_1.openWindow)(walletInfo.app.ios || "");
                                            }
                                            else {
                                                setShowScreen("ios-scan");
                                            }
                                        }, children: [(0, jsx_runtime_1.jsx)(AppleIcon_js_1.AppleIcon, { size: index_js_1.iconSize.lg }), (0, jsx_runtime_1.jsx)("span", { children: locale.download.iOS })] }))] }) })] })), !isScanScreen && footer] }) }));
};
exports.GetStartedScreen = GetStartedScreen;
/**
 * @internal
 */
const InstallScanScreen = (props) => {
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", expand: true, children: [(0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: props.onBack, title: props.walletName }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "both", expand: true, flex: "column", style: {
                    textAlign: "center",
                }, children: [(0, jsx_runtime_1.jsx)(QRCode_js_1.QRCode, { QRIcon: (0, jsx_runtime_1.jsx)(WalletImage_js_1.WalletImage, { client: props.client, id: props.walletId, size: index_js_1.iconSize.xxl }), qrCodeUri: props.url }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { balance: true, center: true, multiline: true, children: props.locale.scanToDownload }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xs" })] })] }));
};
const ButtonLink = /* @__PURE__ */ (0, elements_js_1.StyledButton)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        all: "unset",
        "&:hover": {
            background: theme.colors.secondaryButtonHoverBg,
            color: theme.colors.primaryText,
            textDecoration: "none",
        },
        alignItems: "center",
        background: theme.colors.secondaryButtonBg,
        borderRadius: index_js_1.radius.sm,
        boxSizing: "border-box",
        color: theme.colors.secondaryButtonText,
        cursor: "pointer",
        display: "flex",
        fontWeight: 500,
        gap: index_js_1.spacing.md,
        padding: `${index_js_1.spacing.sm} ${index_js_1.spacing.md}`,
        textDecoration: "none",
        transition: "100ms ease",
        width: "100%",
    };
});
//# sourceMappingURL=GetStartedScreen.js.map