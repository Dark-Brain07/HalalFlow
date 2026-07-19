import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { keyframes } from "@emotion/react";
import { useCustomTheme } from "../../../../core/design-system/CustomThemeProvider.js";
import { spacing } from "../../../../core/design-system/index.js";
import { Container } from "../../components/basic.js";
import { Img } from "../../components/Img.js";
import { Spacer } from "../../components/Spacer.js";
import { Link, Text } from "../../components/text.js";
import { StyledDiv } from "../../design-system/elements.js";
import { GlobeIcon } from "../icons/GlobalIcon.js";
import { TOS } from "../Modal/TOS.js";
import { PoweredByThirdweb } from "../PoweredByTW.js";
/**
 * @internal
 */
export function StartScreen(props) {
    const WelcomeScreen = props.welcomeScreen;
    if (WelcomeScreen) {
        if (typeof WelcomeScreen === "function") {
            return _jsx(WelcomeScreen, {});
        }
    }
    const title = (typeof WelcomeScreen === "object" ? WelcomeScreen?.title : undefined) ||
        props.connectLocale.welcomeScreen.defaultTitle;
    const subtitle = (typeof WelcomeScreen === "object" ? WelcomeScreen?.subtitle : undefined) ||
        props.connectLocale.welcomeScreen.defaultSubtitle;
    const img = typeof WelcomeScreen === "object" ? WelcomeScreen?.img : undefined;
    const showTOS = props.meta.termsOfServiceUrl || props.meta.privacyPolicyUrl;
    return (_jsxs(Container, { animate: "fadein", flex: "column", fullHeight: true, children: [_jsxs(Container, { center: "both", expand: true, flex: "column", p: "lg", style: {
                    minHeight: "300px",
                }, children: [_jsx(Container, { center: "x", flex: "row", children: img ? (_jsx(Img, { client: props.client, height: img.height ? String(img.height) : undefined, src: img.src, width: img.width ? String(img.width) : undefined })) : (_jsx(GlobalContainer, { children: _jsx(GlobeIcon, { size: "150" }) })) }), _jsx(Spacer, { y: "xxl" }), _jsx(Text, { center: true, color: "primaryText", multiline: true, weight: 600, children: title }), _jsx(Spacer, { y: "md" }), _jsx(Text, { color: "secondaryText", multiline: true, style: {
                            textAlign: "center",
                        }, children: subtitle }), _jsx(Spacer, { y: "lg" }), _jsx(Link, { center: true, href: "https://blog.thirdweb.com/web3-wallet/", target: "_blank", children: props.connectLocale.newToWallets })] }), _jsx(Container, { flex: "column", gap: "lg", py: "lg", children: _jsxs("div", { children: [showTOS && (_jsx(TOS, { locale: props.connectLocale.agreement, privacyPolicyUrl: props.meta.privacyPolicyUrl, termsOfServiceUrl: props.meta.termsOfServiceUrl })), props.meta.showThirdwebBranding !== false && (_jsx(Container, { style: {
                                paddingTop: spacing.xl,
                            }, children: _jsx(PoweredByThirdweb, {}) }))] }) })] }));
}
const floatingAnimation = keyframes `
  from {
    transform: translateY(4px);
  }
  to {
    transform: translateY(-4px);
  }
`;
const GlobalContainer = /* @__PURE__ */ StyledDiv(() => {
    const theme = useCustomTheme();
    return {
        animation: `${floatingAnimation} 2s ease infinite alternate`,
        color: theme.colors.accentText,
        filter: `drop-shadow(0px 6px 10px ${theme.colors.accentText})`,
    };
});
//# sourceMappingURL=StartScreen.js.map