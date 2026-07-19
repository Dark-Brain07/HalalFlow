"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInRequiredModal = SignInRequiredModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const basic_js_1 = require("../components/basic.js");
const buttons_js_1 = require("../components/buttons.js");
const Modal_js_1 = require("../components/Modal.js");
const text_js_1 = require("../components/text.js");
/**
 * @internal
 */
function SignInRequiredModal(props) {
    const { theme, onSignIn, onCancel, title = "Sign in required", description = "Account required to complete payment, please sign in to continue.", buttonLabel = "Sign in", } = props;
    return ((0, jsx_runtime_1.jsx)(CustomThemeProvider_js_1.CustomThemeProvider, { theme: theme, children: (0, jsx_runtime_1.jsxs)(Modal_js_1.Modal, { className: "tw-signin-required-modal", hideCloseIcon: true, open: true, setOpen: (open) => {
                if (!open) {
                    onCancel();
                }
            }, size: "compact", title: title, children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { p: "lg", children: [(0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { title: title }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", gap: "lg", style: {
                                paddingTop: index_js_1.spacing.lg,
                            }, children: (0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "sm", style: {
                                    color: "inherit",
                                    lineHeight: 1.5,
                                }, children: description }) })] }), (0, jsx_runtime_1.jsxs)(basic_js_1.ScreenBottomContainer, { children: [(0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, gap: "xs", onClick: onSignIn, variant: "accent", children: buttonLabel }), (0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, gap: "xs", onClick: onCancel, variant: "secondary", children: "Cancel" })] })] }) }));
}
//# sourceMappingURL=SignInRequiredModal.js.map