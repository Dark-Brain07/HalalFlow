"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbedContainer = void 0;
exports.ConnectEmbed = ConnectEmbed;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const defaultWallets_js_1 = require("../../../../../wallets/defaultWallets.js");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const useSiweAuth_js_1 = require("../../../../core/hooks/auth/useSiweAuth.js");
const useActiveAccount_js_1 = require("../../../../core/hooks/wallets/useActiveAccount.js");
const useActiveWallet_js_1 = require("../../../../core/hooks/wallets/useActiveWallet.js");
const useIsAutoConnecting_js_1 = require("../../../../core/hooks/wallets/useIsAutoConnecting.js");
const connection_manager_js_1 = require("../../../../core/providers/connection-manager.js");
const wallet_ui_states_provider_js_1 = require("../../../providers/wallet-ui-states-provider.js");
const canFitWideModal_js_1 = require("../../../utils/canFitWideModal.js");
const cls_js_1 = require("../../../utils/cls.js");
const usePreloadWalletProviders_js_1 = require("../../../utils/usePreloadWalletProviders.js");
const LoadingScreen_js_1 = require("../../../wallets/shared/LoadingScreen.js");
const AutoConnect_js_1 = require("../../AutoConnect/AutoConnect.js");
const DynamicHeight_js_1 = require("../../components/DynamicHeight.js");
const elements_js_1 = require("../../design-system/elements.js");
const constants_js_1 = require("../constants.js");
const getConnectLocale_js_1 = require("../locale/getConnectLocale.js");
const ConnectModalContent_js_1 = require("./ConnectModalContent.js");
const screen_js_1 = require("./screen.js");
/**
 * An inline wallet connection component that allows to:
 *
 * - Connect to 500+ external wallets
 * - Connect with email, phone, passkey or socials
 * - Convert any wallet to a ERC4337 smart wallet for gasless transactions
 * - Sign in with ethereum (Auth)
 *
 * It renders the same UI as the [`ConnectButton`](https://portal.thirdweb.com/react/v5/ConnectButton) component's modal - but directly inline in the page instead of being in a modal.
 *
 * Once connected, the component does not render any UI. It only renders UI if wallet is not connected.
 *
 * @example
 *
 * ## Default setup
 *
 * ```tsx
 * import { createThirdwebClient } from "thirdweb";
 * import { ConnectEmbed } from "thirdweb/react";
 *
 * const client = createThirdwebClient({ clientId: "YOUR_CLIENT_ID" });
 *
 * <ConnectEmbed
 *    client={client}
 * />
 * ```
 *
 * [View all available config options](https://portal.thirdweb.com/references/typescript/v5/ConnectEmbedProps)
 *
 *  ## Customization options
 *
 * ### Customizing wallet options
 *
 * ```tsx
 * <ConnectEmbed
 *    client={client}
 *    wallets={[
 *      createWallet("io.metamask"),
 *      createWallet("com.coinbase.wallet"),
 *      createWallet("me.rainbow"),
 *    ]}
 * />
 * ```
 *
 * [View all available wallets](https://portal.thirdweb.com/typescript/v5/supported-wallets)
 *
 *  ### Customizing the default chain to connect to
 *
 * ```tsx
 * import { base } from "thirdweb/chains";
 *
 * <ConnectEmbed
 *   client={client}
 *   chain={base}
 * />
 * ```
 *
 * ### Enabling Account Abstraction
 *
 * By passing the `accountAbstraction` prop, ALL connected wallets will be converted to smart accounts.
 * And by setting `sponsorGas` to `true`, all transactions done with those smart accounts will be sponsored.
 *
 * ```tsx
 * <ConnectEmbed
 * client={client}
 * accountAbstraction={{
 *   chain: sepolia,
 *   sponsorGas: true,
 * }}
 * />;
 * ```
 * Note that this prop doesn't affect ecosystem wallets. Ecosystem wallets will only be converted to smart accounts if the ecosystem owner has enabled account abstraction.
 *
 * ### Enabling sign in with ethereum (Auth)
 *
 * ```tsx
 * <ConnectEmbed
 * client={client}
 * auth={{
 *   isLoggedIn: async (address) => {
 *     console.log("checking if logged in!", { address });
 *     return await isLoggedIn();
 *   },
 *   doLogin: async (params) => {
 *     console.log("logging in!");
 *     await login(params);
 *   },
 *   getLoginPayload: async ({ address }) =>
 *     generatePayload({ address }),
 *   doLogout: async () => {
 *     console.log("logging out!");
 *     await logout();
 *   },
 * }}
 * />;
 * ```
 *
 * ### Customizing the theme
 *
 * ```tsx
 * <ConnectEmbed
 *    client={client}
 *    theme="light"
 * />
 * ```
 *
 * For more granular control, you can also pass a custom theme object:
 *
 * ```tsx
 * <ConnectEmbed
 *    client={client}
 *    theme={lightTheme({
 *      colors: {
 *        modalBg: "red",
 *      },
 *    })}
 * />
 * ```
 *
 * [View all available themes properties](https://portal.thirdweb.com/references/typescript/v5/Theme)
 *
 * ### Overriding styles using class names
 *
 * Some elements in this component have classes with a `tw-` prefix.
 * You can target these classes in your own CSS stylesheet to override their styles.
 *
 * In some cases, you may need to use the `!important` flag for the override to take effect. Do not use on auto-generated class names, as they may change between builds.
 *
 * ```css
 * .tw-back-button {
 *   background-color: red !important;
 * }
 * ```
 *
 * ### Changing the display language
 *
 * ```tsx
 * <ConnectEmbed
 *    client={client}
 *    locale="ja_JP"
 * />
 * ```
 *
 * [View all available locales](https://portal.thirdweb.com/references/typescript/v5/LocaleId)
 *
 * @param props -
 * The props for the `ConnectEmbed` component.
 *
 * Refer to the [`ConnectEmbedProps`](https://portal.thirdweb.com/references/typescript/v5/ConnectEmbedProps) type for more details
 *
 * @returns A JSX element that renders the <ConnectEmbed> component.
 * @component
 * @walletConnection
 */
