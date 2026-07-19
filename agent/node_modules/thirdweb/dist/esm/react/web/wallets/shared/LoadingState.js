import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container } from "../../ui/components/basic.js";
import { Spacer } from "../../ui/components/Spacer.js";
import { Spinner } from "../../ui/components/Spinner.js";
import { Text } from "../../ui/components/text.js";
export function LoadingState(props) {
    return (_jsxs(Container, { animate: "fadein", children: [_jsx(Spacer, { y: "xxl" }), _jsxs(Container, { center: "x", flex: "row", style: {
                    position: "relative",
                }, children: [_jsx(Spinner, { color: "accentText", size: "4xl" }), _jsx(Container, { color: "accentText", style: {
                            left: "50%",
                            position: "absolute",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                        }, children: props.icon })] }), _jsx(Spacer, { y: "xl" }), _jsx(Text, { center: true, color: "primaryText", size: "lg", children: props.title }), _jsx(Spacer, { y: "md" }), _jsx(Text, { center: true, multiline: true, children: props.subtitle }), _jsx(Spacer, { y: "xxl" }), _jsx(Spacer, { y: "xxl" })] }));
}
//# sourceMappingURL=LoadingState.js.map