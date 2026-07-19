"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInjectedProvider = getInjectedProvider;
exports.connectEip1193Wallet = connectEip1193Wallet;
exports.autoConnectEip1193Wallet = autoConnectEip1193Wallet;
const ox__Authorization = require("ox/Authorization");
const ox__Signature = require("ox/Signature");
const viem_1 = require("viem");
const helpers_js_1 = require("../../analytics/track/helpers.js");
const transaction_js_1 = require("../../analytics/track/transaction.js");
const utils_js_1 = require("../../chains/utils.js");
const address_js_1 = require("../../utils/address.js");
const hex_js_1 = require("../../utils/encoding/hex.js");
const parse_typed_data_js_1 = require("../../utils/signatures/helpers/parse-typed-data.js");
const get_calls_status_js_1 = require("../eip5792/get-calls-status.js");
const get_capabilities_js_1 = require("../eip5792/get-capabilities.js");
const send_calls_js_1 = require("../eip5792/send-calls.js");
const chains_js_1 = require("../utils/chains.js");
const normalizeChainId_js_1 = require("../utils/normalizeChainId.js");
const mipdStore_js_1 = require("./mipdStore.js");
// TODO: save the provider in data
function getInjectedProvider(walletId) {
    const provider = (0, mipdStore_js_1.injectedProvider)(walletId);
    if (!provider) {
        throw new Error(`No injected provider found for wallet: "${walletId}"`);
    }
    return provider;
}
/**
 * @internal
 */
async function connectEip1193Wallet({ id, provider, emitter, client, chain, }) {
    let addresses;
    const retries = 3;
    let attempts = 0;
    // retry 3 times, some providers take a while to return accounts on connect
    while (!addresses?.[0] && attempts < retries) {
        try {
            addresses = await provider.request({
                method: "eth_requestAccounts",
            });
        }
        catch (e) {
            console.error(e);
            if (extractErrorMessage(e)?.toLowerCase()?.includes("rejected")) {
                throw e;
            }
            await new Promise((resolve) => setTimeout(resolve, 500));
        }
        attempts++;
    }
    const addr = addresses?.[0];
    if (!addr) {
        throw new Error("Failed to connect to wallet, no accounts available");
    }
    // use the first account
    const address = (0, address_js_1.getAddress)(addr);
    // get the chainId the provider is on
    const chainId = await provider
        .request({ method: "eth_chainId" })
        .then(normalizeChainId_js_1.normalizeChainId)
        .catch((e) => {
        throw new Error("Error reading chainId from provider", e);
    });
    let connectedChain = chain && chain.id === chainId ? chain : (0, utils_js_1.getCachedChain)(chainId);
    try {
        // if we want a specific chainId and it is not the same as the provider chainId, trigger switchChain
        // we check for undefined chain ID since some chain-specific wallets like Abstract will not send a chain ID on connection
        if (chain && typeof chain.id !== "undefined" && chain.id !== chainId) {
            await switchChain(provider, chain);
            connectedChain = chain;
        }
    }
    catch {
        console.warn(`Error switching to chain ${chain?.id} - defaulting to wallet chain (${chainId})`);
    }
    return onConnect({
        address,
        chain: connectedChain,
        client,
        emitter,
        id,
        provider,
    });
}
/**
 * @internal
 */
