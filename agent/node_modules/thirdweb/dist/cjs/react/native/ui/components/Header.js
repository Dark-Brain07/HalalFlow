"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = Header;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const index_js_1 = require("../../design-system/index.js");
const svgs_js_1 = require("../icons/svgs.js");
const RNImage_js_1 = require("./RNImage.js");
const text_js_1 = require("./text.js");
function Header({ theme, title, onClose, onBack, containerType, }) {
    if (containerType === "embed") {
        return onBack ? ((0, jsx_runtime_1.jsxs)(react_native_1.TouchableOpacity, { onPress: onBack, style: {
                alignItems: "center",
                flexDirection: "row",
                gap: index_js_1.spacing.sm,
                paddingTop: index_js_1.spacing.lg,
            }, children: [(0, jsx_runtime_1.jsx)(RNImage_js_1.RNImage, { color: theme.colors.secondaryIconColor, data: svgs_js_1.BACK_ICON, size: 14, theme: theme }), (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { theme: theme, type: "subtext", children: "Back" })] })) : null;
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.headerModal, children: [onBack && ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { onPress: onBack, children: (0, jsx_runtime_1.jsx)(RNImage_js_1.RNImage, { color: theme.colors.secondaryIconColor, data: svgs_js_1.BACK_ICON, size: 24, theme: theme }) })), (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { theme: theme, type: "title", children: title }), onClose && ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { onPress: onClose, children: (0, jsx_runtime_1.jsx)(RNImage_js_1.RNImage, { color: theme.colors.secondaryIconColor, data: svgs_js_1.CLOSE_ICON, size: 24, theme: theme }) }))] }));
}
const styles = react_native_1.StyleSheet.create({
    headerModal: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: index_js_1.spacing.lg,
        paddingTop: index_js_1.spacing.lg,
    },
});
//# sourceMappingURL=Header.js.map