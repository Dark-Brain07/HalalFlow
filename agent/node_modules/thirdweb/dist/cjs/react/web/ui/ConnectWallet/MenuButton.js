"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuLink = exports.MenuButton = void 0;
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const elements_js_1 = require("../design-system/elements.js");
exports.MenuButton = (0, elements_js_1.StyledButton)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        all: "unset",
        "&:hover": {
            backgroundColor: theme.colors.tertiaryBg,
            svg: {
                color: theme.colors.accentText,
            },
        },
        "&[data-variant='danger']:hover svg": {
            color: `${theme.colors.danger}!important`,
        },
        "&[data-variant='primary']:hover svg": {
            color: `${theme.colors.primaryText}!important`,
        },
        "&[disabled]": {
            cursor: "not-allowed",
        },
        alignItems: "center",
        backgroundColor: "transparent",
        borderRadius: index_js_1.radius.md,
        // border: `1px solid ${theme.colors.borderColor}`,
        boxSizing: "border-box",
        color: theme.colors.secondaryText,
        cursor: "pointer",
        display: "flex",
        fontSize: index_js_1.fontSize.md,
        fontWeight: 500,
        gap: index_js_1.spacing.sm,
        lineHeight: 1.3,
        padding: `${index_js_1.spacing.sm} ${index_js_1.spacing.sm}`,
        svg: {
            color: theme.colors.secondaryText,
            transition: "color 200ms ease",
        },
        transition: "background-color 200ms ease, transform 200ms ease",
        WebkitTapHighlightColor: "transparent",
        width: "100%",
    };
});
exports.MenuLink = (() => exports.MenuButton.withComponent("a"))();
//# sourceMappingURL=MenuButton.js.map