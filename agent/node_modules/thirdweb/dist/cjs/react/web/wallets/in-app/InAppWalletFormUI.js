"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InAppWalletFormUIScreen = InAppWalletFormUIScreen;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const index_js_1 = require("../../../core/design-system/index.js");
const screen_js_1 = require("../../ui/ConnectWallet/Modal/screen.js");
const TOS_js_1 = require("../../ui/ConnectWallet/Modal/TOS.js");
const PoweredByTW_js_1 = require("../../ui/ConnectWallet/PoweredByTW.js");
const basic_js_1 = require("../../ui/components/basic.js");
const Img_js_1 = require("../../ui/components/Img.js");
const modalElements_js_1 = require("../../ui/components/modalElements.js");
const Spacer_js_1 = require("../../ui/components/Spacer.js");
const ConnectWalletSocialOptions_js_1 = require("../shared/ConnectWalletSocialOptions.js");
/**
 * @internal
 */
function InAppWalletFormUIScreen(props) {
    const isCompact = props.size === "compact";
    const { initialScreen, screen } = (0, screen_js_1.useScreenContext)();
    // This is only used when requireApproval is true to accept the TOS
    const [isApproved, setIsApproved] = (0, react_1.useState)(false);
    const isInitialScreen = screen === props.wallet && initialScreen === props.wallet;
    const onBack = isInitialScreen && !props.isLinking ? undefined : props.goBack;
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", flex: "column", fullHeight: true, p: "lg", style: {
            minHeight: "250px",
        }, children: [isCompact &&
                (isInitialScreen ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { leftAligned: !props.isLinking, onBack: onBack, title: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!props.meta?.titleIconUrl ? null : ((0, jsx_runtime_1.jsx)(Img_js_1.Img, { client: props.client, height: index_js_1.iconSize.md, src: props.meta?.titleIconUrl, width: index_js_1.iconSize.md })), (0, jsx_runtime_1.jsx)(modalElements_js_1.ModalTitle, { children: props.meta?.title ??
                                            props.inAppWalletLocale.emailLoginScreen.title })] }) }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" })] })) : ((0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: onBack, title: props.inAppWalletLocale.signIn }))), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "y", expand: true, flex: "column", p: isCompact ? undefined : "lg", children: (0, jsx_runtime_1.jsx)(ConnectWalletSocialOptions_js_1.ConnectWalletSocialOptions, { ...props, disabled: props.meta?.requireApproval && !isApproved, locale: props.inAppWalletLocale }) }), isCompact &&
                (props.meta?.showThirdwebBranding !== false ||
                    props.meta?.termsOfServiceUrl ||
                    props.meta?.privacyPolicyUrl) && (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "lg", children: [(0, jsx_runtime_1.jsx)(TOS_js_1.TOS, { isApproved: isApproved, locale: props.connectLocale.agreement, onApprove: () => {
                            setIsApproved(!isApproved);
                        }, privacyPolicyUrl: props.meta?.privacyPolicyUrl, requireApproval: props.meta?.requireApproval, termsOfServiceUrl: props.meta?.termsOfServiceUrl }), props.meta?.showThirdwebBranding !== false && (0, jsx_runtime_1.jsx)(PoweredByTW_js_1.PoweredByThirdweb, {})] })] }));
}
//# sourceMappingURL=InAppWalletFormUI.js.map