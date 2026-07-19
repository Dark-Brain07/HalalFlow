"use client";
import { useCustomTheme } from "../../../core/design-system/CustomThemeProvider.js";
import { fontSize } from "../../../core/design-system/index.js";
import { StyledAnchor, StyledSpan } from "../design-system/elements.js";
export const Text = /* @__PURE__ */ StyledSpan((p) => {
    const theme = useCustomTheme();
    return {
        color: theme.colors[p.color || "secondaryText"],
        display: p.inline ? "inline" : "block",
        fontSize: fontSize[p.size || "md"],
        fontWeight: p.weight || 400,
        lineHeight: p.multiline ? 1.5 : "normal",
        margin: 0,
        maxWidth: "100%",
        overflow: "hidden",
        textAlign: p.center ? "center" : "left",
        textOverflow: "ellipsis",
        textWrap: p.balance ? "balance" : "inherit",
        letterSpacing: p.trackingTight ? "-0.025em" : undefined,
    };
});
export const Link = /* @__PURE__ */ StyledAnchor((p) => {
    const theme = useCustomTheme();
    return {
        all: "unset",
        "&:hover": {
            color: theme.colors[p.hoverColor || "primaryText"],
            textDecoration: "none",
        },
        color: theme.colors[p.color || "accentText"],
        cursor: "pointer",
        display: p.inline ? "inline" : "block",
        fontSize: fontSize[p.size || "md"],
        fontWeight: p.weight || 500,
        lineHeight: "normal",
        textAlign: p.center ? "center" : "left",
        textDecoration: "none",
        transition: "color 0.2s ease",
    };
});
//# sourceMappingURL=text.js.map