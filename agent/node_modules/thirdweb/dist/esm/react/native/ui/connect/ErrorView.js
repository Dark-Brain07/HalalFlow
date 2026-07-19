import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyleSheet, View } from "react-native";
import { spacing } from "../../design-system/index.js";
import { RNImage } from "../components/RNImage.js";
import { ThemedText } from "../components/text.js";
import { CLOSE_CIRCLE } from "../icons/svgs.js";
export const ErrorView = (props) => {
    const { theme, title } = props;
    return (_jsxs(View, { style: styles.container, children: [_jsx(RNImage, { color: theme.colors.danger, data: CLOSE_CIRCLE, size: 64, theme: theme }), _jsx(ThemedText, { style: { color: theme.colors.danger, textAlign: "center" }, theme: theme, type: "defaultSemiBold", children: title })] }));
};
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "column",
        gap: spacing.lg,
        justifyContent: "center",
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.xxl,
    },
});
//# sourceMappingURL=ErrorView.js.map