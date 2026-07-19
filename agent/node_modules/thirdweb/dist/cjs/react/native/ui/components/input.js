"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemedInput = ThemedInput;
exports.ThemedInputWithSubmit = ThemedInputWithSubmit;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_svg_1 = require("react-native-svg");
const index_js_1 = require("../../design-system/index.js");
const svgs_js_1 = require("../icons/svgs.js");
const spinner_js_1 = require("./spinner.js");
function ThemedInput(props) {
    const { theme, leftView, rightView } = props;
    const [isFocused, setIsFocused] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            styles.container,
            {
                borderColor: isFocused
                    ? theme.colors.accentButtonBg
                    : theme.colors.borderColor,
            },
        ], children: [leftView && leftView, (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { onBlur: () => setIsFocused(false), onFocus: () => setIsFocused(true), placeholderTextColor: theme.colors.secondaryText, style: [
                    styles.input,
                    { color: theme.colors.primaryText },
                    leftView ? { paddingLeft: 0 } : {},
                ], ...props }), rightView && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } }), rightView] }))] }));
}
function ThemedInputWithSubmit(props) {
    const { theme, onSubmit } = props;
    const [isFocused, setIsFocused] = (0, react_1.useState)(false);
    const [val, setVal] = (0, react_1.useState)("");
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            styles.container,
            {
                borderColor: isFocused
                    ? theme.colors.accentButtonBg
                    : theme.colors.borderColor,
            },
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.TextInput, { onBlur: () => setIsFocused(false), onChangeText: setVal, onFocus: () => setIsFocused(true), placeholderTextColor: theme.colors.secondaryText, style: [
                    styles.input,
                    {
                        color: theme.colors.primaryText,
                    },
                ], value: val, ...props }), onSubmit && ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { disabled: props.isSubmitting, onPress: () => onSubmit(val), style: {
                    paddingHorizontal: index_js_1.spacing.lg,
                }, children: props.isSubmitting ? ((0, jsx_runtime_1.jsx)(spinner_js_1.ThemedSpinner, { color: theme.colors.secondaryIconColor, size: 24 })) : ((0, jsx_runtime_1.jsx)(react_native_svg_1.SvgXml, { color: theme.colors.secondaryIconColor, height: 24, width: 24, xml: svgs_js_1.RIGHT_ARROW })) }))] }));
}
const styles = react_native_1.StyleSheet.create({
    container: {
        alignItems: "center",
        borderRadius: index_js_1.radius.lg,
        borderStyle: "solid",
        borderWidth: 1,
        flexDirection: "row",
    },
    input: {
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
        fontSize: 16,
        gap: index_js_1.spacing.md,
        height: 56,
        justifyContent: "center",
        paddingLeft: index_js_1.spacing.lg,
        paddingVertical: index_js_1.spacing.md,
    },
});
//# sourceMappingURL=input.js.map