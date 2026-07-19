import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createThirdwebClient } from "../client/client.js";
import { CustomThemeProvider, useCustomTheme, } from "../react/core/design-system/CustomThemeProvider.js";
import { radius } from "../react/native/design-system/index.js";
const clientId = process.env.STORYBOOK_CLIENT_ID;
if (!clientId) {
    throw new Error("STORYBOOK_CLIENT_ID env is not configured");
}
export const storyClient = createThirdwebClient({
    clientId: clientId,
});
export const ModalThemeWrapper = (props) => {
    return (_jsxs("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "40px",
        }, children: [_jsx(CustomThemeProvider, { theme: "dark", children: _jsx(ModalWrapper, { children: props.children }) }), _jsx(CustomThemeProvider, { theme: "light", children: _jsx(ModalWrapper, { children: props.children }) })] }));
};
const ModalWrapper = (props) => {
    const theme = useCustomTheme();
    return (_jsx("div", { style: {
            backgroundColor: theme.colors.modalBg,
            borderRadius: radius.md,
            boxShadow: `0 0 0 1px ${theme.colors.borderColor}`,
            margin: "16px auto",
            width: 400,
        }, children: props.children }));
};
//# sourceMappingURL=utils.js.map