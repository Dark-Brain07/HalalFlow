import { jsx as _jsx } from "react/jsx-runtime";
import { StyleSheet, View } from "react-native";
import { spacing } from "../../design-system/index.js";
import { ThemedSpinner } from "../components/spinner.js";
export const LoadingView = (props) => {
    const { theme } = props;
    return (_jsx(View, { style: styles.container, children: _jsx(ThemedSpinner, { color: theme.colors.accentText, size: "large" }) }));
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
//# sourceMappingURL=LoadingView.js.map