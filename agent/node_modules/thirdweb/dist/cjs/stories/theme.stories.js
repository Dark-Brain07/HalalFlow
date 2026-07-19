"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dark = Dark;
exports.Light = Light;
const jsx_runtime_1 = require("react/jsx-runtime");
const index_js_1 = require("../react/core/design-system/index.js");
const elements_js_1 = require("../react/web/ui/design-system/elements.js");
const meta = {
    title: "theme",
};
exports.default = meta;
function Dark() {
    return (0, jsx_runtime_1.jsx)(Variant, { theme: index_js_1.darkThemeObj });
}
function Light() {
    return (0, jsx_runtime_1.jsx)(Variant, { theme: index_js_1.lightThemeObj });
}
function Variant(props) {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "700px",
            margin: "0 auto",
            backgroundColor: props.theme.colors.modalBg,
            padding: "14px",
            lineHeight: "1.5",
            borderRadius: "8px",
        }, children: [(0, jsx_runtime_1.jsx)(ColorPairTest, { theme: props.theme, text: "primaryText" }), (0, jsx_runtime_1.jsx)(ColorPairTest, { theme: props.theme, text: "secondaryText" }), (0, jsx_runtime_1.jsx)(ColorPairTest, { theme: props.theme, text: "accentText" }), (0, jsx_runtime_1.jsx)(ColorPairTest, { theme: props.theme, text: "danger" }), (0, jsx_runtime_1.jsx)(ColorPairTest, { theme: props.theme, text: "success" }), (0, jsx_runtime_1.jsx)(ColorPairTest, { theme: props.theme, bg: "tooltipBg", text: "tooltipText" }), (0, jsx_runtime_1.jsx)(ColorPairTest, { theme: props.theme, bg: "accentButtonBg", text: "accentButtonText" }), (0, jsx_runtime_1.jsx)(ColorPairTest, { theme: props.theme, bg: "primaryButtonBg", text: "primaryButtonText" }), (0, jsx_runtime_1.jsx)(ColorPairTest, { theme: props.theme, bg: "selectedTextBg", text: "selectedTextColor" }), (0, jsx_runtime_1.jsx)(ColorPairTest, { theme: props.theme, bg: "skeletonBg", text: "primaryText" }), (0, jsx_runtime_1.jsx)(ColorPairTest, { theme: props.theme, bg: "scrollbarBg", text: "primaryText" }), (0, jsx_runtime_1.jsx)(ColorPairTest, { theme: props.theme, bg: "inputAutofillBg", text: "primaryText" }), (0, jsx_runtime_1.jsx)(ColorPairTest, { theme: props.theme, bg: "tertiaryBg", hoverBg: "secondaryButtonHoverBg", text: "primaryText" }), (0, jsx_runtime_1.jsx)(ColorPairTest, { theme: props.theme, bg: "secondaryButtonBg", hoverBg: "secondaryButtonHoverBg", text: "secondaryButtonText" }), (0, jsx_runtime_1.jsx)(ColorPairTest, { theme: props.theme, hoverBg: "secondaryIconHoverBg", text: "secondaryIconColor", hoverText: "secondaryIconHoverColor" }), (0, jsx_runtime_1.jsx)(ColorPairTest, { theme: props.theme, bg: "connectedButtonBg", text: "primaryText", hoverBg: "connectedButtonBgHover" }), (0, jsx_runtime_1.jsx)("div", { style: {
                    border: `1px solid ${props.theme.colors.borderColor}`,
                    padding: "20px",
                    borderRadius: "8px",
                    color: props.theme.colors.primaryText,
                }, children: "border" }), (0, jsx_runtime_1.jsx)("div", { style: {
                    border: `1px solid ${props.theme.colors.separatorLine}`,
                    padding: "20px",
                    borderRadius: "8px",
                    color: props.theme.colors.primaryText,
                }, children: "separatorLine" })] }));
}
function ColorPairTest(props) {
    return ((0, jsx_runtime_1.jsx)(HoverBg, { style: { display: "flex", flexDirection: "column", gap: "10px" }, bg: props.bg ? props.theme.colors[props.bg] : undefined, hoverBg: props.hoverBg ? props.theme.colors[props.hoverBg] : undefined, text: props.theme.colors[props.text], children: [props.bg, props.hoverBg, props.text].filter(Boolean).join(", ") }));
}
const HoverBg = (0, elements_js_1.StyledDiv)((props) => {
    return {
        backgroundColor: props.bg ?? "transparent",
        padding: "20px",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: 400,
        color: props.text,
        "&:hover": props.hoverBg
            ? {
                backgroundColor: props.hoverBg,
            }
            : undefined,
    };
});
//# sourceMappingURL=theme.stories.js.map