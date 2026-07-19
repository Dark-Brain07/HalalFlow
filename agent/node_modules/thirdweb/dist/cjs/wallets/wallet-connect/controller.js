"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWalletConnect = isWalletConnect;
exports.connectWC = connectWC;
exports.autoConnectWC = autoConnectWC;
const viem_1 = require("viem");
const transaction_js_1 = require("../../analytics/track/transaction.js");
const utils_js_1 = require("../../chains/utils.js");
const address_js_1 = require("../../utils/address.js");
const hex_js_1 = require("../../utils/encoding/hex.js");
const json_js_1 = require("../../utils/json.js");
const parse_typed_data_js_1 = require("../../utils/signatures/helpers/parse-typed-data.js");
const walletStorage_js_1 = require("../../utils/storage/walletStorage.js");
const url_js_1 = require("../../utils/url.js");
const getWalletInfo_js_1 = require("../__generated__/getWalletInfo.js");
const defaultDappMetadata_js_1 = require("../utils/defaultDappMetadata.js");
const normalizeChainId_js_1 = require("../utils/normalizeChainId.js");
const constants_js_1 = require("./constants.js");
let cachedProvider = null;
const storageKeys = {
    lastUsedChainId: "tw.wc.lastUsedChainId",
    requestedChains: "tw.wc.requestedChains",
};
/**
 * Checks if the provided wallet is a Wallet Connect wallet.
 *
 * @param wallet - The wallet to check.
 * @returns True if the wallet is a Wallet Connect wallet, false otherwise.
 */
function isWalletConnect(wallet) {
    return wallet.id === "walletConnect";
}
/**
 * @internal
 */
