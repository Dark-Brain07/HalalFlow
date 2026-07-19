import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { iconSize } from "../../../../react/core/design-system/index.js";
import { AccentFailIcon } from "../../ui/ConnectWallet/icons/AccentFailIcon.js";
import { Container } from "../../ui/components/basic.js";
import { Button } from "../../ui/components/buttons.js";
import { Spacer } from "../../ui/components/Spacer.js";
import { Text } from "../../ui/components/text.js";
export function ErrorState(props) {
    return (_jsxs(Container, { animate: "fadein", children: [_jsx(Spacer, { y: "xxl" }), _jsx(Container, { center: "x", flex: "row", children: _jsx(AccentFailIcon, { size: iconSize["3xl"] }) }), _jsx(Spacer, { y: "lg" }), _jsx(Text, { center: true, color: "primaryText", size: "md", children: props.title }), _jsx(Spacer, { y: "xl" }), _jsx(Spacer, { y: "xxl" }), _jsx(Button, { fullWidth: true, onClick: props.onTryAgain, variant: "accent", children: "Try Again" })] }));
}
//# sourceMappingURL=ErrorState.js.map