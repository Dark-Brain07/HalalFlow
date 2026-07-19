"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { createWallet } from "../../../../wallets/create-wallet.js";
import { getInstalledWalletProviders } from "../../../../wallets/injected/mipdStore.js";
import { useCustomTheme } from "../../../core/design-system/CustomThemeProvider.js";
import { fontSize, iconSize, radius, spacing, } from "../../../core/design-system/index.js";
import { useSetSelectionData } from "../../providers/wallet-ui-states-provider.js";
import { sortWallets } from "../../utils/sortWallets.js";
import InAppWalletSelectionUI from "../../wallets/in-app/InAppWalletSelectionUI.js";
import { LAST_USED_BADGE_VERTICAL_RESERVED_SPACE } from "../components/badge.js";
import { Container, Line, ModalHeader, noScrollBar, ScreenBottomContainer, } from "../components/basic.js";
import { Button, IconButton } from "../components/buttons.js";
import { Img } from "../components/Img.js";
import { ModalTitle } from "../components/modalElements.js";
import { Spacer } from "../components/Spacer.js";
import { TextDivider } from "../components/TextDivider.js";
import { Link, Text } from "../components/text.js";
import { StyledDiv, StyledUl } from "../design-system/elements.js";
import { compactModalMaxHeight } from "./constants.js";
import { OutlineWalletIcon } from "./icons/OutlineWalletIcon.js";
import { SmartConnectUI } from "./Modal/SmartWalletConnectUI.js";
import { useScreenContext } from "./Modal/screen.js";
import { getLastUsedWalletId } from "./Modal/storage.js";
import { TOS } from "./Modal/TOS.js";
import { PoweredByThirdweb } from "./PoweredByTW.js";
import { WalletButtonEl, WalletEntryButton } from "./WalletEntryButton.js";
import { WalletTypeRowButton } from "./WalletTypeRowButton.js";
// const localWalletId = "local";
const inAppWalletId = "inApp";
/**
 * @internal
 */
export function WalletSelector(props) {
    const [personalWallet, setPersonalWallet] = useState(null);
    if (!props.accountAbstraction) {
        return _jsx(WalletSelectorInner, { ...props });
    }
    if (personalWallet) {
        return (_jsx(SmartConnectUI, { accountAbstraction: props.accountAbstraction, chain: props.chain, chains: props.chains, client: props.client, connectLocale: props.connectLocale, done: props.done, meta: props.meta, onBack: props.goBack, personalWallet: personalWallet, setModalVisibility: props.setModalVisibility, size: props.size, walletConnect: props.walletConnect }));
    }
    return (_jsx(WalletSelectorInner, { ...props, done: (w) => {
            setPersonalWallet(w);
        } }));
}
/**
 * @internal
 */
