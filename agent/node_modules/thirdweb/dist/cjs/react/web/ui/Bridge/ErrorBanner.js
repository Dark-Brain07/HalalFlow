"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorBanner = ErrorBanner;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const react_1 = require("react");
const pay_js_1 = require("../../../../analytics/track/pay.js");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const useBridgeError_js_1 = require("../../../core/hooks/useBridgeError.js");
const basic_js_1 = require("../components/basic.js");
const buttons_js_1 = require("../components/buttons.js");
const text_js_1 = require("../components/text.js");
function ErrorBanner({ error, onRetry, onCancel, client, }) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    const { userMessage } = (0, useBridgeError_js_1.useBridgeError)({ error });
    const hasFiredErrorEvent = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        if (hasFiredErrorEvent.current)
            return;
        hasFiredErrorEvent.current = true;
        (0, pay_js_1.trackPayEvent)({
            client,
            error: error.message,
            event: "ub:ui:error",
        });
    }, [client, error.message]);
    return ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", fullHeight: true, gap: "md", p: "md", children: (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "md", style: { alignItems: "flex-start" }, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "both", style: {
                        backgroundColor: theme.colors.tertiaryBg,
                        borderRadius: "50%",
                        flexShrink: 0,
                        height: "24px",
                        width: "24px",
                    }, children: (0, jsx_runtime_1.jsx)(react_icons_1.CrossCircledIcon, { color: theme.colors.danger, height: index_js_1.iconSize.md, width: index_js_1.iconSize.md }) }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", fullHeight: true, gap: "sm", style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "lg", children: "Error" }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", gap: "sm", style: {
                                minHeight: "100px",
                            }, children: (0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", gap: "sm", style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", children: userMessage }) }) }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "sm", style: { justifyContent: "flex-end" }, children: [(0, jsx_runtime_1.jsx)(buttons_js_1.Button, { onClick: onRetry, variant: "primary", children: "Try Again" }), onCancel && ((0, jsx_runtime_1.jsx)(buttons_js_1.Button, { onClick: onCancel, variant: "secondary", children: "Cancel" }))] })] })] }) }));
}
//# sourceMappingURL=ErrorBanner.js.map