async function connectWC(options, emitter, walletId, storage, sessionHandler) {
    const provider = await initProvider(options, walletId, sessionHandler);
    const wcOptions = options.walletConnect;
    let { onDisplayUri } = wcOptions || {};
    const walletInfo = await (0, getWalletInfo_js_1.getWalletInfo)(walletId);
    // use default sessionHandler unless onDisplayUri is explicitly provided
    if (!onDisplayUri && sessionHandler) {
        const deeplinkHandler = (uri) => {
            const appUrl = walletInfo.mobile.native || walletInfo.mobile.universal;
            if (!appUrl) {
                // generic wc uri
                sessionHandler(uri);
                return;
            }
            const fullUrl = (0, url_js_1.formatWalletConnectUrl)(appUrl, uri).redirect;
            sessionHandler(fullUrl);
        };
        onDisplayUri = deeplinkHandler;
    }
    if (onDisplayUri) {
        provider.events.addListener("display_uri", onDisplayUri);
    }
    let optionalChains = wcOptions?.optionalChains;
    const chainToRequest = options.chain;
    // ignore the given options chains - and set the safe supported chains
    if (walletId === "global.safe") {
        optionalChains = chainsToRequestForSafe.map(utils_js_1.getCachedChain);
    }
    // For UniversalProvider, we still need chain configuration for session management
    const { chains: chainsToRequest, rpcMap } = getChainsToRequest({
        chain: chainToRequest,
        client: options.client,
        optionalChains: optionalChains,
    });
    // For UniversalProvider, we need to connect with namespaces
    await provider.connect({
        ...(wcOptions?.pairingTopic
            ? { pairingTopic: wcOptions?.pairingTopic }
            : {}),
        optionalNamespaces: {
            [constants_js_1.NAMESPACE]: {
                chains: chainsToRequest,
                events: ["chainChanged", "accountsChanged"],
                methods: [
                    "eth_sendTransaction",
                    "eth_signTransaction",
                    "eth_sign",
                    "personal_sign",
                    "eth_signTypedData",
                    "eth_signTypedData_v4",
                    "wallet_switchEthereumChain",
                    "wallet_addEthereumChain",
                ],
                rpcMap,
            },
        },
    });
    setRequestedChainsIds(chainsToRequest.map((x) => Number(x.split(":")[1])), storage);
    const currentChainId = chainsToRequest[0]?.split(":")[1] || 1;
    const providerChainId = (0, normalizeChainId_js_1.normalizeChainId)(currentChainId);
    const account = firstAccountOn(provider.session, `eip155:1`); // grab the address from mainnet if available
    const address = account;
    if (!address) {
        throw new Error("No accounts found on provider.");
    }
    const chain = options.chain && options.chain.id === providerChainId
        ? options.chain
        : (0, utils_js_1.getCachedChain)(providerChainId);
    if (options) {
        const savedParams = {
            chain: options.chain,
            optionalChains: options.walletConnect?.optionalChains,
            pairingTopic: options.walletConnect?.pairingTopic,
        };
        if (storage) {
            (0, walletStorage_js_1.saveConnectParamsToStorage)(storage, walletId, savedParams);
        }
    }
    if (onDisplayUri) {
        provider.events.removeListener("display_uri", onDisplayUri);
    }
    return onConnect(address, chain, provider, emitter, storage, options.client, walletInfo, sessionHandler);
}
async function ensureTargetChain(provider, chain, walletInfo) {
    if (!provider.session) {
        throw new Error("No session found on provider.");
    }
    const TARGET_CAIP = `eip155:${chain.id}`;
    const TARGET_HEX = (0, hex_js_1.numberToHex)(chain.id);
    // Fast path: already enabled
    if (hasChainEnabled(provider.session, TARGET_CAIP)) {
        provider.setDefaultChain(TARGET_CAIP);
        return;
    }
    // 1) Try switch
    try {
        await requestAndOpenWallet({
            provider,
            payload: {
                method: "wallet_switchEthereumChain",
                params: [{ chainId: TARGET_HEX }],
            },
            chain: TARGET_CAIP, // route to target
            walletInfo,
        });
        provider.setDefaultChain(TARGET_CAIP);
        return;
    }
    catch (err) {
        const code = err?.code ?? err?.data?.originalError?.code;
        // 4001 user rejected; stop
        if (code === 4001)
            throw new Error("User rejected chain switch");
        // fall through on 4902 or unknown -> try add
    }
    // 2) Add the chain via any chain we already have
    const routeChain = anyRoutableChain(provider.session);
    if (!routeChain)
        throw new Error("No routable chain to send wallet_addEthereumChain");
    try {
        await requestAndOpenWallet({
            provider,
            payload: {
                method: "wallet_addEthereumChain",
                params: [
                    {
                        chainId: TARGET_HEX,
                        chainName: chain.name,
                        nativeCurrency: chain.nativeCurrency,
                        rpcUrls: [chain.rpc],
                        blockExplorerUrls: [chain.blockExplorers?.[0]?.url ?? ""],
                    },
                ],
            },
            chain: routeChain, // route via known-good chain, not the target
            walletInfo,
        });
    }
    catch (err) {
        const code = err?.code ?? err?.data?.originalError?.code;
        if (code === 4001)
            throw new Error("User rejected add chain");
        throw new Error(`Add chain failed: ${err?.message || String(err)}`);
    }
    // 3) Re-try switch after add
    await requestAndOpenWallet({
        provider,
        payload: {
            method: "wallet_switchEthereumChain",
            params: [{ chainId: TARGET_HEX }],
        },
        chain: TARGET_CAIP,
        walletInfo,
    });
    provider.setDefaultChain(TARGET_CAIP);
    // 4) Verify enablement
    if (!hasChainEnabled(provider.session, TARGET_CAIP)) {
        throw new Error("Target chain still not enabled by wallet");
    }
}
function getNS(session) {
    return session?.namespaces?.eip155;
}
function hasChainEnabled(session, caip) {
    const ns = getNS(session);
    return !!ns?.accounts?.some((a) => a.startsWith(`${caip}:`));
}
function firstAccountOn(session, caip) {
    const ns = getNS(session);
    const hit = ns?.accounts?.find((a) => a.startsWith(`${caip}:`)) || ns?.accounts[0];
    return hit ? (hit.split(":")[2] ?? null) : null;
}
function anyRoutableChain(session) {
    const ns = getNS(session);
    return ns?.accounts?.[0]?.split(":")?.slice(0, 2)?.join(":") ?? null; // e.g. "eip155:1"
}
/**
 * Auto connect to already connected wallet connect session.
 * @internal
 */