const WalletSelectorInner = (props) => {
    const { walletIdsToHide } = props;
    const isCompact = props.size === "compact";
    const [isWalletGroupExpanded, setIsWalletGroupExpanded] = useState(false);
    // This is only used if requireApproval is true
    const [approvedTOS, setApprovedTOS] = useState(false);
    const installedWallets = getInstalledWallets();
    const lastUsedWalletId = useMemo(() => getLastUsedWalletId(), []);
    const propsWallets = props.wallets;
    let _wallets = [...propsWallets];
    for (const iW of installedWallets) {
        if (!propsWallets.find((w) => w.id === iW.id)) {
            _wallets.push(iW);
        }
    }
    if (walletIdsToHide) {
        _wallets = _wallets.filter((w) => !walletIdsToHide?.includes(w.id));
    }
    const localWalletConfig = false; // _wallets.find((w) => w.id === localWalletId);
    const nonLocalWalletConfigs = _wallets; // _wallets.filter((w) => w.id !== localWalletId);
    const socialWallets = nonLocalWalletConfigs.filter((w) => w.id === inAppWalletId);
    const eoaWallets = sortWallets(nonLocalWalletConfigs.filter((w) => w.id !== inAppWalletId), props.recommendedWallets);
    const continueAsGuest = localWalletConfig && (_jsx(Button, { "data-test": "continue-as-guest-button", disabled: props.meta.requireApproval && !approvedTOS, fullWidth: true, onClick: () => {
            props.selectWallet(localWalletConfig);
        }, style: !isCompact
            ? {
                justifyContent: "flex-start",
                textAlign: "left",
            }
            : undefined, variant: isCompact ? "outline" : "link", children: props.connectLocale.continueAsGuest }));
    // prevent accidental clicks on the TW icon when clicking on back icon from previous screen
    const enableTWIconLink = useRef(false);
    useEffect(() => {
        setTimeout(() => {
            enableTWIconLink.current = true;
        }, 1000);
    }, []);
    const twTitle = props.modalHeader ? (_jsx(ModalHeader, { onBack: props.modalHeader.onBack, title: props.modalHeader.title })) : (_jsxs(Container, { center: "y", flex: "row", gap: "xs", className: "tw-header", children: [!props.meta.titleIconUrl ? null : (_jsx(Img, { client: props.client, height: iconSize.md, src: props.meta.titleIconUrl, width: iconSize.md })), _jsxs(ModalTitle, { children: [" ", props.title, " "] })] }));
    const handleSelect = async (wallet) => {
        props.selectWallet(wallet);
    };
    const connectAWallet = (_jsx(WalletTypeRowButton, { className: "tw-select-connect-a-wallet-button", lastUsedBadge: !!lastUsedWalletId &&
            lastUsedWalletId !== "inApp" &&
            !lastUsedWalletId.startsWith("ecosystem."), client: props.client, disabled: props.meta.requireApproval && !approvedTOS, icon: OutlineWalletIcon, onClick: () => {
            setIsWalletGroupExpanded(true);
        }, title: props.connectLocale.connectAWallet }));
    const newToWallets = (_jsxs(Container, { className: "tw-get-started-container", flex: "row", style: {
            justifyContent: "space-between",
        }, children: [_jsx(Text, { color: "secondaryText", size: "sm", weight: 500, children: props.connectLocale.newToWallets }), _jsx(Link, { href: "https://blog.thirdweb.com/web3-wallet/", size: "sm", target: "_blank", weight: 500, children: props.connectLocale.getStarted })] }));
    const tos = props.meta.requireApproval ||
        props.meta.termsOfServiceUrl ||
        props.meta.privacyPolicyUrl ? (_jsx(TOS, { isApproved: approvedTOS, locale: props.connectLocale.agreement, onApprove: () => setApprovedTOS(!approvedTOS), privacyPolicyUrl: props.meta.privacyPolicyUrl, requireApproval: props.meta.requireApproval, termsOfServiceUrl: props.meta.termsOfServiceUrl })) : undefined;
    let topSection;
    let bottomSection;
    // wide modal
    if (!isCompact) {
        topSection = (_jsx(WalletSelection, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, diableSelectionDataReset: props.disableSelectionDataReset, disabled: props.meta.requireApproval && !approvedTOS, done: props.done, goBack: props.goBack, onShowAll: props.onShowAll, recommendedWallets: props.recommendedWallets, selectWallet: handleSelect, showAllWallets: props.showAllWallets, size: props.size, wallets: nonLocalWalletConfigs }));
        if (continueAsGuest) {
            bottomSection = (_jsx(ScreenBottomContainer, { children: continueAsGuest }));
        }
    }
    // compact
    else {
        // no social logins
        if (socialWallets.length === 0) {
            topSection = (_jsx(WalletSelection, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, diableSelectionDataReset: props.disableSelectionDataReset, disabled: props.meta.requireApproval && !approvedTOS, done: props.done, goBack: props.goBack, onShowAll: props.onShowAll, recommendedWallets: props.recommendedWallets, selectWallet: handleSelect, showAllWallets: props.showAllWallets, size: props.size, wallets: nonLocalWalletConfigs }));
            bottomSection = (_jsxs(_Fragment, { children: [_jsx(Line, {}), _jsxs(Container, { flex: "column", gap: "md", px: "lg", py: "md+", children: [newToWallets, continueAsGuest] }), !continueAsGuest && _jsx(Line, {}), tos && (_jsx(Container, { px: "md", style: {
                            paddingBottom: spacing.md,
                            paddingTop: continueAsGuest ? 0 : spacing.md,
                        }, children: tos }))] }));
        }
        // social logins
        else {
            // not expanded state
            if (!isWalletGroupExpanded) {
                topSection = (_jsxs(Container, { px: "xs", children: [_jsx(WalletSelection, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, diableSelectionDataReset: props.disableSelectionDataReset, disabled: props.meta.requireApproval && !approvedTOS, done: props.done, goBack: props.goBack, recommendedWallets: props.recommendedWallets, selectWallet: handleSelect, showAllWallets: props.showAllWallets, size: props.size, wallets: socialWallets }), eoaWallets.length > 0 && (_jsxs(_Fragment, { children: [_jsx(TextDivider, { text: props.connectLocale.or }), _jsx(Spacer, { y: "lg" })] }))] }));
                // only social login - no eoa wallets
                if (eoaWallets.length === 0) {
                    bottomSection =
                        tos || continueAsGuest ? (_jsxs(_Fragment, { children: [_jsx(Spacer, { y: "md" }), _jsx(Line, {}), continueAsGuest && (_jsxs(Container, { p: "lg", children: [" ", continueAsGuest] })), tos && _jsxs(Container, { p: "md", children: [" ", tos, " "] })] })) : (_jsx(Spacer, { y: "sm" }));
                }
                // social login + eoa wallets
                else {
                    // social login + More than 1 eoa wallets
                    if (eoaWallets.length > 1) {
                        bottomSection = (_jsxs(Container, { flex: "column", gap: "sm", style: { position: "relative" }, children: [_jsx(GradientDiv, {}), _jsxs(Container, { flex: "column", gap: "md", px: "lg", children: [connectAWallet, continueAsGuest] }), tos ? (_jsxs(Container, { p: "md", children: [" ", tos, " "] })) : (_jsx(Spacer, { y: "xxs" }))] }));
                    }
                    // social login + single eoa wallet
                    else {
                        bottomSection = (_jsxs(_Fragment, { children: [_jsx(Container, { px: "lg", children: _jsx(WalletSelection, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, diableSelectionDataReset: props.disableSelectionDataReset, disabled: props.meta.requireApproval && !approvedTOS, done: props.done, goBack: props.goBack, onShowAll: props.onShowAll, recommendedWallets: props.recommendedWallets, selectWallet: handleSelect, showAllWallets: props.showAllWallets, size: props.size, wallets: eoaWallets }) }), continueAsGuest && (_jsx(Container, { flex: "column", gap: "lg", px: "lg", children: continueAsGuest })), tos ? (_jsxs(_Fragment, { children: [continueAsGuest ? _jsx(Spacer, { y: "md" }) : _jsx(Line, {}), _jsxs(Container, { p: "md", children: [" ", tos, " "] })] })) : (continueAsGuest && _jsx(Spacer, { y: "xl" }))] }));
                    }
                }
            }
            // expanded state
            else {
                topSection = (_jsx(WalletSelection, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, diableSelectionDataReset: props.disableSelectionDataReset, disabled: props.meta.requireApproval && !approvedTOS, done: props.done, goBack: props.goBack, onShowAll: props.onShowAll, recommendedWallets: props.recommendedWallets, selectWallet: handleSelect, showAllWallets: props.showAllWallets, size: props.size, wallets: eoaWallets }));
                bottomSection = (_jsx(ScreenBottomContainer, { children: newToWallets }));
            }
        }
    }
    // hide the header for embed - unless it's customized
    const showHeader = !props.hideHeader || props.modalHeader;
    return (_jsxs(Container, { animate: "fadein", className: "tw-wallet-selection", flex: "column", fullHeight: true, scrollY: true, style: {
            maxHeight: props.size === "compact" ? compactModalMaxHeight : undefined,
        }, children: [showHeader && (_jsx(Container, { px: "lg", pt: "lg", pb: "xs", children: isWalletGroupExpanded ? (_jsx(ModalHeader, { onBack: () => {
                        setIsWalletGroupExpanded(false);
                    }, title: twTitle })) : (twTitle) })), _jsxs(Container, { expand: true, scrollY: true, style: !showHeader
                    ? {
                        paddingTop: spacing.md,
                    }
                    : {
                        paddingTop: "2px",
                    }, children: [!showHeader && isWalletGroupExpanded && (_jsx(Container, { px: "md", children: _jsx(Container, { center: "y", flex: "row", style: {
                                padding: spacing.sm,
                                paddingTop: 0,
                            }, children: _jsxs(IconButton, { onClick: () => {
                                    setIsWalletGroupExpanded(false);
                                }, style: {
                                    gap: spacing.xxs,
                                    paddingBlock: spacing.xxs,
                                    paddingRight: spacing.xs,
                                    transform: `translateX(-${spacing.xs})`,
                                }, children: [_jsx(ChevronLeftIcon, { height: iconSize.sm, width: iconSize.sm }), props.connectLocale.goBackButton] }) }) })), topSection] }), bottomSection, isCompact && props.meta.showThirdwebBranding !== false && (_jsx(Container, { py: "md", children: _jsx(PoweredByThirdweb, {}) }))] }));
};
let _installedWallets = [];
function getInstalledWallets() {
    if (_installedWallets.length === 0) {
        const providers = getInstalledWalletProviders();
        const walletIds = providers.map((provider) => provider.info.rdns);
        _installedWallets = walletIds.map((w) => createWallet(w));
    }
    return _installedWallets;
}
/**
 * @internal
 */
