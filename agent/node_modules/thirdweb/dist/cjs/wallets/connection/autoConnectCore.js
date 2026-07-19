"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoConnectCore = void 0;
exports.handleWalletConnection = handleWalletConnection;
const timeoutPromise_js_1 = require("../../utils/timeoutPromise.js");
const is_ecosystem_wallet_js_1 = require("../ecosystem/is-ecosystem-wallet.js");
const client_scoped_storage_js_1 = require("../in-app/core/authentication/client-scoped-storage.js");
const linkAccount_js_1 = require("../in-app/core/authentication/linkAccount.js");
const is_in_app_signer_js_1 = require("../in-app/core/wallet/is-in-app-signer.js");
const get_url_token_js_1 = require("../in-app/web/lib/get-url-token.js");
const index_js_1 = require("../manager/index.js");
let lastAutoConnectionResultPromise;
/**
 * @internal
 */
const autoConnectCore = async (props) => {
    // if an auto connect was attempted already
    if (lastAutoConnectionResultPromise && !props.force) {
        // wait for its resolution
        const lastResult = await lastAutoConnectionResultPromise;
        // if it was successful, return true
        // if not continue with the new auto connect
        if (lastResult) {
            return true;
        }
    }
    const resultPromise = _autoConnectCore(props);
    lastAutoConnectionResultPromise = resultPromise;
    return resultPromise;
};
exports.autoConnectCore = autoConnectCore;
const _autoConnectCore = async ({ storage, props, createWalletFn, manager, connectOverride, setLastAuthProvider, }) => {
    const { wallets, onConnect } = props;
    const timeout = props.timeout ?? 15000;
    let autoConnected = false;
    manager.isAutoConnecting.setValue(true);
    let [lastConnectedWalletIds, lastActiveWalletId] = await Promise.all([
        (0, index_js_1.getStoredConnectedWalletIds)(storage),
        (0, index_js_1.getStoredActiveWalletId)(storage),
    ]);
    const urlToken = (0, get_url_token_js_1.getUrlToken)();
    // Handle linking flow: autoconnect with stored credentials, then link the new profile
    if (urlToken?.authFlow === "link" && urlToken.authResult) {
        const linkingResult = await handleLinkingFlow({
            client: props.client,
            connectOverride,
            createWalletFn,
            manager,
            onConnect,
            props,
            setLastAuthProvider,
            storage,
            timeout,
            urlToken,
            wallets,
        });
        return linkingResult;
    }
    // If an auth cookie is found and this site supports the wallet, we'll set the auth cookie in the client storage
    const wallet = wallets.find((w) => w.id === urlToken?.walletId);
    if (urlToken?.authCookie && wallet) {
        const clientStorage = new client_scoped_storage_js_1.ClientScopedStorage({
            clientId: props.client.clientId,
            ecosystem: (0, is_ecosystem_wallet_js_1.isEcosystemWallet)(wallet)
                ? {
                    id: wallet.id,
                    partnerId: wallet.getConfig()?.partnerId,
                }
                : undefined,
            storage,
        });
        await clientStorage.saveAuthCookie(urlToken.authCookie);
    }
    if (urlToken?.walletId) {
        lastActiveWalletId = urlToken.walletId;
        lastConnectedWalletIds = lastConnectedWalletIds?.includes(urlToken.walletId)
            ? lastConnectedWalletIds
            : [urlToken.walletId, ...(lastConnectedWalletIds || [])];
    }
    if (urlToken?.authProvider) {
        await setLastAuthProvider?.(urlToken.authProvider, storage);
    }
    // if no wallets were last connected or we didn't receive an auth token
    if (!lastConnectedWalletIds) {
        return autoConnected;
    }
    // this flow can actually be used for a first connection in the case of a redirect
    // in that case, we default to the passed chain to connect to
    const lastConnectedChain = (await (0, index_js_1.getLastConnectedChain)(storage)) || props.chain;
    const availableWallets = lastConnectedWalletIds.map((id) => {
        const specifiedWallet = wallets.find((w) => w.id === id);
        if (specifiedWallet) {
            return specifiedWallet;
        }
        return createWalletFn(id);
    });
    const activeWallet = lastActiveWalletId &&
        (availableWallets.find((w) => w.id === lastActiveWalletId) ||
            createWalletFn(lastActiveWalletId));
    if (activeWallet) {
        manager.activeWalletConnectionStatusStore.setValue("connecting"); // only set connecting status if we are connecting the last active EOA
        await (0, timeoutPromise_js_1.timeoutPromise)(handleWalletConnection({
            authResult: urlToken?.authResult,
            client: props.client,
            lastConnectedChain,
            wallet: activeWallet,
        }), {
            message: `AutoConnect timeout: ${timeout}ms limit exceeded.`,
            ms: timeout,
        }).catch((err) => {
            console.warn(err.message);
            if (props.onTimeout) {
                props.onTimeout();
            }
        });
        try {
            // connected wallet could be activeWallet or smart wallet
            await (connectOverride
                ? connectOverride(activeWallet)
                : manager.connect(activeWallet, {
                    accountAbstraction: props.accountAbstraction,
                    client: props.client,
                }));
        }
        catch (e) {
            if (e instanceof Error) {
                console.warn("Error auto connecting wallet:", e.message);
            }
            manager.activeWalletConnectionStatusStore.setValue("disconnected");
        }
    }
    else {
        manager.activeWalletConnectionStatusStore.setValue("disconnected");
    }
    // then connect wallets that were last connected but were not set as active
    const otherWallets = availableWallets.filter((w) => w.id !== lastActiveWalletId && lastConnectedWalletIds.includes(w.id));
    for (const wallet of otherWallets) {
        try {
            await handleWalletConnection({
                authResult: urlToken?.authResult,
                client: props.client,
                lastConnectedChain,
                wallet,
            });
            manager.addConnectedWallet(wallet);
        }
        catch {
            // no-op
        }
    }
    // Auto-login with SIWE
    const isIAW = activeWallet &&
        (0, is_in_app_signer_js_1.isInAppSigner)({
            connectedWallets: activeWallet
                ? [activeWallet, ...otherWallets]
                : otherWallets,
            wallet: activeWallet,
        });
    if (isIAW &&
        props.siweAuth?.requiresAuth &&
        !props.siweAuth?.isLoggedIn &&
        !props.siweAuth?.isLoggingIn) {
        await props.siweAuth?.doLogin().catch((err) => {
            console.warn("Error signing in with SIWE:", err.message);
        });
    }
    manager.isAutoConnecting.setValue(false);
    const connectedActiveWallet = manager.activeWalletStore.getValue();
    const allConnectedWallets = manager.connectedWallets.getValue();
    if (connectedActiveWallet) {
        autoConnected = true;
        try {
            onConnect?.(connectedActiveWallet, allConnectedWallets);
        }
        catch (e) {
            console.error("Error calling onConnect callback:", e);
        }
    }
    else {
        manager.activeWalletConnectionStatusStore.setValue("disconnected");
    }
    return autoConnected; // useQuery needs a return value
};
/**
 * Handles the linking flow when returning from an OAuth redirect with authFlow=link.
 * This autoconnects using stored credentials, then links the new profile from the URL token.
 * @internal
 */
