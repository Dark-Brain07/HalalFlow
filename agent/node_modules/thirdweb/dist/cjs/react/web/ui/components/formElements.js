"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputContainer = exports.Input = exports.Label = void 0;
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const elements_js_1 = require("../design-system/elements.js");
exports.Label = (0, elements_js_1.StyledLabel)((props) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        color: theme.colors[props.color || "primaryText"],
        display: "block",
        fontSize: index_js_1.fontSize.sm,
        fontWeight: 500,
    };
});
exports.Input = (0, elements_js_1.StyledInput)((props) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        "&:-webkit-autofill": {
            boxShadow: `0 0 0px 1000px ${theme.colors.inputAutofillBg} inset !important`,
            transition: "background-color 5000s ease-in-out 0s",
            WebkitBoxShadow: `0 0 0px 1000px ${theme.colors.inputAutofillBg} inset !important`,
            WebkitTextFillColor: theme.colors.primaryText,
        },
        "&:-webkit-autofill:focus": {
            boxShadow: `0 0 0px 1000px ${theme.colors.inputAutofillBg} inset, 0 0 0 2px ${props.variant === "outline" ? theme.colors.accentText : "transparent"} !important`,
            WebkitBoxShadow: `0 0 0px 1000px ${theme.colors.inputAutofillBg} inset, 0 0 0 2px ${props.variant === "outline" ? theme.colors.accentText : "transparent"} !important`,
        },
        "&::placeholder": {
            color: theme.colors.secondaryText,
        },
        "&:focus": {
            boxShadow: `0 0 0 2px ${theme.colors.accentText}`,
        },
        "&:not([type='password'])": {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
        "&[data-error='true']": {
            boxShadow: `0 0 0 2px ${theme.colors.danger} !important`,
        },
        "&[data-focus='false']:focus": {
            boxShadow: "none",
        },
        "&[data-placeholder='true']": {
            color: theme.colors.secondaryText,
        },
        "&[disabled]": {
            cursor: "not-allowed",
        },
        "&[type='number']": {
            appearance: "none",
            MozAppearance: "textfield",
        },
        "&[type='number']::-webkit-outer-spin-button, &[type='number']::-webkit-inner-spin-button": {
            margin: 0,
            WebkitAppearance: "none",
        },
        appearance: "none",
        background: props.bg ? theme.colors[props.bg] : "transparent",
        border: "none",
        borderRadius: index_js_1.radius.md,
        boxShadow: `0 0 0 1.5px ${props.variant === "outline" ? theme.colors.borderColor : "transparent"}`,
        boxSizing: "border-box",
        color: theme.colors.primaryText,
        display: "block",
        fontFamily: "inherit",
        fontSize: index_js_1.fontSize.sm,
        outline: "none",
        padding: props.sm ? index_js_1.spacing.sm : index_js_1.fontSize.sm,
        WebkitAppearance: "none",
        width: "100%",
        [index_js_1.media.mobile]: {
            fontSize: index_js_1.fontSize.md,
        },
    };
});
// for rendering a input and a button side by side
exports.InputContainer = (0, elements_js_1.StyledDiv)(() => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        "&:focus-within": {
            boxShadow: `0 0 0px 1px ${theme.colors.accentText}`,
        },
        // show error ring on container instead of input
        "&[data-error='true']": {
            boxShadow: `0 0 0px 1px ${theme.colors.danger}`,
        },
        borderRadius: index_js_1.radius.md,
        boxShadow: `0 0 0px 1px ${theme.colors.borderColor}`,
        display: "flex",
        "input:focus": {
            boxShadow: "none",
        },
    };
});
//# sourceMappingURL=formElements.js.map