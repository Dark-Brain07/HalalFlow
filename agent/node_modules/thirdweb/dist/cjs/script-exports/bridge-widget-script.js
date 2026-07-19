"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgeWidgetScript = BridgeWidgetScript;
const jsx_runtime_1 = require("react/jsx-runtime");
const client_js_1 = require("../client/client.js");
const index_js_1 = require("../react/core/design-system/index.js");
const bridge_widget_js_1 = require("../react/web/ui/Bridge/bridge-widget/bridge-widget.js");
function BridgeWidgetScript(props) {
    const client = (0, client_js_1.createThirdwebClient)({ clientId: props.clientId });
    const themeObj = typeof props.theme === "object"
        ? props.theme.type === "dark"
            ? (0, index_js_1.darkTheme)(props.theme)
            : (0, index_js_1.lightTheme)(props.theme)
        : props.theme;
    return (0, jsx_runtime_1.jsx)(bridge_widget_js_1.BridgeWidget, { ...props, theme: themeObj, client: client });
}
//# sourceMappingURL=bridge-widget-script.js.map