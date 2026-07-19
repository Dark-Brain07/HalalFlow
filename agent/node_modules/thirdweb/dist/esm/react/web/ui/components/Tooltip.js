"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { useCustomTheme } from "../../../core/design-system/CustomThemeProvider.js";
import { fontSize, radius, shadow, spacing, } from "../../../core/design-system/index.js";
/**
 * @internal
 */
export const ToolTip = (props) => {
    return (_jsx(RadixTooltip.Provider, { delayDuration: 200, children: _jsxs(RadixTooltip.Root, { children: [_jsx(RadixTooltip.Trigger, { asChild: true, children: props.children }), _jsx(RadixTooltip.Portal, { children: _jsxs(TooltipContent, { align: props.align || "center", side: props.side || "top", sideOffset: props.sideOffset || 6, children: [props.tip, _jsx(TooltipArrow, {})] }) })] }) }));
};
const slideUpAndFade = keyframes `
from {
  opacity: 0;
  transform: translateY(2px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;
const TooltipContent = /* @__PURE__ */ (() => styled(RadixTooltip.Content)((_) => {
    const theme = useCustomTheme();
    return {
        animation: `${slideUpAndFade} 200ms cubic-bezier(0.16, 1, 0.3, 1)`,
        background: theme.colors.tooltipBg,
        borderRadius: radius.sm,
        boxShadow: shadow.sm,
        color: theme.colors.tooltipText,
        fontSize: fontSize.sm,
        lineHeight: 1.5,
        maxWidth: "300px",
        padding: `${spacing.xs} ${spacing.sm}`,
        userSelect: "none",
        willChange: "transform, opacity",
        zIndex: 999999999999999,
    };
}))();
const TooltipArrow = /* @__PURE__ */ (() => styled(RadixTooltip.Arrow)(() => {
    const theme = useCustomTheme();
    return {
        fill: theme.colors.tooltipBg,
    };
}))();
//# sourceMappingURL=Tooltip.js.map