"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWallet = createWallet;
exports.walletConnect = walletConnect;
const connect_js_1 = require("../analytics/track/connect.js");
const utils_js_1 = require("../chains/utils.js");
const webStorage_js_1 = require("../utils/storage/webStorage.js");
const url_js_1 = require("../utils/url.js");
const isMobile_js_1 = require("../utils/web/isMobile.js");
const openWindow_js_1 = require("../utils/web/openWindow.js");
const getWalletInfo_js_1 = require("./__generated__/getWalletInfo.js");
const base_account_wallet_js_1 = require("./base-account/base-account-wallet.js");
const base_account_web_js_1 = require("./base-account/base-account-web.js");
const coinbase_wallet_js_1 = require("./coinbase/coinbase-wallet.js");
const coinbase_web_js_1 = require("./coinbase/coinbase-web.js");
const constants_js_1 = require("./constants.js");
const is_ecosystem_wallet_js_1 = require("./ecosystem/is-ecosystem-wallet.js");
const ecosystem_js_1 = require("./in-app/web/ecosystem.js");
const in_app_js_1 = require("./in-app/web/in-app.js");
const index_js_1 = require("./injected/index.js");
const smart_wallet_js_1 = require("./smart/smart-wallet.js");
const wallet_emitter_js_1 = require("./wallet-emitter.js");
// TODO: figure out how to define the type without tuple args type and using function overloads
/**
 * Creates a wallet based on the provided ID and arguments.
 *
 * - Supports 500+ wallets
 * - Handles both injected browser wallets and WalletConnect sessions
 *
 * [View all available wallets](https://portal.thirdweb.com/typescript/v5/supported-wallets)
 *
 * @param args - The arguments for creating the wallet.
 * @param args.id - The ID of the wallet to create, this will be autocompleted by your IDE.
 * [View all available wallets](https://portal.thirdweb.com/typescript/v5/supported-wallets)
 * @param args.createOptions - The options for creating the wallet.
 * The arguments are different for each wallet type.
 * Refer to the [WalletCreationOptions](https://portal.thirdweb.com/references/typescript/v5/WalletCreationOptions) type for more details.
 * @returns - The created wallet.
 * @example
 *
 * ## Connecting the wallet
 *
 * Once created, you can connect the wallet to your app by calling the `connect` method.
 *
 * The `connect` method returns a promise that resolves to the connected account.
 *
 * Each wallet type can have different connect options. [View the different connect options](https://portal.thirdweb.com/references/typescript/v5/WalletConnectionOption)
 *
 * ## Connecting to an injected wallet
 *
 * ```ts
 * import { createWallet } from "thirdweb/wallets";
 *
 * const metamaskWallet = createWallet("io.metamask");
 *
 * const account = await metamaskWallet.connect({
 *  client,
 * });
 * ```
 *
 * You can check if a wallet is installed by calling the [injectedProvider](https://portal.thirdweb.com/references/typescript/v5/injectedProvider) method.
 *
 * ## Connecting via WalletConnect modal
 *
 * ```ts
 * import { createWallet } from "thirdweb/wallets";
 *
 * const metamaskWallet = createWallet("io.metamask");
 *
 * await metamask.connect({
 *   client,
 *   walletConnect: {
 *     projectId: "YOUR_PROJECT_ID",
 *     showQrModal: true,
 *     appMetadata: {
 *       name: "My App",
 *       url: "https://my-app.com",
 *       description: "my app description",
 *       logoUrl: "https://path/to/my-app/logo.svg",
 *     },
 *   },
 * });
 * ```
 * [View ConnectWallet connection options](https://portal.thirdweb.com/references/typescript/v5/WCConnectOptions)
 *
 * ## Connecting with coinbase wallet
 *
 * ```ts
 * import { createWallet } from "thirdweb/wallets";
 *
 * const cbWallet = createWallet("com.coinbase.wallet", {
 *   appMetadata: {
 *     name: "My App",
 *     url: "https://my-app.com",
 *     description: "my app description",
 *     logoUrl: "https://path/to/my-app/logo.svg",
 *   },
 *   walletConfig: {
 *     // options: 'all' | 'smartWalletOnly' | 'eoaOnly'
 *     options: 'all',
 *   },
 * });
 *
 * const account = await cbWallet.connect({
 *  client,
 * });
 * ```
 *
 * [View Coinbase wallet creation options](https://portal.thirdweb.com/references/typescript/v5/CoinbaseWalletCreationOptions)
 *
 * ## Connecting with Base Account SDK
 *
 * ```ts
 * import { createWallet } from "thirdweb/wallets";
 * import { base, baseSepolia } from "thirdweb/chains";
 *
 * // For mainnet
 * const baseWallet = createWallet("org.base.account", {
 *   appMetadata: {
 *     name: "My App",
 *     url: "https://my-app.com",
 *     description: "my app description",
 *     logoUrl: "https://path/to/my-app/logo.svg",
 *   },
 *   chains: [base], // specify supported chains (use baseSepolia for testnet)
 * });
 *
 * const account = await baseWallet.connect({
 *  client,
 * });
 * ```
 *
 * [View Base Account wallet creation options](https://portal.thirdweb.com/references/typescript/v5/BaseAccountWalletCreationOptions)
 *
 * ## Connecting with a smart wallet
 *
 * ```ts
 * import { createWallet } from "thirdweb/wallets";
 *
 * const wallet = createWallet("smart", {
 *   chain: sepolia,
 *   sponsorGas: true,
 * });
 *
 * const account = await wallet.connect({
 *  client,
 *  personalAccount, // pass the admin account
 * });
 * ```
 *
 * @wallet
 */
