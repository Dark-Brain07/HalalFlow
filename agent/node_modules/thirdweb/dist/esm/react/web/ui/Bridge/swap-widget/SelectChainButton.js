import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { fontSize, iconSize, radius, spacing, } from "../../../../core/design-system/index.js";
import { Button } from "../../components/buttons.js";
import { Img } from "../../components/Img.js";
import { cleanedChainName } from "./utils.js";
export function SelectChainButton(props) {
    return (_jsxs(Button, { variant: "outline", bg: "tertiaryBg", fullWidth: true, style: {
            justifyContent: "flex-start",
            fontWeight: 500,
            fontSize: fontSize.md,
            padding: `${spacing.sm} ${spacing.sm}`,
            borderRadius: radius.lg,
            minHeight: "48px",
        }, gap: "sm", onClick: props.onClick, children: [_jsx(Img, { src: props.selectedChain.icon, client: props.client, width: iconSize.lg, height: iconSize.lg }), _jsxs("span", { children: [" ", cleanedChainName(props.selectedChain.name), " "] }), _jsx(ChevronDownIcon, { width: iconSize.sm, height: iconSize.sm, style: { marginLeft: "auto" } })] }));
}
//# sourceMappingURL=SelectChainButton.js.map