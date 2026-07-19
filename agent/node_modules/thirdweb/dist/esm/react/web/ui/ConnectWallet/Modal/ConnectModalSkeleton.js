"use client";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useCustomTheme } from "../../../../core/design-system/CustomThemeProvider.js";
import { Container, noScrollBar } from "../../components/basic.js";
import { StyledDiv } from "../../design-system/elements.js";
import { compactModalMaxHeight } from "../constants.js";
/**
 * @internal
 */
export function ConnectModalWideLayout(props) {
    return (_jsxs("div", { style: {
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            height: "100%",
        }, children: [_jsxs(LeftContainer, { children: [" ", props.left, " "] }), _jsx(Container, { flex: "column", relative: true, scrollY: true, children: props.right })] }));
}
/**
 * @internal
 */
export function ConnectModalCompactLayout(props) {
    return (_jsx(Container, { flex: "column", relative: true, scrollY: true, style: {
            maxHeight: compactModalMaxHeight,
        }, children: props.children }));
}
const LeftContainer = /* @__PURE__ */ StyledDiv((_) => {
    const theme = useCustomTheme();
    return {
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        ...noScrollBar,
        borderRight: `1px solid ${theme.colors.separatorLine}`,
        position: "relative",
    };
});
//# sourceMappingURL=ConnectModalSkeleton.js.map