function createWallet(...args) {
    const [id, creationOptions] = args;
    switch (true) {
        /**
         * SMART WALLET
         */
        case id === "smart": {
            return (0, smart_wallet_js_1.smartWallet)(creationOptions);
        }
        /**
         * IN-APP WALLET
         */
        case id === "embedded" || id === "inApp": {
            return (0, in_app_js_1.inAppWallet)(creationOptions);
        }
        /**
         * ECOSYSTEM WALLET
         */
        case (0, is_ecosystem_wallet_js_1.isEcosystemWallet)(id):
            return (0, ecosystem_js_1.ecosystemWallet)(...args);
        /**
         * COINBASE WALLET VIA SDK
         * -> if no injected coinbase found, we'll use the coinbase SDK
         */
        case id === constants_js_1.COINBASE: {
            const options = creationOptions;
            return (0, coinbase_wallet_js_1.coinbaseWalletSDK)({
                createOptions: options,
                onConnectRequested: async (provider) => {
                    // on the web, make sure to show the coinbase popup IMMEDIATELY on connection requested
                    // otherwise the popup might get blocked in safari
                    // TODO awaiting the provider is fast only thanks to preloading that happens in our components
                    // these probably need to actually imported / created synchronously to be used headless properly
                    const { showCoinbasePopup } = await Promise.resolve().then(() => require("./coinbase/utils.js"));
                    return showCoinbasePopup(provider);
                },
                providerFactory: () => (0, coinbase_web_js_1.getCoinbaseWebProvider)(options),
            });
        }
        /**
         * BASE ACCOUNT SDK WALLET
         * -> uses the new @base-org/account SDK for Base smart wallet integration
         */
        case id === constants_js_1.BASE_ACCOUNT: {
            const options = creationOptions;
            return (0, base_account_wallet_js_1.baseAccountWalletSDK)({
                createOptions: options,
                providerFactory: () => (0, base_account_web_js_1.getBaseAccountWebProvider)(options),
            });
        }
        /**
         * WALLET CONNECT AND INJECTED WALLETS + walletConnect standalone
         */
        default: {
            const emitter = (0, wallet_emitter_js_1.createWalletEmitter)();
            let account;
            let chain;
            let unsubscribeChain;
            function reset() {
                account = undefined;
                chain = undefined;
            }
            let handleDisconnect = async () => { };
            const unsubscribeDisconnect = emitter.subscribe("disconnect", () => {
                reset();
                unsubscribeChain?.();
                unsubscribeDisconnect();
            });
            emitter.subscribe("accountChanged", (_account) => {
                account = _account;
            });
            let handleSwitchChain = async () => {
                throw new Error("Not implemented yet");
            };
            // on mobile, deeplink to the wallet app for session handling
            const sessionHandler = (0, isMobile_js_1.isMobile)()
                ? (uri) => (0, openWindow_js_1.openWindow)(uri)
                : undefined;
            const wallet = {
                autoConnect: async (options) => {
                    const { injectedProvider } = await Promise.resolve().then(() => require("./injected/mipdStore.js"));
                    // injected wallet priority for autoConnect
                    if (id !== "walletConnect" && injectedProvider(id)) {
                        const { autoConnectEip1193Wallet } = await Promise.resolve().then(() => require("./injected/index.js"));
                        const [connectedAccount, connectedChain, doDisconnect, doSwitchChain,] = await autoConnectEip1193Wallet({
                            chain: options.chain,
                            client: options.client,
                            emitter,
                            id: id,
                            provider: (0, index_js_1.getInjectedProvider)(id),
                        });
                        // set the states
                        account = connectedAccount;
                        chain = connectedChain;
                        handleDisconnect = doDisconnect;
                        handleSwitchChain = doSwitchChain;
                        unsubscribeChain = emitter.subscribe("chainChanged", (newChain) => {
                            chain = newChain;
                        });
                        (0, connect_js_1.trackConnect)({
                            chainId: chain.id,
                            client: options.client,
                            walletAddress: account.address,
                            walletType: id,
                        });
                        // return account
                        return account;
                    }
                    if (options && "client" in options) {
                        const { autoConnectWC } = await Promise.resolve().then(() => require("./wallet-connect/controller.js"));
                        const [connectedAccount, connectedChain, doDisconnect, doSwitchChain,] = await autoConnectWC(options, emitter, wallet.id, webStorage_js_1.webLocalStorage, sessionHandler);
                        // set the states
                        account = connectedAccount;
                        chain = connectedChain;
                        handleDisconnect = doDisconnect;
                        handleSwitchChain = doSwitchChain;
                        (0, connect_js_1.trackConnect)({
                            chainId: chain.id,
                            client: options.client,
                            walletAddress: account.address,
                            walletType: id,
                        });
                        // return account
                        return account;
                    }
                    throw new Error("Failed to auto connect");
                },
                connect: async (options) => {
                    async function wcConnect(wcOptions) {
                        const { connectWC } = await Promise.resolve().then(() => require("./wallet-connect/controller.js"));
                        let qrOverlay;
                        try {
                            const [connectedAccount, connectedChain, doDisconnect, doSwitchChain,] = await connectWC({
                                ...wcOptions,
                                walletConnect: {
                                    ...wcOptions.walletConnect,
                                    onDisplayUri: wcOptions.walletConnect?.onDisplayUri ||
                                        (async (uri) => {
                                            // Check if we're in a browser environment
                                            if (typeof window !== "undefined" &&
                                                typeof document !== "undefined") {
                                                // on mobile, open the wallet app via deeplink
                                                if ((0, isMobile_js_1.isMobile)()) {
                                                    const walletInfo = await (0, getWalletInfo_js_1.getWalletInfo)(id);
                                                    const mobileAppLink = walletInfo.mobile.native ||
                                                        walletInfo.mobile.universal;
                                                    if (mobileAppLink) {
                                                        (0, openWindow_js_1.openWindow)((0, url_js_1.formatWalletConnectUrl)(mobileAppLink, uri)
                                                            .redirect);
                                                    }
                                                    else {
                                                        // on android, wc:// links show the app picker
                                                        (0, openWindow_js_1.openWindow)(uri);
                                                    }
                                                    return;
                                                }
                                                // on desktop, create a QR overlay
                                                else {
                                                    try {
                                                        const { createQROverlay } = await Promise.resolve().then(() => require("./wallet-connect/qr-overlay.js"));
                                                        // Clean up any existing overlay
                                                        if (qrOverlay) {
                                                            qrOverlay.destroy();
                                                        }
                                                        // Create new QR overlay
                                                        qrOverlay = createQROverlay(uri, {
                                                            theme: wcOptions.walletConnect?.qrModalOptions
                                                                ?.themeMode ?? "dark",
                                                            qrSize: 280,
                                                            showCloseButton: true,
                                                            onCancel: () => {
                                                                wcOptions.walletConnect?.onCancel?.();
                                                            },
                                                        });
                                                    }
                                                    catch (error) {
                                                        console.error("Failed to create QR overlay:", error);
                                                    }
                                                }
                                            }
                                        }),
                                },
                            }, emitter, wallet.id, webStorage_js_1.webLocalStorage, sessionHandler);
                            // Clean up QR overlay on successful connection
                            if (qrOverlay) {
                                qrOverlay.destroy();
                                qrOverlay = undefined;
                            }
                            // set the states
                            account = connectedAccount;
                            chain = connectedChain;
                            handleDisconnect = doDisconnect;
                            handleSwitchChain = doSwitchChain;
                            (0, connect_js_1.trackConnect)({
                                chainId: chain.id,
                                client: wcOptions.client,
                                walletAddress: account.address,
                                walletType: id,
                            });
                            return account;
                        }
                        catch (error) {
                            // Clean up QR overlay on connection error
                            if (qrOverlay) {
                                qrOverlay.destroy();
                                qrOverlay = undefined;
                            }
                            throw error;
                        }
                    }
                    if (id === "walletConnect") {
                        const { client, chain: _chain, ...walletConnectOptions } = options;
                        return wcConnect({
                            chain: _chain,
                            client,
                            walletConnect: {
                                ...walletConnectOptions,
                            },
                        });
                    }
                    // prefer walletconnect over injected if explicitely passing walletConnect options
                    const forceWalletConnectOption = options && "walletConnect" in options;
                    const { injectedProvider } = await Promise.resolve().then(() => require("./injected/mipdStore.js"));
                    if (injectedProvider(id) && !forceWalletConnectOption) {
                        const { connectEip1193Wallet } = await Promise.resolve().then(() => require("./injected/index.js"));
                        const [connectedAccount, connectedChain, doDisconnect, doSwitchChain,] = await connectEip1193Wallet({
                            chain: options.chain,
                            client: options.client,
                            emitter,
                            id: id,
                            provider: (0, index_js_1.getInjectedProvider)(id),
                        });
                        // set the states
                        account = connectedAccount;
                        chain = connectedChain;
                        handleDisconnect = doDisconnect;
                        handleSwitchChain = doSwitchChain;
                        unsubscribeChain = emitter.subscribe("chainChanged", (newChain) => {
                            chain = newChain;
                        });
                        (0, connect_js_1.trackConnect)({
                            chainId: chain.id,
                            client: options.client,
                            walletAddress: account.address,
                            walletType: id,
                        });
                        // return account
                        return account;
                    }
                    if (options && "client" in options) {
                        return wcConnect(options);
                    }
                    throw new Error("Failed to connect");
                },
                // these get overridden in connect and autoConnect
                disconnect: async () => {
                    reset();
                    await handleDisconnect();
                },
                getAccount: () => account,
                getChain() {
                    if (!chain) {
                        return undefined;
                    }
                    chain = (0, utils_js_1.getCachedChainIfExists)(chain.id) || chain;
                    return chain;
                },
                getConfig: () => args[1],
                id,
                subscribe: emitter.subscribe,
                switchChain: async (c) => {
                    // TODO: this should actually throw an error if the chain switch fails
                    // but our useSwitchActiveWalletChain hook currently doesn't handle this
                    try {
                        await handleSwitchChain(c);
                        chain = c;
                    }
                    catch (e) {
                        console.error("Error switching chain", e);
                    }
                },
            };
            return wallet;
        }
    }
}
/**
 * Creates a wallet that allows connecting to any wallet that supports the WalletConnect protocol.
 * @returns The created smart wallet.
 * @example
 * ```ts
 * import { walletConnect } from "thirdweb/wallets";
 *
 * const wallet = walletConnect();
 *
 * const account = await wallet.connect({
 *  client
 * });
 * ```
 * @wallet
 */
function walletConnect() {
    return createWallet("walletConnect");
}
//# sourceMappingURL=create-wallet.js.map