async function autoConnectEip1193Wallet({ id, provider, emitter, client, chain, }) {
    // connected accounts
    const addresses = await provider.request({
        method: "eth_accounts",
    });
    const addr = addresses[0];
    if (!addr) {
        throw new Error("Failed to connect to wallet, no accounts available");
    }
    // use the first account
    const address = (0, address_js_1.getAddress)(addr);
    // get the chainId the provider is on
    const chainId = await provider
        .request({ method: "eth_chainId" })
        .then(normalizeChainId_js_1.normalizeChainId);
    const connectedChain = chain && chain.id === chainId ? chain : (0, utils_js_1.getCachedChain)(chainId);
    return onConnect({
        address,
        chain: connectedChain,
        client,
        emitter,
        id,
        provider,
    });
}
function createAccount({ provider, address, client, id, }) {
    const account = {
        address: (0, address_js_1.getAddress)(address),
        async sendTransaction(tx) {
            const gasFees = tx.gasPrice
                ? {
                    gasPrice: (0, hex_js_1.numberToHex)(tx.gasPrice),
                }
                : {
                    maxFeePerGas: tx.maxFeePerGas
                        ? (0, hex_js_1.numberToHex)(tx.maxFeePerGas)
                        : undefined,
                    maxPriorityFeePerGas: tx.maxPriorityFeePerGas
                        ? (0, hex_js_1.numberToHex)(tx.maxPriorityFeePerGas)
                        : undefined,
                };
            const params = [
                {
                    ...gasFees,
                    from: this.address,
                    gas: tx.gas ? (0, hex_js_1.numberToHex)(tx.gas) : undefined,
                    nonce: tx.nonce ? (0, hex_js_1.numberToHex)(tx.nonce) : undefined,
                    to: tx.to ? (0, address_js_1.getAddress)(tx.to) : undefined,
                    data: tx.data,
                    value: tx.value ? (0, hex_js_1.numberToHex)(tx.value) : undefined,
                    authorizationList: tx.authorizationList
                        ? ox__Authorization.toRpcList(tx.authorizationList)
                        : undefined,
                    accessList: tx.accessList,
                    ...tx.eip712,
                },
            ];
            try {
                const transactionHash = (await provider.request({
                    method: "eth_sendTransaction",
                    // @ts-expect-error - overriding types here
                    params,
                }));
                (0, transaction_js_1.trackTransaction)({
                    chainId: tx.chainId,
                    client,
                    contractAddress: tx.to ?? undefined,
                    gasPrice: tx.gasPrice,
                    transactionHash,
                    walletAddress: (0, address_js_1.getAddress)(address),
                    walletType: id,
                });
                return {
                    transactionHash,
                };
            }
            catch (error) {
                // Track insufficient funds errors
                if ((0, helpers_js_1.isInsufficientFundsError)(error)) {
                    (0, transaction_js_1.trackInsufficientFundsError)({
                        chainId: tx.chainId,
                        client,
                        contractAddress: tx.to || undefined,
                        error,
                        transactionValue: tx.value,
                        walletAddress: (0, address_js_1.getAddress)(address),
                    });
                }
                throw error;
            }
        },
        async signMessage({ message }) {
            if (!account.address) {
                throw new Error("Provider not setup");
            }
            const messageToSign = (() => {
                if (typeof message === "string") {
                    return (0, hex_js_1.stringToHex)(message);
                }
                if (message.raw instanceof Uint8Array) {
                    return (0, hex_js_1.uint8ArrayToHex)(message.raw);
                }
                return message.raw;
            })();
            return await provider.request({
                method: "personal_sign",
                params: [messageToSign, (0, address_js_1.getAddress)(account.address)],
            });
        },
        async signAuthorization(authorization) {
            const payload = ox__Authorization.getSignPayload(authorization);
            let signature;
            try {
                signature = await provider.request({
                    method: "eth_sign",
                    params: [(0, address_js_1.getAddress)(account.address), payload],
                });
            }
            catch {
                // fallback to secp256k1_sign, some providers don't support eth_sign
                signature = await provider.request({
                    // @ts-expect-error - overriding types here
                    method: "secp256k1_sign",
                    params: [payload],
                });
            }
            if (!signature) {
                throw new Error("Failed to sign authorization");
            }
            const parsedSignature = ox__Signature.fromHex(signature);
            return { ...authorization, ...parsedSignature };
        },
        async signTypedData(typedData) {
            if (!provider || !account.address) {
                throw new Error("Provider not setup");
            }
            const parsedTypedData = (0, parse_typed_data_js_1.parseTypedData)(typedData);
            const { domain, message, primaryType } = parsedTypedData;
            const types = {
                EIP712Domain: (0, viem_1.getTypesForEIP712Domain)({ domain }),
                ...parsedTypedData.types,
            };
            // Need to do a runtime validation check on addresses, byte ranges, integer ranges, etc
            // as we can't statically check this with TypeScript.
            (0, viem_1.validateTypedData)({ domain, message, primaryType, types });
            const stringifiedData = (0, viem_1.serializeTypedData)({
                domain: domain ?? {},
                message,
                primaryType,
                types,
            });
            return await provider.request({
                method: "eth_signTypedData_v4",
                params: [(0, address_js_1.getAddress)(account.address), stringifiedData],
            });
        },
        async watchAsset(asset) {
            const result = await provider.request({
                method: "wallet_watchAsset",
                params: asset,
            }, { retryCount: 0 });
            return result;
        },
        async sendCalls(options) {
            try {
                const { callParams, chain } = await (0, send_calls_js_1.toProviderCallParams)(options, account);
                const callId = await provider.request({
                    method: "wallet_sendCalls",
                    params: callParams,
                });
                if (callId && typeof callId === "object" && "id" in callId) {
                    return { chain, client, id: callId.id };
                }
                return { chain, client, id: callId };
            }
            catch (error) {
                if (/unsupport|not support/i.test(error.message)) {
                    throw new Error(`${id} errored calling wallet_sendCalls, with error: ${error instanceof Error ? error.message : (0, viem_1.stringify)(error)}`);
                }
                throw error;
            }
        },
        async getCallsStatus(options) {
            try {
                const rawResponse = (await provider.request({
                    method: "wallet_getCallsStatus",
                    params: [options.id],
                }));
                return (0, get_calls_status_js_1.toGetCallsStatusResponse)(rawResponse);
            }
            catch (error) {
                if (/unsupport|not support/i.test(error.message)) {
                    throw new Error(`${id} does not support wallet_getCallsStatus, reach out to them directly to request EIP-5792 support.`);
                }
                throw error;
            }
        },
        async getCallsStatusRaw(options) {
            try {
                const rawResponse = (await provider.request({
                    method: "wallet_getCallsStatus",
                    params: [options.id],
                }));
                return rawResponse;
            }
            catch (error) {
                if (/unsupport|not support/i.test(error.message)) {
                    throw new Error(`${id} does not support wallet_getCallsStatus, reach out to them directly to request EIP-5792 support.`);
                }
                throw error;
            }
        },
        async getCapabilities(options) {
            const chainIdFilter = options.chainId;
            try {
                const result = await provider.request({
                    method: "wallet_getCapabilities",
                    params: [
                        (0, address_js_1.getAddress)(account.address),
                        chainIdFilter ? [(0, hex_js_1.numberToHex)(chainIdFilter)] : undefined,
                    ],
                });
                return (0, get_capabilities_js_1.toGetCapabilitiesResult)(result, chainIdFilter);
            }
            catch (error) {
                if (/unsupport|not support|not available/i.test(error.message)) {
                    return {
                        message: `${id} does not support wallet_getCapabilities, reach out to them directly to request EIP-5792 support.`,
                    };
                }
                throw error;
            }
        },
    };
    return account;
}
/**
 * Call this method when the wallet provider is connected or auto connected
 * @internal
 */
