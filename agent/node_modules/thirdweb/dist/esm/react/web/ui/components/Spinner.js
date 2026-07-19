"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { keyframes } from "@emotion/react";
import { useCustomTheme } from "../../../core/design-system/CustomThemeProvider.js";
import { iconSize } from "../../../core/design-system/index.js";
import { StyledSvg } from "../design-system/elements.js";
/**
 * @internal
 */
export const Spinner = (props) => {
    const theme = useCustomTheme();
    return (_jsxs(Svg, { style: {
            height: `${iconSize[props.size]}px`,
            width: `${iconSize[props.size]}px`,
            ...props.style,
        }, viewBox: "0 0 50 50", className: "tw-spinner", children: [_jsx("circle", { cx: "25", cy: "25", fill: "none", r: "20", style: {
                    strokeLinecap: "round",
                    animation: `tw-spinner-circle-dash 1.5s ease-in-out infinite`,
                }, stroke: props.color ? theme.colors[props.color] : "currentColor", strokeWidth: Number(iconSize[props.size]) > 64 ? "2" : "4" }), _jsx("style", { children: dashAnimation })] }));
};
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
const rotateAnimation = keyframes `
  100% {
    transform: rotate(360deg);
  }
`;
const Svg = /* @__PURE__ */ StyledSvg({
    animation: `${rotateAnimation} 2s linear infinite`,
    height: "1em",
    width: "1em",
});
//# sourceMappingURL=Spinner.js.map