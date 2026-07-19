"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScanScreen = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const react_1 = require("react");
const index_js_1 = require("../../../core/design-system/index.js");
const AccentFailIcon_js_1 = require("../../ui/ConnectWallet/icons/AccentFailIcon.js");
const basic_js_1 = require("../../ui/components/basic.js");
const buttons_js_1 = require("../../ui/components/buttons.js");
const QRCode_js_1 = require("../../ui/components/QRCode.js");
const Spacer_js_1 = require("../../ui/components/Spacer.js");
const text_js_1 = require("../../ui/components/text.js");
const WalletImage_js_1 = require("../../ui/components/WalletImage.js");
/**
 * @internal
 */
const ScanScreen = (props) => {
    const { connectModalSize, client } = props;
    const [linkCopied, setLinkCopied] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", flex: "column", fullHeight: true, className: "tw-qr-scan-screen", children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { p: "lg", children: (0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: props.onBack, title: props.walletName }) }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "sm" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "both", expand: true, flex: "column", px: "lg", children: [!props.error && ((0, jsx_runtime_1.jsxs)("div", { style: {
                            textAlign: "center",
                        }, children: [(0, jsx_runtime_1.jsx)(QRCode_js_1.QRCode, { QRIcon: (0, jsx_runtime_1.jsx)(WalletImage_js_1.WalletImage, { client: client, id: props.walletId, size: index_js_1.iconSize.xxl }), qrCodeUri: props.qrCodeUri }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xs" }), (0, jsx_runtime_1.jsxs)(buttons_js_1.Button, { className: "tw-copy-link-button", disabled: props.qrCodeUri === undefined, onClick: () => {
                                    navigator.clipboard
                                        .writeText(props.qrCodeUri) // should always be string since the button is disabled otherwise
                                        .then(() => {
                                        setLinkCopied(true);
                                        setTimeout(() => setLinkCopied(false), 3000); // reset the check icon after 3 seconds
                                    })
                                        .catch((err) => {
                                        console.error("Failed to copy link to clipboard", err);
                                    });
                                }, style: {
                                    cursor: props.qrCodeUri === undefined ? "default" : "pointer",
                                    fontSize: "12px",
                                    opacity: props.qrCodeUri === undefined ? 0.5 : 1,
                                }, variant: "link", children: [linkCopied ? ((0, jsx_runtime_1.jsx)(react_icons_1.CheckIcon, { height: 14, width: 14 })) : ((0, jsx_runtime_1.jsx)(react_icons_1.CopyIcon, { height: 14, width: 14 })), (0, jsx_runtime_1.jsx)("span", { style: { padding: "0 4px" }, children: "Copy Link" })] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { balance: true, center: true, multiline: true, className: "tw-screen-description", style: {
                                    paddingInline: index_js_1.spacing.lg,
                                }, children: props.qrScanInstruction })] })), props.error && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", style: {
                            width: "100%",
                        }, children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xxl" }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "x", flex: "row", children: (0, jsx_runtime_1.jsx)(AccentFailIcon_js_1.AccentFailIcon, { size: index_js_1.iconSize["3xl"] }) }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "primaryText", size: "lg", className: "tw-screen-title", "data-status": "failed", children: "Connection Failed" }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "3xl" }), (0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, onClick: props.onRetry, variant: "accent", className: "tw-retry-button", children: "Try again" })] }))] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), props.onGetStarted && ((0, jsx_runtime_1.jsx)(basic_js_1.ScreenBottomContainer, { style: {
                    border: connectModalSize === "compact" ? undefined : "none",
                }, children: (0, jsx_runtime_1.jsx)(buttons_js_1.Button, { onClick: props.onGetStarted, className: "tw-get-started-button", style: {
                        fontSize: index_js_1.fontSize.sm,
                        textAlign: "center",
                    }, variant: "link", children: props.getStartedLink }) }))] }));
};
exports.ScanScreen = ScanScreen;
//# sourceMappingURL=ScanScreen.js.map