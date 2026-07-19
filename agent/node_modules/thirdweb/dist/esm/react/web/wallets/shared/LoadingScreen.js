import { jsx as _jsx } from "react/jsx-runtime";
import { Container } from "../../ui/components/basic.js";
import { Spinner } from "../../ui/components/Spinner.js";
/**
 * @internal
 */
export function LoadingScreen(props) {
    return (_jsx(Container, { center: "both", flex: "row", fullHeight: true, style: {
            minHeight: props.height || "350px",
        }, children: _jsx(Spinner, { color: "secondaryText", size: "xl" }) }));
}
//# sourceMappingURL=LoadingScreen.js.map