async function autoConnectWC(options, emitter, walletId, storage, sessionHandler) {
    const savedConnectParams = storage
        ? await (0, walletStorage_js_1.getSavedConnectParamsFromStorage)(storage, walletId)
        : null;
    const walletInfo = await (0, getWalletInfo_js_1.getWalletInfo)(walletId);
    const provider = await initProvider(savedConnectParams
        ? {
            chain: savedConnectParams.chain,
            client: options.client,
            walletConnect: {
                optionalChains: savedConnectParams.optionalChains,
                pairingTopic: savedConnectParams.pairingTopic,
            },
        }
        : {
            client: options.client,
            walletConnect: {},
        }, walletId, sessionHandler);
    if (!provider.session) {
        await provider.disconnect();
        throw new Error("No wallet connect session found on provider.");
    }
    // For UniversalProvider, get accounts from enable() method
    const namespaceAccounts = provider.session?.namespaces?.[constants_js_1.NAMESPACE]?.accounts;
    const address = namespaceAccounts?.[0]?.split(":")[2];
    if (!address) {
        throw new Error("No accounts found on provider.");
    }
    // For UniversalProvider, get chainId from the session namespaces or use default
    const currentChainId = options.chain?.id || 1;
    const providerChainId = (0, normalizeChainId_js_1.normalizeChainId)(currentChainId);
    const chain = options.chain && options.chain.id === providerChainId
        ? options.chain
        : (0, utils_js_1.getCachedChain)(providerChainId);
    return onConnect(address, chain, provider, emitter, storage, options.client, walletInfo, sessionHandler);
}
// Connection utils -----------------------------------------------------------------------------------------------
async function initProvider(options, walletId, sessionRequestHandler) {
    if (cachedProvider) {
        return cachedProvider;
    }
    const walletInfo = await (0, getWalletInfo_js_1.getWalletInfo)(walletId);
    const wcOptions = options.walletConnect;
    const { UniversalProvider } = await Promise.resolve().then(() => require("@walletconnect/universal-provider"));
    const provider = await UniversalProvider.init({
        metadata: {
            description: wcOptions?.appMetadata?.description ||
                (0, defaultDappMetadata_js_1.getDefaultAppMetadata)().description,
            icons: [
                wcOptions?.appMetadata?.logoUrl || (0, defaultDappMetadata_js_1.getDefaultAppMetadata)().logoUrl,
            ],
            name: wcOptions?.appMetadata?.name || (0, defaultDappMetadata_js_1.getDefaultAppMetadata)().name,
            url: wcOptions?.appMetadata?.url || (0, defaultDappMetadata_js_1.getDefaultAppMetadata)().url,
            redirect: {
                native: walletInfo.mobile.native || undefined,
                universal: walletInfo.mobile.universal || undefined,
            },
        },
        projectId: wcOptions?.projectId || constants_js_1.DEFAULT_PROJECT_ID,
    });
    provider.events.setMaxListeners(Number.POSITIVE_INFINITY);
    if (walletId !== "walletConnect") {
        async function handleSessionRequest() {
            const walletLinkToOpen = provider.session?.peer?.metadata?.redirect?.native ||
                walletInfo.mobile.native ||
                walletInfo.mobile.universal;
            if (sessionRequestHandler && walletLinkToOpen) {
                // TODO: propagate error when this fails
                await sessionRequestHandler(walletLinkToOpen);
            }
        }
        // For UniversalProvider, use different event handling
        provider.on("session_request_sent", handleSessionRequest);
        provider.events.addListener("disconnect", () => {
            provider.off("session_request_sent", handleSessionRequest);
            cachedProvider = null;
        });
    }
    cachedProvider = provider;
    return provider;
}
function createAccount({ provider, address, client, chain, sessionRequestHandler, walletInfo, }) {
    const account = {
        address: (0, address_js_1.getAddress)(address),
        async sendTransaction(tx) {
            const transactionHash = (await requestAndOpenWallet({
                provider,
                payload: {
                    method: "eth_sendTransaction",
                    params: [
                        {
                            data: tx.data,
                            from: (0, address_js_1.getAddress)(address),
                            gas: tx.gas ? (0, hex_js_1.numberToHex)(tx.gas) : undefined,
                            to: tx.to,
                            value: tx.value ? (0, hex_js_1.numberToHex)(tx.value) : undefined,
                        },
                    ],
                },
                chain: `eip155:${tx.chainId}`,
                walletInfo,
                sessionRequestHandler,
            }));
            (0, transaction_js_1.trackTransaction)({
                chainId: tx.chainId,
                client: client,
                contractAddress: tx.to ?? undefined,
                gasPrice: tx.gasPrice,
                transactionHash,
                walletAddress: (0, address_js_1.getAddress)(address),
                walletType: "walletConnect",
            });
            return {
                transactionHash,
            };
        },
        async signMessage({ message }) {
            const messageToSign = (() => {
                if (typeof message === "string") {
                    return (0, hex_js_1.stringToHex)(message);
                }
                if (message.raw instanceof Uint8Array) {
                    return (0, hex_js_1.uint8ArrayToHex)(message.raw);
                }
                return message.raw;
            })();
            return requestAndOpenWallet({
                provider,
                payload: {
                    method: "personal_sign",
                    params: [messageToSign, this.address],
                },
                chain: `eip155:${chain.id}`,
                walletInfo,
                sessionRequestHandler,
            });
        },
        async signTypedData(_data) {
            const data = (0, parse_typed_data_js_1.parseTypedData)(_data);
            const { domain, message, primaryType } = data;
            const types = {
                EIP712Domain: (0, viem_1.getTypesForEIP712Domain)({ domain }),
                ...data.types,
            };
            // Need to do a runtime validation check on addresses, byte ranges, integer ranges, etc
            // as we can't statically check this with TypeScript.
            (0, viem_1.validateTypedData)({ domain, message, primaryType, types });
            const typedData = (0, viem_1.serializeTypedData)({
                domain: domain ?? {},
                message,
                primaryType,
                types,
            });
            return await requestAndOpenWallet({
                provider,
                payload: {
                    method: "eth_signTypedData_v4",
                    params: [this.address, typedData],
                },
                chain: `eip155:${chain.id}`,
                walletInfo,
                sessionRequestHandler,
            });
        },
    };
    return account;
}
async function requestAndOpenWallet(args) {
    const { provider, payload, chain, walletInfo, sessionRequestHandler } = args;
    const resultPromise = provider.request(payload, chain);
    const walletLinkToOpen = provider.session?.peer?.metadata?.redirect?.native ||
        walletInfo.mobile.native ||
        walletInfo.mobile.universal;
    if (sessionRequestHandler && walletLinkToOpen) {
        await sessionRequestHandler(walletLinkToOpen);
    }
    return resultPromise;
}
function onConnect(address, chain, provider, emitter, storage, client, walletInfo, sessionRequestHandler) {
    const account = createAccount({
        address,
        chain,
        client,
        provider,
        sessionRequestHandler,
        walletInfo,
    });
    async function disconnect() {
        provider.removeListener("accountsChanged", onAccountsChanged);
        provider.removeListener("chainChanged", onChainChanged);
        provider.removeListener("disconnect", onDisconnect);
        await provider.disconnect();
        cachedProvider = null;
    }
    function onDisconnect() {
        setRequestedChainsIds([], storage);
        storage?.removeItem(storageKeys.lastUsedChainId);
        disconnect();
        emitter.emit("disconnect", undefined);
    }
    function onAccountsChanged(accounts) {
        if (accounts[0]) {
            const newAccount = createAccount({
                address: (0, address_js_1.getAddress)(accounts[0]),
                chain,
                client,
                provider,
                sessionRequestHandler,
                walletInfo,
            });
            emitter.emit("accountChanged", newAccount);
            emitter.emit("accountsChanged", accounts);
        }
        else {
            onDisconnect();
        }
    }
    function onChainChanged(newChainId) {
        const newChain = (0, utils_js_1.getCachedChain)((0, normalizeChainId_js_1.normalizeChainId)(newChainId));
        emitter.emit("chainChanged", newChain);
        storage?.setItem(storageKeys.lastUsedChainId, String(newChainId));
    }
    provider.on("accountsChanged", onAccountsChanged);
    provider.on("chainChanged", onChainChanged);
    provider.on("disconnect", onDisconnect);
    provider.on("session_delete", onDisconnect);
    return [
        account,
        chain,
        disconnect,
        (newChain) => switchChainWC(provider, newChain, walletInfo),
    ];
}
async function switchChainWC(provider, chain, walletInfo) {
    try {
        await ensureTargetChain(provider, chain, walletInfo);
    }
    catch (error) {
        const message = typeof error === "string" ? error : error?.message;
        if (/user rejected request/i.test(message)) {
            throw new viem_1.UserRejectedRequestError(error);
        }
        throw new viem_1.SwitchChainError(error);
    }
}
/**
 * Set the requested chains to the storage.
 * @internal
 */
