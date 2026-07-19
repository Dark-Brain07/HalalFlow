"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toProvider = toProvider;
const utils_js_1 = require("../../chains/utils.js");
const rpc_js_1 = require("../../rpc/rpc.js");
const estimate_gas_js_1 = require("../../transaction/actions/estimate-gas.js");
const send_transaction_js_1 = require("../../transaction/actions/send-transaction.js");
const prepare_transaction_js_1 = require("../../transaction/prepare-transaction.js");
const hex_js_1 = require("../../utils/encoding/hex.js");
/**
 * Converts a Thirdweb wallet into an EIP-1193 compatible provider.
 *
 * This adapter allows you to use a Thirdweb wallet with any library or dApp that expects an EIP-1193 provider.
 * The provider implements the standard EIP-1193 interface including request handling and event subscription.
 *
 * @param options - Configuration options for creating the provider
 * @param options.wallet - The Thirdweb wallet to adapt into a provider
 * @param options.chain - The blockchain chain to connect to
 * @param options.client - The Thirdweb client instance
 * @param options.connectOverride - Optional custom connect handler to override default connection behavior
 * @returns An EIP-1193 compatible provider that wraps the Thirdweb wallet
 *
 * @example
 * ```ts
 * import { EIP1193 } from "thirdweb/wallets";
 *
 * // Create an EIP-1193 provider from a Thirdweb wallet
 * const provider = EIP1193.toProvider({
 *   wallet,
 *   chain: ethereum,
 *   client: createThirdwebClient({ clientId: "..." })
 * });
 *
 * // Use with any EIP-1193 compatible library
 * const accounts = await provider.request({
 *   method: "eth_requestAccounts"
 * });
 *
 * // Listen for events
 * provider.on("accountsChanged", (accounts) => {
 *   console.log("Active accounts:", accounts);
 * });
 * ```
 *
 * @extension EIP1193
 */
function toProvider(options) {
    const { chain, client, wallet, connectOverride } = options;
    const rpcClient = (0, rpc_js_1.getRpcClient)({ chain, client });
    return {
        on: wallet.subscribe,
        removeListener: () => {
            // should invoke the return fn from subscribe instead
        },
        request: async (request) => {
            switch (request.method) {
                case "eth_sendTransaction": {
                    const account = wallet.getAccount();
                    if (!account) {
                        throw new Error("Account not connected");
                    }
                    const result = await (0, send_transaction_js_1.sendTransaction)({
                        account: account,
                        transaction: (0, prepare_transaction_js_1.prepareTransaction)({
                            ...request.params[0],
                            chain,
                            client,
                        }),
                    });
                    return result.transactionHash;
                }
                case "eth_estimateGas": {
                    const account = wallet.getAccount();
                    if (!account) {
                        throw new Error("Account not connected");
                    }
                    return (0, estimate_gas_js_1.estimateGas)({
                        account,
                        transaction: (0, prepare_transaction_js_1.prepareTransaction)({
                            ...request.params[0],
                            chain,
                            client,
                        }),
                    });
                }
                case "personal_sign": {
                    const account = wallet.getAccount();
                    if (!account) {
                        throw new Error("Account not connected");
                    }
                    return account.signMessage({
                        message: {
                            raw: request.params[0],
                        },
                    });
                }
                case "eth_signTypedData_v4": {
                    const account = wallet.getAccount();
                    if (!account) {
                        throw new Error("Account not connected");
                    }
                    const data = JSON.parse(request.params[1]);
                    return account.signTypedData(data);
                }
                case "eth_accounts": {
                    const account = wallet.getAccount();
                    if (!account) {
                        return [];
                    }
                    return [account.address];
                }
                case "eth_requestAccounts": {
                    const connectedAccount = wallet.getAccount();
                    if (connectedAccount) {
                        return [connectedAccount.address];
                    }
                    const account = connectOverride
                        ? await connectOverride(wallet)
                        : await wallet
                            .connect({
                            client,
                        })
                            .catch((e) => {
                            console.error("Error connecting wallet", e);
                            return null;
                        });
                    if (!account) {
                        throw new Error("Unable to connect wallet - try passing a connectOverride function");
                    }
                    return [account.address];
                }
                case "wallet_switchEthereumChain":
                case "wallet_addEthereumChain": {
                    const data = request.params[0];
                    const chainIdHex = data.chainId;
                    if (!chainIdHex) {
                        throw new Error("Chain ID is required");
                    }
                    // chainId is hex most likely, convert to number
                    const chainId = (0, hex_js_1.isHex)(chainIdHex)
                        ? (0, hex_js_1.hexToNumber)(chainIdHex)
                        : chainIdHex;
                    const chain = (0, utils_js_1.getCachedChain)(chainId);
                    return wallet.switchChain(chain);
                }
                case "wallet_getCapabilities": {
                    const account = wallet.getAccount();
                    if (!account) {
                        throw new Error("Account not connected");
                    }
                    if (!account.getCapabilities) {
                        throw new Error("Wallet does not support EIP-5792");
                    }
                    const chains = request.params[1];
                    if (chains && Array.isArray(chains)) {
                        const firstChainStr = chains[0];
                        const firstChainId = (0, hex_js_1.isHex)(firstChainStr)
                            ? (0, hex_js_1.hexToNumber)(firstChainStr)
                            : Number(firstChainStr);
                        return account.getCapabilities(firstChainId ? { chainId: firstChainId } : {});
                    }
                    return account.getCapabilities({});
                }
                case "wallet_sendCalls": {
                    const account = wallet.getAccount();
                    if (!account) {
                        throw new Error("Account not connected");
                    }
                    if (!account.sendCalls) {
                        throw new Error("Wallet does not support EIP-5792");
                    }
                    return account.sendCalls({
                        ...request.params[0],
                        chain: chain,
                    });
                }
                case "wallet_getCallsStatus": {
                    const account = wallet.getAccount();
                    if (!account) {
                        throw new Error("Account not connected");
                    }
                    if (!account.getCallsStatusRaw) {
                        throw new Error("Wallet does not support EIP-5792");
                    }
                    const result = await account.getCallsStatusRaw({
                        id: request.params[0],
                        chain: chain,
                        client: client,
                    });
                    return result;
                }
                default:
                    return rpcClient(request);
            }
        },
    };
}
//# sourceMappingURL=to-eip1193.js.map