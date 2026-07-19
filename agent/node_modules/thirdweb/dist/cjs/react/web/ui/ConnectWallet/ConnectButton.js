"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectButton = ConnectButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_1 = require("@emotion/styled");
const react_1 = require("react");
const defaultWallets_js_1 = require("../../../../wallets/defaultWallets.js");
const provider_js_1 = require("../../../core/account/provider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const useSiweAuth_js_1 = require("../../../core/hooks/auth/useSiweAuth.js");
const useActiveAccount_js_1 = require("../../../core/hooks/wallets/useActiveAccount.js");
const useActiveWallet_js_1 = require("../../../core/hooks/wallets/useActiveWallet.js");
const useActiveWalletConnectionStatus_js_1 = require("../../../core/hooks/wallets/useActiveWalletConnectionStatus.js");
const connection_manager_js_1 = require("../../../core/providers/connection-manager.js");
const defaultTokens_js_1 = require("../../../core/utils/defaultTokens.js");
const wallet_ui_states_provider_js_1 = require("../../providers/wallet-ui-states-provider.js");
const canFitWideModal_js_1 = require("../../utils/canFitWideModal.js");
const usePreloadWalletProviders_js_1 = require("../../utils/usePreloadWalletProviders.js");
const AutoConnect_js_1 = require("../AutoConnect/AutoConnect.js");
const basic_js_1 = require("../components/basic.js");
const buttons_js_1 = require("../components/buttons.js");
const Modal_js_1 = require("../components/Modal.js");
const Spinner_js_1 = require("../components/Spinner.js");
const animations_js_1 = require("../design-system/animations.js");
const Details_js_1 = require("./Details.js");
const LockIcon_js_1 = require("./icons/LockIcon.js");
const getConnectLocale_js_1 = require("./locale/getConnectLocale.js");
const ConnectModal_js_1 = require("./Modal/ConnectModal.js");
const SignatureScreen_js_1 = require("./screens/SignatureScreen.js");
const TW_CONNECT_WALLET = "tw-connect-wallet";
/**
 * A fully featured wallet connection component that allows to:
 *
 * - Connect to 500+ external wallets
 * - Connect with email, phone, passkey or socials
 * - Convert any wallet to a ERC4337 smart wallet for gasless transactions
 * - Sign in with ethereum (Auth)
 *
 * Once connected, the component allows to:
 *
 * - Resolve ENS names and avatars
 * - Manage multiple connected wallets
 * - Send and receive native tokens and ERC20 tokens
 * - View ERC20 tokens and NFTs
 * - Onramp, bridge and swap tokens
 * - Switch chains
 * - Connect to another app with WalletConnect
 *
 * @example
 *
 * ## Default setup
 *
 * ```tsx
 * import { createThirdwebClient } from "thirdweb";
 * import { ConnectButton } from "thirdweb/react";
 *
 * const client = createThirdwebClient({ clientId: "YOUR_CLIENT_ID" });
 *
 * <ConnectButton
 *    client={client}
 * />
 * ```
 *
 * [View all available config options](https://portal.thirdweb.com/references/typescript/v5/ConnectButtonProps)
 *
 * ## Customization options
 *
 * ### Customizing wallet options
 *
 * ```tsx
 * <ConnectButton
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
 * ### Customizing the default chain to connect to
 *
 * ```tsx
 * import { sepolia } from "thirdweb/chains";
 *
 * <ConnectButton
 *   client={client}
 *   chain={sepolia}
 * />
 * ```
 *
 * ### Enabling Account Abstraction
 *
 * By passing the `accountAbstraction` prop, ALL connected wallets will be converted to smart accounts.
 * And by setting `sponsorGas` to `true`, all transactions done with those smart accounts will be sponsored.
 *
 * ```tsx
 * <ConnectButton
 * client={client}
 * accountAbstraction={{
 *   chain: sepolia,
 *   sponsorGas: true,
 * }}
 * />;
 * ```
 *
 * Note that this prop doesn't affect ecosystem wallets. Ecosystem wallets will only be converted to smart accounts if the ecosystem owner has enabled account abstraction.
 *
 * ### Enabling sign in with ethereum (Auth)
 *
 * ```tsx
 * <ConnectButton
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
 * <ConnectButton
 *    client={client}
 *    theme="light"
 * />
 * ```
 *
 * For more granular control, you can also pass a custom theme object:
 *
 * ```tsx
 * <ConnectButton
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
 * ### Customizing the connect button UI
 *
 * ```tsx
 * <ConnectButton
 *    client={client}
 *    connectButton={{
 *      label: "Sign in to MyApp",
 *    }}
 * />
 * ```
 *
 * ### Customizing the modal UI
 *
 * ```tsx
 * <ConnectButton
 *    client={client}
 *    connectModal={{
 *      title: "Sign in to MyApp",
 *      titleIcon: "https://example.com/logo.png",
 *      size: "compact",
 *    }}
 * />
 * ```
 *
 * ### Customizing details button UI (after connecting)
 *
 * ```tsx
 * <ConnectButton
 *    client={client}
 *    detailsButton={{
 *      displayBalanceToken: {
 *        [sepolia.id]: "0x...", // token address to display balance for
 *        [ethereum.id]: "0x...", // token address to display balance for
 *      },
 *    }}
 * />
 * ```
 *
 * [View all available auth helper functions](https://portal.thirdweb.com/references/typescript/v5/createAuth)
 *
 * ### Customizing the Auth sign in button (after connecting, but before authenticating)
 *
 * ```tsx
 * <ConnectButton
 *   client={client}
 *   auth={{ ... }}
 *   signInButton: {
 *     label: "Authenticate with MyApp",
 *   },
 * }}
 * />;
 * ```
 *
 * ### Customizing supported Tokens and NFTs
 *
 * These tokens and NFTs will be shown in the modal when the user clicks "View Assets", as well as the send token screen.
 *
 * ```tsx
 * <ConnectButton
 *   client={client}
 *   supportedTokens={{
 *     [ethereum.id]: [
 *       {
 *         address: "0x...",
 *         name: "MyToken",
 *         symbol: "MT",
 *         icon: "https://example.com/icon.png",
 *       },
 *     ],
 *   }}
 *   supportedNFTs={{
 *     [ethereum.id]: [
 *       "0x...", // nft contract address
 *     ],
 *   }}
 * />
 * ```
 *
 * ### Customizing the orders of the tabs in the [View Funds] screen
 * When you click on "View Assets", by default the "Tokens" tab is shown first.
 * If you want to show the "NFTs" tab first, change the order of the asset tabs to: ["nft", "token"]
 * Note: If an empty array is passed, the [View Funds] button will be hidden
 *
 * ```tsx
 * <ConnectButton
 *   client={client}
 *   detailsModal={{
 *     assetTabs: ["nft", "token"],
 *   }}
 * />
 * ```
 *
 * ### Callback for when the details modal is closed
 * ```tsx
 * <ConnectButton
 *   detailsModal={{
 *     onClose: (screen: string) => {
 *       console.log({ screen });
 *     }
 *   }}
 * />
 * ```
 *
 * @param props
 * Props for the `ConnectButton` component
 *
 * Refer to [ConnectButtonProps](https://portal.thirdweb.com/references/typescript/v5/ConnectButtonProps) to see the available props.
 *
 * @returns A JSX element that renders the <ConnectButton> component.
 *
 * @component
 * @walletConnection
 */
function ConnectButton(props) {
    const wallets = (0, react_1.useMemo)(() => props.wallets ||
        (0, defaultWallets_js_1.getDefaultWallets)({
            appMetadata: props.appMetadata,
            chains: props.chains,
            executionMode: props.accountAbstraction
                ? {
                    mode: "EIP4337",
                    smartAccount: props.accountAbstraction,
                }
                : undefined,
        }), [props.wallets, props.appMetadata, props.chains, props.accountAbstraction]);
    const localeQuery = (0, getConnectLocale_js_1.useConnectLocale)(props.locale || "en_US");
    const connectionManager = (0, connection_manager_js_1.useConnectionManager)();
    const activeAccount = (0, useActiveAccount_js_1.useActiveAccount)();
    const activeWallet = (0, useActiveWallet_js_1.useActiveWallet)();
    const siweAuth = (0, useSiweAuth_js_1.useSiweAuth)(activeWallet, activeAccount, props.auth);
    const hiddenWallets = props.hiddenWallets || props.detailsModal?.hiddenWallets;
    (0, usePreloadWalletProviders_js_1.usePreloadWalletProviders)({
        wallets,
    });
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
    const size = (0, react_1.useMemo)(() => {
        return !(0, canFitWideModal_js_1.canFitWideModal)() || wallets.length === 1
            ? "compact"
            : props.connectModal?.size || "compact";
    }, [wallets.length, props.connectModal?.size]);
    const preferredChain = props.accountAbstraction?.chain || props.chain || props.chains?.[0];
    const autoConnectComp = props.autoConnect !== false && ((0, jsx_runtime_1.jsx)(AutoConnect_js_1.AutoConnect, { accountAbstraction: props.accountAbstraction, appMetadata: props.appMetadata, chain: preferredChain, client: props.client, onConnect: props.onConnect, siweAuth: siweAuth, timeout: typeof props.autoConnect === "boolean"
            ? undefined
            : props.autoConnect?.timeout, wallets: wallets }));
    if (!localeQuery.data) {
        const combinedClassName = `${props.connectButton?.className || ""} ${TW_CONNECT_WALLET}`;
        return ((0, jsx_runtime_1.jsxs)(AnimatedButton, { className: combinedClassName, disabled: true, style: {
                height: "50px",
                minWidth: "165px",
                ...props.connectButton?.style,
            }, type: "button", variant: "primary", children: [autoConnectComp, (0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { color: "primaryButtonText", size: "sm" })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(wallet_ui_states_provider_js_1.WalletUIStatesProvider, { isOpen: false, theme: props.theme, children: [(0, jsx_runtime_1.jsx)(ConnectButtonInner, { ...props, connectLocale: localeQuery.data, siweAuth: siweAuth }), (0, jsx_runtime_1.jsx)(ConnectModal_js_1.default, { accountAbstraction: props.accountAbstraction, auth: props.auth, chain: preferredChain, chains: props.chains, client: props.client, connectLocale: localeQuery.data, hiddenWallets: hiddenWallets, localeId: props.locale || "en_US", meta: {
                    privacyPolicyUrl: props.connectModal?.privacyPolicyUrl,
                    requireApproval: props.connectModal?.requireApproval,
                    showThirdwebBranding: props.connectModal?.showThirdwebBranding,
                    termsOfServiceUrl: props.connectModal?.termsOfServiceUrl,
                    title: props.connectModal?.title,
                    titleIconUrl: props.connectModal?.titleIcon,
                }, onConnect: props.onConnect, recommendedWallets: props.recommendedWallets, shouldSetActive: true, showAllWallets: props.showAllWallets, size: size, walletConnect: props.walletConnect, wallets: wallets, welcomeScreen: props.connectModal?.welcomeScreen }), autoConnectComp] }));
}
function ConnectButtonInner(props) {
    const siweAuth = props.siweAuth;
    const activeAccount = (0, useActiveAccount_js_1.useActiveAccount)();
    const [showSignatureModal, setShowSignatureModal] = (0, react_1.useState)(false);
    const hiddenWallets = props.hiddenWallets || props.detailsModal?.hiddenWallets;
    // if wallet gets disconnected suddently, close the signature modal if it's open
    (0, react_1.useEffect)(() => {
        if (!activeAccount) {
            setShowSignatureModal(false);
        }
    }, [activeAccount]);
    const theme = props.theme || "dark";
    const connectionStatus = (0, useActiveWalletConnectionStatus_js_1.useActiveWalletConnectionStatus)();
    const locale = props.connectLocale;
    const isLoading = connectionStatus === "connecting";
    const connectButtonLabel = props.connectButton?.label || locale.defaultButtonTitle;
    const setIsWalletModalOpen = (0, wallet_ui_states_provider_js_1.useSetIsWalletModalOpen)();
    const supportedTokens = (0, react_1.useMemo)(() => {
        if (!props.supportedTokens) {
            return undefined;
        }
        const tokens = { ...defaultTokens_js_1.defaultTokens };
        for (const k in props.supportedTokens) {
            const key = Number(k);
            const tokenList = props.supportedTokens[key];
            if (tokenList) {
                tokens[key] = tokenList;
            }
        }
        return tokens;
    }, [props.supportedTokens]);
    if (!activeAccount) {
        // Connect Wallet button
        const combinedClassName = `${props.connectButton?.className || ""} ${TW_CONNECT_WALLET}`;
        return ((0, jsx_runtime_1.jsx)(AnimatedButton, { "aria-label": connectionStatus === "connecting"
                ? locale.connecting
                : typeof connectButtonLabel === "string"
                    ? connectButtonLabel
                    : locale.defaultButtonTitle, className: combinedClassName, "data-is-loading": isLoading, "data-test": "connect-wallet-button", "data-theme": theme, disabled: isLoading, onClick: () => {
                setIsWalletModalOpen(true);
            }, style: {
                fontSize: "16px",
                height: "50px",
                minWidth: "165px",
                ...props.connectButton?.style,
            }, type: "button", variant: "primary", children: isLoading ? ((0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { color: "primaryButtonText", size: "sm" })) : (connectButtonLabel) }));
    }
    if (siweAuth.requiresAuth) {
        // loading state if loading
        // TODO: figure out a way to consolidate the loading states with the ones from locale loading
        if (siweAuth.isPending || siweAuth.isLoggingIn || siweAuth.isLoggingOut) {
            const combinedClassName = `${props.connectButton?.className || ""} ${TW_CONNECT_WALLET}`;
            return ((0, jsx_runtime_1.jsx)(AnimatedButton, { className: combinedClassName, disabled: true, style: {
                    height: "50px",
                    minWidth: "165px",
                    ...props.connectButton?.style,
                }, type: "button", variant: "primary", children: (0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { color: "primaryButtonText", size: "sm" }) }));
        }
        // sign in button + modal if *not* loading and *not* logged in
        if (!siweAuth.isLoggedIn) {
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(buttons_js_1.Button, { className: props.signInButton?.className, onClick: () => {
                            setShowSignatureModal(true);
                        }, style: {
                            minHeight: "50px",
                            minWidth: "165px",
                            ...props.signInButton?.style,
                        }, type: "button", variant: "primary", children: siweAuth.isLoggingIn ? ((0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { color: "primaryButtonText", size: "sm" })) : ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", gap: "sm", children: [(0, jsx_runtime_1.jsx)(LockIcon_js_1.LockIcon, { size: index_js_1.iconSize.sm }), (0, jsx_runtime_1.jsxs)("span", { children: [" ", props.signInButton?.label || locale.signIn, " "] })] })) }), (0, jsx_runtime_1.jsx)(Modal_js_1.Modal, { className: "tw-modal__sign-in", title: "Sign in", open: showSignatureModal, setOpen: setShowSignatureModal, size: "compact", children: (0, jsx_runtime_1.jsx)(SignatureScreen_js_1.SignatureScreen, { auth: props.auth, client: props.client, connectLocale: locale, modalSize: "compact", onDone: () => setShowSignatureModal(false), privacyPolicyUrl: props.connectModal?.privacyPolicyUrl, termsOfServiceUrl: props.connectModal?.termsOfServiceUrl }) })] }));
        }
        // otherwise, show the details button
    }
    return ((0, jsx_runtime_1.jsx)(provider_js_1.AccountProvider, { address: activeAccount.address, client: props.client, children: (0, jsx_runtime_1.jsx)(Details_js_1.ConnectedWalletDetails, { chain: props.chain, chains: props?.chains || [], client: props.client, connectLocale: locale, connectOptions: {
                accountAbstraction: props.accountAbstraction,
                appMetadata: props.appMetadata,
                chain: props.chain,
                chains: props.chains,
                connectModal: props.connectModal,
                hiddenWallets: hiddenWallets,
                recommendedWallets: props.recommendedWallets,
                showAllWallets: props.showAllWallets,
                walletConnect: props.walletConnect,
                wallets: props.wallets,
            }, detailsButton: props.detailsButton, detailsModal: {
                ...props.detailsModal,
                hiddenWallets: hiddenWallets,
            }, onDisconnect: (info) => {
                // logout on explicit disconnect!
                if (siweAuth.requiresAuth) {
                    siweAuth.doLogout();
                }
                props.onDisconnect?.(info);
            }, supportedNFTs: props.supportedNFTs, supportedTokens: supportedTokens, switchButton: props.switchButton, theme: theme }) }));
}
const AnimatedButton = /* @__PURE__ */ (0, styled_1.default)(buttons_js_1.Button)({
    animation: `${animations_js_1.fadeInAnimation} 300ms ease`,
});
//# sourceMappingURL=ConnectButton.js.map