import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCustomTheme } from "../../../core/design-system/CustomThemeProvider.js";
import { radius, spacing } from "../../../core/design-system/index.js";
import { Text } from "../components/text.js";
import { Container } from "./basic.js";
import { Button } from "./buttons.js";
import { Spacer } from "./Spacer.js";
export default function Tabs({ selected, onSelect, options, children, }) {
    const theme = useCustomTheme();
    return (_jsxs("div", { children: [_jsx(Container, { bg: "secondaryButtonBg", center: "y", flex: "row", p: "xxs", style: { borderRadius: radius.lg, width: "100%" }, children: options.map((option) => (_jsx(Button, { onClick: () => onSelect(option.value), style: {
                        alignItems: "center",
                        backgroundColor: option.value === selected
                            ? theme.colors.modalBg
                            : "transparent",
                        borderRadius: radius.md,
                        display: "flex",
                        flex: 1,
                        justifyContent: "center",
                        paddingBlock: spacing.sm,
                        position: "relative",
                    }, type: "button", variant: "accent", children: _jsx(Text, { color: option.value === selected ? "primaryText" : "secondaryText", size: "sm", style: { textAlign: "center" }, children: option.label }) }, option.value))) }), _jsx(Spacer, { y: "sm" }), children] }));
}
//# sourceMappingURL=Tabs.js.map