"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconButton = exports.ButtonLink = exports.Button = void 0;
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const elements_js_1 = require("../design-system/elements.js");
exports.Button = (0, elements_js_1.StyledButton)((props) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    if (props.unstyled) {
        return {};
    }
    return {
        all: "unset",
        "[&:active]:not([disabled])": {
            transform: "translateY(1px)",
        },
        "&[data-disabled='true']": {
            "&:hover": {
                borderColor: "transparent",
            },
            background: theme.colors.tertiaryBg,
            borderColor: "transparent",
            boxShadow: "none",
            color: theme.colors.secondaryText,
        },
        "&[disabled]": {
            cursor: "not-allowed",
        },
        alignItems: "center",
        background: (() => {
            if (props.bg) {
                return theme.colors[props.bg];
            }
            switch (props.variant) {
                case "primary":
                    return theme.colors.primaryButtonBg;
                case "accent":
                    return theme.colors.accentButtonBg;
                case "secondary":
                    return theme.colors.secondaryButtonBg;
                default:
                    return "none";
            }
        })(),
        borderRadius: index_js_1.radius.md,
        boxSizing: "border-box",
        color: (() => {
            switch (props.variant) {
                case "primary":
                    return theme.colors.primaryButtonText;
                case "accent":
                    return theme.colors.accentButtonText;
                case "secondary":
                    return theme.colors.secondaryButtonText;
                case "ghost":
                case "ghost-solid":
                case "outline":
                    return theme.colors.secondaryButtonText;
                case "link":
                    return theme.colors.accentText;
                default:
                    return theme.colors.primaryButtonText;
            }
        })(),
        cursor: "pointer",
        display: "inline-flex",
        flexShrink: 0,
        fontSize: index_js_1.fontSize.sm,
        fontWeight: 500,
        gap: (props.gap && index_js_1.spacing[props.gap]) || 0,
        justifyContent: "center",
        lineHeight: "normal",
        maxWidth: "100%",
        padding: `${index_js_1.fontSize.sm} ${index_js_1.fontSize.sm}`,
        textAlign: "center",
        transition: "border 200ms ease",
        WebkitTapHighlightColor: "transparent",
        width: props.fullWidth ? "100%" : undefined,
        "&:hover": {
            background: props.hoverBg ? theme.colors[props.hoverBg] : undefined,
        },
        ...(() => {
            if (props.variant === "outline") {
                return {
                    "&:hover": {
                        borderColor: theme.colors.accentText,
                    },
                    '&[aria-selected="true"]': {
                        borderColor: theme.colors.accentText,
                    },
                    border: `1px solid ${theme.colors.borderColor}`,
                };
            }
            if (props.variant === "ghost") {
                return {
                    "&:hover": {
                        borderColor: theme.colors.accentText,
                    },
                    border: "1px solid transparent",
                };
            }
            if (props.variant === "ghost-solid") {
                return {
                    "&:hover": {
                        background: theme.colors[props.hoverBg || "tertiaryBg"],
                    },
                    border: "1px solid transparent",
                };
            }
            if (props.variant === "accent") {
                return {
                    "&:hover": {
                        opacity: 0.8,
                    },
                };
            }
            if (props.variant === "secondary") {
                return {
                    "&:hover": {
                        background: theme.colors[props.hoverBg || "secondaryButtonHoverBg"],
                    },
                };
            }
            if (props.variant === "link") {
                return {
                    "&:hover": {
                        color: theme.colors.primaryText,
                    },
                    padding: 0,
                };
            }
            return {};
        })(),
    };
});
exports.ButtonLink = (() => exports.Button.withComponent("a"))();
exports.IconButton = (0, elements_js_1.StyledButton)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        all: "unset",
        "&:hover": {
            background: theme.colors.secondaryIconHoverBg,
            color: theme.colors.secondaryIconHoverColor,
        },
        "&[disabled]": {
            cursor: "not-allowed",
        },
        alignItems: "center",
        borderRadius: index_js_1.radius.sm,
        color: theme.colors.secondaryIconColor,
        cursor: "pointer",
        display: "inline-flex",
        justifyContent: "center",
        padding: "2px",
        transition: "background 200ms ease, color 200ms ease",
        WebkitTapHighlightColor: "transparent",
    };
});
//# sourceMappingURL=buttons.js.map