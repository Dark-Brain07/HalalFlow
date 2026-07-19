"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeepLinkConnectUI = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@emotion/react");
const react_icons_1 = require("@radix-ui/react-icons");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const basic_js_1 = require("../../components/basic.js");
const buttons_js_1 = require("../../components/buttons.js");
const WalletImage_js_1 = require("../../components/WalletImage.js");
const elements_js_1 = require("../../design-system/elements.js");
/**
 * @internal
 */
const DeepLinkConnectUI = (props) => {
    let link = window.location.toString();
    if (props.wallet.id === "io.metamask") {
        link = link.replace("https://", "");
    }
    else {
        link = encodeURIComponent(link);
    }
    const deeplink = `${props.deepLinkPrefix}${link}?ref=${link}`;
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { p: "lg", children: (0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: props.onBack, title: props.walletInfo.name }) }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { animate: "fadein", center: "x", flex: "row", py: "3xl", children: (0, jsx_runtime_1.jsx)(PulsatingContainer, { children: (0, jsx_runtime_1.jsx)(WalletImage_js_1.WalletImage, { client: props.client, id: props.wallet.id, size: "80" }) }) }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { p: "lg", children: (0, jsx_runtime_1.jsxs)(buttons_js_1.ButtonLink, { fullWidth: true, gap: "xs", href: deeplink, variant: "accent", children: ["Continue in ", props.walletInfo.name, (0, jsx_runtime_1.jsx)(react_icons_1.ExternalLinkIcon, { height: index_js_1.iconSize.sm, width: index_js_1.iconSize.sm })] }) })] }));
};
exports.DeepLinkConnectUI = DeepLinkConnectUI;
const pulseAnimation = (0, react_1.keyframes) `
0% {
  transform: scale(0.9);
}
100% {
  opacity: 0;
  transform: scale(1.4);
}
`;
const PulsatingContainer = /* @__PURE__ */ (0, elements_js_1.StyledDiv)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        "&::before": {
            animation: `${pulseAnimation} 2s cubic-bezier(0.175, 0.885, 0.32, 1.1) infinite`,
            background: theme.colors.accentText,
            borderRadius: index_js_1.radius.xl,
            bottom: 0,
            content: '""',
            display: "block",
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: -1,
        },
        position: "relative",
    };
});
//# sourceMappingURL=DeepLinkConnectUI.js.map