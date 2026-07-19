"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useCustomTheme } from "../../../core/design-system/CustomThemeProvider.js";
import { fontSize, iconSize } from "../../../core/design-system/index.js";
import { StyledH2 } from "../design-system/elements.js";
import { IconButton } from "./buttons.js";
export const ModalTitle = /* @__PURE__ */ StyledH2((_) => {
    const theme = useCustomTheme();
    return {
        color: theme.colors.primaryText,
        fontSize: fontSize.lg,
        fontWeight: 500,
        lineHeight: 1.3,
        margin: 0,
        letterSpacing: "-0.025em",
        textAlign: "left",
    };
});
/**
 * @internal
 */
export const BackButton = (props) => {
    return (_jsx(IconButton, { className: "tw-back-button", onClick: props.onClick, style: { transform: "translateX(-25%)", ...props.style }, type: "button", children: _jsx(ChevronLeftIcon, { height: iconSize.md, width: iconSize.md }) }));
};
//# sourceMappingURL=modalElements.js.map