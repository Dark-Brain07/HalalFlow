"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepConnectorArrow = StepConnectorArrow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const CustomThemeProvider_js_1 = require("../../../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../../../core/design-system/index.js");
const basic_js_1 = require("../../../../components/basic.js");
function StepConnectorArrow() {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "both", flex: "row", style: {
            marginBottom: "-12px",
            marginTop: "-12px",
            position: "relative",
            width: "100%",
            zIndex: 1000,
        }, children: (0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "both", color: "secondaryText", flex: "row", style: {
                backgroundColor: theme.colors.modalBg,
                border: `1px solid ${theme.colors.borderColor}`,
                borderRadius: index_js_1.radius.full,
                padding: "6px",
            }, children: (0, jsx_runtime_1.jsx)(react_icons_1.ChevronDownIcon, { height: index_js_1.iconSize["sm+"], width: index_js_1.iconSize["sm+"] }) }) }));
}
//# sourceMappingURL=StepConnector.js.map