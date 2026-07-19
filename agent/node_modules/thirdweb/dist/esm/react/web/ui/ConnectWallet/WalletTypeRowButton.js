import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { iconSize, spacing } from "../../../core/design-system/index.js";
import { Text } from "../../ui/components/text.js";
import { LastUsedBadge } from "../components/badge.js";
import { Container } from "../components/basic.js";
import { Button } from "../components/buttons.js";
export function WalletTypeRowButton(props) {
    return (_jsxs(Button, { disabled: props.disabled, className: props.className, fullWidth: true, onClick: () => {
            props.onClick();
        }, style: {
            display: "flex",
            justifyContent: "flex-start",
            padding: spacing.sm,
            position: "relative",
        }, variant: "outline", children: [props.lastUsedBadge && _jsx(LastUsedBadge, {}), _jsxs(Container, { center: "y", color: "accentText", flex: "row", gap: "sm", children: [_jsx(props.icon, { size: iconSize.md }), _jsx(Text, { color: "primaryText", children: props.title })] })] }));
}
//# sourceMappingURL=WalletTypeRowButton.js.map