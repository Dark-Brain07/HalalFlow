"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcosystemWalletFormUIScreen = EcosystemWalletFormUIScreen;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const screen_js_1 = require("../../ui/ConnectWallet/Modal/screen.js");
const TOS_js_1 = require("../../ui/ConnectWallet/Modal/TOS.js");
const PoweredByTW_js_1 = require("../../ui/ConnectWallet/PoweredByTW.js");
const basic_js_1 = require("../../ui/components/basic.js");
const Spacer_js_1 = require("../../ui/components/Spacer.js");
const ConnectWalletSocialOptions_js_1 = require("../shared/ConnectWalletSocialOptions.js");
const EcosystemWalletHeader_js_1 = require("./EcosystemWalletHeader.js");
/**
 * @internal
 */
function EcosystemWalletFormUIScreen(props) {
    const isCompact = props.size === "compact";
    const { initialScreen, screen } = (0, screen_js_1.useScreenContext)();
    // This is only used when requireApproval is true to accept the TOS
    const [isApproved, setIsApproved] = (0, react_1.useState)(false);
    const onBack = screen === props.wallet && initialScreen === props.wallet
        ? undefined
        : props.goBack;
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", flex: "column", fullHeight: true, p: "lg", style: {
            minHeight: "250px",
        }, children: [props.isLinking ? ((0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: onBack, title: props.connectLocale.manageWallet.linkProfile })) : ((0, jsx_runtime_1.jsx)(EcosystemWalletHeader_js_1.EcosystemWalletHeader, { client: props.client, onBack: isCompact ? onBack : undefined, wallet: props.wallet })), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "y", expand: true, flex: "column", p: isCompact ? undefined : "lg", children: (0, jsx_runtime_1.jsx)(ConnectWalletSocialOptions_js_1.ConnectWalletSocialOptions, { disabled: props.meta.requireApproval && !isApproved, ...props }) }), isCompact &&
                (props.meta.showThirdwebBranding !== false ||
                    props.meta.termsOfServiceUrl ||
                    props.meta.privacyPolicyUrl) && (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "lg", children: [(0, jsx_runtime_1.jsx)(TOS_js_1.TOS, { isApproved: isApproved, locale: props.connectLocale.agreement, onApprove: () => {
                            setIsApproved(!isApproved);
                        }, privacyPolicyUrl: props.meta.privacyPolicyUrl, requireApproval: props.meta.requireApproval, termsOfServiceUrl: props.meta.termsOfServiceUrl }), props.meta.showThirdwebBranding !== false && (0, jsx_runtime_1.jsx)(PoweredByTW_js_1.PoweredByThirdweb, {})] })] }));
}
//# sourceMappingURL=EcosystemWalletFormUI.js.map