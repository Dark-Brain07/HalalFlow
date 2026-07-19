"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tabs;
const jsx_runtime_1 = require("react/jsx-runtime");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const text_js_1 = require("../components/text.js");
const basic_js_1 = require("./basic.js");
const buttons_js_1 = require("./buttons.js");
const Spacer_js_1 = require("./Spacer.js");
function Tabs({ selected, onSelect, options, children, }) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { bg: "secondaryButtonBg", center: "y", flex: "row", p: "xxs", style: { borderRadius: index_js_1.radius.lg, width: "100%" }, children: options.map((option) => ((0, jsx_runtime_1.jsx)(buttons_js_1.Button, { onClick: () => onSelect(option.value), style: {
                        alignItems: "center",
                        backgroundColor: option.value === selected
                            ? theme.colors.modalBg
                            : "transparent",
                        borderRadius: index_js_1.radius.md,
                        display: "flex",
                        flex: 1,
                        justifyContent: "center",
                        paddingBlock: index_js_1.spacing.sm,
                        position: "relative",
                    }, type: "button", variant: "accent", children: (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: option.value === selected ? "primaryText" : "secondaryText", size: "sm", style: { textAlign: "center" }, children: option.label }) }, option.value))) }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "sm" }), children] }));
}
//# sourceMappingURL=Tabs.js.map