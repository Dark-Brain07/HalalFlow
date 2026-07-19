import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, } from "react-native";
import { SvgXml } from "react-native-svg";
import { radius, spacing } from "../../design-system/index.js";
import { RIGHT_ARROW } from "../icons/svgs.js";
import { ThemedSpinner } from "./spinner.js";
export function ThemedInput(props) {
    const { theme, leftView, rightView } = props;
    const [isFocused, setIsFocused] = useState(false);
    return (_jsxs(View, { style: [
            styles.container,
            {
                borderColor: isFocused
                    ? theme.colors.accentButtonBg
                    : theme.colors.borderColor,
            },
        ], children: [leftView && leftView, _jsx(TextInput, { onBlur: () => setIsFocused(false), onFocus: () => setIsFocused(true), placeholderTextColor: theme.colors.secondaryText, style: [
                    styles.input,
                    { color: theme.colors.primaryText },
                    leftView ? { paddingLeft: 0 } : {},
                ], ...props }), rightView && (_jsxs(_Fragment, { children: [_jsx(View, { style: { flex: 1 } }), rightView] }))] }));
}
export function ThemedInputWithSubmit(props) {
    const { theme, onSubmit } = props;
    const [isFocused, setIsFocused] = useState(false);
    const [val, setVal] = useState("");
    return (_jsxs(View, { style: [
            styles.container,
            {
                borderColor: isFocused
                    ? theme.colors.accentButtonBg
                    : theme.colors.borderColor,
            },
        ], children: [_jsx(TextInput, { onBlur: () => setIsFocused(false), onChangeText: setVal, onFocus: () => setIsFocused(true), placeholderTextColor: theme.colors.secondaryText, style: [
                    styles.input,
                    {
                        color: theme.colors.primaryText,
                    },
                ], value: val, ...props }), onSubmit && (_jsx(TouchableOpacity, { disabled: props.isSubmitting, onPress: () => onSubmit(val), style: {
                    paddingHorizontal: spacing.lg,
                }, children: props.isSubmitting ? (_jsx(ThemedSpinner, { color: theme.colors.secondaryIconColor, size: 24 })) : (_jsx(SvgXml, { color: theme.colors.secondaryIconColor, height: 24, width: 24, xml: RIGHT_ARROW })) }))] }));
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        borderRadius: radius.lg,
        borderStyle: "solid",
        borderWidth: 1,
        flexDirection: "row",
    },
    input: {
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
        fontSize: 16,
        gap: spacing.md,
        height: 56,
        justifyContent: "center",
        paddingLeft: spacing.lg,
        paddingVertical: spacing.md,
    },
});
//# sourceMappingURL=input.js.map