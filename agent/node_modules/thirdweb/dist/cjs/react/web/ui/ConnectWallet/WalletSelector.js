"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletSelector = WalletSelector;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const react_1 = require("react");
const create_wallet_js_1 = require("../../../../wallets/create-wallet.js");
const mipdStore_js_1 = require("../../../../wallets/injected/mipdStore.js");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const wallet_ui_states_provider_js_1 = require("../../providers/wallet-ui-states-provider.js");
const sortWallets_js_1 = require("../../utils/sortWallets.js");
const InAppWalletSelectionUI_js_1 = require("../../wallets/in-app/InAppWalletSelectionUI.js");
const badge_js_1 = require("../components/badge.js");
const basic_js_1 = require("../components/basic.js");
const buttons_js_1 = require("../components/buttons.js");
const Img_js_1 = require("../components/Img.js");
const modalElements_js_1 = require("../components/modalElements.js");
const Spacer_js_1 = require("../components/Spacer.js");
const TextDivider_js_1 = require("../components/TextDivider.js");
const text_js_1 = require("../components/text.js");
const elements_js_1 = require("../design-system/elements.js");
const constants_js_1 = require("./constants.js");
const OutlineWalletIcon_js_1 = require("./icons/OutlineWalletIcon.js");
const SmartWalletConnectUI_js_1 = require("./Modal/SmartWalletConnectUI.js");
const screen_js_1 = require("./Modal/screen.js");
const storage_js_1 = require("./Modal/storage.js");
const TOS_js_1 = require("./Modal/TOS.js");
const PoweredByTW_js_1 = require("./PoweredByTW.js");
const WalletEntryButton_js_1 = require("./WalletEntryButton.js");
const WalletTypeRowButton_js_1 = require("./WalletTypeRowButton.js");
// const localWalletId = "local";
const inAppWalletId = "inApp";
/**
 * @internal
 */
function WalletSelector(props) {
    const [personalWallet, setPersonalWallet] = (0, react_1.useState)(null);
    if (!props.accountAbstraction) {
        return (0, jsx_runtime_1.jsx)(WalletSelectorInner, { ...props });
    }
    if (personalWallet) {
        return ((0, jsx_runtime_1.jsx)(SmartWalletConnectUI_js_1.SmartConnectUI, { accountAbstraction: props.accountAbstraction, chain: props.chain, chains: props.chains, client: props.client, connectLocale: props.connectLocale, done: props.done, meta: props.meta, onBack: props.goBack, personalWallet: personalWallet, setModalVisibility: props.setModalVisibility, size: props.size, walletConnect: props.walletConnect }));
    }
    return ((0, jsx_runtime_1.jsx)(WalletSelectorInner, { ...props, done: (w) => {
            setPersonalWallet(w);
        } }));
}
/**
 * @internal
 */
