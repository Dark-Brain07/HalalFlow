"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useUnlinkProfile } from "../../../../../react/web/hooks/wallets/useUnlinkProfile.js";
import { shortenAddress } from "../../../../../utils/address.js";
import { fontSize, iconSize } from "../../../../core/design-system/index.js";
import { useSocialProfiles } from "../../../../core/social/useSocialProfiles.js";
import { getSocialIcon } from "../../../../core/utils/walletIcon.js";
import { useProfiles } from "../../../hooks/wallets/useProfiles.js";
import { LoadingScreen } from "../../../wallets/shared/LoadingScreen.js";
import { Container, Line, ModalHeader } from "../../components/basic.js";
import { IconButton } from "../../components/buttons.js";
import { Img } from "../../components/Img.js";
import { Spacer } from "../../components/Spacer.js";
import { Text } from "../../components/text.js";
import { Blobbie } from "../Blobbie.js";
import { AddUserIcon } from "../icons/AddUserIcon.js";
import { EmailIcon } from "../icons/EmailIcon.js";
import { FingerPrintIcon } from "../icons/FingerPrintIcon.js";
import { PhoneIcon } from "../icons/PhoneIcon.js";
import { MenuButton } from "../MenuButton.js";
function getProfileDisplayName(profile) {
    switch (true) {
        case profile.type === "email" && profile.details.email !== undefined:
            return profile.details.email;
        case profile.type === "google" && profile.details.email !== undefined:
            return profile.details.email;
        case profile.type === "phone" && profile.details.phone !== undefined:
            return profile.details.phone;
        case profile.details.address !== undefined:
            return shortenAddress(profile.details.address, 6);
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
export function LinkedProfilesScreen(props) {
    const { data: connectedProfiles, isLoading } = useProfiles({
        client: props.client,
    });
    if (isLoading) {
        return _jsx(LoadingScreen, {});
    }
    return (_jsxs(Container, { style: {
            minHeight: "300px",
        }, children: [_jsx(Container, { p: "lg", children: _jsx(ModalHeader, { onBack: props.onBack, title: props.locale.manageWallet.linkedProfiles }) }), _jsx(Line, {}), _jsxs(Container, { scrollY: true, style: {
                    height: "300px",
                }, children: [_jsx(Spacer, { y: "md" }), _jsxs(Container, { px: "sm", children: [_jsxs(MenuButton, { onClick: () => {
                                    props.setScreen("link-profile");
                                }, style: {
                                    fontSize: fontSize.sm,
                                }, children: [_jsx(AddUserIcon, { size: iconSize.lg }), _jsx(Text, { color: "primaryText", children: props.locale.manageWallet.linkProfile })] }), _jsx(Spacer, { y: "xs" }), connectedProfiles
                                ?.filter((profile) => profile.type.toLowerCase() !== "guest" &&
                                profile.type.toLowerCase() !== "custom_jwt" &&
                                profile.type.toLowerCase() !== "custom_auth_endpoint")
                                .map((profile) => (_jsx(LinkedProfile, { client: props.client, enableUnlinking: connectedProfiles.length > 1, profile: profile }, `${JSON.stringify(profile)}`)))] }), _jsx(Spacer, { y: "md" })] })] }));
}
function LinkedProfile({ profile, enableUnlinking, client, }) {
    const { data: socialProfiles } = useSocialProfiles({
        address: profile.details.address,
        client,
    });
    const { mutate: unlinkProfileMutation, isPending } = useUnlinkProfile();
    return (_jsxs(MenuButton, { as: "div", disabled: true, style: {
            cursor: "default",
            fontSize: fontSize.sm,
        }, children: [socialProfiles?.some((p) => p.avatar) ? (_jsx(Img, { client: client, height: iconSize.lg, loading: "eager", src: socialProfiles?.find((p) => p.avatar)?.avatar, style: {
                    borderRadius: "100%",
                }, width: iconSize.lg })) : profile.details.address !== undefined ? (_jsx(Container, { style: {
                    borderRadius: "100%",
                    height: "32px",
                    overflow: "hidden",
                    width: "32px",
                }, children: _jsx(Blobbie, { address: profile.details.address, size: 32 }) })) : profile.type === "passkey" ? (_jsx(FingerPrintIcon, { size: iconSize.lg })) : profile.type === "email" ? (_jsx(EmailIcon, { size: iconSize.lg })) : profile.type === "phone" ? (_jsx(PhoneIcon, { size: iconSize.lg })) : (_jsx(Img, { client: client, height: iconSize.lg, loading: "eager", src: getSocialIcon(profile.type), width: iconSize.lg })), _jsxs("div", { style: {
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                    flexGrow: 1,
                    justifyContent: "space-between",
                }, children: [_jsx(Text, { color: "primaryText", children: socialProfiles?.find((p) => p.avatar)?.name ||
                            getProfileDisplayName(profile) }), _jsxs("div", { style: {
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "row",
                            gap: "8px",
                        }, children: [socialProfiles?.find((p) => p.avatar)?.name &&
                                profile.details.address && (_jsx(Text, { color: "secondaryText", size: "sm", children: shortenAddress(profile.details.address, 4) })), enableUnlinking && (_jsx(IconButton, { "aria-label": "Unlink", autoFocus: true, disabled: isPending, onClick: () => unlinkProfileMutation({
                                    client,
                                    profileToUnlink: profile,
                                }), style: {
                                    pointerEvents: "auto",
                                }, type: "button", children: _jsx(Cross2Icon, { height: iconSize.md, style: {
                                        color: "inherit",
                                    }, width: iconSize.md }) }))] })] })] }));
}
//# sourceMappingURL=LinkedProfilesScreen.js.map