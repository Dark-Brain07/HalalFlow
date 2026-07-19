import { jsx as _jsx } from "react/jsx-runtime";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useCustomTheme } from "../../../../../../core/design-system/CustomThemeProvider.js";
import { iconSize, radius, } from "../../../../../../core/design-system/index.js";
import { Container } from "../../../../components/basic.js";
export function StepConnectorArrow() {
    const theme = useCustomTheme();
    return (_jsx(Container, { center: "both", flex: "row", style: {
            marginBottom: "-12px",
            marginTop: "-12px",
            position: "relative",
            width: "100%",
            zIndex: 1000,
        }, children: _jsx(Container, { center: "both", color: "secondaryText", flex: "row", style: {
                backgroundColor: theme.colors.modalBg,
                border: `1px solid ${theme.colors.borderColor}`,
                borderRadius: radius.full,
                padding: "6px",
            }, children: _jsx(ChevronDownIcon, { height: iconSize["sm+"], width: iconSize["sm+"] }) }) }));
}
//# sourceMappingURL=StepConnector.js.map