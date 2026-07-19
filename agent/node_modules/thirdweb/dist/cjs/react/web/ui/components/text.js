"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = exports.Text = void 0;
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const elements_js_1 = require("../design-system/elements.js");
exports.Text = (0, elements_js_1.StyledSpan)((p) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        color: theme.colors[p.color || "secondaryText"],
        display: p.inline ? "inline" : "block",
        fontSize: index_js_1.fontSize[p.size || "md"],
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
exports.Link = (0, elements_js_1.StyledAnchor)((p) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        all: "unset",
        "&:hover": {
            color: theme.colors[p.hoverColor || "primaryText"],
            textDecoration: "none",
        },
        color: theme.colors[p.color || "accentText"],
        cursor: "pointer",
        display: p.inline ? "inline" : "block",
        fontSize: index_js_1.fontSize[p.size || "md"],
        fontWeight: p.weight || 500,
        lineHeight: "normal",
        textAlign: p.center ? "center" : "left",
        textDecoration: "none",
        transition: "color 0.2s ease",
    };
});
//# sourceMappingURL=text.js.map