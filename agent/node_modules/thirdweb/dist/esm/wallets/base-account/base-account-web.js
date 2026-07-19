import * as ox__Hex from "ox/Hex";
import * as ox__TypedData from "ox/TypedData";
import { trackTransaction } from "../../analytics/track/transaction.js";
import { getCachedChain, getChainMetadata } from "../../chains/utils.js";
import { getAddress } from "../../utils/address.js";
import { numberToHex, stringToHex, uint8ArrayToHex, } from "../../utils/encoding/hex.js";
import { stringify } from "../../utils/json.js";
import { parseTypedData } from "../../utils/signatures/helpers/parse-typed-data.js";
import { BASE_ACCOUNT } from "../constants.js";
import { toGetCallsStatusResponse } from "../eip5792/get-calls-status.js";
import { toGetCapabilitiesResult } from "../eip5792/get-capabilities.js";
import { toProviderCallParams } from "../eip5792/send-calls.js";
import { getValidPublicRPCUrl } from "../utils/chains.js";
import { getDefaultAppMetadata } from "../utils/defaultDappMetadata.js";
import { normalizeChainId } from "../utils/normalizeChainId.js";
// Need to keep the provider around because it keeps connection state
// Store both the provider and the options it was created with
let _provider;
let _providerOptions;
/**
 * @internal
 */
export async function getBaseAccountWebProvider(options) {
    if (_provider) {
        // Provider already exists - warn if options differ
        if (options && _providerOptions) {
            const currentChainIds = _providerOptions.chains?.map((c) => c.id) || [];
            const newChainIds = options.chains?.map((c) => c.id) || [];
            const chainsMatch = currentChainIds.length === newChainIds.length &&
                currentChainIds.every((id, i) => id === newChainIds[i]);
            const appNameMatch = options.appMetadata?.name === _providerOptions.appMetadata?.name;
            if (!chainsMatch || !appNameMatch) {
                console.warn("[Base Account SDK] Provider already initialized with different options. " +
                    "The Base Account SDK uses a singleton provider - subsequent configurations are ignored. " +
                    "Create only one Base Account wallet instance per application.");
            }
        }
        return _provider;
    }
    const { createBaseAccountSDK } = await import("@base-org/account");
    const defaultMetadata = getDefaultAppMetadata();
    const sdk = createBaseAccountSDK({
        appName: options?.appMetadata?.name ||
            defaultMetadata.name ||
            "thirdweb powered dApp",
        appLogoUrl: options?.appMetadata?.logoUrl || defaultMetadata.logoUrl || null,
        appChainIds: options?.chains?.map((c) => c.id) || [],
    });
    const provider = sdk.getProvider();
    _provider = provider;
    _providerOptions = options;
    return provider;
}
/**
 * Type guard to check if a wallet is a Base Account SDK wallet.
 *
 * This function narrows the wallet type to `Wallet<"org.base.account">`,
 * allowing TypeScript to infer the correct wallet type in conditional blocks.
 *
 * @param wallet - The wallet instance to check.
 * @returns `true` if the wallet is a Base Account SDK wallet, `false` otherwise.
 *
 * @example
 * ```ts
 * import { createWallet } from "thirdweb/wallets";
 * import { isBaseAccountSDKWallet } from "thirdweb/wallets";
 *
 * const wallet = createWallet("org.base.account");
 *
 * if (isBaseAccountSDKWallet(wallet)) {
 *   // wallet is typed as Wallet<"org.base.account">
 *   console.log("This is a Base Account wallet");
 * }
 * ```
 *
 * @beta
 */
