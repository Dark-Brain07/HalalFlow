"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InAppWalletIcon = InAppWalletIcon;
const jsx_runtime_1 = require("react/jsx-runtime");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const walletIcon_js_1 = require("../../../core/utils/walletIcon.js");
const ConnectWalletSocialOptions_js_1 = require("../../wallets/shared/ConnectWalletSocialOptions.js");
const Img_js_1 = require("../components/Img.js");
const EmailIcon_js_1 = require("./icons/EmailIcon.js");
const FingerPrintIcon_js_1 = require("./icons/FingerPrintIcon.js");
const GuestIcon_js_1 = require("./icons/GuestIcon.js");
const PhoneIcon_js_1 = require("./icons/PhoneIcon.js");
function InAppWalletIcon(props) {
    const enabledAuthMethods = (props.wallet.getConfig()?.auth?.options || ConnectWalletSocialOptions_js_1.defaultAuthOptions)
        .slice() // clone
        .sort((a, b) => {
        if (a in walletIcon_js_1.socialIcons && !(b in walletIcon_js_1.socialIcons)) {
            return -1;
        }
        if (!(a in walletIcon_js_1.socialIcons) && b in walletIcon_js_1.socialIcons) {
            return 1;
        }
        return 0;
    });
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    const firstMethod = enabledAuthMethods[0];
    const secondMethod = enabledAuthMethods[1];
    const thirdMethod = enabledAuthMethods[2];
    const fourthMethod = enabledAuthMethods[3];
    const offset = "4px";
    const offset2 = "6px";
    const smallIconSize = "20";
    const extraIconSize = "12";
    if (firstMethod && secondMethod) {
        return ((0, jsx_runtime_1.jsxs)("div", { style: {
                width: `${index_js_1.iconSize.xl}px`,
                height: `${index_js_1.iconSize.xl}px`,
                position: "relative",
                gap: index_js_1.spacing["3xs"],
                border: `1px solid ${theme.colors.borderColor}`,
                borderRadius: index_js_1.radius.md,
                backgroundColor: theme.colors.tertiaryBg,
            }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                        position: "absolute",
                        top: offset,
                        left: offset,
                        display: "flex",
                    }, children: (0, jsx_runtime_1.jsx)(AuthOptionIcon, { authOption: firstMethod, client: props.client, size: smallIconSize }) }), (0, jsx_runtime_1.jsx)("div", { style: {
                        position: "absolute",
                        bottom: offset,
                        right: offset,
                        display: "flex",
                    }, children: (0, jsx_runtime_1.jsx)(AuthOptionIcon, { authOption: secondMethod, client: props.client, size: smallIconSize }) }), (0, jsx_runtime_1.jsxs)("div", { children: [thirdMethod && ((0, jsx_runtime_1.jsx)("div", { style: {
                                position: "absolute",
                                top: offset2,
                                right: offset2,
                                display: "flex",
                            }, children: (0, jsx_runtime_1.jsx)(AuthOptionIcon, { authOption: thirdMethod, client: props.client, size: extraIconSize }) })), fourthMethod && ((0, jsx_runtime_1.jsx)("div", { style: {
                                position: "absolute",
                                bottom: offset2,
                                left: offset2,
                                display: "flex",
                            }, children: (0, jsx_runtime_1.jsx)(AuthOptionIcon, { authOption: fourthMethod, client: props.client, size: extraIconSize }) }))] })] }));
    }
    if (firstMethod) {
        return ((0, jsx_runtime_1.jsx)("div", { style: {
                width: `${index_js_1.iconSize.xl}px`,
                height: `${index_js_1.iconSize.xl}px`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: `1px solid ${theme.colors.borderColor}`,
                borderRadius: index_js_1.radius.md,
                backgroundColor: theme.colors.tertiaryBg,
            }, children: (0, jsx_runtime_1.jsx)(AuthOptionIcon, { authOption: firstMethod, client: props.client, size: index_js_1.iconSize.lg }, firstMethod) }));
    }
    return null;
}
function AuthOptionIcon(props) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    if (props.authOption in walletIcon_js_1.socialIcons) {
        const icon = walletIcon_js_1.socialIcons[props.authOption];
        return ((0, jsx_runtime_1.jsx)(Img_js_1.Img, { src: icon, width: props.size, height: props.size, client: props.client }));
    }
    if (props.authOption === "phone") {
        return (0, jsx_runtime_1.jsx)(PhoneIcon_js_1.PhoneIcon, { size: props.size, color: theme.colors.secondaryText });
    }
    if (props.authOption === "email") {
        return (0, jsx_runtime_1.jsx)(EmailIcon_js_1.EmailIcon, { size: props.size, color: theme.colors.secondaryText });
    }
    if (props.authOption === "passkey") {
        return ((0, jsx_runtime_1.jsx)(FingerPrintIcon_js_1.FingerPrintIcon, { size: props.size, color: theme.colors.secondaryText }));
    }
    if (props.authOption === "guest") {
        return (0, jsx_runtime_1.jsx)(GuestIcon_js_1.GuestIcon, { size: props.size, color: theme.colors.secondaryText });
    }
    return null;
}
//# sourceMappingURL=in-app-wallet-icon.js.map