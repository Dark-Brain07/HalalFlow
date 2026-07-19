import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyleSheet, View } from "react-native";
import { spacing } from "../../design-system/index.js";
import { RNImage } from "../components/RNImage.js";
import { ThemedText } from "../components/text.js";
import { CHECK_CIRCLE } from "../icons/svgs.js";
export const SuccessView = (props) => {
    const { theme, title } = props;
    return (_jsxs(View, { style: styles.container, children: [_jsx(RNImage, { color: theme.colors.success, data: CHECK_CIRCLE, size: 64, theme: theme }), _jsx(ThemedText, { style: { color: theme.colors.success, textAlign: "center" }, theme: theme, type: "defaultSemiBold", children: title })] }));
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
//# sourceMappingURL=SuccessView.js.map