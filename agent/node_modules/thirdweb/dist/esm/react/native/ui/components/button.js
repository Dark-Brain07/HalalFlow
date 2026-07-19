import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyleSheet, TouchableOpacity, View, } from "react-native";
import { radius, spacing } from "../../design-system/index.js";
import { RNImage } from "./RNImage.js";
import { ThemedText } from "./text.js";
export function ThemedButton(props) {
    const variant = props.variant ?? "primary";
    const { style: styleOverride, theme, ...restProps } = props;
    return (_jsx(TouchableOpacity, { activeOpacity: 0.5, style: [
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
export function ThemedButtonWithIcon(props) {
    const { theme, title, icon, onPress } = props;
    return (_jsx(ThemedButton, { onPress: onPress, theme: theme, variant: "secondary", children: _jsxs(View, { style: {
                alignContent: "center",
                flexDirection: "row",
                gap: spacing.md,
                paddingLeft: spacing.sm,
                width: "100%",
            }, children: [_jsx(RNImage, { color: theme.colors.accentButtonBg, data: icon, size: 24, theme: theme }), _jsx(ThemedText, { theme: theme, children: title })] }) }));
}
const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        borderRadius: radius.lg,
        flexDirection: "row",
        justifyContent: "center",
        padding: spacing.md,
    },
});
//# sourceMappingURL=button.js.map