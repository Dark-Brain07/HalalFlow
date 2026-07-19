import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { spacing } from "../../design-system/index.js";
import { BACK_ICON, CLOSE_ICON } from "../icons/svgs.js";
import { RNImage } from "./RNImage.js";
import { ThemedText } from "./text.js";
export function Header({ theme, title, onClose, onBack, containerType, }) {
    if (containerType === "embed") {
        return onBack ? (_jsxs(TouchableOpacity, { onPress: onBack, style: {
                alignItems: "center",
                flexDirection: "row",
                gap: spacing.sm,
                paddingTop: spacing.lg,
            }, children: [_jsx(RNImage, { color: theme.colors.secondaryIconColor, data: BACK_ICON, size: 14, theme: theme }), _jsx(ThemedText, { theme: theme, type: "subtext", children: "Back" })] })) : null;
    }
    return (_jsxs(View, { style: styles.headerModal, children: [onBack && (_jsx(TouchableOpacity, { onPress: onBack, children: _jsx(RNImage, { color: theme.colors.secondaryIconColor, data: BACK_ICON, size: 24, theme: theme }) })), _jsx(ThemedText, { theme: theme, type: "title", children: title }), onClose && (_jsx(TouchableOpacity, { onPress: onClose, children: _jsx(RNImage, { color: theme.colors.secondaryIconColor, data: CLOSE_ICON, size: 24, theme: theme }) }))] }));
}
const styles = StyleSheet.create({
    headerModal: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
    },
});
//# sourceMappingURL=Header.js.map