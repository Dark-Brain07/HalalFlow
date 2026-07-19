"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemedButton = ThemedButton;
exports.ThemedButtonWithIcon = ThemedButtonWithIcon;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const index_js_1 = require("../../design-system/index.js");
const RNImage_js_1 = require("./RNImage.js");
const text_js_1 = require("./text.js");
function ThemedButton(props) {
    const variant = props.variant ?? "primary";
    const { style: styleOverride, theme, ...restProps } = props;
    return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { activeOpacity: 0.5, style: [
            styles.button,
            {
                backgroundColor: variant === "secondary"
                    ? "transparent"
                    : variant === "accent"
                        ? props.theme.colors.accentButtonBg
                        : props.theme.colors.primaryButtonBg,
                borderColor: variant === "secondary" ? theme.colors.borderColor : "transparent",
                borderWidth: variant === "secondary" ? 1 : 0,
            },
            styleOverride,
        ], ...restProps, children: props.children }));
}
function ThemedButtonWithIcon(props) {
    const { theme, title, icon, onPress } = props;
    return ((0, jsx_runtime_1.jsx)(ThemedButton, { onPress: onPress, theme: theme, variant: "secondary", children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                alignContent: "center",
                flexDirection: "row",
                gap: index_js_1.spacing.md,
                paddingLeft: index_js_1.spacing.sm,
                width: "100%",
            }, children: [(0, jsx_runtime_1.jsx)(RNImage_js_1.RNImage, { color: theme.colors.accentButtonBg, data: icon, size: 24, theme: theme }), (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { theme: theme, children: title })] }) }));
}
const styles = react_native_1.StyleSheet.create({
    button: {
        alignItems: "center",
        borderRadius: index_js_1.radius.lg,
        flexDirection: "row",
        justifyContent: "center",
        padding: index_js_1.spacing.md,
    },
});
//# sourceMappingURL=button.js.map