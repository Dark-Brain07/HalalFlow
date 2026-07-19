"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const index_js_1 = require("../../design-system/index.js");
const RNImage_js_1 = require("../components/RNImage.js");
const text_js_1 = require("../components/text.js");
const svgs_js_1 = require("../icons/svgs.js");
const ErrorView = (props) => {
    const { theme, title } = props;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.container, children: [(0, jsx_runtime_1.jsx)(RNImage_js_1.RNImage, { color: theme.colors.danger, data: svgs_js_1.CLOSE_CIRCLE, size: 64, theme: theme }), (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { style: { color: theme.colors.danger, textAlign: "center" }, theme: theme, type: "defaultSemiBold", children: title })] }));
};
exports.ErrorView = ErrorView;
const styles = react_native_1.StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "column",
        gap: index_js_1.spacing.lg,
        justifyContent: "center",
        paddingHorizontal: index_js_1.spacing.lg,
        paddingVertical: index_js_1.spacing.xxl,
    },
});
//# sourceMappingURL=ErrorView.js.map