export function isBaseAccountSDKWallet(wallet) {
    return wallet.id === BASE_ACCOUNT;
}
function createAccount({ provider, address, client, }) {
    const account = {
        address: getAddress(address),
        async sendTransaction(tx) {
            const transactionHash = (await provider.request({
                method: "eth_sendTransaction",
                params: [
                    {
                        accessList: tx.accessList,
                        data: tx.data,
                        from: getAddress(address),
                        gas: tx.gas ? numberToHex(tx.gas) : undefined,
                        to: tx.to,
                        value: tx.value ? numberToHex(tx.value) : undefined,
                    },
                ],
            }));
            trackTransaction({
                chainId: tx.chainId,
                client: client,
                contractAddress: tx.to ?? undefined,
                gasPrice: tx.gasPrice,
                transactionHash,
                walletAddress: getAddress(address),
                walletType: BASE_ACCOUNT,
            });
            return {
                transactionHash,
            };
        },
        async signMessage({ message }) {
            if (!account.address) {
                throw new Error("Provider not setup");
            }
            const messageToSign = (() => {
                if (typeof message === "string") {
                    return stringToHex(message);
                }
                if (message.raw instanceof Uint8Array) {
                    return uint8ArrayToHex(message.raw);
                }
                return message.raw;
            })();
            const res = await provider.request({
                method: "personal_sign",
                params: [messageToSign, account.address],
            });
            if (!ox__Hex.validate(res)) {
                throw new Error("Invalid signature returned");
            }
            return res;
        },
        async signTypedData(typedData) {
            if (!account.address) {
                throw new Error("Provider not setup");
            }
            const { domain, message, primaryType } = parseTypedData(typedData);
            const types = {
                EIP712Domain: ox__TypedData.extractEip712DomainTypes(domain),
                ...typedData.types,
            };
            // Need to do a runtime validation check on addresses, byte ranges, integer ranges, etc
            // as we can't statically check this with TypeScript.
            ox__TypedData.validate({ domain, message, primaryType, types });
            const stringifiedData = ox__TypedData.serialize({
                domain: domain ?? {},
                message,
                primaryType,
                types,
            });
            const res = await provider.request({
                method: "eth_signTypedData_v4",
                params: [account.address, stringifiedData],
            });
            if (!ox__Hex.validate(res)) {
                throw new Error("Invalid signed payload returned");
            }
            return res;
        },
        sendCalls: async (options) => {
            try {
                const { callParams, chain } = await toProviderCallParams(options, account);
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
                    throw new Error(`${BASE_ACCOUNT} errored calling wallet_sendCalls, with error: ${error instanceof Error ? error.message : stringify(error)}`);
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
                return toGetCallsStatusResponse(rawResponse);
            }
            catch (error) {
                if (/unsupport|not support/i.test(error.message)) {
                    throw new Error(`${BASE_ACCOUNT} does not support wallet_getCallsStatus, reach out to them directly to request EIP-5792 support.`);
                }
                throw error;
            }
        },
        async getCapabilities(options) {
            const chainId = options.chainId;
            try {
                const result = (await provider.request({
                    method: "wallet_getCapabilities",
                    params: [getAddress(account.address)],
                }));
                return toGetCapabilitiesResult(result, chainId);
            }
            catch (error) {
                if (/unsupport|not support|not available/i.test(error.message)) {
                    return {
                        message: `${BASE_ACCOUNT} does not support wallet_getCapabilities, reach out to them directly to request EIP-5792 support.`,
                    };
                }
                throw error;
            }
        },
    };
    return account;
}
function onConnect(address, chain, provider, emitter, client) {
    const account = createAccount({ address, client, provider });
    async function disconnect() {
        provider.off("accountsChanged", onAccountsChanged);
        provider.off("chainChanged", onChainChanged);
        provider.off("disconnect", onDisconnect);
        await provider.disconnect();
    }
    async function onDisconnect() {
        disconnect();
        emitter.emit("disconnect", undefined);
    }
    function onAccountsChanged(accounts) {
        if (accounts[0]) {
            const newAccount = createAccount({
                address: getAddress(accounts[0]),
                client,
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
        const newChain = getCachedChain(normalizeChainId(newChainId));
        emitter.emit("chainChanged", newChain);
    }
    // subscribe to events - the ProviderInterface uses EventEmitter3
    // which has a slightly different signature than the generic event emitter
    provider.on("accountsChanged", onAccountsChanged);
    provider.on("chainChanged", onChainChanged);
    provider.on("disconnect", onDisconnect);
    return [
        account,
        chain,
        onDisconnect,
        (newChain) => switchChainBaseAccountSDK(provider, newChain),
    ];
}
/**
 * @internal
 */
export async function connectBaseAccountSDK(options, emitter, provider) {
    const accounts = (await provider.request({
        method: "eth_requestAccounts",
    }));
    if (!accounts[0]) {
        throw new Error("No accounts found");
    }
    const address = getAddress(accounts[0]);
    const connectedChainId = (await provider.request({
        method: "eth_chainId",
    }));
    const chainId = normalizeChainId(connectedChainId);
    let chain = options.chain && options.chain.id === chainId
        ? options.chain
        : getCachedChain(chainId);
    // Switch to chain if provided
    if (chainId && options?.chain && chainId !== options?.chain.id) {
        await switchChainBaseAccountSDK(provider, options.chain);
        chain = options.chain;
    }
    return onConnect(address, chain, provider, emitter, options.client);
}
/**
 * @internal
 */
export async function autoConnectBaseAccountSDK(options, emitter, provider) {
    // connected accounts
    const addresses = (await provider.request({
        method: "eth_accounts",
    }));
    const address = addresses[0];
    if (!address) {
        throw new Error("No accounts found");
    }
    const connectedChainId = (await provider.request({
        method: "eth_chainId",
    }));
    const chainId = normalizeChainId(connectedChainId);
    const chain = options.chain && options.chain.id === chainId
        ? options.chain
        : getCachedChain(chainId);
    return onConnect(address, chain, provider, emitter, options.client);
}
async function switchChainBaseAccountSDK(provider, chain) {
    // check if chain is already connected
    const connectedChainId = (await provider.request({
        method: "eth_chainId",
    }));
    const connectedChain = getCachedChain(normalizeChainId(connectedChainId));
    if (connectedChain?.id === chain.id) {
        // chain is already connected, no need to switch
        return;
    }
    const chainIdHex = numberToHex(chain.id);
    try {
        await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: chainIdHex }],
        });
    }
    catch (error) {
        const apiChain = await getChainMetadata(chain);
        // Indicates chain is not added to provider
        // biome-ignore lint/suspicious/noExplicitAny: TODO: fix later
        if (error?.code === 4902) {
            // try to add the chain
            await provider.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        blockExplorerUrls: apiChain.explorers?.map((x) => x.url) || [],
                        chainId: chainIdHex,
                        chainName: apiChain.name,
                        nativeCurrency: apiChain.nativeCurrency, // no client id on purpose here
                        rpcUrls: getValidPublicRPCUrl(apiChain),
                    },
                ],
            });
        }
    }
}
//# sourceMappingURL=base-account-web.js.map