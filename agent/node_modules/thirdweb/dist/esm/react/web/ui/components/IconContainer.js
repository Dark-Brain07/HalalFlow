import { jsx as _jsx } from "react/jsx-runtime";
import { useCustomTheme } from "../../../core/design-system/CustomThemeProvider.js";
/**
 * @internal
 */
export const IconContainer = (props) => {
    const theme = useCustomTheme();
    return (_jsx("div", { style: {
            alignItems: "center",
            border: `1px solid ${theme.colors.borderColor}`,
            borderRadius: "100%",
            display: "flex",
            flexShrink: 0,
            justifyItems: "center",
            overflow: "hidden",
            padding: props.padding ?? "6px",
            position: "relative",
            ...props.style,
        }, children: props.children }));
};
//# sourceMappingURL=IconContainer.js.map