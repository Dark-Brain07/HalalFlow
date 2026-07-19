"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedProfilesScreen = LinkedProfilesScreen;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const useUnlinkProfile_js_1 = require("../../../../../react/web/hooks/wallets/useUnlinkProfile.js");
const address_js_1 = require("../../../../../utils/address.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const useSocialProfiles_js_1 = require("../../../../core/social/useSocialProfiles.js");
const walletIcon_js_1 = require("../../../../core/utils/walletIcon.js");
const useProfiles_js_1 = require("../../../hooks/wallets/useProfiles.js");
const LoadingScreen_js_1 = require("../../../wallets/shared/LoadingScreen.js");
const basic_js_1 = require("../../components/basic.js");
const buttons_js_1 = require("../../components/buttons.js");
const Img_js_1 = require("../../components/Img.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const text_js_1 = require("../../components/text.js");
const Blobbie_js_1 = require("../Blobbie.js");
const AddUserIcon_js_1 = require("../icons/AddUserIcon.js");
const EmailIcon_js_1 = require("../icons/EmailIcon.js");
const FingerPrintIcon_js_1 = require("../icons/FingerPrintIcon.js");
const PhoneIcon_js_1 = require("../icons/PhoneIcon.js");
const MenuButton_js_1 = require("../MenuButton.js");
function getProfileDisplayName(profile) {
    switch (true) {
        case profile.type === "email" && profile.details.email !== undefined:
            return profile.details.email;
        case profile.type === "google" && profile.details.email !== undefined:
            return profile.details.email;
        case profile.type === "phone" && profile.details.phone !== undefined:
            return profile.details.phone;
        case profile.details.address !== undefined:
            return (0, address_js_1.shortenAddress)(profile.details.address, 6);
        case profile.type === "cognito" &&
            profile.details.email !== undefined:
            return profile.details.email;
        case profile.type.toLowerCase() === "custom_auth_endpoint":
            return "Custom Profile";
        default:
            return profile.type.slice(0, 1).toUpperCase() + profile.type.slice(1);
    }
}
/**
 * @internal
 */
function LinkedProfilesScreen(props) {
    const { data: connectedProfiles, isLoading } = (0, useProfiles_js_1.useProfiles)({
        client: props.client,
    });
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(LoadingScreen_js_1.LoadingScreen, {});
    }
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { style: {
            minHeight: "300px",
        }, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { p: "lg", children: (0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: props.onBack, title: props.locale.manageWallet.linkedProfiles }) }), (0, jsx_runtime_1.jsx)(basic_js_1.Line, {}), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { scrollY: true, style: {
                    height: "300px",
                }, children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { px: "sm", children: [(0, jsx_runtime_1.jsxs)(MenuButton_js_1.MenuButton, { onClick: () => {
                                    props.setScreen("link-profile");
                                }, style: {
                                    fontSize: index_js_1.fontSize.sm,
                                }, children: [(0, jsx_runtime_1.jsx)(AddUserIcon_js_1.AddUserIcon, { size: index_js_1.iconSize.lg }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", children: props.locale.manageWallet.linkProfile })] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xs" }), connectedProfiles
                                ?.filter((profile) => profile.type.toLowerCase() !== "guest" &&
                                profile.type.toLowerCase() !== "custom_jwt" &&
                                profile.type.toLowerCase() !== "custom_auth_endpoint")
                                .map((profile) => ((0, jsx_runtime_1.jsx)(LinkedProfile, { client: props.client, enableUnlinking: connectedProfiles.length > 1, profile: profile }, `${JSON.stringify(profile)}`)))] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" })] })] }));
}
function LinkedProfile({ profile, enableUnlinking, client, }) {
    const { data: socialProfiles } = (0, useSocialProfiles_js_1.useSocialProfiles)({
        address: profile.details.address,
        client,
    });
    const { mutate: unlinkProfileMutation, isPending } = (0, useUnlinkProfile_js_1.useUnlinkProfile)();
    return ((0, jsx_runtime_1.jsxs)(MenuButton_js_1.MenuButton, { as: "div", disabled: true, style: {
            cursor: "default",
            fontSize: index_js_1.fontSize.sm,
        }, children: [socialProfiles?.some((p) => p.avatar) ? ((0, jsx_runtime_1.jsx)(Img_js_1.Img, { client: client, height: index_js_1.iconSize.lg, loading: "eager", src: socialProfiles?.find((p) => p.avatar)?.avatar, style: {
                    borderRadius: "100%",
                }, width: index_js_1.iconSize.lg })) : profile.details.address !== undefined ? ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { style: {
                    borderRadius: "100%",
                    height: "32px",
                    overflow: "hidden",
                    width: "32px",
                }, children: (0, jsx_runtime_1.jsx)(Blobbie_js_1.Blobbie, { address: profile.details.address, size: 32 }) })) : profile.type === "passkey" ? ((0, jsx_runtime_1.jsx)(FingerPrintIcon_js_1.FingerPrintIcon, { size: index_js_1.iconSize.lg })) : profile.type === "email" ? ((0, jsx_runtime_1.jsx)(EmailIcon_js_1.EmailIcon, { size: index_js_1.iconSize.lg })) : profile.type === "phone" ? ((0, jsx_runtime_1.jsx)(PhoneIcon_js_1.PhoneIcon, { size: index_js_1.iconSize.lg })) : ((0, jsx_runtime_1.jsx)(Img_js_1.Img, { client: client, height: index_js_1.iconSize.lg, loading: "eager", src: (0, walletIcon_js_1.getSocialIcon)(profile.type), width: index_js_1.iconSize.lg })), (0, jsx_runtime_1.jsxs)("div", { style: {
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    flexGrow: 1,
                    justifyContent: "space-between",
                }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", children: socialProfiles?.find((p) => p.avatar)?.name ||
                            getProfileDisplayName(profile) }), (0, jsx_runtime_1.jsxs)("div", { style: {
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "row",
                            gap: "8px",
                        }, children: [socialProfiles?.find((p) => p.avatar)?.name &&
                                profile.details.address && ((0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", children: (0, address_js_1.shortenAddress)(profile.details.address, 4) })), enableUnlinking && ((0, jsx_runtime_1.jsx)(buttons_js_1.IconButton, { "aria-label": "Unlink", autoFocus: true, disabled: isPending, onClick: () => unlinkProfileMutation({
                                    client,
                                    profileToUnlink: profile,
                                }), style: {
                                    pointerEvents: "auto",
                                }, type: "button", children: (0, jsx_runtime_1.jsx)(react_icons_1.Cross2Icon, { height: index_js_1.iconSize.md, style: {
                                        color: "inherit",
                                    }, width: index_js_1.iconSize.md }) }))] })] })] }));
}
//# sourceMappingURL=LinkedProfilesScreen.js.map