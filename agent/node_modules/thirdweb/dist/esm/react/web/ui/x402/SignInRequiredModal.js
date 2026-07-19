"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CustomThemeProvider } from "../../../core/design-system/CustomThemeProvider.js";
import { spacing } from "../../../core/design-system/index.js";
import { Container, ModalHeader, ScreenBottomContainer, } from "../components/basic.js";
import { Button } from "../components/buttons.js";
import { Modal } from "../components/Modal.js";
import { Text } from "../components/text.js";
/**
 * @internal
 */
export function SignInRequiredModal(props) {
    const { theme, onSignIn, onCancel, title = "Sign in required", description = "Account required to complete payment, please sign in to continue.", buttonLabel = "Sign in", } = props;
    return (_jsx(CustomThemeProvider, { theme: theme, children: _jsxs(Modal, { className: "tw-signin-required-modal", hideCloseIcon: true, open: true, setOpen: (open) => {
                if (!open) {
                    onCancel();
                }
            }, size: "compact", title: title, children: [_jsxs(Container, { p: "lg", children: [_jsx(ModalHeader, { title: title }), _jsx(Container, { flex: "column", gap: "lg", style: {
                                paddingTop: spacing.lg,
                            }, children: _jsx(Text, { size: "sm", style: {
                                    color: "inherit",
                                    lineHeight: 1.5,
                                }, children: description }) })] }), _jsxs(ScreenBottomContainer, { children: [_jsx(Button, { fullWidth: true, gap: "xs", onClick: onSignIn, variant: "accent", children: buttonLabel }), _jsx(Button, { fullWidth: true, gap: "xs", onClick: onCancel, variant: "secondary", children: "Cancel" })] })] }) }));
}
//# sourceMappingURL=SignInRequiredModal.js.map