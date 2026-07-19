"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useScreenContext } from "../../ui/ConnectWallet/Modal/screen.js";
import { TOS } from "../../ui/ConnectWallet/Modal/TOS.js";
import { PoweredByThirdweb } from "../../ui/ConnectWallet/PoweredByTW.js";
import { Container, ModalHeader } from "../../ui/components/basic.js";
import { Spacer } from "../../ui/components/Spacer.js";
import { ConnectWalletSocialOptions } from "../shared/ConnectWalletSocialOptions.js";
import { EcosystemWalletHeader } from "./EcosystemWalletHeader.js";
/**
 * @internal
 */
export function EcosystemWalletFormUIScreen(props) {
    const isCompact = props.size === "compact";
    const { initialScreen, screen } = useScreenContext();
    // This is only used when requireApproval is true to accept the TOS
    const [isApproved, setIsApproved] = useState(false);
    const onBack = screen === props.wallet && initialScreen === props.wallet
        ? undefined
        : props.goBack;
    return (_jsxs(Container, { animate: "fadein", flex: "column", fullHeight: true, p: "lg", style: {
            minHeight: "250px",
        }, children: [props.isLinking ? (_jsx(ModalHeader, { onBack: onBack, title: props.connectLocale.manageWallet.linkProfile })) : (_jsx(EcosystemWalletHeader, { client: props.client, onBack: isCompact ? onBack : undefined, wallet: props.wallet })), _jsx(Spacer, { y: "lg" }), _jsx(Container, { center: "y", expand: true, flex: "column", p: isCompact ? undefined : "lg", children: _jsx(ConnectWalletSocialOptions, { disabled: props.meta.requireApproval && !isApproved, ...props }) }), isCompact &&
                (props.meta.showThirdwebBranding !== false ||
                    props.meta.termsOfServiceUrl ||
                    props.meta.privacyPolicyUrl) && _jsx(Spacer, { y: "xl" }), _jsxs(Container, { flex: "column", gap: "lg", children: [_jsx(TOS, { isApproved: isApproved, locale: props.connectLocale.agreement, onApprove: () => {
                            setIsApproved(!isApproved);
                        }, privacyPolicyUrl: props.meta.privacyPolicyUrl, requireApproval: props.meta.requireApproval, termsOfServiceUrl: props.meta.termsOfServiceUrl }), props.meta.showThirdwebBranding !== false && _jsx(PoweredByThirdweb, {})] })] }));
}
//# sourceMappingURL=EcosystemWalletFormUI.js.map