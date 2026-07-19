"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { fontSize, iconSize, spacing, } from "../../../core/design-system/index.js";
import { AccentFailIcon } from "../../ui/ConnectWallet/icons/AccentFailIcon.js";
import { Container, ModalHeader, ScreenBottomContainer, } from "../../ui/components/basic.js";
import { Button } from "../../ui/components/buttons.js";
import { QRCode } from "../../ui/components/QRCode.js";
import { Spacer } from "../../ui/components/Spacer.js";
import { Text } from "../../ui/components/text.js";
import { WalletImage } from "../../ui/components/WalletImage.js";
/**
 * @internal
 */
export const ScanScreen = (props) => {
    const { connectModalSize, client } = props;
    const [linkCopied, setLinkCopied] = useState(false);
    return (_jsxs(Container, { animate: "fadein", flex: "column", fullHeight: true, className: "tw-qr-scan-screen", children: [_jsx(Container, { p: "lg", children: _jsx(ModalHeader, { onBack: props.onBack, title: props.walletName }) }), _jsx(Spacer, { y: "sm" }), _jsxs(Container, { center: "both", expand: true, flex: "column", px: "lg", children: [!props.error && (_jsxs("div", { style: {
                            textAlign: "center",
                        }, children: [_jsx(QRCode, { QRIcon: _jsx(WalletImage, { client: client, id: props.walletId, size: iconSize.xxl }), qrCodeUri: props.qrCodeUri }), _jsx(Spacer, { y: "xs" }), _jsxs(Button, { className: "tw-copy-link-button", disabled: props.qrCodeUri === undefined, onClick: () => {
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
                                }, variant: "link", children: [linkCopied ? (_jsx(CheckIcon, { height: 14, width: 14 })) : (_jsx(CopyIcon, { height: 14, width: 14 })), _jsx("span", { style: { padding: "0 4px" }, children: "Copy Link" })] }), _jsx(Spacer, { y: "lg" }), _jsx(Text, { balance: true, center: true, multiline: true, className: "tw-screen-description", style: {
                                    paddingInline: spacing.lg,
                                }, children: props.qrScanInstruction })] })), props.error && (_jsxs(Container, { animate: "fadein", style: {
                            width: "100%",
                        }, children: [_jsx(Spacer, { y: "xxl" }), _jsx(Container, { center: "x", flex: "row", children: _jsx(AccentFailIcon, { size: iconSize["3xl"] }) }), _jsx(Spacer, { y: "lg" }), _jsx(Text, { center: true, color: "primaryText", size: "lg", className: "tw-screen-title", "data-status": "failed", children: "Connection Failed" }), _jsx(Spacer, { y: "3xl" }), _jsx(Button, { fullWidth: true, onClick: props.onRetry, variant: "accent", className: "tw-retry-button", children: "Try again" })] }))] }), _jsx(Spacer, { y: "lg" }), props.onGetStarted && (_jsx(ScreenBottomContainer, { style: {
                    border: connectModalSize === "compact" ? undefined : "none",
                }, children: _jsx(Button, { onClick: props.onGetStarted, className: "tw-get-started-button", style: {
                        fontSize: fontSize.sm,
                        textAlign: "center",
                    }, variant: "link", children: props.getStartedLink }) }))] }));
};
//# sourceMappingURL=ScanScreen.js.map