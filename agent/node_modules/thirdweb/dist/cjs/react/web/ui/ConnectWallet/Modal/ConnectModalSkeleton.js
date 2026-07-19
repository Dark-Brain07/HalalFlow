"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectModalWideLayout = ConnectModalWideLayout;
exports.ConnectModalCompactLayout = ConnectModalCompactLayout;
const jsx_runtime_1 = require("react/jsx-runtime");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const basic_js_1 = require("../../components/basic.js");
const elements_js_1 = require("../../design-system/elements.js");
const constants_js_1 = require("../constants.js");
/**
 * @internal
 */
function ConnectModalWideLayout(props) {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            height: "100%",
        }, children: [(0, jsx_runtime_1.jsxs)(LeftContainer, { children: [" ", props.left, " "] }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", relative: true, scrollY: true, children: props.right })] }));
}
/**
 * @internal
 */
function ConnectModalCompactLayout(props) {
    return ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", relative: true, scrollY: true, style: {
            maxHeight: constants_js_1.compactModalMaxHeight,
        }, children: props.children }));
}
const LeftContainer = /* @__PURE__ */ (0, elements_js_1.StyledDiv)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        ...basic_js_1.noScrollBar,
        borderRight: `1px solid ${theme.colors.separatorLine}`,
        position: "relative",
    };
});
//# sourceMappingURL=ConnectModalSkeleton.js.map