const WalletSelectorInner = (props) => {
    const { walletIdsToHide } = props;
    const isCompact = props.size === "compact";
    const [isWalletGroupExpanded, setIsWalletGroupExpanded] = (0, react_1.useState)(false);
    // This is only used if requireApproval is true
    const [approvedTOS, setApprovedTOS] = (0, react_1.useState)(false);
    const installedWallets = getInstalledWallets();
    const lastUsedWalletId = (0, react_1.useMemo)(() => (0, storage_js_1.getLastUsedWalletId)(), []);
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
    const eoaWallets = (0, sortWallets_js_1.sortWallets)(nonLocalWalletConfigs.filter((w) => w.id !== inAppWalletId), props.recommendedWallets);
    const continueAsGuest = localWalletConfig && ((0, jsx_runtime_1.jsx)(buttons_js_1.Button, { "data-test": "continue-as-guest-button", disabled: props.meta.requireApproval && !approvedTOS, fullWidth: true, onClick: () => {
            props.selectWallet(localWalletConfig);
        }, style: !isCompact
            ? {
                justifyContent: "flex-start",
                textAlign: "left",
            }
            : undefined, variant: isCompact ? "outline" : "link", children: props.connectLocale.continueAsGuest }));
    // prevent accidental clicks on the TW icon when clicking on back icon from previous screen
    const enableTWIconLink = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        setTimeout(() => {
            enableTWIconLink.current = true;
        }, 1000);
    }, []);
    const twTitle = props.modalHeader ? ((0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: props.modalHeader.onBack, title: props.modalHeader.title })) : ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", gap: "xs", className: "tw-header", children: [!props.meta.titleIconUrl ? null : ((0, jsx_runtime_1.jsx)(Img_js_1.Img, { client: props.client, height: index_js_1.iconSize.md, src: props.meta.titleIconUrl, width: index_js_1.iconSize.md })), (0, jsx_runtime_1.jsxs)(modalElements_js_1.ModalTitle, { children: [" ", props.title, " "] })] }));
    const handleSelect = async (wallet) => {
        props.selectWallet(wallet);
    };
    const connectAWallet = ((0, jsx_runtime_1.jsx)(WalletTypeRowButton_js_1.WalletTypeRowButton, { className: "tw-select-connect-a-wallet-button", lastUsedBadge: !!lastUsedWalletId &&
            lastUsedWalletId !== "inApp" &&
            !lastUsedWalletId.startsWith("ecosystem."), client: props.client, disabled: props.meta.requireApproval && !approvedTOS, icon: OutlineWalletIcon_js_1.OutlineWalletIcon, onClick: () => {
            setIsWalletGroupExpanded(true);
        }, title: props.connectLocale.connectAWallet }));
    const newToWallets = ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { className: "tw-get-started-container", flex: "row", style: {
            justifyContent: "space-between",
        }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", weight: 500, children: props.connectLocale.newToWallets }), (0, jsx_runtime_1.jsx)(text_js_1.Link, { href: "https://blog.thirdweb.com/web3-wallet/", size: "sm", target: "_blank", weight: 500, children: props.connectLocale.getStarted })] }));
    const tos = props.meta.requireApproval ||
        props.meta.termsOfServiceUrl ||
        props.meta.privacyPolicyUrl ? ((0, jsx_runtime_1.jsx)(TOS_js_1.TOS, { isApproved: approvedTOS, locale: props.connectLocale.agreement, onApprove: () => setApprovedTOS(!approvedTOS), privacyPolicyUrl: props.meta.privacyPolicyUrl, requireApproval: props.meta.requireApproval, termsOfServiceUrl: props.meta.termsOfServiceUrl })) : undefined;
    let topSection;
    let bottomSection;
    // wide modal
    if (!isCompact) {
        topSection = ((0, jsx_runtime_1.jsx)(WalletSelection, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, diableSelectionDataReset: props.disableSelectionDataReset, disabled: props.meta.requireApproval && !approvedTOS, done: props.done, goBack: props.goBack, onShowAll: props.onShowAll, recommendedWallets: props.recommendedWallets, selectWallet: handleSelect, showAllWallets: props.showAllWallets, size: props.size, wallets: nonLocalWalletConfigs }));
        if (continueAsGuest) {
            bottomSection = ((0, jsx_runtime_1.jsx)(basic_js_1.ScreenBottomContainer, { children: continueAsGuest }));
        }
    }
    // compact
    else {
        // no social logins
        if (socialWallets.length === 0) {
            topSection = ((0, jsx_runtime_1.jsx)(WalletSelection, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, diableSelectionDataReset: props.disableSelectionDataReset, disabled: props.meta.requireApproval && !approvedTOS, done: props.done, goBack: props.goBack, onShowAll: props.onShowAll, recommendedWallets: props.recommendedWallets, selectWallet: handleSelect, showAllWallets: props.showAllWallets, size: props.size, wallets: nonLocalWalletConfigs }));
            bottomSection = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(basic_js_1.Line, {}), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "md", px: "lg", py: "md+", children: [newToWallets, continueAsGuest] }), !continueAsGuest && (0, jsx_runtime_1.jsx)(basic_js_1.Line, {}), tos && ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { px: "md", style: {
                            paddingBottom: index_js_1.spacing.md,
                            paddingTop: continueAsGuest ? 0 : index_js_1.spacing.md,
                        }, children: tos }))] }));
        }
        // social logins
        else {
            // not expanded state
            if (!isWalletGroupExpanded) {
                topSection = ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { px: "xs", children: [(0, jsx_runtime_1.jsx)(WalletSelection, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, diableSelectionDataReset: props.disableSelectionDataReset, disabled: props.meta.requireApproval && !approvedTOS, done: props.done, goBack: props.goBack, recommendedWallets: props.recommendedWallets, selectWallet: handleSelect, showAllWallets: props.showAllWallets, size: props.size, wallets: socialWallets }), eoaWallets.length > 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(TextDivider_js_1.TextDivider, { text: props.connectLocale.or }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" })] }))] }));
                // only social login - no eoa wallets
                if (eoaWallets.length === 0) {
                    bottomSection =
                        tos || continueAsGuest ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(basic_js_1.Line, {}), continueAsGuest && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { p: "lg", children: [" ", continueAsGuest] })), tos && (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { p: "md", children: [" ", tos, " "] })] })) : ((0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "sm" }));
                }
                // social login + eoa wallets
                else {
                    // social login + More than 1 eoa wallets
                    if (eoaWallets.length > 1) {
                        bottomSection = ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "sm", style: { position: "relative" }, children: [(0, jsx_runtime_1.jsx)(GradientDiv, {}), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "md", px: "lg", children: [connectAWallet, continueAsGuest] }), tos ? ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { p: "md", children: [" ", tos, " "] })) : ((0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xxs" }))] }));
                    }
                    // social login + single eoa wallet
                    else {
                        bottomSection = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { px: "lg", children: (0, jsx_runtime_1.jsx)(WalletSelection, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, diableSelectionDataReset: props.disableSelectionDataReset, disabled: props.meta.requireApproval && !approvedTOS, done: props.done, goBack: props.goBack, onShowAll: props.onShowAll, recommendedWallets: props.recommendedWallets, selectWallet: handleSelect, showAllWallets: props.showAllWallets, size: props.size, wallets: eoaWallets }) }), continueAsGuest && ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", gap: "lg", px: "lg", children: continueAsGuest })), tos ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [continueAsGuest ? (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }) : (0, jsx_runtime_1.jsx)(basic_js_1.Line, {}), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { p: "md", children: [" ", tos, " "] })] })) : (continueAsGuest && (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }))] }));
                    }
                }
            }
            // expanded state
            else {
                topSection = ((0, jsx_runtime_1.jsx)(WalletSelection, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, diableSelectionDataReset: props.disableSelectionDataReset, disabled: props.meta.requireApproval && !approvedTOS, done: props.done, goBack: props.goBack, onShowAll: props.onShowAll, recommendedWallets: props.recommendedWallets, selectWallet: handleSelect, showAllWallets: props.showAllWallets, size: props.size, wallets: eoaWallets }));
                bottomSection = ((0, jsx_runtime_1.jsx)(basic_js_1.ScreenBottomContainer, { children: newToWallets }));
            }
        }
    }
    // hide the header for embed - unless it's customized
    const showHeader = !props.hideHeader || props.modalHeader;
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", className: "tw-wallet-selection", flex: "column", fullHeight: true, scrollY: true, style: {
            maxHeight: props.size === "compact" ? constants_js_1.compactModalMaxHeight : undefined,
        }, children: [showHeader && ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { px: "lg", pt: "lg", pb: "xs", children: isWalletGroupExpanded ? ((0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: () => {
                        setIsWalletGroupExpanded(false);
                    }, title: twTitle })) : (twTitle) })), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { expand: true, scrollY: true, style: !showHeader
                    ? {
                        paddingTop: index_js_1.spacing.md,
                    }
                    : {
                        paddingTop: "2px",
                    }, children: [!showHeader && isWalletGroupExpanded && ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { px: "md", children: (0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "y", flex: "row", style: {
                                padding: index_js_1.spacing.sm,
                                paddingTop: 0,
                            }, children: (0, jsx_runtime_1.jsxs)(buttons_js_1.IconButton, { onClick: () => {
                                    setIsWalletGroupExpanded(false);
                                }, style: {
                                    gap: index_js_1.spacing.xxs,
                                    paddingBlock: index_js_1.spacing.xxs,
                                    paddingRight: index_js_1.spacing.xs,
                                    transform: `translateX(-${index_js_1.spacing.xs})`,
                                }, children: [(0, jsx_runtime_1.jsx)(react_icons_1.ChevronLeftIcon, { height: index_js_1.iconSize.sm, width: index_js_1.iconSize.sm }), props.connectLocale.goBackButton] }) }) })), topSection] }), bottomSection, isCompact && props.meta.showThirdwebBranding !== false && ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { py: "md", children: (0, jsx_runtime_1.jsx)(PoweredByTW_js_1.PoweredByThirdweb, {}) }))] }));
};
let _installedWallets = [];
function getInstalledWallets() {
    if (_installedWallets.length === 0) {
        const providers = (0, mipdStore_js_1.getInstalledWalletProviders)();
        const walletIds = providers.map((provider) => provider.info.rdns);
        _installedWallets = walletIds.map((w) => (0, create_wallet_js_1.createWallet)(w));
    }
    return _installedWallets;
}
/**
 * @internal
 */