async function onConnect({ provider, address, chain, emitter, client, id, }) {
    const account = createAccount({ address, client, id, provider });
    async function disconnect() {
        provider.removeListener("accountsChanged", onAccountsChanged);
        provider.removeListener("chainChanged", onChainChanged);
        provider.removeListener("disconnect", onDisconnect);
        // Experimental support for MetaMask disconnect
        // https://github.com/MetaMask/metamask-improvement-proposals/blob/main/MIPs/mip-2.md
        try {
            // Adding timeout as not all wallets support this method and can hang
            await (0, viem_1.withTimeout)(() => provider.request({
                method: "wallet_revokePermissions",
                params: [{ eth_accounts: {} }],
            }), { timeout: 100 });
        }
        catch { }
    }
    async function onDisconnect() {
        disconnect();
        emitter.emit("disconnect", undefined);
    }
    function onAccountsChanged(accounts) {
        if (accounts[0]) {
            const newAccount = createAccount({
                address: (0, address_js_1.getAddress)(accounts[0]),
                client,
                id,
                provider,
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
    }
    if (provider.on) {
        provider.on("accountsChanged", onAccountsChanged);
        provider.on("chainChanged", onChainChanged);
        provider.on("disconnect", onDisconnect);
    }
    return [
        account,
        chain,
        onDisconnect,
        (newChain) => switchChain(provider, newChain),
    ];
}
/**
 * @internal
 */
async function switchChain(provider, chain) {
    const hexChainId = (0, hex_js_1.numberToHex)(chain.id);
    try {
        await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: hexChainId }],
        });
    }
    catch {
        // if chain does not exist, add the chain
        const apiChain = await (0, utils_js_1.getChainMetadata)(chain);
        await provider.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    blockExplorerUrls: apiChain.explorers?.map((x) => x.url),
                    chainId: hexChainId,
                    chainName: apiChain.name,
                    nativeCurrency: apiChain.nativeCurrency, // no client id on purpose here
                    rpcUrls: (0, chains_js_1.getValidPublicRPCUrl)(apiChain),
                },
            ],
        });
    }
}
function extractErrorMessage(e) {
    if (e instanceof Error) {
        return e.message;
    }
    if (typeof e === "string") {
        return e;
    }
    if (typeof e === "object" && e !== null) {
        return JSON.stringify(e);
    }
    return String(e);
}
//# sourceMappingURL=index.js.map