"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateInAppWalletConnector = getOrCreateInAppWalletConnector;
exports.createInAppWallet = createInAppWallet;
const connect_js_1 = require("../../../../analytics/track/connect.js");
const utils_js_1 = require("../../../../chains/utils.js");
const json_js_1 = require("../../../../utils/json.js");
const get_ecosystem_wallet_auth_options_js_1 = require("../../../ecosystem/get-ecosystem-wallet-auth-options.js");
const wallet_emitter_js_1 = require("../../../wallet-emitter.js");
const connectorCache = new Map();
/**
 * @internal
 */
async function getOrCreateInAppWalletConnector(client, connectorFactory, ecosystem) {
    const key = (0, json_js_1.stringify)({
        clientId: client.clientId,
        ecosystem,
        partialSecretKey: client.secretKey?.slice(0, 5),
    });
    if (connectorCache.has(key)) {
        return connectorCache.get(key);
    }
    const connector = await connectorFactory(client);
    connectorCache.set(key, connector);
    return connector;
}
/**
 * @internal
 */
function createInAppWallet(args) {
    const { createOptions: _createOptions, connectorFactory, ecosystem } = args;
    const walletId = ecosystem ? ecosystem.id : "inApp";
    const emitter = (0, wallet_emitter_js_1.createWalletEmitter)();
    let createOptions = _createOptions;
    let account;
    let adminAccount; // Admin account if smartAccountOptions were provided with connection
    let chain;
    let client;
    let authToken = null;
    const resolveSmartAccountOptionsFromEcosystem = async (options) => {
        if (ecosystem) {
            const ecosystemOptions = await (0, get_ecosystem_wallet_auth_options_js_1.getEcosystemInfo)(ecosystem.id);
            const smartAccountOptions = ecosystemOptions?.smartAccountOptions;
            if (smartAccountOptions) {
                const executionMode = ecosystemOptions.smartAccountOptions.executionMode;
                if (executionMode === "EIP7702") {
                    createOptions = {
                        ...createOptions,
                        executionMode: {
                            mode: "EIP7702",
                            sponsorGas: smartAccountOptions.sponsorGas,
                        },
                    };
                }
                else {
                    // default to 4337
                    const { defaultChainId } = ecosystemOptions.smartAccountOptions;
                    const preferredChain = options?.chain ??
                        (defaultChainId ? (0, utils_js_1.getCachedChain)(defaultChainId) : undefined);
                    if (!preferredChain) {
                        throw new Error(`A chain must be provided either via 'chain' in connect options or 'defaultChainId' in ecosystem configuration. Please pass it via connect() or update the ecosystem configuration.`);
                    }
                    createOptions = {
                        ...createOptions,
                        smartAccount: {
                            chain: preferredChain,
                            factoryAddress: smartAccountOptions.accountFactoryAddress,
                            sponsorGas: smartAccountOptions.sponsorGas,
                        },
                    };
                }
            }
        }
    };
    return {
        autoConnect: async (options) => {
            const { autoConnectInAppWallet } = await Promise.resolve().then(() => require("./index.js"));
            const connector = await getOrCreateInAppWalletConnector(options.client, connectorFactory, ecosystem);
            await resolveSmartAccountOptionsFromEcosystem();
            const { account: connectedAccount, chain: connectedChain, adminAccount: _adminAccount, } = await autoConnectInAppWallet(options, createOptions, connector);
            // set the states
            client = options.client;
            account = connectedAccount;
            adminAccount = _adminAccount;
            chain = connectedChain;
            try {
                authToken = await connector.storage.getAuthCookie();
            }
            catch (error) {
                console.error("Failed to retrieve auth token:", error);
                authToken = null;
            }
            (0, connect_js_1.trackConnect)({
                chainId: chain.id,
                client: options.client,
                ecosystem,
                walletAddress: account.address,
                walletType: walletId,
            });
            // return only the account
            return account;
        },
        connect: async (options) => {
            const { connectInAppWallet } = await Promise.resolve().then(() => require("./index.js"));
            const connector = await getOrCreateInAppWalletConnector(options.client, connectorFactory, ecosystem);
            await resolveSmartAccountOptionsFromEcosystem();
            const { account: connectedAccount, chain: connectedChain, adminAccount: _adminAccount, } = await connectInAppWallet(options, createOptions, connector);
            // set the states
            client = options.client;
            account = connectedAccount;
            adminAccount = _adminAccount;
            chain = connectedChain;
            try {
                authToken = await connector.storage.getAuthCookie();
            }
            catch (error) {
                console.error("Failed to retrieve auth token:", error);
                authToken = null;
            }
            (0, connect_js_1.trackConnect)({
                chainId: chain.id,
                client: options.client,
                ecosystem,
                walletAddress: account.address,
                walletType: walletId,
            });
            // return only the account
            return account;
        },
        disconnect: async () => {
            // If no client is assigned, we should be fine just unsetting the states
            if (client) {
                const connector = await getOrCreateInAppWalletConnector(client, connectorFactory, ecosystem);
                const result = await connector.logout();
                if (!result.success) {
                    throw new Error("Failed to logout");
                }
            }
            account = undefined;
            adminAccount = undefined;
            chain = undefined;
            authToken = null;
            emitter.emit("disconnect", undefined);
        },
        getAccount: () => account,
        getAdminAccount: () => adminAccount,
        getAuthToken: () => authToken,
        getChain() {
            if (!chain) {
                return undefined;
            }
            chain = (0, utils_js_1.getCachedChainIfExists)(chain.id) || chain;
            return chain;
        },
        getConfig: () => createOptions,
        id: walletId,
        subscribe: emitter.subscribe,
        switchChain: async (newChain) => {
            if ((createOptions?.smartAccount ||
                createOptions?.executionMode?.mode === "EIP4337") &&
                client &&
                account) {
                // if account abstraction is enabled, reconnect to smart account on the new chain
                const { autoConnectInAppWallet } = await Promise.resolve().then(() => require("./index.js"));
                const connector = await getOrCreateInAppWalletConnector(client, connectorFactory, ecosystem);
                await resolveSmartAccountOptionsFromEcosystem({ chain: newChain });
                const { account: connectedAccount, chain: connectedChain, adminAccount: _adminAccount, } = await autoConnectInAppWallet({
                    chain: newChain,
                    client,
                }, createOptions, connector);
                adminAccount = _adminAccount;
                account = connectedAccount;
                chain = connectedChain;
            }
            else {
                // if not, simply set the new chain
                chain = newChain;
            }
            emitter.emit("chainChanged", newChain);
        },
    };
}
//# sourceMappingURL=in-app-core.js.map