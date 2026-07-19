"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartScreen = StartScreen;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@emotion/react");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const basic_js_1 = require("../../components/basic.js");
const Img_js_1 = require("../../components/Img.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const text_js_1 = require("../../components/text.js");
const elements_js_1 = require("../../design-system/elements.js");
const GlobalIcon_js_1 = require("../icons/GlobalIcon.js");
const TOS_js_1 = require("../Modal/TOS.js");
const PoweredByTW_js_1 = require("../PoweredByTW.js");
/**
 * @internal
 */
function StartScreen(props) {
    const WelcomeScreen = props.welcomeScreen;
    if (WelcomeScreen) {
        if (typeof WelcomeScreen === "function") {
            return (0, jsx_runtime_1.jsx)(WelcomeScreen, {});
        }
    }
    const title = (typeof WelcomeScreen === "object" ? WelcomeScreen?.title : undefined) ||
        props.connectLocale.welcomeScreen.defaultTitle;
    const subtitle = (typeof WelcomeScreen === "object" ? WelcomeScreen?.subtitle : undefined) ||
        props.connectLocale.welcomeScreen.defaultSubtitle;
    const img = typeof WelcomeScreen === "object" ? WelcomeScreen?.img : undefined;
    const showTOS = props.meta.termsOfServiceUrl || props.meta.privacyPolicyUrl;
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", flex: "column", fullHeight: true, children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "both", expand: true, flex: "column", p: "lg", style: {
                    minHeight: "300px",
                }, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "x", flex: "row", children: img ? ((0, jsx_runtime_1.jsx)(Img_js_1.Img, { client: props.client, height: img.height ? String(img.height) : undefined, src: img.src, width: img.width ? String(img.width) : undefined })) : ((0, jsx_runtime_1.jsx)(GlobalContainer, { children: (0, jsx_runtime_1.jsx)(GlobalIcon_js_1.GlobeIcon, { size: "150" }) })) }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xxl" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "primaryText", multiline: true, weight: 600, children: title }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", multiline: true, style: {
                            textAlign: "center",
                        }, children: subtitle }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsx)(text_js_1.Link, { center: true, href: "https://blog.thirdweb.com/web3-wallet/", target: "_blank", children: props.connectLocale.newToWallets })] }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", gap: "lg", py: "lg", children: (0, jsx_runtime_1.jsxs)("div", { children: [showTOS && ((0, jsx_runtime_1.jsx)(TOS_js_1.TOS, { locale: props.connectLocale.agreement, privacyPolicyUrl: props.meta.privacyPolicyUrl, termsOfServiceUrl: props.meta.termsOfServiceUrl })), props.meta.showThirdwebBranding !== false && ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { style: {
                                paddingTop: index_js_1.spacing.xl,
                            }, children: (0, jsx_runtime_1.jsx)(PoweredByTW_js_1.PoweredByThirdweb, {}) }))] }) })] }));
}
const floatingAnimation = (0, react_1.keyframes) `
  from {
    transform: translateY(4px);
  }
  to {
    transform: translateY(-4px);
  }
`;
const GlobalContainer = /* @__PURE__ */ (0, elements_js_1.StyledDiv)(() => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        animation: `${floatingAnimation} 2s ease infinite alternate`,
        color: theme.colors.accentText,
        filter: `drop-shadow(0px 6px 10px ${theme.colors.accentText})`,
    };
});
//# sourceMappingURL=StartScreen.js.map