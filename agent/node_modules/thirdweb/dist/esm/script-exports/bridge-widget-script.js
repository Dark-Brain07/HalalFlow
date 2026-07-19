import { jsx as _jsx } from "react/jsx-runtime";
import { createThirdwebClient } from "../client/client.js";
import { darkTheme, lightTheme, } from "../react/core/design-system/index.js";
import { BridgeWidget } from "../react/web/ui/Bridge/bridge-widget/bridge-widget.js";
export function BridgeWidgetScript(props) {
    const client = createThirdwebClient({ clientId: props.clientId });
    const themeObj = typeof props.theme === "object"
        ? props.theme.type === "dark"
            ? darkTheme(props.theme)
            : lightTheme(props.theme)
        : props.theme;
    return _jsx(BridgeWidget, { ...props, theme: themeObj, client: client });
}
//# sourceMappingURL=bridge-widget-script.js.map