const WalletSelection = (props) => {
    const wallets = sortWallets(props.wallets, props.recommendedWallets);
    const { screen } = useScreenContext();
    const setSelectionData = useSetSelectionData();
    const lastUsedWalletId = useMemo(() => getLastUsedWalletId(), []);
    return (_jsxs(WalletList, { style: {
            maxHeight: "370px",
            minHeight: "100%",
            paddingTop: props.size === "wide" ? 0 : LAST_USED_BADGE_VERTICAL_RESERVED_SPACE,
        }, children: [wallets.map((wallet) => {
                const isActive = screen
                    ? typeof screen === "object" && screen.id === wallet.id
                    : false;
                return (_jsx("li", { children: wallet.id === "inApp" && props.size === "compact" ? (_jsx(InAppWalletSelectionUI, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, disabled: props.disabled, done: () => props.done(wallet), goBack: props.goBack, recommendedWallets: props.recommendedWallets, select: () => props.selectWallet(wallet), size: props.size, wallet: wallet })) : (_jsx(WalletEntryButton, { className: "tw-wallet-select-wallet-button", badge: lastUsedWalletId === wallet.id ? "Last used" : undefined, client: props.client, connectLocale: props.connectLocale, isActive: isActive, recommendedWallets: props.recommendedWallets, selectWallet: () => {
                            if (!props.diableSelectionDataReset) {
                                setSelectionData({});
                            }
                            props.selectWallet(wallet);
                        }, wallet: wallet })) }, wallet.id));
            }), props.onShowAll && props.showAllWallets !== false && (_jsx(ButtonContainer, { className: "tw-show-all-wallets-button", children: _jsxs(WalletButtonEl, { onClick: props.onShowAll, children: [_jsxs(ShowAllWalletsIcon, { children: [_jsx("div", { "data-dot": true }), _jsx("div", { "data-dot": true }), _jsx("div", { "data-dot": true }), _jsx("div", { "data-dot": true })] }), _jsxs(Container, { flex: "row", gap: "xs", children: [_jsx(Text, { color: "primaryText", children: "All Wallets" }), _jsx(BadgeText, { children: " 500+ " })] })] }) }))] }));
};
const BadgeText = /* @__PURE__ */ StyledDiv(() => {
    const theme = useCustomTheme();
    return {
        backgroundColor: theme.colors.secondaryButtonBg,
        borderRadius: radius.sm,
        color: theme.colors.secondaryText,
        fontSize: fontSize.xs,
        paddingBlock: "3px",
        paddingInline: spacing.xxs,
    };
});
const ButtonContainer = /* @__PURE__ */ StyledDiv(() => {
    const theme = useCustomTheme();
    return {
        "&:hover [data-dot]": {
            background: theme.colors.primaryText,
        },
    };
});
const ShowAllWalletsIcon = /* @__PURE__ */ StyledDiv(() => {
    const theme = useCustomTheme();
    return {
        "& div": {
            background: theme.colors.secondaryText,
            borderRadius: "50%",
            height: "10px",
            transition: "background 200ms ease",
            width: "10px",
        },
        alignItems: "center",
        backgroundColor: theme.colors.tertiaryBg,
        border: `1px solid ${theme.colors.borderColor}`,
        borderRadius: radius.md,
        display: "grid",
        gap: spacing["4xs"],
        gridTemplateColumns: "1fr 1fr",
        height: `${iconSize.xl}px`,
        justifyItems: "center",
        padding: spacing.xs,
        width: `${iconSize.xl}px`,
    };
});
const WalletList = /* @__PURE__ */ StyledUl({
    all: "unset",
    boxSizing: "border-box",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: "2px",
    listStyleType: "none",
    overflowY: "auto",
    ...noScrollBar,
    margin: "-2px",
    marginBottom: 0,
    // to show the box-shadow of inputs that overflows
    paddingInline: spacing.md,
    paddingBottom: spacing.lg,
});
const GradientDiv = /* @__PURE__ */ StyledDiv((_) => {
    const theme = useCustomTheme();
    theme.colors.modalBg;
    return {
        background: `linear-gradient(to bottom, transparent 0%, ${theme.colors.modalBg} 80%)`,
        height: spacing.lg,
        left: 0,
        pointerEvents: "none",
        position: "absolute",
        top: `-${spacing.lg}`,
        width: "100%",
    };
});
//# sourceMappingURL=WalletSelector.js.map