import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import { ThirdwebProvider } from "../react/web/providers/thirdweb-provider.js";
import { BridgeWidgetScript, } from "./bridge-widget-script.js";
// Note: This file is built as a UMD module with globalName "BridgeWidget"
// This will be available as a global function called `BridgeWidget.render`
export function render(element, props) {
    createRoot(element).render(_jsx(ThirdwebProvider, { children: _jsx(BridgeWidgetScript, { ...props }) }));
}
//# sourceMappingURL=bridge-widget.js.map