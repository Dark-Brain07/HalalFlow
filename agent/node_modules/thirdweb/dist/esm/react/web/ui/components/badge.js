import { jsx as _jsx } from "react/jsx-runtime";
import { radius, spacing } from "../../../core/design-system/index.js";
import { Container } from "./basic.js";
import { Text } from "./text.js";
function Badge(props) {
    return (_jsx(Container, { bg: "modalBg", color: "secondaryText", borderColor: "borderColor", flex: "row", center: "y", style: {
            borderRadius: radius.full,
            padding: `${spacing["3xs"]} ${spacing.xs}`,
            borderWidth: "1px",
            borderStyle: "solid",
        }, children: _jsx(Text, { style: {
                fontSize: 10,
                whiteSpace: "nowrap",
            }, children: props.text }) }));
}
export function LastUsedBadge() {
    return (_jsx("div", { style: {
            position: "absolute",
            top: -10,
            right: -10,
            zIndex: 1,
            pointerEvents: "none",
            cursor: "default",
        }, children: _jsx(Badge, { text: "Last used" }) }));
}
export const LAST_USED_BADGE_VERTICAL_RESERVED_SPACE = 12;
//# sourceMappingURL=badge.js.map