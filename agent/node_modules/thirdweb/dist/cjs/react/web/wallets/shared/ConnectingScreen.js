"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectingScreen = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const index_js_1 = require("../../../core/design-system/index.js");
const WalletLogoSpinner_js_1 = require("../../ui/ConnectWallet/screens/WalletLogoSpinner.js");
const basic_js_1 = require("../../ui/components/basic.js");
const buttons_js_1 = require("../../ui/components/buttons.js");
const Spacer_js_1 = require("../../ui/components/Spacer.js");
const text_js_1 = require("../../ui/components/text.js");
/**
 * @internal
 */
const ConnectingScreen = (props) => {
    const { locale } = props;
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", flex: "column", fullHeight: true, className: "tw-connecting-wallet-screen", children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { p: "lg", style: {
                    paddingBottom: 0,
                }, children: (0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: props.onBack, title: props.walletName }) }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", expand: true, flex: "column", px: props.size === "compact" ? "lg" : "xxl", relative: true, style: {
                    paddingTop: 0,
                }, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { py: "3xl", children: (0, jsx_runtime_1.jsx)(WalletLogoSpinner_js_1.WalletLogoSpinner, { client: props.client, error: props.errorConnecting, id: props.walletId }) }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", style: {
                            animationDuration: "200ms",
                        }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "primaryText", size: "lg", weight: 500, className: "tw-screen-title", "data-status": props.errorConnecting ? "failed" : "in-progress", children: props.errorConnecting ? locale.failed : locale.inProgress }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), !props.errorConnecting ? ((0, jsx_runtime_1.jsx)(text_js_1.Text, { balance: true, center: true, multiline: true, className: "tw-screen-description", children: locale.instruction })) : ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { animate: "fadein", center: "x", flex: "row", children: (0, jsx_runtime_1.jsxs)(buttons_js_1.Button, { className: "tw-retry-button", fullWidth: true, onClick: props.onRetry, style: {
                                        alignItems: "center",
                                        gap: index_js_1.spacing.xs,
                                    }, variant: "accent", children: [(0, jsx_runtime_1.jsx)(react_icons_1.ReloadIcon, { height: index_js_1.iconSize.sm, width: index_js_1.iconSize.sm }), locale.tryAgain] }) }))] })] }), props.onGetStarted ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }), (0, jsx_runtime_1.jsx)(basic_js_1.Line, {}), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "x", flex: "row", p: "lg", children: (0, jsx_runtime_1.jsx)(buttons_js_1.Button, { onClick: props.onGetStarted, variant: "link", className: "tw-get-started-button", children: locale.getStartedLink }) })] })) : ((0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: props.size === "compact" ? "lg" : "xxl" }))] }));
};
exports.ConnectingScreen = ConnectingScreen;
//# sourceMappingURL=ConnectingScreen.js.map