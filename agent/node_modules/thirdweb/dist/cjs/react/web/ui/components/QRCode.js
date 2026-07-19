"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QRCode = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@emotion/react");
const react_2 = require("react");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const animations_js_1 = require("../design-system/animations.js");
const elements_js_1 = require("../design-system/elements.js");
const QRCodeRenderer = /* @__PURE__ */ (0, react_2.lazy)(() => Promise.resolve().then(() => require("./QRCode/QRCodeRenderer.js")));
/**
 * @internal
 */
const QRCode = (props) => {
    const size = props.size || 310;
    const placeholder = ((0, jsx_runtime_1.jsxs)(QRPlaceholder, { style: {
            height: `${size}px`,
            width: `${size}px`,
        }, children: [(0, jsx_runtime_1.jsx)("span", { "data-v1": true }), (0, jsx_runtime_1.jsx)("span", { "data-v2": true }), (0, jsx_runtime_1.jsx)("span", { "data-v3": true }), (0, jsx_runtime_1.jsx)("div", {})] }));
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: "flex",
            justifyContent: "center",
            position: "relative",
        }, children: [props.qrCodeUri ? ((0, jsx_runtime_1.jsx)(react_2.Suspense, { fallback: placeholder, children: (0, jsx_runtime_1.jsx)(QRCodeContainer, { children: (0, jsx_runtime_1.jsx)(QRCodeRenderer, { clearSize: props.QRIcon ? 70 : undefined, ecl: "M", size: size + 20, uri: props.qrCodeUri }) }) })) : (placeholder), props.QRIcon && (0, jsx_runtime_1.jsx)(IconContainer, { children: props.QRIcon })] }));
};
exports.QRCode = QRCode;
const IconContainer = /* @__PURE__ */ (0, elements_js_1.StyledDiv)({
    alignContent: "center",
    display: "flex",
    justifyContent: "center",
    left: "50%",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
});
const QRCodeContainer = /* @__PURE__ */ (0, elements_js_1.StyledDiv)(() => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        "--ck-body-background": theme.colors.modalBg,
        "--ck-qr-background": theme.colors.modalBg,
        "--ck-qr-dot-color": theme.colors.primaryText,
        animation: `${animations_js_1.fadeInAnimation} 600ms ease`,
    };
});
const PlaceholderKeyframes = (0, react_1.keyframes) `
  0%{ background-position: 100% 0; }
  100%{ background-position: -100% 0; }
`;
const QRPlaceholder = /* @__PURE__ */ (0, elements_js_1.StyledDiv)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        "--bg": theme.colors.modalBg,
        "--color": theme.colors.skeletonBg,
        "&::after": {
            animation: `${PlaceholderKeyframes} 1000ms linear infinite both`,
            background: "linear-gradient(90deg, transparent 50%, var(--color), transparent)",
            backgroundSize: "200% 100%",
            content: '""',
            inset: 0,
            position: "absolute",
            transform: "scale(1.5) rotate(45deg)",
            zIndex: 100,
        },
        "&:before": {
            background: "repeat",
            backgroundImage: "radial-gradient(var(--color) 41%, transparent 41%)",
            backgroundSize: "1.888% 1.888%",
            content: '""',
            inset: 0,
            position: "absolute",
            zIndex: 3,
        },
        "> div": {
            background: "var(--bg)",
            borderRadius: "5px",
            boxShadow: "0 0 0 7px var(--bg)",
            height: "28%",
            position: "relative",
            width: "28%",
            zIndex: 4,
        },
        "> span": {
            "&:before": {
                borderRadius: "3px",
                boxShadow: "0 0 0 4px var(--bg)",
                content: '""',
                inset: "9px",
                position: "absolute",
            },
            "&[data-v1]": {
                left: 0,
                top: 0,
            },
            "&[data-v2]": {
                right: 0,
                top: 0,
            },
            "&[data-v3]": {
                bottom: 0,
                left: 0,
            },
            background: "var(--color)",
            borderRadius: "12px",
            boxShadow: "0 0 0 4px var(--bg)",
            height: "13.25%",
            position: "absolute",
            width: "13.25%",
            zIndex: 4,
        },
        alignItems: "center",
        borderRadius: index_js_1.radius.md,
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
    };
});
//# sourceMappingURL=QRCode.js.map