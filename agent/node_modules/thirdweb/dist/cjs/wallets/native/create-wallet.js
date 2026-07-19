"use strict";
// TODO: figure out how to define the type without tuple args type and using function overloads
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWallet = createWallet;
exports.walletConnect = walletConnect;
const react_native_1 = require("react-native");
const connect_js_1 = require("../../analytics/track/connect.js");
const utils_js_1 = require("../../chains/utils.js");
const nativeStorage_js_1 = require("../../utils/storage/nativeStorage.js");
const coinbase_mobile_js_1 = require("../coinbase/coinbase-mobile.js");
const coinbase_wallet_js_1 = require("../coinbase/coinbase-wallet.js");
const constants_js_1 = require("../constants.js");
const is_ecosystem_wallet_js_1 = require("../ecosystem/is-ecosystem-wallet.js");
const ecosystem_js_1 = require("../in-app/native/ecosystem.js");
const in_app_js_1 = require("../in-app/native/in-app.js");
const smart_wallet_js_1 = require("../smart/smart-wallet.js");
const wallet_emitter_js_1 = require("../wallet-emitter.js");
/**
 * Creates a wallet based on the provided ID and arguments.
 * @param args - The arguments for creating the wallet.
 * @returns - The created wallet.
 * @example
 * ```ts
 * import { createWallet } from "thirdweb/wallets";
 *
 * const metamaskWallet = createWallet("io.metamask");
 *
 * const account = await metamaskWallet.connect({
 *  client,
 * });
 * ```
 * @wallet
 */
function createWallet(...args) {
    const [id, creationOptions] = args;
    switch (true) {
        /**
         * SMART WALLET
         */
        case id === "smart": {
            // same as web
            return (0, smart_wallet_js_1.smartWallet)(creationOptions);
        }
        /**
         * IN-APP WALLET
         */
        case id === "embedded":
        case id === "inApp": {
            return (0, in_app_js_1.inAppWallet)(creationOptions);
        }
        /**
         * ECOSYSTEM WALLETS
         */
        case (0, is_ecosystem_wallet_js_1.isEcosystemWallet)(id): {
            return (0, ecosystem_js_1.ecosystemWallet)(...args);
        }
        /**
         * COINBASE WALLET VIA SDK
         * -> if no injected coinbase found, we'll use the coinbase SDK
         */
        case id === constants_js_1.COINBASE: {
            const options = creationOptions;
            return (0, coinbase_wallet_js_1.coinbaseWalletSDK)({
                createOptions: options,
                providerFactory: () => (0, coinbase_mobile_js_1.getCoinbaseMobileProvider)(options),
            });
        }
        /**
         * WALLET CONNECT only in react native for everything else
         */
        default: {
            const emitter = (0, wallet_emitter_js_1.createWalletEmitter)();
            let account;
            let chain;
            const unsubscribeChain = emitter.subscribe("chainChanged", (newChain) => {
                chain = newChain;
            });
            function reset() {
                account = undefined;
                chain = undefined;
            }
            let handleDisconnect = async () => { };
            const unsubscribeDisconnect = emitter.subscribe("disconnect", () => {
                reset();
                unsubscribeChain();
                unsubscribeDisconnect();
            });
            emitter.subscribe("accountChanged", (_account) => {
                account = _account;
            });
            let handleSwitchChain = async () => {
                throw new Error("Not implemented yet");
            };
            const sessionHandler = async (uri) => {
                try {
                    await react_native_1.Linking.openURL(uri);
                }
                catch {
                    console.error(`Failed to open URI: ${uri} - is the app installed?`);
                    // TODO: figure out how to propage this error to the UI
                    throw new Error(`Failed to open URI: ${uri} - is the app installed?`);
                }
            };
            const wallet = {
                autoConnect: async (options) => {
                    if (options && "client" in options) {
                        const { autoConnectWC } = await Promise.resolve().then(() => require("../wallet-connect/controller.js"));
                        const [connectedAccount, connectedChain, doDisconnect, doSwitchChain,] = await autoConnectWC(options, emitter, wallet.id, nativeStorage_js_1.nativeLocalStorage, sessionHandler);
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
                        const { connectWC } = await Promise.resolve().then(() => require("../wallet-connect/controller.js"));
                        const [connectedAccount, connectedChain, doDisconnect, doSwitchChain,] = await connectWC(wcOptions, emitter, wallet.id, nativeStorage_js_1.nativeLocalStorage, sessionHandler);
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