function ConnectEmbed(props) {
    const activeWallet = (0, useActiveWallet_js_1.useActiveWallet)();
    const activeAccount = (0, useActiveAccount_js_1.useActiveAccount)();
    const siweAuth = (0, useSiweAuth_js_1.useSiweAuth)(activeWallet, activeAccount, props.auth);
    const show = !activeAccount || (siweAuth.requiresAuth && !siweAuth.isLoggedIn);
    const connectionManager = (0, connection_manager_js_1.useConnectionManager)();
    // Add props.chain and props.chains to defined chains store
    (0, react_1.useEffect)(() => {
        if (props.chain) {
            connectionManager.defineChains([props.chain]);
        }
    }, [props.chain, connectionManager]);
    (0, react_1.useEffect)(() => {
        if (props.chains) {
            connectionManager.defineChains(props.chains);
        }
    }, [props.chains, connectionManager]);
    const wallets = (0, react_1.useMemo)(() => props.wallets ||
        (0, defaultWallets_js_1.getDefaultWallets)({
            appMetadata: props.appMetadata,
            chains: props.chains,
        }), [props.wallets, props.appMetadata, props.chains]);
    const localeId = props.locale || "en_US";
    const localeQuery = (0, getConnectLocale_js_1.useConnectLocale)(localeId);
    (0, usePreloadWalletProviders_js_1.usePreloadWalletProviders)({
        wallets,
    });
    const modalSize = (0, react_1.useMemo)(() => {
        return !(0, canFitWideModal_js_1.canFitWideModal)() || wallets.length === 1
            ? "compact"
            : props.modalSize || "compact";
    }, [wallets.length, props.modalSize]);
    const meta = (0, react_1.useMemo)(() => {
        return {
            privacyPolicyUrl: props.privacyPolicyUrl,
            requireApproval: props.requireApproval,
            showThirdwebBranding: props.showThirdwebBranding !== false,
            termsOfServiceUrl: props.termsOfServiceUrl,
            title: undefined,
            titleIconUrl: undefined,
        };
    }, [
        props.privacyPolicyUrl,
        props.showThirdwebBranding,
        props.termsOfServiceUrl,
        props.requireApproval,
    ]);
    const preferredChain = props.accountAbstraction?.chain || props.chain || props.chains?.[0];
    const autoConnectComp = props.autoConnect !== false && ((0, jsx_runtime_1.jsx)(AutoConnect_js_1.AutoConnect, { accountAbstraction: props.accountAbstraction, appMetadata: props.appMetadata, chain: preferredChain, client: props.client, onConnect: props.onConnect, siweAuth: siweAuth, timeout: typeof props.autoConnect === "boolean"
            ? undefined
            : props.autoConnect?.timeout, wallets: wallets }));
    if (show) {
        if (!localeQuery.data) {
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [autoConnectComp, (0, jsx_runtime_1.jsx)(CustomThemeProvider_js_1.CustomThemeProvider, { theme: props.theme, children: (0, jsx_runtime_1.jsx)(exports.EmbedContainer, { modalSize: modalSize, className: (0, cls_js_1.cls)("tw-widget-loading", props.className), style: props.style, children: (0, jsx_runtime_1.jsx)(LoadingScreen_js_1.LoadingScreen, {}) }) })] }));
        }
        return ((0, jsx_runtime_1.jsxs)(wallet_ui_states_provider_js_1.WalletUIStatesProvider, { isOpen: true, theme: props.theme, children: [(0, jsx_runtime_1.jsx)(ConnectEmbedContent, { accountAbstraction: props.accountAbstraction, auth: props.auth, chain: preferredChain, chains: props.chains, className: props.className, client: props.client, connectLocale: localeQuery.data, header: props.header, hiddenWallets: props.hiddenWallets, localeId: props.locale || "en_US", meta: meta, modalSize: modalSize, onConnect: props.onConnect, recommendedWallets: props.recommendedWallets, showAllWallets: props.showAllWallets, size: modalSize, style: props.style, walletConnect: props.walletConnect, wallets: wallets, welcomeScreen: props.welcomeScreen }), autoConnectComp] }));
    }
    return (0, jsx_runtime_1.jsx)("div", { children: autoConnectComp });
}
/**
 * @internal
 */
