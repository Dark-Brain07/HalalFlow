"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletLogoSpinner = WalletLogoSpinner;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@emotion/react");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const WalletImage_js_1 = require("../../components/WalletImage.js");
const animations_js_1 = require("../../design-system/animations.js");
const elements_js_1 = require("../../design-system/elements.js");
/**
 *
 * @internal
 */
function WalletLogoSpinner(props) {
    const loaderRadius = 20;
    const radiusFactor = 36 - loaderRadius;
    const dashArrayStart = 116 + radiusFactor;
    const dashArrayEnd = 245 + radiusFactor;
    const dashOffset = -1 * (360 + radiusFactor * 1.75);
    return ((0, jsx_runtime_1.jsx)(LogoContainer, { "data-error": props.error, children: (0, jsx_runtime_1.jsx)("div", { "data-container": true, style: {
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                position: "relative",
            }, children: (0, jsx_runtime_1.jsxs)("div", { "data-img-container": true, children: [!props.hideSpinner && ((0, jsx_runtime_1.jsx)("svg", { role: "presentation", style: {
                            display: props.error ? "none" : "block",
                        }, viewBox: "0 0 110 110", children: (0, jsx_runtime_1.jsx)("rect", { fill: "none", height: "106", rx: loaderRadius, strokeDasharray: `${dashArrayStart} ${dashArrayEnd}`, strokeDashoffset: dashOffset, strokeLinecap: "round", strokeWidth: 4, width: "106", x: "2", y: "2" }) })), (0, jsx_runtime_1.jsx)(WalletBg, { children: (0, jsx_runtime_1.jsx)(WalletImage_js_1.WalletImage, { client: props.client, id: props.id, size: "68" }) })] }) }) }));
}
const WalletBg = /* @__PURE__ */ (0, elements_js_1.StyledDiv)(() => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        alignItems: "center",
        background: theme.colors.tertiaryBg,
        border: `1px solid ${theme.colors.borderColor}`,
        borderRadius: "13px",
        display: "flex",
        justifyContent: "center",
        padding: index_js_1.spacing.xs,
    };
});
const dashRotateAnimation = (0, react_1.keyframes) `
from {
  stroke-dashoffset: 0px;
}
`;
const shakeErrorAnimation = (0, react_1.keyframes) `
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
`;
const pulseAnimation = (0, react_1.keyframes) `
0% {
  transform: scale(0.95);
}
100% {
  opacity: 0;
  transform: scale(1.3);
}
`;
const LogoContainer = /* @__PURE__ */ (0, elements_js_1.StyledDiv)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        "[data-img-container]": {
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            position: "relative",
        },
        "&[data-error='true'] [data-container]": {
            animation: `${shakeErrorAnimation} 0.25s linear`,
        },
        "&[data-error='true'] [data-img-container]::before": {
            animation: `${pulseAnimation} 1.5s ease infinite`,
            background: theme.colors.danger,
            borderRadius: "20px",
            content: '""',
            inset: 0,
            position: "absolute",
            zIndex: -1,
        },
        borderRadius: index_js_1.radius.xl,
        display: "flex",
        img: {
            zIndex: 100,
        },
        justifyContent: "center",
        position: "relative",
        rect: {
            animation: `${dashRotateAnimation} 1.2s linear infinite`,
            stroke: theme.colors.accentText,
        },
        svg: {
            animation: `${animations_js_1.fadeInAnimation} 400ms ease`,
            height: "calc(100% + 16px)",
            /* can't use inset because safari doesn't like it */
            left: "-8px",
            position: "absolute",
            top: "-8px",
            width: "calc(100% + 16px)",
        },
    };
});
//# sourceMappingURL=WalletLogoSpinner.js.map