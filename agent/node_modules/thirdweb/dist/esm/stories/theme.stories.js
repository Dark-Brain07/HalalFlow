import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { darkThemeObj, lightThemeObj, } from "../react/core/design-system/index.js";
import { StyledDiv } from "../react/web/ui/design-system/elements.js";
const meta = {
    title: "theme",
};
export default meta;
export function Dark() {
    return _jsx(Variant, { theme: darkThemeObj });
}
export function Light() {
    return _jsx(Variant, { theme: lightThemeObj });
}
function Variant(props) {
    return (_jsxs("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "700px",
            margin: "0 auto",
            backgroundColor: props.theme.colors.modalBg,
            padding: "14px",
            lineHeight: "1.5",
            borderRadius: "8px",
        }, children: [_jsx(ColorPairTest, { theme: props.theme, text: "primaryText" }), _jsx(ColorPairTest, { theme: props.theme, text: "secondaryText" }), _jsx(ColorPairTest, { theme: props.theme, text: "accentText" }), _jsx(ColorPairTest, { theme: props.theme, text: "danger" }), _jsx(ColorPairTest, { theme: props.theme, text: "success" }), _jsx(ColorPairTest, { theme: props.theme, bg: "tooltipBg", text: "tooltipText" }), _jsx(ColorPairTest, { theme: props.theme, bg: "accentButtonBg", text: "accentButtonText" }), _jsx(ColorPairTest, { theme: props.theme, bg: "primaryButtonBg", text: "primaryButtonText" }), _jsx(ColorPairTest, { theme: props.theme, bg: "selectedTextBg", text: "selectedTextColor" }), _jsx(ColorPairTest, { theme: props.theme, bg: "skeletonBg", text: "primaryText" }), _jsx(ColorPairTest, { theme: props.theme, bg: "scrollbarBg", text: "primaryText" }), _jsx(ColorPairTest, { theme: props.theme, bg: "inputAutofillBg", text: "primaryText" }), _jsx(ColorPairTest, { theme: props.theme, bg: "tertiaryBg", hoverBg: "secondaryButtonHoverBg", text: "primaryText" }), _jsx(ColorPairTest, { theme: props.theme, bg: "secondaryButtonBg", hoverBg: "secondaryButtonHoverBg", text: "secondaryButtonText" }), _jsx(ColorPairTest, { theme: props.theme, hoverBg: "secondaryIconHoverBg", text: "secondaryIconColor", hoverText: "secondaryIconHoverColor" }), _jsx(ColorPairTest, { theme: props.theme, bg: "connectedButtonBg", text: "primaryText", hoverBg: "connectedButtonBgHover" }), _jsx("div", { style: {
                    border: `1px solid ${props.theme.colors.borderColor}`,
                    padding: "20px",
                    borderRadius: "8px",
                    color: props.theme.colors.primaryText,
                }, children: "border" }), _jsx("div", { style: {
                    border: `1px solid ${props.theme.colors.separatorLine}`,
                    padding: "20px",
                    borderRadius: "8px",
                    color: props.theme.colors.primaryText,
                }, children: "separatorLine" })] }));
}
function ColorPairTest(props) {
    return (_jsx(HoverBg, { style: { display: "flex", flexDirection: "column", gap: "10px" }, bg: props.bg ? props.theme.colors[props.bg] : undefined, hoverBg: props.hoverBg ? props.theme.colors[props.hoverBg] : undefined, text: props.theme.colors[props.text], children: [props.bg, props.hoverBg, props.text].filter(Boolean).join(", ") }));
}
const HoverBg = StyledDiv((props) => {
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