const ConnectEmbedContent = (props) => {
    // const requiresSignIn = false;
    const screenSetup = (0, screen_js_1.useSetupScreen)({
        size: props.size,
        wallets: props.wallets,
        welcomeScreen: undefined,
    });
    const { setScreen, initialScreen, screen } = screenSetup;
    const activeWallet = (0, useActiveWallet_js_1.useActiveWallet)();
    const activeAccount = (0, useActiveAccount_js_1.useActiveAccount)();
    const siweAuth = (0, useSiweAuth_js_1.useSiweAuth)(activeWallet, activeAccount, props.auth);
    const isAutoConnecting = (0, useIsAutoConnecting_js_1.useIsAutoConnecting)();
    let content = null;
    // if sign in is required but connect embed is showing the initial screen - change to sign in screen
    (0, react_1.useEffect)(() => {
        if (siweAuth.requiresAuth &&
            !siweAuth.isLoggedIn &&
            activeAccount &&
            screen === initialScreen) {
            setScreen(constants_js_1.reservedScreens.signIn);
        }
    }, [siweAuth, setScreen, activeAccount, screen, initialScreen]);
    const modalSize = !(0, canFitWideModal_js_1.canFitWideModal)()
        ? "compact"
        : props.modalSize || "compact";
    // show spinner on page load and during auto connecting a wallet
    if (isAutoConnecting) {
        content = (0, jsx_runtime_1.jsx)(LoadingScreen_js_1.LoadingScreen, {});
    }
    else {
        content = ((0, jsx_runtime_1.jsx)(ConnectModalContent_js_1.ConnectModalContent, { accountAbstraction: props.accountAbstraction, auth: props.auth, chain: props.chain, chains: props.chains, client: props.client, connectLocale: props.connectLocale, hideHeader: !props.header, isOpen: true, meta: {
                ...props.meta,
                title: typeof props.header === "object" ? props.header.title : undefined,
                titleIconUrl: typeof props.header === "object"
                    ? props.header.titleIcon
                    : undefined,
            }, modalHeader: undefined, onClose: () => {
                setScreen(initialScreen);
            }, onConnect: props.onConnect, recommendedWallets: props.recommendedWallets, screenSetup: screenSetup, setModalVisibility: () => {
                // no op
            }, shouldSetActive: true, showAllWallets: props.showAllWallets, size: props.size, walletConnect: props.walletConnect, walletIdsToHide: props.hiddenWallets, wallets: props.wallets, welcomeScreen: props.welcomeScreen }));
    }
    return ((0, jsx_runtime_1.jsx)(exports.EmbedContainer, { className: props.className, modalSize: modalSize, style: props.style, children: modalSize === "wide" ? (content) : ((0, jsx_runtime_1.jsxs)(DynamicHeight_js_1.DynamicHeight, { children: [" ", content, " "] })) }));
};
exports.EmbedContainer = (0, elements_js_1.StyledDiv)((props) => {
    const { modalSize } = props;
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        "& *": {
            boxSizing: "border-box",
        },
        "& *::selection": {
            backgroundColor: theme.colors.selectedTextBg,
            color: theme.colors.selectedTextColor,
        },
        background: theme.colors.modalBg,
        border: `1px solid ${theme.colors.borderColor}`,
        borderRadius: index_js_1.radius.xl,
        boxSizing: "border-box",
        color: theme.colors.primaryText,
        fontFamily: theme.fontFamily,
        height: modalSize === "compact" ? "auto" : constants_js_1.wideModalMaxHeight,
        lineHeight: "normal",
        overflow: "hidden",
        position: "relative",
        maxWidth: "100%",
        width: modalSize === "compact" ? constants_js_1.modalMaxWidthCompact : constants_js_1.modalMaxWidthWide,
    };
});
//# sourceMappingURL=ConnectEmbed.js.map