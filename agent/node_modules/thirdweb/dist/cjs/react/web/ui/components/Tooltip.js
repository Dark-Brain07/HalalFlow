"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolTip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@emotion/react");
const styled_1 = require("@emotion/styled");
const RadixTooltip = require("@radix-ui/react-tooltip");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
/**
 * @internal
 */
const ToolTip = (props) => {
    return ((0, jsx_runtime_1.jsx)(RadixTooltip.Provider, { delayDuration: 200, children: (0, jsx_runtime_1.jsxs)(RadixTooltip.Root, { children: [(0, jsx_runtime_1.jsx)(RadixTooltip.Trigger, { asChild: true, children: props.children }), (0, jsx_runtime_1.jsx)(RadixTooltip.Portal, { children: (0, jsx_runtime_1.jsxs)(TooltipContent, { align: props.align || "center", side: props.side || "top", sideOffset: props.sideOffset || 6, children: [props.tip, (0, jsx_runtime_1.jsx)(TooltipArrow, {})] }) })] }) }));
};
exports.ToolTip = ToolTip;
const slideUpAndFade = (0, react_1.keyframes) `
from {
  opacity: 0;
  transform: translateY(2px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;
const TooltipContent = /* @__PURE__ */ (() => (0, styled_1.default)(RadixTooltip.Content)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        animation: `${slideUpAndFade} 200ms cubic-bezier(0.16, 1, 0.3, 1)`,
        background: theme.colors.tooltipBg,
        borderRadius: index_js_1.radius.sm,
        boxShadow: index_js_1.shadow.sm,
        color: theme.colors.tooltipText,
        fontSize: index_js_1.fontSize.sm,
        lineHeight: 1.5,
        maxWidth: "300px",
        padding: `${index_js_1.spacing.xs} ${index_js_1.spacing.sm}`,
        userSelect: "none",
        willChange: "transform, opacity",
        zIndex: 999999999999999,
    };
}))();
const TooltipArrow = /* @__PURE__ */ (() => (0, styled_1.default)(RadixTooltip.Arrow)(() => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        fill: theme.colors.tooltipBg,
    };
}))();
//# sourceMappingURL=Tooltip.js.map