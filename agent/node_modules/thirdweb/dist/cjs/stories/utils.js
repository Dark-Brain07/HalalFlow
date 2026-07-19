"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalThemeWrapper = exports.storyClient = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const client_js_1 = require("../client/client.js");
const CustomThemeProvider_js_1 = require("../react/core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../react/native/design-system/index.js");
const clientId = process.env.STORYBOOK_CLIENT_ID;
if (!clientId) {
    throw new Error("STORYBOOK_CLIENT_ID env is not configured");
}
exports.storyClient = (0, client_js_1.createThirdwebClient)({
    clientId: clientId,
});
const ModalThemeWrapper = (props) => {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "40px",
        }, children: [(0, jsx_runtime_1.jsx)(CustomThemeProvider_js_1.CustomThemeProvider, { theme: "dark", children: (0, jsx_runtime_1.jsx)(ModalWrapper, { children: props.children }) }), (0, jsx_runtime_1.jsx)(CustomThemeProvider_js_1.CustomThemeProvider, { theme: "light", children: (0, jsx_runtime_1.jsx)(ModalWrapper, { children: props.children }) })] }));
};
exports.ModalThemeWrapper = ModalThemeWrapper;
const ModalWrapper = (props) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            backgroundColor: theme.colors.modalBg,
            borderRadius: index_js_1.radius.md,
            boxShadow: `0 0 0 1px ${theme.colors.borderColor}`,
            margin: "16px auto",
            width: 400,
        }, children: props.children }));
};
//# sourceMappingURL=utils.js.map