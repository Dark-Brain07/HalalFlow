"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { iconSize } from "../../../core/design-system/index.js";
import { useScreenContext } from "../../ui/ConnectWallet/Modal/screen.js";
import { TOS } from "../../ui/ConnectWallet/Modal/TOS.js";
import { PoweredByThirdweb } from "../../ui/ConnectWallet/PoweredByTW.js";
import { Container, ModalHeader } from "../../ui/components/basic.js";
import { Img } from "../../ui/components/Img.js";
import { ModalTitle } from "../../ui/components/modalElements.js";
import { Spacer } from "../../ui/components/Spacer.js";
import { ConnectWalletSocialOptions } from "../shared/ConnectWalletSocialOptions.js";
/**
 * @internal
 */
export function InAppWalletFormUIScreen(props) {
    const isCompact = props.size === "compact";
    const { initialScreen, screen } = useScreenContext();
    // This is only used when requireApproval is true to accept the TOS
    const [isApproved, setIsApproved] = useState(false);
    const isInitialScreen = screen === props.wallet && initialScreen === props.wallet;
    const onBack = isInitialScreen && !props.isLinking ? undefined : props.goBack;
    return (_jsxs(Container, { animate: "fadein", flex: "column", fullHeight: true, p: "lg", style: {
            minHeight: "250px",
        }, children: [isCompact &&
                (isInitialScreen ? (_jsxs(_Fragment, { children: [_jsx(ModalHeader, { leftAligned: !props.isLinking, onBack: onBack, title: _jsxs(_Fragment, { children: [!props.meta?.titleIconUrl ? null : (_jsx(Img, { client: props.client, height: iconSize.md, src: props.meta?.titleIconUrl, width: iconSize.md })), _jsx(ModalTitle, { children: props.meta?.title ??
                                            props.inAppWalletLocale.emailLoginScreen.title })] }) }), _jsx(Spacer, { y: "lg" })] })) : (_jsx(ModalHeader, { onBack: onBack, title: props.inAppWalletLocale.signIn }))), _jsx(Container, { center: "y", expand: true, flex: "column", p: isCompact ? undefined : "lg", children: _jsx(ConnectWalletSocialOptions, { ...props, disabled: props.meta?.requireApproval && !isApproved, locale: props.inAppWalletLocale }) }), isCompact &&
                (props.meta?.showThirdwebBranding !== false ||
                    props.meta?.termsOfServiceUrl ||
                    props.meta?.privacyPolicyUrl) && _jsx(Spacer, { y: "xl" }), _jsxs(Container, { flex: "column", gap: "lg", children: [_jsx(TOS, { isApproved: isApproved, locale: props.connectLocale.agreement, onApprove: () => {
                            setIsApproved(!isApproved);
                        }, privacyPolicyUrl: props.meta?.privacyPolicyUrl, requireApproval: props.meta?.requireApproval, termsOfServiceUrl: props.meta?.termsOfServiceUrl }), props.meta?.showThirdwebBranding !== false && _jsx(PoweredByThirdweb, {})] })] }));
}
//# sourceMappingURL=InAppWalletFormUI.js.map