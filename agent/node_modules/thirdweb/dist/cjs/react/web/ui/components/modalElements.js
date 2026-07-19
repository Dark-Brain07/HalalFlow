"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackButton = exports.ModalTitle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const elements_js_1 = require("../design-system/elements.js");
const buttons_js_1 = require("./buttons.js");
exports.ModalTitle = (0, elements_js_1.StyledH2)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        color: theme.colors.primaryText,
        fontSize: index_js_1.fontSize.lg,
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
const BackButton = (props) => {
    return ((0, jsx_runtime_1.jsx)(buttons_js_1.IconButton, { className: "tw-back-button", onClick: props.onClick, style: { transform: "translateX(-25%)", ...props.style }, type: "button", children: (0, jsx_runtime_1.jsx)(react_icons_1.ChevronLeftIcon, { height: index_js_1.iconSize.md, width: index_js_1.iconSize.md }) }));
};
exports.BackButton = BackButton;
//# sourceMappingURL=modalElements.js.map