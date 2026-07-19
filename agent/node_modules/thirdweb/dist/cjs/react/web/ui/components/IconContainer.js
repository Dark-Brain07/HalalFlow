"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconContainer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
/**
 * @internal
 */
const IconContainer = (props) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            alignItems: "center",
            border: `1px solid ${theme.colors.borderColor}`,
            borderRadius: "100%",
            display: "flex",
            flexShrink: 0,
            justifyItems: "center",
            overflow: "hidden",
            padding: props.padding ?? "6px",
            position: "relative",
            ...props.style,
        }, children: props.children }));
};
exports.IconContainer = IconContainer;
//# sourceMappingURL=IconContainer.js.map