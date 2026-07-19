// TODO: figure out how to define the type without tuple args type and using function overloads
import { Linking } from "react-native";
import { trackConnect } from "../../analytics/track/connect.js";
import { getCachedChainIfExists } from "../../chains/utils.js";
import { nativeLocalStorage } from "../../utils/storage/nativeStorage.js";
import { getCoinbaseMobileProvider } from "../coinbase/coinbase-mobile.js";
import { coinbaseWalletSDK } from "../coinbase/coinbase-wallet.js";
import { COINBASE } from "../constants.js";
import { isEcosystemWallet } from "../ecosystem/is-ecosystem-wallet.js";
import { ecosystemWallet } from "../in-app/native/ecosystem.js";
import { inAppWallet } from "../in-app/native/in-app.js";
import { smartWallet } from "../smart/smart-wallet.js";
import { createWalletEmitter } from "../wallet-emitter.js";
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
export function createWallet(...args) {
    const [id, creationOptions] = args;
    switch (true) {
        /**
         * SMART WALLET
         */
        case id === "smart": {
            // same as web
            return smartWallet(creationOptions);
        }
        /**
         * IN-APP WALLET
         */
        case id === "embedded":
        case id === "inApp": {
            return inAppWallet(creationOptions);
        }
        /**
         * ECOSYSTEM WALLETS
         */
        case isEcosystemWallet(id): {
            return ecosystemWallet(...args);
        }
        /**
         * COINBASE WALLET VIA SDK
         * -> if no injected coinbase found, we'll use the coinbase SDK
         */
        case id === COINBASE: {
            const options = creationOptions;
            return coinbaseWalletSDK({
                createOptions: options,
                providerFactory: () => getCoinbaseMobileProvider(options),
            });
        }
        /**
         * WALLET CONNECT only in react native for everything else
         */
        default: {
            const emitter = createWalletEmitter();
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
                    await Linking.openURL(uri);
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
                        const { autoConnectWC } = await import("../wallet-connect/controller.js");
                        const [connectedAccount, connectedChain, doDisconnect, doSwitchChain,] = await autoConnectWC(options, emitter, wallet.id, nativeLocalStorage, sessionHandler);
                        // set the states
                        account = connectedAccount;
                        chain = connectedChain;
                        handleDisconnect = doDisconnect;
                        handleSwitchChain = doSwitchChain;
                        trackConnect({
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
                        const { connectWC } = await import("../wallet-connect/controller.js");
                        const [connectedAccount, connectedChain, doDisconnect, doSwitchChain,] = await connectWC(wcOptions, emitter, wallet.id, nativeLocalStorage, sessionHandler);
                        // set the states
                        account = connectedAccount;
                        chain = connectedChain;
                        handleDisconnect = doDisconnect;
                        handleSwitchChain = doSwitchChain;
                        trackConnect({
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
                    chain = getCachedChainIfExists(chain.id) || chain;
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
export function walletConnect() {
    return createWallet("walletConnect");
}
//# sourceMappingURL=create-wallet.js.map