function setRequestedChainsIds(chains, storage) {
    storage?.setItem(storageKeys.requestedChains, (0, json_js_1.stringify)(chains));
}
function getChainsToRequest(options) {
    const rpcMap = {};
    const chainIds = [];
    if (options.chain) {
        rpcMap[options.chain.id] = (0, utils_js_1.getRpcUrlForChain)({
            chain: options.chain,
            client: options.client,
        });
        chainIds.push(options.chain.id);
    }
    // limit optional chains to 10
    const optionalChains = (options?.optionalChains || []).slice(0, 10);
    for (const chain of optionalChains) {
        rpcMap[chain.id] = (0, utils_js_1.getRpcUrlForChain)({
            chain: chain,
            client: options.client,
        });
        chainIds.push(chain.id);
    }
    // always include mainnet
    // many wallets only support a handful of chains, but mainnet is always supported
    // we will add additional chains in switchChain if needed
    if (!chainIds.includes(1)) {
        rpcMap[1] = (0, utils_js_1.getCachedChain)(1).rpc;
        chainIds.push(1);
    }
    return {
        chains: chainIds.map((x) => `eip155:${x}`),
        rpcMap,
    };
}
const chainsToRequestForSafe = [
    1, // Ethereum Mainnet
    11155111, // Sepolia Testnet
    42161, // Arbitrum One Mainnet
    43114, // Avalanche Mainnet
    8453, // Base Mainnet
    1313161554, // Aurora Mainnet
    84532, // Base Sepolia Testnet
    56, // Binance Smart Chain Mainnet
    42220, // Celo Mainnet
    100, // Gnosis Mainnet
    10, // Optimism Mainnet
    137, // Polygon Mainnet
    1101, // Polygon zkEVM Mainnet
    324, // zkSync Era mainnet
    534352, // Scroll mainnet
    80094, // Berachain mainnet
];
//# sourceMappingURL=controller.js.map