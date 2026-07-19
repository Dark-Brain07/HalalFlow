import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ReloadIcon } from "@radix-ui/react-icons";
import { iconSize, spacing } from "../../../core/design-system/index.js";
import { WalletLogoSpinner } from "../../ui/ConnectWallet/screens/WalletLogoSpinner.js";
import { Container, Line, ModalHeader } from "../../ui/components/basic.js";
import { Button } from "../../ui/components/buttons.js";
import { Spacer } from "../../ui/components/Spacer.js";
import { Text } from "../../ui/components/text.js";
/**
 * @internal
 */
export const ConnectingScreen = (props) => {
    const { locale } = props;
    return (_jsxs(Container, { animate: "fadein", flex: "column", fullHeight: true, className: "tw-connecting-wallet-screen", children: [_jsx(Container, { p: "lg", style: {
                    paddingBottom: 0,
                }, children: _jsx(ModalHeader, { onBack: props.onBack, title: props.walletName }) }), _jsxs(Container, { center: "y", expand: true, flex: "column", px: props.size === "compact" ? "lg" : "xxl", relative: true, style: {
                    paddingTop: 0,
                }, children: [_jsx(Container, { py: "3xl", children: _jsx(WalletLogoSpinner, { client: props.client, error: props.errorConnecting, id: props.walletId }) }), _jsxs(Container, { animate: "fadein", style: {
                            animationDuration: "200ms",
                        }, children: [_jsx(Text, { center: true, color: "primaryText", size: "lg", weight: 500, className: "tw-screen-title", "data-status": props.errorConnecting ? "failed" : "in-progress", children: props.errorConnecting ? locale.failed : locale.inProgress }), _jsx(Spacer, { y: "md" }), !props.errorConnecting ? (_jsx(Text, { balance: true, center: true, multiline: true, className: "tw-screen-description", children: locale.instruction })) : (_jsx(Container, { animate: "fadein", center: "x", flex: "row", children: _jsxs(Button, { className: "tw-retry-button", fullWidth: true, onClick: props.onRetry, style: {
                                        alignItems: "center",
                                        gap: spacing.xs,
                                    }, variant: "accent", children: [_jsx(ReloadIcon, { height: iconSize.sm, width: iconSize.sm }), locale.tryAgain] }) }))] })] }), props.onGetStarted ? (_jsxs(_Fragment, { children: [_jsx(Spacer, { y: "xl" }), _jsx(Line, {}), _jsx(Container, { center: "x", flex: "row", p: "lg", children: _jsx(Button, { onClick: props.onGetStarted, variant: "link", className: "tw-get-started-button", children: locale.getStartedLink }) })] })) : (_jsx(Spacer, { y: props.size === "compact" ? "lg" : "xxl" }))] }));
};
//# sourceMappingURL=ConnectingScreen.js.map