const WalletSelection = (props) => {
    const wallets = (0, sortWallets_js_1.sortWallets)(props.wallets, props.recommendedWallets);
    const { screen } = (0, screen_js_1.useScreenContext)();
    const setSelectionData = (0, wallet_ui_states_provider_js_1.useSetSelectionData)();
    const lastUsedWalletId = (0, react_1.useMemo)(() => (0, storage_js_1.getLastUsedWalletId)(), []);
    return ((0, jsx_runtime_1.jsxs)(WalletList, { style: {
            maxHeight: "370px",
            minHeight: "100%",
            paddingTop: props.size === "wide" ? 0 : badge_js_1.LAST_USED_BADGE_VERTICAL_RESERVED_SPACE,
        }, children: [wallets.map((wallet) => {
                const isActive = screen
                    ? typeof screen === "object" && screen.id === wallet.id
                    : false;
                return ((0, jsx_runtime_1.jsx)("li", { children: wallet.id === "inApp" && props.size === "compact" ? ((0, jsx_runtime_1.jsx)(InAppWalletSelectionUI_js_1.default, { chain: props.chain, client: props.client, connectLocale: props.connectLocale, disabled: props.disabled, done: () => props.done(wallet), goBack: props.goBack, recommendedWallets: props.recommendedWallets, select: () => props.selectWallet(wallet), size: props.size, wallet: wallet })) : ((0, jsx_runtime_1.jsx)(WalletEntryButton_js_1.WalletEntryButton, { className: "tw-wallet-select-wallet-button", badge: lastUsedWalletId === wallet.id ? "Last used" : undefined, client: props.client, connectLocale: props.connectLocale, isActive: isActive, recommendedWallets: props.recommendedWallets, selectWallet: () => {
                            if (!props.diableSelectionDataReset) {
                                setSelectionData({});
                            }
                            props.selectWallet(wallet);
                        }, wallet: wallet })) }, wallet.id));
            }), props.onShowAll && props.showAllWallets !== false && ((0, jsx_runtime_1.jsx)(ButtonContainer, { className: "tw-show-all-wallets-button", children: (0, jsx_runtime_1.jsxs)(WalletEntryButton_js_1.WalletButtonEl, { onClick: props.onShowAll, children: [(0, jsx_runtime_1.jsxs)(ShowAllWalletsIcon, { children: [(0, jsx_runtime_1.jsx)("div", { "data-dot": true }), (0, jsx_runtime_1.jsx)("div", { "data-dot": true }), (0, jsx_runtime_1.jsx)("div", { "data-dot": true }), (0, jsx_runtime_1.jsx)("div", { "data-dot": true })] }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "xs", children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", children: "All Wallets" }), (0, jsx_runtime_1.jsx)(BadgeText, { children: " 500+ " })] })] }) }))] }));
};
const BadgeText = /* @__PURE__ */ (0, elements_js_1.StyledDiv)(() => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        backgroundColor: theme.colors.secondaryButtonBg,
        borderRadius: index_js_1.radius.sm,
        color: theme.colors.secondaryText,
        fontSize: index_js_1.fontSize.xs,
        paddingBlock: "3px",
        paddingInline: index_js_1.spacing.xxs,
    };
});
const ButtonContainer = /* @__PURE__ */ (0, elements_js_1.StyledDiv)(() => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        "&:hover [data-dot]": {
            background: theme.colors.primaryText,
        },
    };
});
const ShowAllWalletsIcon = /* @__PURE__ */ (0, elements_js_1.StyledDiv)(() => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
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
        borderRadius: index_js_1.radius.md,
        display: "grid",
        gap: index_js_1.spacing["4xs"],
        gridTemplateColumns: "1fr 1fr",
        height: `${index_js_1.iconSize.xl}px`,
        justifyItems: "center",
        padding: index_js_1.spacing.xs,
        width: `${index_js_1.iconSize.xl}px`,
    };
});
const WalletList = /* @__PURE__ */ (0, elements_js_1.StyledUl)({
    all: "unset",
    boxSizing: "border-box",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: "2px",
    listStyleType: "none",
    overflowY: "auto",
    ...basic_js_1.noScrollBar,
    margin: "-2px",
    marginBottom: 0,
    // to show the box-shadow of inputs that overflows
    paddingInline: index_js_1.spacing.md,
    paddingBottom: index_js_1.spacing.lg,
});
const GradientDiv = /* @__PURE__ */ (0, elements_js_1.StyledDiv)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    theme.colors.modalBg;
    return {
        background: `linear-gradient(to bottom, transparent 0%, ${theme.colors.modalBg} 80%)`,
        height: index_js_1.spacing.lg,
        left: 0,
        pointerEvents: "none",
        position: "absolute",
        top: `-${index_js_1.spacing.lg}`,
        width: "100%",
    };
});
//# sourceMappingURL=WalletSelector.js.map