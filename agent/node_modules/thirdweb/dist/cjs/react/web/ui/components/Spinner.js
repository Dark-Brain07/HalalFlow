"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spinner = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@emotion/react");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const elements_js_1 = require("../design-system/elements.js");
/**
 * @internal
 */
const Spinner = (props) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return ((0, jsx_runtime_1.jsxs)(Svg, { style: {
            height: `${index_js_1.iconSize[props.size]}px`,
            width: `${index_js_1.iconSize[props.size]}px`,
            ...props.style,
        }, viewBox: "0 0 50 50", className: "tw-spinner", children: [(0, jsx_runtime_1.jsx)("circle", { cx: "25", cy: "25", fill: "none", r: "20", style: {
                    strokeLinecap: "round",
                    animation: `tw-spinner-circle-dash 1.5s ease-in-out infinite`,
                }, stroke: props.color ? theme.colors[props.color] : "currentColor", strokeWidth: Number(index_js_1.iconSize[props.size]) > 64 ? "2" : "4" }), (0, jsx_runtime_1.jsx)("style", { children: dashAnimation })] }));
};
exports.Spinner = Spinner;
// animations
const dashAnimation = `
@keyframes tw-spinner-circle-dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;
const rotateAnimation = (0, react_1.keyframes) `
  100% {
    transform: rotate(360deg);
  }
`;
const Svg = /* @__PURE__ */ (0, elements_js_1.StyledSvg)({
    animation: `${rotateAnimation} 2s linear infinite`,
    height: "1em",
    width: "1em",
});
//# sourceMappingURL=Spinner.js.map