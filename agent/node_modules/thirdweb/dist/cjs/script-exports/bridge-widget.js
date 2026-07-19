"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = render;
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("react-dom/client");
const thirdweb_provider_js_1 = require("../react/web/providers/thirdweb-provider.js");
const bridge_widget_script_js_1 = require("./bridge-widget-script.js");
// Note: This file is built as a UMD module with globalName "BridgeWidget"
// This will be available as a global function called `BridgeWidget.render`
function render(element, props) {
    (0, client_1.createRoot)(element).render((0, jsx_runtime_1.jsx)(thirdweb_provider_js_1.ThirdwebProvider, { children: (0, jsx_runtime_1.jsx)(bridge_widget_script_js_1.BridgeWidgetScript, { ...props }) }));
}
//# sourceMappingURL=bridge-widget.js.map