async function handleLinkingFlow(params) {
    const { client, connectOverride, createWalletFn, manager, onConnect, props, setLastAuthProvider, storage, timeout, urlToken, wallets, } = params;
    // Get stored wallet credentials (not from URL)
    const [storedConnectedWalletIds, storedActiveWalletId] = await Promise.all([
        (0, index_js_1.getStoredConnectedWalletIds)(storage),
        (0, index_js_1.getStoredActiveWalletId)(storage),
    ]);
    const lastConnectedChain = (await (0, index_js_1.getLastConnectedChain)(storage)) || props.chain;
    if (!storedActiveWalletId || !storedConnectedWalletIds) {
        console.warn("No stored wallet found for linking flow");
        manager.isAutoConnecting.setValue(false);
        return false;
    }
    // Update auth provider if provided
    if (urlToken.authProvider) {
        await setLastAuthProvider?.(urlToken.authProvider, storage);
    }
    // Find or create the active wallet from stored credentials
    const activeWallet = wallets.find((w) => w.id === storedActiveWalletId) ||
        createWalletFn(storedActiveWalletId);
    // Autoconnect WITHOUT the URL token (use stored credentials)
    manager.activeWalletConnectionStatusStore.setValue("connecting");
    try {
        await (0, timeoutPromise_js_1.timeoutPromise)(handleWalletConnection({
            authResult: undefined, // Don't use URL token for connection
            client,
            lastConnectedChain,
            wallet: activeWallet,
        }), {
            message: `AutoConnect timeout: ${timeout}ms limit exceeded.`,
            ms: timeout,
        });
        await (connectOverride
            ? connectOverride(activeWallet)
            : manager.connect(activeWallet, {
                accountAbstraction: props.accountAbstraction,
                client,
            }));
    }
    catch (e) {
        console.warn("Failed to auto-connect for linking:", e);
        manager.activeWalletConnectionStatusStore.setValue("disconnected");
        manager.isAutoConnecting.setValue(false);
        return false;
    }
    // Now link the new profile using URL auth token
    const ecosystem = (0, is_ecosystem_wallet_js_1.isEcosystemWallet)(activeWallet)
        ? {
            id: activeWallet.id,
            partnerId: activeWallet.getConfig()?.partnerId,
        }
        : undefined;
    const clientStorage = new client_scoped_storage_js_1.ClientScopedStorage({
        clientId: client.clientId,
        ecosystem,
        storage,
    });
    try {
        await (0, linkAccount_js_1.linkAccount)({
            client,
            ecosystem,
            storage: clientStorage,
            tokenToLink: urlToken.authResult.storedToken.cookieString,
        });
    }
    catch (e) {
        console.error("Failed to link profile after redirect:", e);
        // Continue - user is still connected, just linking failed
    }
    manager.isAutoConnecting.setValue(false);
    const connectedWallet = manager.activeWalletStore.getValue();
    const allConnectedWallets = manager.connectedWallets.getValue();
    if (connectedWallet) {
        try {
            onConnect?.(connectedWallet, allConnectedWallets);
        }
        catch (e) {
            console.error("Error calling onConnect callback:", e);
        }
        return true;
    }
    return false;
}
/**
 * @internal
 */
async function handleWalletConnection(props) {
    return props.wallet.autoConnect({
        authResult: props.authResult,
        chain: props.lastConnectedChain,
        client: props.client,
    });
}
//# sourceMappingURL=autoConnectCore.js.map